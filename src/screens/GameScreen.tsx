import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Share,
  Platform,
} from 'react-native';
import { useGameStore } from '../store/gameStore';
import { Board } from '../components/Board';
import { Confetti } from '../components/Confetti';
import { SettingsModal } from '../components/SettingsModal';
import { PuppySprite } from '../components/assets/PuppySprite';
import { ChalkMarkSprite } from '../components/assets/ChalkMarkSprite';
import * as Haptics from 'expo-haptics';
import {
  getTutorialSeen,
  setTutorialSeen,
  PuppyMilestone,
  PUPPY_MILESTONES,
  loadClaimedAdoptions,
  saveClaimedAdoptions,
} from '../utils/storage';
import { Hint } from '../game/types';
import { soundManager } from '../utils/soundManager';
import { recordLevelCompletion, getLevelStats, calculatePawfectStars } from '../utils/statistics';
import { getLevelDifficulty, getDifficultyColor, getDifficultyLabel } from '../utils/levelHelpers';
import { JennyAvatar, JennyMood } from '../components/assets/JennyAvatar';
import { InteractiveTutorial } from '../components/InteractiveTutorial';
import { JENNY_CHEERS } from '../data/storyLore';
export { JENNY_CHEERS };
import {
  recordDailyCompletion,
  getFormattedTodayDisplay,
  generateDailyShareText,
} from '../utils/dailyChallenge';
import { AdoptionModal } from '../components/AdoptionModal';


