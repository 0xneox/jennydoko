import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Share,
  Platform,
  Image,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGameStore } from '../store/gameStore';
import { Board } from '../components/Board';
import { CandyBackground } from '../components/candy/CandyBackground';
import { CandyButton } from '../components/candy/CandyButton';
import { CandyPanel } from '../components/candy/CandyPanel';
import {
  APP_NAME,
  CANDY_GOLD,
  CANDY_SURFACE,
  CANDY_TEXT,
  CANDY_METRICS,
} from '../utils/theme';
import { Confetti } from '../components/Confetti';
import { SettingsModal } from '../components/SettingsModal';
import { HintButton } from '../components/HintButton';
import { MechanicIntroTutorial, MechanicType } from '../components/MechanicIntroTutorial';
import { ChapterStoryModal } from '../components/ChapterStoryModal';
import { PuppySprite } from '../components/assets/PuppySprite';

const PAW_IMAGE = require('../../assets/paw.png');
const JENNY_PUPPY_IMAGE = require('../../assets/jennyim.png');
import * as Haptics from 'expo-haptics';
import {
  setTutorialSeen,
  getTutorialSeen,
  PuppyMilestone,
  PUPPY_MILESTONES,
  loadClaimedAdoptions,
  saveClaimedAdoptions,
  getMechanicIntrosSeen,
  getChapterStoriesSeen,
} from '../utils/storage';
import { soundManager } from '../utils/soundManager';
import { recordLevelCompletion } from '../utils/statistics';
import { getLevelDifficulty, getDifficultyColor, getDifficultyLabel } from '../utils/levelHelpers';
import { getChapterForLevel } from '../data/chapterData';
import { getChapterStory, CHAPTERS_WITH_STORIES, ChapterStory } from '../data/chapterStories';
import { JennyAvatar, JennyMood } from '../components/assets/JennyAvatar';
import { InteractiveTutorial } from '../components/InteractiveTutorial';
import { JENNY_CHEERS } from '../data/storyLore';
import {
  recordDailyCompletion,
  generateDailyShareText,
} from '../utils/dailyChallenge';
import { AdoptionModal } from '../components/AdoptionModal';

// Fixed width for the control columns flanking the board — the widest item is
// the HintButton ("Show cell" ≈ 130px). Fixed columns keep the board centered
// and make the fits-on-screen check below exact.
const SIDE_CONTROLS_WIDTH = 140;
const BOARD_ROW_GAP = 10;
// Horizontal chrome the Board tray adds around the grid (2 × GRID_OFFSET).
const TRAY_FRAME_WIDTH = 36;

