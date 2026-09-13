import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useGameStore } from '../store/gameStore';
import { SettingsModal } from '../components/SettingsModal';
import { PuppySprite } from '../components/assets/PuppySprite';
import { getTotalStats, GameStats } from '../utils/statistics';
import { getChapterForLevel } from '../data/chapterData';
import { soundManager } from '../utils/soundManager';
import { JennyAvatar } from '../components/assets/JennyAvatar';
import { StoryComicModal } from '../components/StoryComicModal';
import { getStorySeen } from '../utils/storage';
import {
  getDailyChallengeState,
  getTimeUntilNextPuzzle,
  getFormattedTodayDisplay,
  DailyChallengeState,
} from '../utils/dailyChallenge';
import { CandyBackground } from '../components/candy/CandyBackground';
import { CandyButton } from '../components/candy/CandyButton';
import { CandyPanel } from '../components/candy/CandyPanel';
import {
  APP_NAME,
  APP_TAGLINE,
  CANDY_GOLD,
  CANDY_SURFACE,
  CANDY_TEXT,
  CANDY_METRICS,
} from '../utils/theme';

export const HomeScreen: React.FC = () => {
  const { currentLevel, unlockedLevels, startLevel, startDailyChallenge, setActiveScreen } = useGameStore();
  const [showSettings, setShowSettings] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [storyChecked, setStoryChecked] = useState(false);
  const [stats, setStats] = useState<GameStats | null>(null);
  const [dailyState, setDailyState] = useState<DailyChallengeState | null>(null);
  const [countdown, setCountdown] = useState<string>('');

  // Animations
  const floatAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const storyRef = useRef({ pending: true, shouldShow: false });
  const floatLoopRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    let cancelled = false;

    // Atomic story-seen check — never show the HomeScreen until we know,
    // so the story modal and Home UI appear together on first paint (no pop-in flash)
    getStorySeen()
      .then(seen => {
        if (cancelled) return;
        const shouldShow = !seen;
        storyRef.current = { pending: false, shouldShow };
        // Set both states atomically together — no intermediate render without story
        if (shouldShow) setShowStory(true);
        setStoryChecked(true);

        // Only start entrance animations AFTER we know the story state
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 8,
            tension: 50,
            useNativeDriver: true,
          }),
        ]).start();

        // Start puppy float loop
        const floatLoop = Animated.loop(
          Animated.sequence([
            Animated.timing(floatAnim, {
              toValue: -8,
              duration: 1600,
              useNativeDriver: true,
            }),
            Animated.timing(floatAnim, {
              toValue: 0,
              duration: 1600,
              useNativeDriver: true,
            }),
          ])
        );
        floatLoopRef.current = floatLoop;
        floatLoop.start();
      })
      .catch(() => {
        if (cancelled) return;
        storyRef.current = { pending: false, shouldShow: false };
        setStoryChecked(true);

        // Still animate in even on error path
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 8,
            tension: 50,
            useNativeDriver: true,
          }),
        ]).start();

        const floatLoop = Animated.loop(
          Animated.sequence([
            Animated.timing(floatAnim, {
              toValue: -8,
              duration: 1600,
              useNativeDriver: true,
            }),
            Animated.timing(floatAnim, {
              toValue: 0,
              duration: 1600,
              useNativeDriver: true,
            }),
          ])
        );
        floatLoopRef.current = floatLoop;
        floatLoop.start();
      });

    // Load persisted stats
    getTotalStats().then(s => { if (!cancelled) setStats(s); }).catch(() => {});

    // Load daily challenge state
    getDailyChallengeState().then(d => { if (!cancelled) setDailyState(d); }).catch(() => {});

    // Live countdown timer to next daily puzzle
    const updateCountdown = () => {
      if (!cancelled) setCountdown(getTimeUntilNextPuzzle().formatted);
    };
    updateCountdown();
    const countdownTimer = setInterval(updateCountdown, 1000);

    return () => {
      cancelled = true;
      if (floatLoopRef.current) {
        floatLoopRef.current.stop();
        floatLoopRef.current = null;
      }
      clearInterval(countdownTimer);
      fadeAnim.stopAnimation();
      scaleAnim.stopAnimation();
      floatAnim.stopAnimation();
    };
  }, []);

  const handlePlayDaily = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    soundManager.play('button');
    startDailyChallenge();
  };

  const currentChapter = getChapterForLevel(currentLevel);

  // Compute stats
  const solvedCount = stats
    ? Object.keys(stats.levelStats).filter(k => (stats.levelStats[Number(k)]?.completions || 0) > 0).length
    : Math.max(0, currentLevel - 1);

  const totalPlayTimeFormatted = stats
    ? (() => {
        const totalMinutes = Math.floor(stats.totalPlayTime / 60);
        if (totalMinutes < 60) return `${totalMinutes}m`;
        return `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`;
      })()
    : '0m';

  const totalStars = solvedCount;

  const handleContinue = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    soundManager.play('button');
    startLevel(currentLevel);
  };

  const handleOpenMap = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    soundManager.play('button');
    setActiveScreen('map');
  };

  if (!storyChecked) {
    return (
      <CandyBackground>
        <SafeAreaView style={styles.safeArea} />
      </CandyBackground>
    );
  }

  return (
    <CandyBackground>
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.container,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Top Bar with Settings */}
          <View style={styles.topBar}>
            <View style={styles.appPill}>
              <Text style={styles.appPillText}>🐾 {APP_NAME}</Text>
            </View>
            <CandyButton
              skin="grape"
              size="sm"
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                soundManager.play('button');
                setShowSettings(true);
              }}
              style={styles.settingsButton}
            >
              <Text style={styles.settingsIcon}>⚙️</Text>
            </CandyButton>
          </View>

          {/* Title & Branding */}
          <View style={styles.titleContainer}>
            <View style={styles.logoRow}>
              <Text style={[styles.logoWord, styles.logoWordJenny]}>Jenny</Text>
              <Text style={[styles.logoWord, styles.logoWordDoko]}>Doko</Text>
            </View>
            <Text style={styles.subtitle}>{APP_TAGLINE}</Text>
          </View>

          {/* Mascot Hero Card featuring Jenny & Pups */}
          <CandyPanel style={styles.mascotCard} contentStyle={styles.mascotCardFace}>
            <Animated.View
              style={[
                styles.mascotAvatarWrapper,
                { transform: [{ translateY: floatAnim }] },
              ]}
            >
              <View style={styles.mascotGlow} />
              <JennyAvatar size={62} mood="friendly" />
            </Animated.View>

            <View style={styles.mascotSpeechBubble}>
              <Text style={styles.mascotQuote}>
                "Welcome to Greenbark Meadow!"
              </Text>
              <Text style={styles.mascotSubquote}>
                Can you help Jenny ensure every puppy gets their own sunny spot?
              </Text>
            </View>
          </CandyPanel>

          {/* Primary Actions */}
          <View style={styles.actionGroup}>
            <CandyButton
              block
              size="lg"
              skin="green"
              onPress={handleContinue}
            >
              <View style={styles.continueContent}>
                <View style={styles.continueIconCircle}>
                  <Text style={styles.continuePlayIcon}>▶️</Text>
                </View>
                <View style={styles.continueTextGroup}>
                  <Text style={styles.continueMainText}>
                    Continue (Level {currentLevel})
                  </Text>
                  <View style={styles.continueSubRow}>
                    <Text style={styles.continueChapterText}>
                      {currentChapter.icon} {currentChapter.title}
                    </Text>
                    <View
                      style={[
                        styles.difficultyBadge,
                        { backgroundColor: currentChapter.accentColor },
                      ]}
                    >
                      <Text style={styles.difficultyBadgeText}>
                        {currentChapter.difficultyBadge}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </CandyButton>

            {/* Daily Challenge Featured Card */}
            <TouchableOpacity onPress={handlePlayDaily} activeOpacity={0.88}>
              <CandyPanel
                contentStyle={[
                  styles.dailyCardFace,
                  dailyState?.isCompletedToday && styles.dailyCardFaceCompleted,
                ]}
              >
              <View style={styles.dailyCardHeader}>
                <View style={styles.dailyHeaderLeft}>
                  <Text style={styles.dailyCalendarEmoji}>📅</Text>
                  <View>
                    <Text style={styles.dailyCardTitle}>Daily Garden Puzzle</Text>
                    <Text style={styles.dailyCardDate}>
                      {getFormattedTodayDisplay()}
                    </Text>
                  </View>
                </View>

                <View style={styles.dailyStreakPill}>
                  <Text style={styles.dailyStreakFire}>🔥</Text>
                  <Text style={styles.dailyStreakNumber}>
                    {dailyState?.currentStreak || 0}
                  </Text>
                  <Text style={styles.dailyStreakLabel}>Streak</Text>
                </View>
              </View>

              <View style={styles.dailyCardDivider} />

              <View style={styles.dailyCardBottom}>
                <View style={styles.dailyCountdownGroup}>
                  <Text style={styles.dailyCountdownLabel}>
                    {dailyState?.isCompletedToday ? 'Next Garden in:' : 'Resets in:'}
                  </Text>
                  <Text style={styles.dailyCountdownTime}>
                    {countdown || '24h 00m 00s'}
                  </Text>
                </View>

                <View
                  style={[
                    styles.dailyPlayBtn,
                    dailyState?.isCompletedToday && styles.dailyPlayBtnDone,
                  ]}
                >
                  <Text style={styles.dailyPlayBtnText}>
                    {dailyState?.isCompletedToday ? '✅ Replay 🐕' : 'Play Today 🐾'}
                  </Text>
                </View>
              </View>
              </CandyPanel>
            </TouchableOpacity>

            <CandyButton
              block
              skin="orange"
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                soundManager.play('button');
                setShowStory(true);
              }}
            >
              <View style={styles.rowButtonContent}>
                <Text style={styles.storyButtonIcon}>📖</Text>
                <Text style={styles.rowButtonText}>The Story of Jenny</Text>
                <View style={styles.rowButtonBadge}>
                  <Text style={styles.rowButtonBadgeText}>Comic</Text>
                </View>
              </View>
            </CandyButton>

            <CandyButton block skin="blue" onPress={handleOpenMap}>
              <View style={styles.rowButtonContent}>
                <Text style={styles.storyButtonIcon}>🗺️</Text>
                <Text style={styles.rowButtonText}>Chapters & Levels</Text>
                <View style={styles.rowButtonBadge}>
                  <Text style={styles.rowButtonBadgeText}>{unlockedLevels} / 1000</Text>
                </View>
              </View>
            </CandyButton>
          </View>

          {/* Player Stats Card */}
          <CandyPanel style={styles.statsCard} contentStyle={styles.statsCardFace}>
            <Text style={styles.statsCardTitle}>🏆 Your Journey Progress</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <PuppySprite size={24} breed="golden" />
                <Text style={styles.statNumber}>{solvedCount}</Text>
                <Text style={styles.statLabel}>Puppies Saved</Text>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statItem}>
                <Text style={styles.statEmoji}>⭐</Text>
                <Text style={styles.statNumber}>{totalStars}</Text>
                <Text style={styles.statLabel}>Stars Earned</Text>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statItem}>
                <Text style={styles.statEmoji}>⏱️</Text>
                <Text style={styles.statNumber}>{totalPlayTimeFormatted}</Text>
                <Text style={styles.statLabel}>Time Played</Text>
              </View>
            </View>
          </CandyPanel>

        </Animated.View>
      </ScrollView>

      {/* Settings Modal */}
      <SettingsModal
        visible={showSettings}
        onClose={() => setShowSettings(false)}
        onOpenStory={() => setShowStory(true)}
      />

      {/* 3-Screen Illustrated Story Comic Modal */}
      <StoryComicModal
        visible={showStory}
        onClose={() => setShowStory(false)}
        onStartGame={() => {
          setShowStory(false);
          startLevel(currentLevel);
        }}
      />
    </SafeAreaView>
    </CandyBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 36,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  appPill: {
    backgroundColor: 'rgba(20, 10, 44, 0.45)',
    borderWidth: 1.5,
    borderColor: CANDY_SURFACE.border,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  appPillText: {
    fontSize: 13,
    fontWeight: '800',
    color: CANDY_TEXT.onDarkSoft,
  },
  settingsButton: {
    minWidth: 42,
  },
  settingsIcon: {
    fontSize: 18,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  logoWord: {
    fontSize: 52,
    fontWeight: '900',
    letterSpacing: 1,
    textShadowColor: CANDY_TEXT.shadow,
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 2,
  },
  logoWordJenny: {
    color: CANDY_GOLD.base,
  },
  logoWordDoko: {
    color: '#7FD4FF',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: CANDY_TEXT.onDarkSoft,
    marginTop: 4,
    textAlign: 'center',
  },

  /* Mascot Hero Card */
  mascotCard: {
    width: '100%',
    marginBottom: 24,
  },
  mascotCardFace: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mascotAvatarWrapper: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(20, 10, 44, 0.5)',
    borderWidth: 3,
    borderColor: CANDY_GOLD.base,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginRight: 16,
  },
  mascotGlow: {
    position: 'absolute',
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(255, 201, 60, 0.28)',
  },
  mascotSpeechBubble: {
    flex: 1,
  },
  mascotQuote: {
    fontSize: 16,
    fontWeight: '900',
    color: CANDY_TEXT.onDark,
    marginBottom: 4,
  },
  mascotSubquote: {
    fontSize: 13,
    fontWeight: '600',
    color: CANDY_TEXT.onDarkSoft,
    lineHeight: 18,
  },

  /* Primary Actions */
  actionGroup: {
    width: '100%',
    gap: 14,
    marginBottom: 24,
  },
  continueContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  continueIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  continuePlayIcon: {
    fontSize: 18,
  },
  continueTextGroup: {
    flex: 1,
  },
  continueMainText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.2,
    textShadowColor: CANDY_TEXT.shadow,
    textShadowOffset: { width: 0, height: 1.5 },
    textShadowRadius: 0,
  },
  continueSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 8,
  },
  continueChapterText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#DFFFE8',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  difficultyBadgeText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  /* Shared row-style candy buttons (story / map) */
  rowButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  storyButtonIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  rowButtonText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    flex: 1,
    textShadowColor: CANDY_TEXT.shadow,
    textShadowOffset: { width: 0, height: 1.5 },
    textShadowRadius: 0,
  },
  rowButtonBadge: {
    backgroundColor: 'rgba(20, 10, 44, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rowButtonBadgeText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  /* Player Stats Card */
  statsCard: {
    width: '100%',
    marginBottom: 20,
  },
  statsCardFace: {
    padding: 18,
  },
  statsCardTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: CANDY_GOLD.base,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 14,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statEmoji: {
    fontSize: 20,
    marginBottom: 2,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '900',
    color: CANDY_TEXT.onDark,
    textShadowColor: CANDY_TEXT.shadow,
    textShadowOffset: { width: 0, height: 1.5 },
    textShadowRadius: 0,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: CANDY_TEXT.onDarkMuted,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: CANDY_SURFACE.border,
  },

  /* Daily Challenge Card */
  dailyCardFace: {
    padding: 16,
    borderColor: CANDY_GOLD.base,
  },
  dailyCardFaceCompleted: {
    borderColor: '#7FE9A8',
  },
  dailyCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dailyHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dailyCalendarEmoji: {
    fontSize: 26,
  },
  dailyCardTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: CANDY_TEXT.onDark,
    letterSpacing: 0.1,
  },
  dailyCardDate: {
    fontSize: 12,
    fontWeight: '700',
    color: CANDY_TEXT.onDarkSoft,
    marginTop: 1,
  },
  dailyStreakPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 10, 44, 0.45)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: CANDY_GOLD.dark,
    gap: 4,
  },
  dailyStreakFire: {
    fontSize: 14,
  },
  dailyStreakNumber: {
    fontSize: 14,
    fontWeight: '900',
    color: CANDY_GOLD.light,
  },
  dailyStreakLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: CANDY_GOLD.base,
  },
  dailyCardDivider: {
    height: 1,
    backgroundColor: CANDY_SURFACE.border,
    marginVertical: 12,
  },
  dailyCardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dailyCountdownGroup: {
    flexDirection: 'column',
  },
  dailyCountdownLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: CANDY_TEXT.onDarkMuted,
  },
  dailyCountdownTime: {
    fontSize: 14,
    fontWeight: '900',
    color: CANDY_TEXT.onDark,
    fontVariant: ['tabular-nums'],
    marginTop: 2,
  },
  dailyPlayBtn: {
    backgroundColor: '#F79000',
    borderWidth: 1.5,
    borderColor: '#B25400',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: CANDY_METRICS.radiusChip,
    shadowColor: '#B25400',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  dailyPlayBtnDone: {
    backgroundColor: '#1FA98A',
    borderColor: '#0F6B57',
    shadowColor: '#0F6B57',
  },
  dailyPlayBtnText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#FFFFFF',
    textShadowColor: CANDY_TEXT.shadow,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 0,
  },
});