export const GameScreen: React.FC = () => {
  const {
    board,
    hearts,
    moves,
    isComplete,
    currentLevel,
    unlockedLevels,
    initializeLevel,
    setActiveScreen,
    placePuppy,
    markCell,
    undo,
    restart,
    keepLooking,
    getHint,
    highlightedHint,
    setHighlightedHint,
    lastWrongCell,
    setLastWrongCell,
    hintsUsed,
    mistakes,
    isGameOver,
    gameMode,
    setGameMode,
    isDailyChallenge,
  } = useGameStore();

  const [cellSize, setCellSize] = useState(60);
  const [showTutorial, setShowTutorial] = useState(false);
  const [lastTap, setLastTap] = useState<{ row: number; col: number; time: number } | null>(null);
  const [lastPlacedPuppy, setLastPlacedPuppy] = useState<{ row: number; col: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [inputMode, setInputMode] = useState<'puppy' | 'mark'>('puppy');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showLevelSelectModal, setShowLevelSelectModal] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(soundManager.isEnabled());
  const [selectedChapter, setSelectedChapter] = useState(0);
  const [dailyResult, setDailyResult] = useState<{
    streak: number;
    isNewRecord: boolean;
    reward: string | null;
  } | null>(null);

  const CHAPTERS = [
    { title: 'Backyard', subtitle: '4×4 – 5×5', start: 1, end: 20 },
    { title: 'Park', subtitle: '6×6', start: 21, end: 40 },
    { title: 'Meadow', subtitle: '7×7', start: 41, end: 60 },
    { title: 'Trail', subtitle: '8×8', start: 61, end: 80 },
    { title: 'Championship', subtitle: '9×9 – 10×10', start: 81, end: 100 },
  ];

  // Emotional Personality & Milestone States
  const [jennyMood, setJennyMood] = useState<JennyMood>('friendly');
  const [pawfectResult, setPawfectResult] = useState<{
    stars: 1 | 2 | 3;
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
  const [wrongMoveToast, setWrongMoveToast] = useState<string | null>(null);

  // Completion Modal State
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Statistics tracking
  const levelStartTime = useRef<number>(Date.now());
  const [levelBestStats, setLevelBestStats] = useState<{ bestMoves: number; bestTime: number } | null>(null);

  // Animations
  const screenFadeAnim = useRef(new Animated.Value(0)).current;
  const screenSlideAnim = useRef(new Animated.Value(12)).current;
  const heartScaleAnim = useRef(new Animated.Value(1)).current;
  const toastFadeAnim = useRef(new Animated.Value(0)).current;
  const completionScaleAnim = useRef(new Animated.Value(0.85)).current;
  const prevHearts = useRef(hearts);

  // Screen transition when level changes
  useEffect(() => {
    initializeLevel(currentLevel);
    setShowCompletionModal(false);
    setWrongMoveToast(null);
    setLastPlacedPuppy(null);
    setIsDragging(false);
    setJennyMood('friendly');
    setShareToast(false);

    // Reset level start time and load stats
    levelStartTime.current = Date.now();
    getLevelStats(currentLevel).then(stats => {
      if (stats) {
        setLevelBestStats({ bestMoves: stats.bestMoves, bestTime: stats.bestTime });
      } else {
        setLevelBestStats(null);
      }
    });

    screenFadeAnim.setValue(0);
    screenSlideAnim.setValue(12);
    Animated.parallel([
      Animated.timing(screenFadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(screenSlideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentLevel, initializeLevel, screenFadeAnim, screenSlideAnim]);

  // Adjust cell size dynamically based on grid size (4x4 up to 10x10)
  useEffect(() => {
    if (board.gridSize >= 10) {
      setCellSize(30);
    } else if (board.gridSize === 9) {
      setCellSize(33);
    } else if (board.gridSize === 8) {
      setCellSize(38);
    } else if (board.gridSize === 7) {
      setCellSize(42);
    } else if (board.gridSize === 6) {
      setCellSize(48);
    } else if (board.gridSize === 5) {
      setCellSize(56);
    } else {
      setCellSize(64);
    }
  }, [board.gridSize]);

  // Tutorial display
  useEffect(() => {
    getTutorialSeen().then(hasSeenTutorial => {
      if (currentLevel === 1 && !hasSeenTutorial) {
        setShowTutorial(true);
      }
    });
  }, [currentLevel]);

  // Heart decrease animation & sympathetic mood
  useEffect(() => {
    if (hearts < prevHearts.current) {
      setJennyMood('sympathetic');
      setTimeout(() => setJennyMood('friendly'), 2200);

      Animated.sequence([
        Animated.timing(heartScaleAnim, { toValue: 1.35, duration: 120, useNativeDriver: true }),
        Animated.timing(heartScaleAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
      ]).start();
    }
    prevHearts.current = hearts;
  }, [hearts, heartScaleAnim]);

  // Completion sequence
  useEffect(() => {
    if (isComplete) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      soundManager.play('complete');

      // Record statistics and calculate paw-fect star rating
      const completionTime = Math.floor((Date.now() - levelStartTime.current) / 1000);
      recordLevelCompletion(currentLevel, moves, completionTime, hintsUsed, hearts)
        .then(result => {
          setPawfectResult(result);
        })
        .catch(() => {});

      if (isDailyChallenge) {
        recordDailyCompletion({ moves, time: completionTime, hintsUsed })
          .then(res => setDailyResult(res))
          .catch(() => {});
      } else {
        // Check milestone adoption reward
        const milestone = PUPPY_MILESTONES.find(m => m.level === currentLevel);
        if (milestone) {
          loadClaimedAdoptions().then(claimed => {
            if (!claimed.includes(currentLevel)) {
              saveClaimedAdoptions([...claimed, currentLevel]);
              setTimeout(() => {
                setActiveMilestone(milestone);
              }, 700);
            }
          });
        }
      }

      // Small celebratory delay before showing completion popup
      const timer = setTimeout(() => {
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
      return () => clearTimeout(timer);
    }
  }, [isComplete, completionScaleAnim, currentLevel, moves, hintsUsed, hearts, isDailyChallenge]);

  const handleShareDaily = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    soundManager.play('button');
    const completionTime = Math.floor((Date.now() - levelStartTime.current) / 1000);
    const shareText = generateDailyShareText({
      streak: dailyResult?.streak || 1,
      moves,
      timeSeconds: completionTime,
      heartsLeft: hearts,
      hintsUsed,
      gridSize: board.gridSize,
    });

    try {
      if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
        setShareToast(true);
        setTimeout(() => setShareToast(false), 2400);
      } else {
        await Share.share({
          message: shareText,
          title: "Jenny's Garden Daily Walk",
        });
      }
    } catch {
      // Ignore share sheet cancel
    }
  };

  const showWrongFeedback = (row: number, col: number) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    soundManager.play('wrong');
    setWrongMoveToast("Not quite! That puppy can't go there.");
    setJennyMood('sympathetic');
    setTimeout(() => setJennyMood('friendly'), 2200);

    toastFadeAnim.setValue(0);
    Animated.timing(toastFadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();

    // Auto-dismiss toast
    setTimeout(() => {
      Animated.timing(toastFadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setWrongMoveToast(null);
      });
    }, 1800);

    // Clear wrong cell shaking state
    setTimeout(() => {
      setLastWrongCell(null);
    }, 1000);
  };


  const DOUBLE_TAP_MAX_DELAY = 400; // ms – expanded to comfortably capture natural double-taps (320-380ms)

  const handleCellPress = (row: number, col: number) => {
    if (isGameOver || isComplete || isDragging) return;

    const now = Date.now();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    console.log('[Tap] cell', row, col, 'time', now, 'lastTap', lastTap, 'mode', inputMode);

    // Double‑tap detection: same cell within the allowed window (acts as shortcut to place/toggle puppy)
    if (lastTap && lastTap.row === row && lastTap.col === col && now - lastTap.time < DOUBLE_TAP_MAX_DELAY) {
      console.log('[DoubleTap] detected on same cell');
      console.log('[DoubleTap] interval', now - lastTap.time, 'ms');
      
      // Undo the X that was placed on first tap if it was marked
      if (board.cells[row]?.[col]?.value === 'marked') {
        undo();
      }
      
      const success = placePuppy(row, col);
      console.log('[DoubleTap] placePuppy result', success);
      if (!success) {
        showWrongFeedback(row, col);
      } else {
        soundManager.play('placePuppy');
        setLastPlacedPuppy({ row, col });
      }
      setLastTap(null);
      return; // Double‑tap handled, exit early
    }

    if (inputMode === 'puppy') {
      // Puppy Mode: Single tap places or toggles off puppy
      console.log('[SingleTap - PuppyMode] placing/toggling puppy');
      const success = placePuppy(row, col);
      if (!success) {
        showWrongFeedback(row, col);
      } else {
        soundManager.play('placePuppy');
        setLastPlacedPuppy({ row, col });
      }
      setLastTap({ row, col, time: now });
    } else {
      // Mark Mode: Single tap places/clears ✕
      console.log('[SingleTap - MarkMode] marking cell');
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

  const handleUndo = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    soundManager.play('undo');
    undo();
    setLastPlacedPuppy(null);
    setIsDragging(false);
  };

  const handleRestart = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    soundManager.play('button');
    restart();
    setShowCompletionModal(false);
    setWrongMoveToast(null);
    setLastPlacedPuppy(null);
    setIsDragging(false);
  };

  const handleTutorialClose = () => {
    setShowTutorial(false);
    setTutorialSeen(true);
  };

  const handleLevelSelect = (level: number) => {
    if (level <= unlockedLevels) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setLastPlacedPuppy(null);
      setIsDragging(false);
      initializeLevel(level);
      setShowLevelSelectModal(false);
      setShowSettingsModal(false);
    }
  };

  const handleNextLevel = () => {
    setShowCompletionModal(false);
    setLastPlacedPuppy(null);
    setIsDragging(false);
    if (currentLevel < 100) {
      initializeLevel(currentLevel + 1);
    } else {
      initializeLevel(1);
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: screenFadeAnim,
          transform: [{ translateY: screenSlideAnim }],
        },
      ]}
    >
      {/* Interactive 3-Rule Spotlight Tutorial */}
      <InteractiveTutorial
        visible={showTutorial}
        onClose={handleTutorialClose}
        onPlacePuppy={(row, col) => placePuppy(row, col)}
        onMarkCell={(row, col) => markCell(row, col)}
      />

      {/* Wrong Move Toast Banner */}
      {wrongMoveToast && (
        <Animated.View style={[styles.wrongToast, { opacity: toastFadeAnim }]}>
          <Text style={styles.wrongToastIcon}>🐶</Text>
          <View>
            <Text style={styles.wrongToastTitle}>Not quite!</Text>
            <Text style={styles.wrongToastSub}>That puppy can't go there.</Text>
          </View>
        </Animated.View>
      )}

      {/* Game Over / Out of Hearts Modal */}
      {isGameOver && (
        <View style={styles.modalOverlay}>
          <Confetti visible={isGameOver} />
          <View style={styles.gameOverModal}>
            <Text style={styles.modalBigEmoji}>🐶</Text>
            <Text style={styles.gameOverTitle}>Oops! The puppy got away.</Text>
            <Text style={styles.gameOverSub}>
              You ran out of chances. Try the puzzle again!
            </Text>

            <View style={styles.modalButtonGroup}>
              <TouchableOpacity style={styles.gameOverRestartButton} onPress={handleRestart}>
                <Text style={styles.primaryButtonText}>🔄 Try Again</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gameOverKeepButton} onPress={keepLooking}>
                <Text style={styles.secondaryButtonText}>🔍 Keep Looking</Text>
              </TouchableOpacity>
            </View>
          </View>
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

            <Text style={styles.completionTitle}>All puppies found! 🎉</Text>
            <Text style={styles.completionSubtitle}>
              {isDailyChallenge
                ? `Daily Garden • ${getFormattedTodayDisplay()}`
                : `Level ${currentLevel} Complete`}
            </Text>

            {/* Paw-fect 3-Star Rating Display */}
            <View style={styles.pawfectContainer}>
              <View style={styles.starBadgeRow}>
                <Text style={[styles.starBadgeIcon, pawfectResult.stars >= 1 ? styles.starLit : styles.starDim]}>⭐</Text>
                <Text style={[styles.starBadgeIcon, pawfectResult.stars >= 2 ? styles.starLit : styles.starDim]}>⭐</Text>
                <Text style={[styles.starBadgeIcon, pawfectResult.stars >= 3 ? styles.starLit : styles.starDim]}>⭐</Text>
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

            <View style={styles.statsCard}>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>🎯 Moves</Text>
                <Text style={styles.statValue}>{moves}</Text>
                {levelBestStats && moves >= levelBestStats.bestMoves && (
                  <Text style={styles.statBadge}>⭐</Text>
                )}
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>❤️ Hearts Left</Text>
                <Text style={styles.statValue}>{hearts} / 3</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>💡 Hints Used</Text>
                <Text style={styles.statValue}>{hintsUsed}</Text>
              </View>
              {levelBestStats && (
                <View style={styles.bestStatsRow}>
                  <Text style={styles.bestStatsLabel}>Best: {levelBestStats.bestMoves} moves • {Math.floor(levelBestStats.bestTime / 60)}:{(levelBestStats.bestTime % 60).toString().padStart(2, '0')}</Text>
                </View>
              )}
            </View>

            {shareToast && (
              <View style={styles.shareToastBadge}>
                <Text style={styles.shareToastBadgeText}>📋 Result Copied to Clipboard! 🐾</Text>
              </View>
            )}

            <View style={styles.modalButtonGroup}>
              {isDailyChallenge && (
                <TouchableOpacity
                  style={styles.shareDailyButton}
                  onPress={handleShareDaily}
                  activeOpacity={0.8}
                >
                  <Text style={styles.shareDailyButtonText}>Share Walk Result 📤</Text>
                </TouchableOpacity>
              )}

              {isDailyChallenge ? (
                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    soundManager.play('button');
                    setShowCompletionModal(false);
                    setActiveScreen('home');
                  }}
                >
                  <Text style={styles.primaryButtonText}>Return to Meadow 🏡</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.primaryButton} onPress={handleNextLevel}>
                  <Text style={styles.primaryButtonText}>
                    {currentLevel === 1000 ? '🔄 Play Again' : 'Next Level ➡️'}
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.mapButtonModal}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  soundManager.play('button');
                  setShowCompletionModal(false);
                  setActiveScreen('map');
                }}
              >
                <Text style={styles.mapButtonModalText}>🗺️ World Map</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton} onPress={handleRestart}>
                <Text style={styles.secondaryButtonText}>Replay Level</Text>
              </TouchableOpacity>
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

      {/* Level Select Modal */}
      {showLevelSelectModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.levelModal}>
            <View style={styles.levelModalHeader}>
              <Text style={styles.levelModalTitle}>🗺️ Choose Level</Text>
              <TouchableOpacity onPress={() => setShowLevelSelectModal(false)} style={styles.hintCloseIcon}>
                <Text style={styles.hintCloseIconText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Chapter Tabs */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chapterTabBar}>
              {CHAPTERS.map((ch, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.chapterTabButton,
                    selectedChapter === idx && styles.chapterTabButtonActive,
                  ]}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setSelectedChapter(idx);
                  }}
                >
                  <Text style={[styles.chapterTabTitle, selectedChapter === idx && styles.chapterTabTitleActive]}>
                    {ch.title}
                  </Text>
                  <Text style={[styles.chapterTabSub, selectedChapter === idx && styles.chapterTabSubActive]}>
                    {ch.subtitle}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Level Grid for current chapter */}
            <ScrollView style={styles.levelGridScroll}>
              <View style={styles.levelGrid}>
                {Array.from(
                  { length: CHAPTERS[selectedChapter].end - CHAPTERS[selectedChapter].start + 1 },
                  (_, i) => CHAPTERS[selectedChapter].start + i
                ).map(level => {
                  const isLocked = level > unlockedLevels;
                  const isCurrent = level === currentLevel;
                  const difficulty = getLevelDifficulty(level);
                  const color = getDifficultyColor(difficulty);

                  return (
                    <TouchableOpacity
                      key={level}
                      style={[
                        styles.levelGridItem,
                        isCurrent && styles.levelGridItemCurrent,
                        isLocked && styles.levelGridItemLocked,
                      ]}
                      onPress={() => handleLevelSelect(level)}
                      disabled={isLocked}
                    >
                      <Text style={[styles.levelGridItemNumber, isLocked && styles.levelGridItemLockedText]}>
                        {isLocked ? '🔒' : level}
                      </Text>
                      {!isLocked && (
                        <View style={[styles.levelItemDot, { backgroundColor: color }]} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      )}

      {/* Clean Top Navigation Bar */}
      <View style={styles.topNavBar}>
        <TouchableOpacity
          style={styles.navIconButton}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            soundManager.play('button');
            setActiveScreen(isDailyChallenge ? 'home' : 'map');
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.navButtonText}>{isDailyChallenge ? '⬅️ Home' : '⬅️ Map'}</Text>
        </TouchableOpacity>

        <View style={styles.centerLevelInfo}>
          <Text style={styles.navTitle}>
            {isDailyChallenge ? 'Daily Garden' : `Level ${currentLevel}`}
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
        </View>

        <View style={styles.rightNavActions}>
          <TouchableOpacity
            style={styles.navIconButton}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              soundManager.play('button');
              setShowTutorial(true);
            }}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.navButtonText}>❓</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navIconButton}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              soundManager.play('button');
              setActiveScreen('home');
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.navButtonText}>🏠</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navIconButton}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setShowSettingsModal(true);
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.navButtonText}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Sub-Header Stats Bar */}
      <View style={styles.subStatsBar}>
        {gameMode === 'challenge' ? (
          <Animated.View
            style={[
              styles.subStatItem,
              { transform: [{ scale: heartScaleAnim }] },
            ]}
          >
            <Text style={styles.heart}>❤️</Text>
            <Text style={styles.subStatText}>{hearts} / 3</Text>
          </Animated.View>
        ) : (
          <View style={styles.subStatItem}>
            <Text style={styles.subStatIcon}>🧘</Text>
            <Text style={styles.subStatText}>
              Zen {mistakes > 0 ? `(${mistakes} err)` : ''}
            </Text>
          </View>
        )}

        <View style={styles.subStatItem}>
          <Text style={styles.subStatIcon}>🎯</Text>
          <Text style={styles.subStatText}>Moves: {moves}</Text>
        </View>
      </View>

      {/* The Board */}
      <View style={styles.boardContainer}>
        <Board
          board={board}
          onCellPress={handleCellPress}
          onMarkCell={handleMarkCell}
          cellSize={cellSize}
          highlightedHint={highlightedHint}
          wrongCell={lastWrongCell}
          isCompleting={isComplete}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
      </View>

      {/* Input Mode Switcher Pill */}
      <View style={styles.modeSwitcherContainer}>
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
            <ChalkMarkSprite size={16} />
            <Text style={[styles.modePillText, inputMode === 'mark' && styles.activeModePillText]}>
              Chalk Mark
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={handleUndo}>
          <Text style={styles.controlButtonText}>↩️ Undo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={handleRestart}>
          <Text style={styles.controlButtonText}>🔄 Restart</Text>
        </TouchableOpacity>
      </View>

      {/* Puppy Milestone Adoption Certificate Modal */}
      <AdoptionModal
        visible={!!activeMilestone}
        milestone={activeMilestone}
        onClose={() => setActiveMilestone(null)}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EE',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  stats: {
    flexDirection: 'row',
    gap: 24,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heart: {
    fontSize: 22,
  },
  statText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  levelSelectorContainer: {
    height: 48,
    marginBottom: 16,
    width: '100%',
  },
  levelSelector: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  levelButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#333',
  },
  activeLevelButton: {
    backgroundColor: '#87CEEB',
  },
  lockedLevelButton: {
    opacity: 0.45,
  },
  levelButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  lockedLevelButtonText: {
    color: '#888',
  },
  difficultyBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 8,
    minWidth: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  difficultyBadgeText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#fff',
  },
  boardContainer: {
    marginBottom: 32,
  },
  controls: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 8,
  },
  controlButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#FFD700',
    borderWidth: 2,
    borderColor: '#333',
    minWidth: 85,
  },
  controlButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },

  /* Floating Wrong Toast */
  wrongToast: {
    position: 'absolute',
    top: 50,
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F0',
    borderColor: '#E63946',
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  wrongToastIcon: {
    fontSize: 24,
  },
  wrongToastTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#E63946',
  },
  wrongToastSub: {
    fontSize: 13,
    color: '#555',
  },

  /* Floating Hint Card */
  hintCardOverlay: {
    position: 'absolute',
    top: 55,
    zIndex: 900,
    width: '92%',
    alignItems: 'center',
  },
  hintCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 2,
    borderColor: '#FFD700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  hintCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  hintJennyHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  hintJennyTitleGroup: {
    gap: 2,
  },
  hintJennyName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#2C3E50',
  },
  hintCardBadge: {
    backgroundColor: '#FFF9D2',
    color: '#B8860B',
    fontSize: 11,
    fontWeight: 'bold',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  hintSpeechBubble: {
    backgroundColor: '#FDFCF8',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#EFE7D8',
    marginBottom: 10,
  },
  hintCloseIcon: {
    padding: 4,
  },
  hintCloseIconText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888',
  },
  hintCardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  hintCardText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 19,
    fontStyle: 'italic',
  },
  hintCardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  hintSecondaryButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    backgroundColor: '#F0F0F0',
  },
  hintSecondaryButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
  },
  hintPrimaryButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    backgroundColor: '#FFD700',
  },
  hintPrimaryButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
  },

  /* Modals */
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
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
  primaryButton: {
    backgroundColor: '#87CEEB',
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#333',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#999',
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#555',
  },
  mapButtonModal: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  mapButtonModalText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  /* Paw-fect Star System & Daily Share Styles */
  pawfectContainer: {
    alignItems: 'center',
    backgroundColor: '#FAF6EE',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: '#EFE7D8',
    width: '100%',
  },
  starBadgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
  },
  starBadgeIcon: {
    fontSize: 26,
  },
  starLit: {
    opacity: 1,
  },
  starDim: {
    opacity: 0.25,
  },
  pawfectTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2C2A29',
    marginBottom: 2,
  },
  pawfectSub: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7F7567',
    textAlign: 'center',
  },
  shareDailyButton: {
    backgroundColor: '#E65100',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#E65100',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 4,
  },
  shareDailyButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  shareToastBadge: {
    backgroundColor: '#2A9D8F',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignSelf: 'center',
    marginBottom: 10,
  },
  shareToastBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },

  /* Tutorial Modal */
  tutorialModal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    maxWidth: '85%',
    elevation: 5,
  },
  tutorialTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  tutorialText: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },

  /* Game Over Modal */
  gameOverModal: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 14,
    width: '88%',
    alignItems: 'center',
    elevation: 6,
    borderWidth: 2,
    borderColor: '#E63946',
  },
  gameOverTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E63946',
    textAlign: 'center',
    marginBottom: 6,
  },
  gameOverSub: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  gameOverRestartButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#333',
  },
  gameOverKeepButton: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#333',
  },

  /* Completion Modal */
  completionModal: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 20,
    width: '90%',
    maxWidth: 380,
    alignItems: 'center',
    elevation: 8,
    borderWidth: 2.5,
    borderColor: '#FFD700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  completionJennyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFDF9',
    padding: 12,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#FFE8A3',
    marginBottom: 14,
    width: '100%',
  },
  completionJennySpeech: {
    flex: 1,
  },
  completionJennyName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#D35400',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  completionJennyQuote: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B382A',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  completionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2B9348',
    textAlign: 'center',
  },
  completionSubtitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#555',
    marginBottom: 14,
    textAlign: 'center',
  },
  statsCard: {
    width: '100%',
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statBadge: {
    fontSize: 14,
    marginLeft: 4,
  },
  bestStatsRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  bestStatsLabel: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
  modeSwitcherContainer: {
    flexDirection: 'row',
    backgroundColor: '#E5DFD5',
    borderRadius: 25,
    padding: 4,
    marginTop: 16,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  modePillButton: {
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 135,
  },
  modePillContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  activePuppyPill: {
    backgroundColor: '#D4836A', // Terracotta Clay
    shadowColor: '#D4836A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 3,
  },
  activeMarkPill: {
    backgroundColor: '#5B7C9E', // Dusty Blue
    shadowColor: '#5B7C9E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 3,
  },
  modePillText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B655B',
  },
  activeModePillText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  // New Header & Navigation Bar
  topNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  rightNavActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navIconButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0DAD0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  centerLevelInfo: {
    alignItems: 'center',
    gap: 3,
  },
  navTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C2A29',
  },
  difficultyBadgeHeader: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
  },
  difficultyBadgeHeaderText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  subStatsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 12,
  },
  subStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  subStatIcon: {
    fontSize: 16,
  },
  subStatText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
  },
  // Settings Modal Styles
  settingsModal: {
    backgroundColor: '#FFFDF9',
    borderRadius: 20,
    padding: 22,
    width: '90%',
    maxWidth: 380,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#EFEAE1',
  },
  settingsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C2A29',
  },
  settingsSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#777',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  settingsModeGroup: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  settingsModeOption: {
    flex: 1,
    padding: 12,
    borderRadius: 14,
    backgroundColor: '#F5F0EA',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F5F0EA',
  },
  settingsModeOptionActive: {
    backgroundColor: '#FFF',
    borderColor: '#2A9D8F',
    shadowColor: '#2A9D8F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 3,
  },
  settingsModeEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  settingsModeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  settingsModeTextActive: {
    color: '#2A9D8F',
  },
  settingsModeSub: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0EBE1',
    marginBottom: 16,
  },
  settingsRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  settingsRowIcon: {
    fontSize: 20,
  },
  settingsRowLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  toggleSwitch: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#D1CCC4',
  },
  toggleSwitchActive: {
    backgroundColor: '#2A9D8F',
  },
  toggleSwitchText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
  },
  settingsActions: {
    gap: 10,
  },
  settingsRestartButton: {
    backgroundColor: '#F5F0EA',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  settingsRestartText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#555',
  },
  settingsCloseButton: {
    backgroundColor: '#2C2A29',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  settingsCloseText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFF',
  },
  // Level Select Modal Styles
  levelModal: {
    backgroundColor: '#FFFDF9',
    borderRadius: 20,
    padding: 18,
    width: '94%',
    maxWidth: 440,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  levelModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  levelModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C2A29',
  },
  chapterTabBar: {
    maxHeight: 52,
    marginBottom: 12,
  },
  chapterTabButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#F3EDE4',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chapterTabButtonActive: {
    backgroundColor: '#2A9D8F',
  },
  chapterTabTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#666',
  },
  chapterTabTitleActive: {
    color: '#FFF',
  },
  chapterTabSub: {
    fontSize: 10,
    color: '#888',
  },
  chapterTabSubActive: {
    color: '#E0F2F1',
  },
  levelGridScroll: {
    maxHeight: 320,
  },
  levelGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'flex-start',
    paddingVertical: 4,
  },
  levelGridItem: {
    width: '18%',
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2DBD0',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  levelGridItemCurrent: {
    borderColor: '#2A9D8F',
    borderWidth: 2.5,
    backgroundColor: '#F0FAF8',
  },
  levelGridItemLocked: {
    backgroundColor: '#EAE5DC',
    borderColor: '#DDD7CE',
  },
  levelGridItemNumber: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  levelGridItemLockedText: {
    fontSize: 13,
    color: '#999',
  },
  levelItemDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    position: 'absolute',
    bottom: 4,
  },
  dailyStreakCelebration: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#FFE0B2',
    marginVertical: 10,
    alignItems: 'center',
    width: '100%',
  },
  dailyStreakCelebrationText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#E65100',
  },
  dailyRewardCelebrationText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2E7D32',
    marginTop: 4,
  },
});