export const GameScreen: React.FC = () => {
  const {
    board,
    hearts,
    moves,
    isComplete,
    currentLevel,
    initializeLevel,
    setActiveScreen,
    placePuppy,
    markCell,
    undo,
    restart,
    keepLooking,
    lastWrongCell,
    setLastWrongCell,
    mistakes,
    isGameOver,
    gameMode,
    setGameMode,
    isDailyChallenge,
    mechanics,
    lastMistakeForgiven,
    hintsUsed,
    activeHint,
    hintMessage,
    requestHint,
  } = useGameStore();

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // Fill the available space instead of using fixed sizes, so a 10x10 board is
  // just as tappable as a 4x4 one. Chrome allowances: screen padding + tray
  // frame horizontally, and nav + stats + mode switcher + controls vertically.
  const calcCellSize = (gridSize: number) => {
    const usableWidth = Math.min(screenWidth, 560) - 32 - 36;
    const usableHeight = screenHeight - 380;
    const size = Math.floor(Math.min(usableWidth, usableHeight) / gridSize);
    return Math.max(26, Math.min(74, size));
  };

  const [cellSize, setCellSize] = useState<number>(() => calcCellSize(board.gridSize));
  const [showTutorial, setShowTutorial] = useState(false);
  const [lastTap, setLastTap] = useState<{ row: number; col: number; time: number } | null>(null);
  const [lastPlacedPuppy, setLastPlacedPuppy] = useState<{ row: number; col: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [inputMode, setInputMode] = useState<'puppy' | 'mark'>('mark');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [dailyResult, setDailyResult] = useState<{
    streak: number;
    isNewRecord: boolean;
    reward: string | null;
  } | null>(null);

  // Emotional Personality & Milestone States
  const [jennyMood, setJennyMood] = useState<JennyMood>('friendly');
  const [pawfectResult, setPawfectResult] = useState<{
    stars: number;
    label: string;
    subtext: string;
  }>({
    stars: 3,
    label: 'Paw-fect Master! 🐾',
    subtext: 'Flawless deduction with gentle paws!',
  });
  const [activeMilestone, setActiveMilestone] = useState<PuppyMilestone | null>(null);
  const [shareToast, setShareToast] = useState(false);

  // Wrong Move Feedback State
  const [wrongMoveToast, setWrongMoveToast] = useState<{ title: string; sub: string } | null>(null);

  // Hint speech bubble + restart confirmation
  const [hintBubble, setHintBubble] = useState<string | null>(null);
  const [showRestartConfirm, setShowRestartConfirm] = useState(false);

  // Mechanic intro tutorial (cats, linked, twin)
  const [activeMechanicIntro, setActiveMechanicIntro] = useState<MechanicType | null>(null);

  // Chapter intro story modal (fires on first entry to mechanic debut chapters)
  const [activeChapterStory, setActiveChapterStory] = useState<ChapterStory | null>(null);

  // Cat aura: show red glow around cats for 1.5s at level start
  const [showCatAura, setShowCatAura] = useState(false);
  const catAuraTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Linked bed pulse: when a cell in a linked region is tapped, the twin glows
  const [linkedPulseRegionId, setLinkedPulseRegionId] = useState<number | null>(null);
  const linkedPulseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Combo counter: rapid valid placements
  const [comboCount, setComboCount] = useState(0);
  const [comboToast, setComboToast] = useState<string | null>(null);
  const comboTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const comboToastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastPlacementTime = useRef(0);

  // Completion Modal State
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Readiness gate — prevents flicker from cascading mounts
  const [isReady, setIsReady] = useState(false);

  // Statistics tracking
  const levelStartTime = useRef<number>(Date.now());

  // Animations
  const screenFadeAnim = useRef(new Animated.Value(0)).current;
  const screenSlideAnim = useRef(new Animated.Value(12)).current;
  const heartScaleAnim = useRef(new Animated.Value(1)).current;
  const toastFadeAnim = useRef(new Animated.Value(0)).current;
  const completionScaleAnim = useRef(new Animated.Value(0.85)).current;
  const shimmerAnim = useRef(new Animated.Value(0.3)).current;
  const prevHearts = useRef(hearts);
  const isFirstLevelLoad = useRef(true);

  // Loading shimmer animation — shown during level transitions
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(shimmerAnim, { toValue: 0.3, duration: 600, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [shimmerAnim]);

  // Timer refs — every delayed callback is tracked so it can be cancelled on
  // unmount and re-triggered cleanly on rapid repeat events.
  const isMountedRef = useRef(true);
  const moodResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const milestoneTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shareToastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrongToastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrongCellTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hintBubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cancel all pending timeouts on unmount
  useEffect(() => {
    isMountedRef.current = true;
    const timers = [moodResetTimer, milestoneTimer, shareToastTimer, wrongToastTimer, wrongCellTimer, hintBubbleTimer, catAuraTimer, linkedPulseTimer, comboTimer, comboToastTimer];
    return () => {
      isMountedRef.current = false;
      timers.forEach(ref => {
        if (ref.current) {
          clearTimeout(ref.current);
          ref.current = null;
        }
      });
    };
  }, []);

  // Atomic level initialization + tutorial pre-check — renders all-at-once via isReady
  useEffect(() => {
    // Hide UI immediately on level change so we don't paint stale / transitioning content
    if (!isFirstLevelLoad.current) {
      setIsReady(false);
    }

    // First mount: state was already populated atomically by startLevel() /
    // startDailyChallenge() — re-initializing would regenerate the puzzle a
    // second time (and on Level 1 produce a *different* random transform).
    const skipInit = isFirstLevelLoad.current;
    if (!skipInit) {
      initializeLevel(currentLevel);
    }

    setShowCompletionModal(false);
    setWrongMoveToast(null);
    setLastPlacedPuppy(null);
    setIsDragging(false);
    setJennyMood('friendly');
    setShareToast(false);
    // Paw Mark is the default tool on every level start — marking candidates
    // first is the intended solve flow; Puppy is the explicit commitment.
    setInputMode('mark');
    setLastTap(null);

    levelStartTime.current = Date.now();

    // Auto-trigger Level 1 tutorial for brand-new players, or mechanic intros
    // when a new mechanic first appears. Both check persistent storage so they
    // only fire once per device.
    setShowTutorial(false);
    setActiveMechanicIntro(null);
    setActiveChapterStory(null);
    if (currentLevel === 1) {
      getTutorialSeen().then(seen => {
        if (!seen && isMountedRef.current) setShowTutorial(true);
      }).catch(() => {});
    } else {
      // Check for chapter intro story on mechanic debut chapters
      const chapter = getChapterForLevel(currentLevel);
      if (CHAPTERS_WITH_STORIES.has(chapter.id)) {
        getChapterStoriesSeen().then(seen => {
          if (!isMountedRef.current) return;
          if (!seen.includes(chapter.id)) {
            const story = getChapterStory(chapter.id);
            if (story) setActiveChapterStory(story);
          }
        }).catch(() => {});
      }

      // Check for new mechanic intros (cats, linked, twin)
      const needsCats = mechanics.catCount > 0;
      const needsLinked = mechanics.linkedCount > 0;
      const needsTwin = mechanics.puppiesPerUnit > 1;
      if (needsCats || needsLinked || needsTwin) {
        getMechanicIntrosSeen().then(seen => {
          if (!isMountedRef.current) return;
          if (needsCats && !seen.includes('cats')) {
            setActiveMechanicIntro('cats');
          } else if (needsLinked && !seen.includes('linked')) {
            setActiveMechanicIntro('linked');
          } else if (needsTwin && !seen.includes('twin')) {
            setActiveMechanicIntro('twin');
          }
        }).catch(() => {});
      }
    }

    // Clear any stale hint bubble on level change
    setHintBubble(null);
    setComboCount(0);
    setComboToast(null);

    // Cat aura: show red glow around cats for 1.5s at level start
    setShowCatAura(false);
    if (mechanics.catCount > 0) {
      setShowCatAura(true);
      if (catAuraTimer.current) clearTimeout(catAuraTimer.current);
      catAuraTimer.current = setTimeout(() => {
        catAuraTimer.current = null;
        if (isMountedRef.current) setShowCatAura(false);
      }, 1500);
    }

    // Linked bed sparkle SFX on board load
    if (mechanics.linkedCount > 0) {
      if (linkedPulseTimer.current) clearTimeout(linkedPulseTimer.current);
      linkedPulseTimer.current = setTimeout(() => {
        linkedPulseTimer.current = null;
        if (isMountedRef.current) soundManager.play('linkedSparkle');
      }, 300);
    }

    // Immediately correct cell size after initializeLevel mutated board.gridSize
    setCellSize(calcCellSize(board.gridSize));

    // Flip render gate ONCE — everything shows together
    setIsReady(true);

    // Now play the enter animation
    if (isFirstLevelLoad.current) {
      isFirstLevelLoad.current = false;
      screenFadeAnim.setValue(1);
      screenSlideAnim.setValue(0);
    } else {
      screenFadeAnim.setValue(0);
      screenSlideAnim.setValue(12);
      Animated.parallel([
        Animated.timing(screenFadeAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(screenSlideAnim, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [currentLevel, initializeLevel, screenFadeAnim, screenSlideAnim]);

  // Recompute cell size when the grid changes or the viewport resizes (rotation)
  useEffect(() => {
    setCellSize(prev => {
      const next = calcCellSize(board.gridSize);
      return next === prev ? prev : next;
    });
  }, [board.gridSize, screenWidth, screenHeight]);

  // Heart decrease animation & sympathetic mood
  useEffect(() => {
    if (hearts < prevHearts.current) {
      setJennyMood('sympathetic');
      if (moodResetTimer.current) clearTimeout(moodResetTimer.current);
      moodResetTimer.current = setTimeout(() => {
        moodResetTimer.current = null;
        setJennyMood('friendly');
      }, 2200);

      Animated.sequence([
        Animated.timing(heartScaleAnim, { toValue: 1.35, duration: 120, useNativeDriver: true }),
        Animated.timing(heartScaleAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
      ]).start();
    }
    prevHearts.current = hearts;
  }, [hearts, heartScaleAnim]);

  // Hint speech bubble — Jenny explains the rule, or suggests recovery
  useEffect(() => {
    if (hintBubbleTimer.current) {
      clearTimeout(hintBubbleTimer.current);
      hintBubbleTimer.current = null;
    }
    if (activeHint) {
      setHintBubble(activeHint.explanation);
    } else if (hintMessage) {
      setHintBubble(hintMessage);
    } else {
      setHintBubble(null);
      return;
    }
    hintBubbleTimer.current = setTimeout(() => {
      hintBubbleTimer.current = null;
      if (isMountedRef.current) setHintBubble(null);
    }, 6000);
  }, [activeHint, hintMessage]);

  // Completion sequence
  useEffect(() => {
    if (!isComplete) return;
    let cancelled = false;

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    soundManager.play('complete');

    // Record statistics and calculate paw-fect star rating
    const completionTime = Math.floor((Date.now() - levelStartTime.current) / 1000);
    recordLevelCompletion(currentLevel, moves, completionTime, hearts, hintsUsed, {
      mistakes,
      zen: gameMode === 'zen',
    })
      .then(result => {
        if (!cancelled) setPawfectResult(result);
      })
      .catch(() => {});

    if (isDailyChallenge) {
      recordDailyCompletion({ moves, time: completionTime })
        .then(res => {
          if (!cancelled) setDailyResult(res);
        })
        .catch(() => {});
    } else {
      // Check milestone adoption reward
      const milestone = PUPPY_MILESTONES.find(m => m.level === currentLevel);
      if (milestone) {
        loadClaimedAdoptions().then(claimed => {
          if (cancelled) return;
          if (!claimed.includes(currentLevel)) {
            saveClaimedAdoptions([...claimed, currentLevel]);
            milestoneTimer.current = setTimeout(() => {
              milestoneTimer.current = null;
              if (!cancelled) setActiveMilestone(milestone);
            }, 700);
          }
        }).catch(() => {});
      }
    }

    // Small celebratory delay before showing completion popup
    const timer = setTimeout(() => {
      if (cancelled) return;
      setShowCompletionModal(true);
      setLastPlacedPuppy(null);
      completionScaleAnim.setValue(0.8);
      Animated.spring(completionScaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 70,
        useNativeDriver: true,
      }).start();
    }, 500);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (milestoneTimer.current) {
        clearTimeout(milestoneTimer.current);
        milestoneTimer.current = null;
      }
    };
  }, [isComplete, completionScaleAnim, currentLevel, moves, hearts, isDailyChallenge, hintsUsed]);

  const handleShareDaily = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    soundManager.play('button');
    const completionTime = Math.floor((Date.now() - levelStartTime.current) / 1000);
    const shareText = generateDailyShareText({
      streak: dailyResult?.streak || 1,
      moves,
      timeSeconds: completionTime,
      heartsLeft: hearts,
      gridSize: board.gridSize,
    });

    try {
      if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
        setShareToast(true);
        if (shareToastTimer.current) clearTimeout(shareToastTimer.current);
        shareToastTimer.current = setTimeout(() => {
          shareToastTimer.current = null;
          setShareToast(false);
        }, 2400);
      } else {
        await Share.share({
          message: shareText,
          title: `${APP_NAME} Daily Walk`,
        });
      }
    } catch {
      // Ignore share sheet cancel
    }
  };

  const showWrongFeedback = (row: number, col: number, override?: { title: string; sub: string }) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    soundManager.play('wrong');
    const { lastMistakeForgiven, gameMode, mistakes: made } = useGameStore.getState();
    const msg = override ?? (lastMistakeForgiven
      ? gameMode === 'zen'
        ? { title: 'Not quite!', sub: 'Zen mode is forgiving — try another spot.' }
        : { title: 'No worries! 💕', sub: `${Math.max(0, 3 - made)} oops left — try again.` }
      : { title: 'Not quite!', sub: "That puppy can't go there." });
    setWrongMoveToast(msg);
    setJennyMood('sympathetic');
    if (moodResetTimer.current) clearTimeout(moodResetTimer.current);
    moodResetTimer.current = setTimeout(() => {
      moodResetTimer.current = null;
      setJennyMood('friendly');
    }, 2200);

    toastFadeAnim.setValue(0);
    Animated.timing(toastFadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();

    // Auto-dismiss toast
    if (wrongToastTimer.current) clearTimeout(wrongToastTimer.current);
    wrongToastTimer.current = setTimeout(() => {
      wrongToastTimer.current = null;
      Animated.timing(toastFadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        if (isMountedRef.current) setWrongMoveToast(null);
      });
    }, 1800);

    // Clear wrong cell shaking state
    if (wrongCellTimer.current) clearTimeout(wrongCellTimer.current);
    wrongCellTimer.current = setTimeout(() => {
      wrongCellTimer.current = null;
      setLastWrongCell(null);
    }, 1000);
  };


  const DOUBLE_TAP_MAX_DELAY = 400; // ms – expanded to comfortably capture natural double-taps (320-380ms)

  // Check if a cell is adjacent to a cat (for purr SFX on placement)
  const isAdjacentToCat = (row: number, col: number): boolean => {
    const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    for (const [dr, dc] of dirs) {
      const nr = row + dr, nc = col + dc;
      if (board.cells[nr]?.[nc]?.value === 'cat') return true;
    }
    return false;
  };

  // Trigger linked bed pulse: when tapping a cell in a linked region, glow the twin
  const triggerLinkedPulse = (row: number, col: number) => {    const region = board.regions.find(r =>
      r.cells.some(c => c.row === row && c.col === col)
    );
    if (!region || !region.linked && region.cells.length <= 1) return;
    // Only pulse for actual linked regions (non-contiguous)
    const cellSet = new Set(region.cells.map(c => `${c.row},${c.col}`));
    const visited = new Set<string>([`${region.cells[0].row},${region.cells[0].col}`]);
    const queue = [region.cells[0]];
    while (queue.length > 0) {
      const cur = queue.pop()!;
      for (const [dr, dc] of [[-1,0],[1,0],[0,-1],[0,1]]) {
        const key = `${cur.row + dr},${cur.col + dc}`;
        if (cellSet.has(key) && !visited.has(key)) {
          visited.add(key);
          queue.push({ row: cur.row + dr, col: cur.col + dc });
        }
      }
    }
    if (visited.size === region.cells.length) return; // contiguous, not linked
    setLinkedPulseRegionId(region.id);
    soundManager.play('linkedSparkle');
    if (linkedPulseTimer.current) clearTimeout(linkedPulseTimer.current);
    linkedPulseTimer.current = setTimeout(() => {
      linkedPulseTimer.current = null;
      setLinkedPulseRegionId(null);
    }, 900);
  };

  // Combo counter: track rapid valid placements (within 2.5s of each other)
  const trackCombo = () => {
    const now = Date.now();
    const isRapid = now - lastPlacementTime.current < 2500;
    const newCount = isRapid ? comboCount + 1 : 1;
    lastPlacementTime.current = now;

    if (newCount >= 2) {
      setComboCount(newCount);
      setComboToast(`Pup chain ×${newCount}!`);
      soundManager.play('combo');
      if (comboToastTimer.current) clearTimeout(comboToastTimer.current);
      comboToastTimer.current = setTimeout(() => {
        comboToastTimer.current = null;
        if (isMountedRef.current) setComboToast(null);
      }, 1800);
    } else {
      setComboCount(1);
    }

    // Reset combo if no placement within 2.5s
    if (comboTimer.current) clearTimeout(comboTimer.current);
    comboTimer.current = setTimeout(() => {
      comboTimer.current = null;
      setComboCount(0);
    }, 2500);
  };

  const handleCellPress = (row: number, col: number) => {
    if (isGameOver || isComplete || isDragging) return;

    // Grumpy cats are untappable in every mode — teach the rule instantly
    if (board.cells[row]?.[col]?.value === 'cat') {
      soundManager.play('catHiss');
      showWrongFeedback(row, col, { title: '😾 Grumpy cat!', sub: 'Give it space — no puppies next to a cat.' });
      return;
    }

    const now = Date.now();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Trigger linked bed pulse on tap
    triggerLinkedPulse(row, col);

    if (lastTap && lastTap.row === row && lastTap.col === col && now - lastTap.time < DOUBLE_TAP_MAX_DELAY) {
      // Double-tap commits a puppy. The engine overwrites a Paw Mark directly,
      // so no undo() here — it would revert whatever the *previous* move was.
      const success = placePuppy(row, col);
      if (!success) {
        showWrongFeedback(row, col);
      } else {
        soundManager.play('placePuppy');
        if (isAdjacentToCat(row, col)) setTimeout(() => soundManager.play('catPurr'), 200);
        trackCombo();
        setLastPlacedPuppy({ row, col });
      }
      setLastTap(null);
      return;
    }

    if (inputMode === 'puppy') {
      const success = placePuppy(row, col);
      if (!success) {
        showWrongFeedback(row, col);
      } else {
        soundManager.play('placePuppy');
        if (isAdjacentToCat(row, col)) setTimeout(() => soundManager.play('catPurr'), 200);
        trackCombo();
        setLastPlacedPuppy({ row, col });
      }
      setLastTap({ row, col, time: now });
    } else {
      markCell(row, col);
      soundManager.play('markX');
      setLastTap({ row, col, time: now });
    }
  };

  const handleMarkCell = (row: number, col: number) => {
    if (isGameOver || isComplete) return;
    if (inputMode === 'mark') {
      markCell(row, col);
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
    setLastTap(null);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleRestart = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    soundManager.play('button');
    restart();
    setShowCompletionModal(false);
    setShowRestartConfirm(false);
    setWrongMoveToast(null);
    setLastPlacedPuppy(null);
    setIsDragging(false);
    setHintBubble(null);
  };

  const handleHintPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    soundManager.play('hint');
    requestHint();
  };

  const handleTutorialClose = () => {
    setShowTutorial(false);
    setTutorialSeen(true);
  };

  const handleNextLevel = () => {
    setShowCompletionModal(false);
    setLastPlacedPuppy(null);
    setIsDragging(false);
    if (currentLevel < 1000) {
      initializeLevel(currentLevel + 1);
    } else {
      initializeLevel(1);
    }
  };

  const boardTrayWidth = board.gridSize * cellSize + TRAY_FRAME_WIDTH;
  // Flank the board only when the whole row fits inside the content width —
  // on phones the side columns would clip off-screen, so they stack below.
  const flankControls =
    boardTrayWidth + 2 * (SIDE_CONTROLS_WIDTH + BOARD_ROW_GAP) <= screenWidth - 32;

  const undoRestartButtons = (
    <>
      <CandyButton
        skin="grape"
        size="sm"
        disabled={isGameOver || isComplete || moves === 0}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          soundManager.play('undo');
          undo();
        }}
        style={styles.boardSideButton}
        accessibilityLabel="Undo last move"
      >
        <Text style={styles.controlIcon}>↩️</Text>
      </CandyButton>
      <CandyButton
        skin="grape"
        size="sm"
        disabled={isGameOver || isComplete}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          soundManager.play('button');
          setShowRestartConfirm(true);
        }}
        style={styles.boardSideButton}
        accessibilityLabel="Restart level"
      >
        <Text style={styles.controlIcon}>🔄</Text>
      </CandyButton>
    </>
  );

  const hintControl = (
    <HintButton
      tier={activeHint?.tier}
      disabled={isGameOver || isComplete}
      onPress={handleHintPress}
    />
  );

  return (
    <Animated.View
      style={[
        styles.root,
        {
          opacity: isFirstLevelLoad.current ? 1 : screenFadeAnim,
          transform: [{ translateY: isFirstLevelLoad.current ? 0 : screenSlideAnim }],
        },
      ]}
    >
      <CandyBackground style={[styles.container, { paddingTop: insets.top + 8 }]}>
      {!isReady ? (
        <View style={styles.loadingShimmer}>
          <Animated.Text style={[styles.loadingPaw, { opacity: shimmerAnim }]}>🐾</Animated.Text>
          <Text style={styles.loadingText}>Growing the garden...</Text>
        </View>
      ) : (
        <>
      {/* Interactive 3-Rule Spotlight Tutorial */}
      <InteractiveTutorial
        visible={showTutorial}
        onClose={handleTutorialClose}
        onPlacePuppy={(row, col) => placePuppy(row, col)}
        onMarkCell={(row, col) => markCell(row, col)}
      />

      {/* Mechanic Intro Tutorial (cats, linked, twin) */}
      <MechanicIntroTutorial
        visible={!!activeMechanicIntro}
        mechanic={activeMechanicIntro ?? 'cats'}
        onClose={() => setActiveMechanicIntro(null)}
      />

      {/* Chapter Intro Story Modal (mechanic debut chapters) */}
      <ChapterStoryModal
        visible={!!activeChapterStory}
        story={activeChapterStory}
        onClose={() => setActiveChapterStory(null)}
      />

      {/* Wrong Move Toast Banner */}
      {wrongMoveToast && (
        <Animated.View style={[styles.wrongToast, { opacity: toastFadeAnim }]}>
          <Text style={styles.wrongToastIcon}>🐶</Text>
          <View>
            <Text style={styles.wrongToastTitle}>{wrongMoveToast.title}</Text>
            <Text style={styles.wrongToastSub}>{wrongMoveToast.sub}</Text>
          </View>
        </Animated.View>
      )}

      {/* Combo Counter Toast */}
      {comboToast && (
        <View style={styles.comboToast}>
          <Text style={styles.comboToastText}>{comboToast}</Text>
        </View>
      )}

      {/* Game Over / Out of Hearts Modal */}
      {isGameOver && (
        <View style={styles.modalOverlay}>
          <CandyPanel style={styles.gameOverModal} contentStyle={styles.gameOverModalFace}>
            <Text style={styles.modalBigEmoji}>🐶</Text>
            <Text style={styles.gameOverTitle}>Oops! The puppy got away.</Text>
            <Text style={styles.gameOverSub}>
              You ran out of chances. Try the puzzle again!
            </Text>

            <View style={styles.modalButtonGroup}>
              <CandyButton
                block
                size="lg"
                skin="red"
                label="Try Again"
                icon={<Text style={styles.controlIcon}>🔄</Text>}
                onPress={handleRestart}
              />
              <CandyButton
                block
                skin="neutral"
                label="Keep Looking"
                icon={<Text style={styles.controlIcon}>🔍</Text>}
                onPress={keepLooking}
              />
            </View>
          </CandyPanel>
        </View>
      )}

      {/* Restart Confirmation Popup */}
      {showRestartConfirm && !isGameOver && (
        <View style={styles.modalOverlay}>
          <CandyPanel style={styles.gameOverModal} contentStyle={styles.gameOverModalFace}>
            <Text style={styles.modalBigEmoji}>🔄</Text>
            <Text style={styles.gameOverTitle}>Restart this garden?</Text>
            <Text style={styles.gameOverSub}>
              Your current puppies will go back to bed — you'll start fresh.
            </Text>
            <View style={styles.modalButtonGroup}>
              <CandyButton
                block
                size="lg"
                skin="red"
                label="Restart"
                icon={<Text style={styles.controlIcon}>🔄</Text>}
                onPress={handleRestart}
              />
              <CandyButton
                block
                skin="neutral"
                label="Keep Playing"
                onPress={() => setShowRestartConfirm(false)}
              />
            </View>
          </CandyPanel>
        </View>
      )}

      {/* Confetti Celebration */}
      <Confetti visible={showCompletionModal} />

      {/* Puzzle Completion Modal with Jenny Cheering */}
      {showCompletionModal && (
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.completionModal,
              { transform: [{ scale: completionScaleAnim }] },
            ]}
          >
            {/* Jenny Cheering Avatar & Lore Speech */}
            <View style={styles.completionJennyRow}>
              <JennyAvatar size={64} mood="cheering" />
              <View style={styles.completionJennySpeech}>
                <Text style={styles.completionJennyName}>Jenny says:</Text>
                <Text style={styles.completionJennyQuote}>
                  {isDailyChallenge && dailyResult
                    ? `"Splendid! You extended your daily streak to ${dailyResult.streak} days! 🔥"`
                    : `"${JENNY_CHEERS[(currentLevel - 1) % JENNY_CHEERS.length]}"`}
                </Text>
              </View>
            </View>

            {/* Celebration puppy hero — swap this require() for the custom art */}
            <Image
              source={JENNY_PUPPY_IMAGE}
              style={styles.completionPuppyImage}
              resizeMode="contain"
            />

            {/* Paw-fect 3-Star Rating Display (supports half-stars from hints) */}
            <View style={styles.pawfectContainer}>
              <View style={styles.starBadgeRow}>
                <Text style={[styles.starBadgeIcon, pawfectResult.stars >= 1 ? styles.starLit : styles.starDim]}>⭐</Text>
                <Text style={[styles.starBadgeIcon, pawfectResult.stars >= 2 ? styles.starLit : pawfectResult.stars >= 1.5 ? styles.starHalf : styles.starDim]}>⭐</Text>
                <Text style={[styles.starBadgeIcon, pawfectResult.stars >= 3 ? styles.starLit : pawfectResult.stars >= 2.5 ? styles.starHalf : styles.starDim]}>⭐</Text>
              </View>
              <Text style={styles.pawfectTitle}>{pawfectResult.label}</Text>
              <Text style={styles.pawfectSub}>{pawfectResult.subtext}</Text>
            </View>

            {isDailyChallenge && dailyResult && (
              <View style={styles.dailyStreakCelebration}>
                <Text style={styles.dailyStreakCelebrationText}>
                  🔥 Streak: {dailyResult.streak} {dailyResult.streak === 1 ? 'Day' : 'Days'}
                </Text>
                {dailyResult.reward && (
                  <Text style={styles.dailyRewardCelebrationText}>
                    🎁 Unlocked: {dailyResult.reward}
                  </Text>
                )}
              </View>
            )}

            {shareToast && (
              <View style={styles.shareToastBadge}>
                <Text style={styles.shareToastBadgeText}>📋 Result Copied to Clipboard! 🐾</Text>
              </View>
            )}

            <View style={styles.modalButtonGroup}>
              {isDailyChallenge && (
                <CandyButton
                  block
                  skin="orange"
                  label="Share Walk Result"
                  icon={<Text style={styles.controlIcon}>📤</Text>}
                  onPress={handleShareDaily}
                />
              )}

              {isDailyChallenge ? (
                <CandyButton
                  block
                  size="lg"
                  skin="green"
                  label="Return to Meadow"
                  icon={<Text style={styles.controlIcon}>🏡</Text>}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    soundManager.play('button');
                    setShowCompletionModal(false);
                    setActiveScreen('home');
                  }}
                />
              ) : (
                <CandyButton
                  block
                  size="lg"
                  skin="green"
                  label={currentLevel >= 1000 ? 'Play Again' : 'Next Level'}
                  icon={<Text style={styles.controlIcon}>{currentLevel >= 1000 ? '🔄' : '➡️'}</Text>}
                  onPress={handleNextLevel}
                />
              )}
              <CandyButton
                block
                skin="blue"
                label="World Map"
                icon={<Text style={styles.controlIcon}>🗺️</Text>}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  soundManager.play('button');
                  setShowCompletionModal(false);
                  setActiveScreen('map');
                }}
              />
              <CandyButton
                block
                skin="neutral"
                label="Replay Level"
                onPress={handleRestart}
              />
            </View>
          </Animated.View>
        </View>
      )}

      {/* Settings Modal */}
      <SettingsModal
        visible={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        onRestart={() => {
          setShowSettingsModal(false);
          handleRestart();
        }}
        onOpenTutorial={() => {
          setShowSettingsModal(false);
          setShowTutorial(true);
        }}
      />

      {/* Upper utility bar — nav buttons pinned to the top edge */}
      <View style={styles.topNavBar}>
        <View style={styles.topNavSide}>
          <CandyButton
            skin="grape"
            size="sm"
            label={isDailyChallenge ? 'Home' : 'Map'}
            icon={<Text style={styles.navIcon}>⬅️</Text>}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              soundManager.play('button');
              setActiveScreen(isDailyChallenge ? 'home' : 'map');
            }}
          />
        </View>

        <View style={[styles.topNavSide, styles.topNavSideRight]}>
          <View style={styles.rightNavActions}>
            <CandyButton
              skin="grape"
              size="sm"
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                soundManager.play('button');
                setShowTutorial(true);
              }}
              style={styles.navSquareButton}
            >
              <Text style={styles.navIcon}>❓</Text>
            </CandyButton>
            <CandyButton
              skin="grape"
              size="sm"
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setShowSettingsModal(true);
              }}
              style={styles.navSquareButton}
            >
              <Text style={styles.navIcon}>⚙️</Text>
            </CandyButton>
          </View>
        </View>
      </View>

      {/* Level header on its own centered row under the utility bar */}
      <CandyPanel
        radius={CANDY_METRICS.radiusCard}
        style={styles.levelHeaderPanel}
        contentStyle={styles.centerLevelGroup}
      >
        <View style={styles.centerLevelInfo}>
          <Text style={styles.navTitle}>
            {isDailyChallenge ? 'Daily Walk' : `Level ${currentLevel}`}
          </Text>
          <View
            style={[
              styles.difficultyBadgeHeader,
              {
                backgroundColor: isDailyChallenge
                  ? '#E65100'
                  : getDifficultyColor(getLevelDifficulty(currentLevel)),
              },
            ]}
          >
            <Text style={styles.difficultyBadgeHeaderText}>
              {isDailyChallenge ? '🔥 Daily' : getDifficultyLabel(getLevelDifficulty(currentLevel))}
            </Text>
          </View>
          {(mechanics.puppiesPerUnit > 1 || mechanics.catCount > 0 || mechanics.linkedCount > 0) && (
            <Text style={styles.twistText}>
              {mechanics.puppiesPerUnit > 1 &&
                `👯 ${mechanics.puppiesPerUnit} pups per row, column & patch!  `}
              {mechanics.catCount > 0 && '😾 Cats need space!  '}
              {mechanics.linkedCount > 0 && '🔗 Linked beds share 1 pup!'}
            </Text>
          )}
        </View>
      </CandyPanel>

      {/* Stats, board and controls stay vertically centered in the leftover space */}
      <View style={styles.gameColumn}>

      {/* Sub-Header Stats Bar */}
      <View style={styles.subStatsBar}>
        {gameMode === 'zen' ? (
          <CandyPanel variant="well" radius={CANDY_METRICS.radiusChip} contentStyle={styles.subStatItem}>
            <Text style={styles.subStatIcon}>🧘</Text>
            <Text style={styles.subStatText}>
              Zen {mistakes > 0 ? `(${mistakes} err)` : ''}
            </Text>
          </CandyPanel>
        ) : (
          <Animated.View style={{ transform: [{ scale: heartScaleAnim }] }}>
            <CandyPanel variant="well" radius={CANDY_METRICS.radiusChip} contentStyle={styles.subStatItem}>
              <Text style={styles.heart}>❤️</Text>
              <Text style={styles.subStatText}>{hearts} / 3</Text>
              {gameMode === 'normal' && mistakes < 3 && (
                <Text style={styles.subStatHint}>
                  {3 - mistakes} oops left
                </Text>
              )}
            </CandyPanel>
          </Animated.View>
        )}

        <CandyPanel variant="well" radius={CANDY_METRICS.radiusChip} contentStyle={styles.subStatItem}>
          <Text style={styles.subStatIcon}>🎯</Text>
          <Text style={styles.subStatText}>Moves: {moves}</Text>
        </CandyPanel>

        {hintsUsed > 0 && (
          <CandyPanel variant="well" radius={CANDY_METRICS.radiusChip} contentStyle={styles.subStatItem}>
            <Text style={styles.subStatIcon}>💡</Text>
            <Text style={styles.subStatText}>{hintsUsed}</Text>
          </CandyPanel>
        )}

        {mechanics.puppiesPerUnit > 1 && (
          <CandyPanel variant="well" radius={CANDY_METRICS.radiusChip} contentStyle={styles.subStatItem}>
            <Text style={styles.subStatIcon}>🐾</Text>
            <Text style={styles.subStatText}>×{mechanics.puppiesPerUnit}</Text>
          </CandyPanel>
        )}
      </View>

      {/* The Board flanked by Undo + Restart on the left, Hint on the right —
          on narrow screens the controls stack in a row under the board */}
      <View style={styles.boardRow}>
        {flankControls && (
          <View style={styles.boardSideControls}>{undoRestartButtons}</View>
        )}

        <View style={styles.boardContainer}>
          <Board
            board={board}
            onCellPress={handleCellPress}
            onMarkCell={handleMarkCell}
            cellSize={cellSize}
            wrongCell={lastWrongCell}
            hintCell={activeHint?.tier === 2 ? activeHint.cell : null}
            isCompleting={isComplete}
            showCatAura={showCatAura}
            linkedPulseRegionId={linkedPulseRegionId}
            quota={mechanics.puppiesPerUnit}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        </View>

        {flankControls && (
          <View style={styles.boardSideControls}>{hintControl}</View>
        )}
      </View>

      {!flankControls && (
        <View style={[styles.boardControlsRow, { width: Math.max(boardTrayWidth, 250) }]}>
          <View style={styles.boardControlsRowGroup}>{undoRestartButtons}</View>
          {hintControl}
        </View>
      )}

      {/* Jenny's hint speech bubble */}
      {hintBubble && (
        <View style={styles.hintBubble}>
          <JennyAvatar size={36} mood="friendly" />
          <View style={styles.hintBubbleText}>
            <Text style={styles.hintBubbleName}>Jenny says:</Text>
            <Text style={styles.hintBubbleQuote}>{hintBubble}</Text>
          </View>
        </View>
      )}

      {/* Input Mode Switcher Pill */}
      <CandyPanel
        variant="well"
        radius={CANDY_METRICS.radiusPill}
        contentStyle={styles.modeSwitcherContainer}
        style={styles.modeSwitcherWrap}
      >
        <TouchableOpacity
          style={[
            styles.modePillButton,
            inputMode === 'puppy' && styles.activePuppyPill,
          ]}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setInputMode('puppy');
            setLastTap(null);
          }}
          activeOpacity={0.8}
        >
          <View style={styles.modePillContent}>
            <PuppySprite size={22} breed="corgi" />
            <Text style={[styles.modePillText, inputMode === 'puppy' && styles.activeModePillText]}>
              Puppy
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.modePillButton,
            inputMode === 'mark' && styles.activeMarkPill,
          ]}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setInputMode('mark');
            setLastTap(null);
          }}
          activeOpacity={0.8}
        >
          <View style={styles.modePillContent}>
            <Image source={PAW_IMAGE} style={styles.modePillPaw} resizeMode="contain" />
            <Text style={[styles.modePillText, inputMode === 'mark' && styles.activeModePillText]}>
              Paw Mark
            </Text>
          </View>
        </TouchableOpacity>
      </CandyPanel>

      </View>

      {/* Puppy Milestone Adoption Certificate Modal */}
      <AdoptionModal
        visible={!!activeMilestone}
        milestone={activeMilestone}
        onClose={() => setActiveMilestone(null)}
      />
        </>
      )}
      </CandyBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  loadingShimmer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingPaw: {
    fontSize: 48,
  },
  loadingText: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  gameColumn: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelHeaderPanel: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  heart: {
    fontSize: 18,
  },
  boardContainer: {
    marginBottom: 18,
  },
  boardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 10,
  },
  boardSideControls: {
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
    width: SIDE_CONTROLS_WIDTH,
  },
  boardControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: 12,
  },
  boardControlsRowGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  boardSideButton: {
    minHeight: 44,
    minWidth: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subStatHint: {
    fontSize: 10,
    fontWeight: '700',
    color: CANDY_TEXT.onDarkSoft,
    marginLeft: 4,
  },
  hintBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(33, 18, 66, 0.92)',
    borderColor: CANDY_GOLD.base,
    borderWidth: 1.5,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginHorizontal: 16,
    marginBottom: 8,
    gap: 10,
    shadowColor: '#150A2E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  hintBubbleText: {
    flex: 1,
  },
  hintBubbleName: {
    fontSize: 11,
    fontWeight: '900',
    color: CANDY_GOLD.light,
    marginBottom: 2,
  },
  hintBubbleQuote: {
    fontSize: 13,
    fontWeight: '600',
    color: CANDY_TEXT.onDark,
    lineHeight: 17,
  },

  /* Modal button icons */
  controlIcon: {
    fontSize: 16,
  },

  /* Floating Wrong Toast */
  wrongToast: {
    position: 'absolute',
    top: 50,
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5B1F3A',
    borderColor: '#FF7A8A',
    borderWidth: 2,
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: 16,
    gap: 12,
    shadowColor: '#120726',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },
  wrongToastIcon: {
    fontSize: 24,
  },
  comboToast: {
    position: 'absolute',
    top: 90,
    zIndex: 998,
    backgroundColor: '#1E8F7E',
    borderColor: '#7FE9D8',
    borderWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 14,
    shadowColor: '#120726',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  comboToastText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#FFFFFF',
    textShadowColor: '#0F6B2B',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 0,
  },
  wrongToastTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#FFD5DA',
  },
  wrongToastSub: {
    fontSize: 13,
    fontWeight: '600',
    color: '#E9BFC8',
  },

  /* Modals */
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(14, 6, 32, 0.78)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: 20,
  },
  modalBigEmoji: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 8,
  },
  modalButtonGroup: {
    width: '100%',
    gap: 10,
    marginTop: 16,
  },

  /* Paw-fect Star System & Daily Share */
  pawfectContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(20, 10, 44, 0.45)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: CANDY_GOLD.dark,
    width: '100%',
  },
  starBadgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
  },
  starBadgeIcon: {
    fontSize: 28,
  },
  starLit: {
    opacity: 1,
    textShadowColor: CANDY_GOLD.base,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  starDim: {
    opacity: 0.22,
  },
  starHalf: {
    opacity: 0.55,
    textShadowColor: CANDY_GOLD.base,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  pawfectTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: CANDY_GOLD.light,
    marginBottom: 2,
    textShadowColor: CANDY_TEXT.shadow,
    textShadowOffset: { width: 0, height: 1.5 },
    textShadowRadius: 0,
  },
  pawfectSub: {
    fontSize: 12,
    fontWeight: '600',
    color: CANDY_TEXT.onDarkSoft,
    textAlign: 'center',
  },
  shareToastBadge: {
    backgroundColor: '#1E8F7E',
    borderWidth: 1.5,
    borderColor: '#7FE9D8',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignSelf: 'center',
    marginBottom: 10,
  },
  shareToastBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '800',
  },

  /* Game Over Modal */
  gameOverModal: {
    width: '88%',
    maxWidth: 380,
  },
  gameOverModalFace: {
    padding: 24,
    alignItems: 'center',
    borderColor: '#FF7A8A',
  },
  gameOverTitle: {
    fontSize: 21,
    fontWeight: '900',
    color: '#FFD5DA',
    textAlign: 'center',
    marginBottom: 6,
    textShadowColor: CANDY_TEXT.shadow,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 0,
  },
  gameOverSub: {
    fontSize: 15,
    fontWeight: '600',
    color: CANDY_TEXT.onDarkSoft,
    textAlign: 'center',
    marginBottom: 8,
  },

  /* Completion Modal */
  completionModal: {
    backgroundColor: CANDY_SURFACE.top,
    padding: 24,
    borderRadius: 24,
    width: '90%',
    maxWidth: 380,
    alignItems: 'center',
    borderWidth: 2.5,
    borderColor: CANDY_GOLD.base,
    shadowColor: '#0E0620',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.55,
    shadowRadius: 22,
    elevation: 14,
  },
  completionJennyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(20, 10, 44, 0.4)',
    padding: 12,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: CANDY_SURFACE.border,
    marginBottom: 14,
    width: '100%',
  },
  completionJennySpeech: {
    flex: 1,
  },
  completionJennyName: {
    fontSize: 12,
    fontWeight: '900',
    color: CANDY_GOLD.base,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  completionJennyQuote: {
    fontSize: 13,
    fontWeight: '600',
    color: CANDY_TEXT.onDark,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  completionPuppyImage: {
    width: 150,
    height: 150,
    marginBottom: 12,
  },

  /* Input Mode Switcher */
  modeSwitcherWrap: {
    marginTop: 14,
    marginBottom: 10,
  },
  modeSwitcherContainer: {
    flexDirection: 'row',
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modePillButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 130,
  },
  modePillContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modePillPaw: {
    width: 18,
    height: 18,
  },
  activePuppyPill: {
    backgroundColor: '#FF8AB0',
    borderWidth: 1.5,
    borderColor: '#C43D70',
    shadowColor: '#C43D70',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 4,
  },
  activeMarkPill: {
    backgroundColor: '#5FC8F5',
    borderWidth: 1.5,
    borderColor: '#1A6BAD',
    shadowColor: '#1A6BAD',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 4,
  },
  modePillText: {
    fontSize: 15,
    fontWeight: '700',
    color: CANDY_TEXT.onDarkMuted,
  },
  activeModePillText: {
    color: '#FFFFFF',
    fontWeight: '900',
    textShadowColor: CANDY_TEXT.shadow,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 0,
  },

  /* Header & Navigation Bar */
  topNavBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 2,
    marginBottom: 10,
    paddingTop: 2,
  },
  topNavSide: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topNavSideRight: {
    justifyContent: 'flex-end',
  },
  centerLevelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  rightNavActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginLeft: 'auto',
  },
  navSquareButton: {
    minWidth: 40,
  },
  navIcon: {
    fontSize: 15,
  },
  centerLevelInfo: {
    alignItems: 'center',
    gap: 3,
  },
  twistText: {
    fontSize: 11,
    fontWeight: '800',
    color: CANDY_GOLD.light,
    textAlign: 'center',
    marginTop: 2,
  },
  navTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: CANDY_TEXT.onDark,
    letterSpacing: 0.3,
    textShadowColor: CANDY_TEXT.shadow,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 0,
  },
  difficultyBadgeHeader: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
  difficultyBadgeHeaderText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  subStatsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 12,
  },
  subStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 5,
    paddingHorizontal: 14,
  },
  subStatIcon: {
    fontSize: 16,
  },
  subStatText: {
    fontSize: 14,
    fontWeight: '800',
    color: CANDY_TEXT.onDark,
  },


  /* Daily Streak Celebration */
  dailyStreakCelebration: {
    backgroundColor: 'rgba(20, 10, 44, 0.45)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: CANDY_GOLD.dark,
    marginVertical: 10,
    alignItems: 'center',
    width: '100%',
  },
  dailyStreakCelebrationText: {
    fontSize: 16,
    fontWeight: '900',
    color: CANDY_GOLD.light,
  },
  dailyRewardCelebrationText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#8CFFA8',
    marginTop: 4,
  },
});
