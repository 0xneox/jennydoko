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

  const totalHints = stats
    ? Object.values(stats.levelStats).reduce((acc, curr) => acc + (curr.hintsUsed || 0), 0)
    : 0;

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
      <SafeAreaView style={styles.safeArea} />
    );
  }

  return (
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
              <Text style={styles.appPillText}>🐾 Jenny's Cozy World</Text>
            </View>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                soundManager.play('button');
                setShowSettings(true);
              }}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.settingsIcon}>⚙️</Text>
            </TouchableOpacity>
          </View>

          {/* Title & Branding */}
          <View style={styles.titleContainer}>
            <Text style={styles.mainTitle}>Jenny's Puppies</Text>
            <Text style={styles.subtitle}>A Cozy Logic Adventure</Text>
          </View>

          {/* Mascot Hero Card featuring Jenny & Pups */}
          <View style={styles.mascotCard}>
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
          </View>

          {/* Primary Actions */}
          <View style={styles.actionGroup}>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
              activeOpacity={0.85}
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
            </TouchableOpacity>

            {/* Daily Challenge Featured Card */}
            <TouchableOpacity
              style={[
                styles.dailyCard,
                dailyState?.isCompletedToday && styles.dailyCardCompleted,
              ]}
              onPress={handlePlayDaily}
              activeOpacity={0.88}
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
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.storyButton}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                soundManager.play('button');
                setShowStory(true);
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.storyButtonIcon}>📖</Text>
              <Text style={styles.storyButtonText}>The Story of Jenny</Text>
              <View style={styles.storyBadge}>
                <Text style={styles.storyBadgeText}>Comic</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.mapButton}
              onPress={handleOpenMap}
              activeOpacity={0.8}
            >
              <Text style={styles.mapButtonIcon}>🗺️</Text>
              <Text style={styles.mapButtonText}>Chapters & Levels</Text>
              <View style={styles.mapBadge}>
                <Text style={styles.mapBadgeText}>{unlockedLevels} / 1000</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Player Stats Card */}
          <View style={styles.statsCard}>
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
                <Text style={styles.statEmoji}>💡</Text>
                <Text style={styles.statNumber}>{totalHints}</Text>
                <Text style={styles.statLabel}>Hints Used</Text>
              </View>
            </View>
          </View>

          {/* Footer note */}
          <Text style={styles.footerText}>
            1000 Handcrafted & Procedural Logic Puzzles across 50 Thematic Chapters
          </Text>
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
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FBF9F5',
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
    backgroundColor: '#EFEAE1',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  appPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B5E4F',
  },
  settingsButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E2D6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  settingsIcon: {
    fontSize: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: '#2C3E50',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8A7A68',
    marginTop: 4,
    textAlign: 'center',
  },
  mascotCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFE7DA',
    shadowColor: '#7A6B53',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 5,
    marginBottom: 24,
  },
  mascotAvatarWrapper: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#FFF7E6',
    borderWidth: 3,
    borderColor: '#FFD79A',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginRight: 16,
  },
  mascotGlow: {
    position: 'absolute',
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: 'rgba(255, 183, 77, 0.2)',
  },
  mascotEmoji: {
    fontSize: 42,
  },
  mascotSpeechBubble: {
    flex: 1,
  },
  mascotQuote: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2C3E50',
    marginBottom: 4,
  },
  mascotSubquote: {
    fontSize: 13,
    fontWeight: '500',
    color: '#8A7A68',
    lineHeight: 18,
  },
  actionGroup: {
    width: '100%',
    gap: 12,
    marginBottom: 24,
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#27AE60',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#27AE60',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  continueContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  continueIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
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
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  continueSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 8,
  },
  continueChapterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#E8F5E9',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  difficultyBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  storyButton: {
    width: '100%',
    backgroundColor: '#FFFBF2',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#F5DCB7',
    shadowColor: '#E67E22',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  storyButtonIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  storyButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6E4822',
    flex: 1,
  },
  storyBadge: {
    backgroundColor: '#FFE8C8',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  storyBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#D35400',
  },
  mapButton: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2D9C8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  mapButtonIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  mapButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#34495E',
    flex: 1,
  },
  mapBadge: {
    backgroundColor: '#EBF3FB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  mapBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2980B9',
  },
  statsCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#EFE7DA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
    marginBottom: 20,
  },
  statsCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#8A7A68',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
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
    fontSize: 20,
    fontWeight: '900',
    color: '#2C3E50',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#95A5A6',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: '#EFE7DA',
  },
  footerText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#B5A898',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 6,
  },
  /* Daily Challenge Card Styles */
  dailyCard: {
    width: '100%',
    backgroundColor: '#FFFDF9',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#FFE0B2',
    shadowColor: '#E65100',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
  dailyCardCompleted: {
    borderColor: '#C8E6C9',
    backgroundColor: '#F9FDF9',
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
    fontWeight: '800',
    color: '#2C3E50',
    letterSpacing: -0.2,
  },
  dailyCardDate: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8A7A68',
    marginTop: 1,
  },
  dailyStreakPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE0B2',
    gap: 4,
  },
  dailyStreakFire: {
    fontSize: 14,
  },
  dailyStreakNumber: {
    fontSize: 14,
    fontWeight: '900',
    color: '#E65100',
  },
  dailyStreakLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#E65100',
  },
  dailyCardDivider: {
    height: 1,
    backgroundColor: '#F5EBDD',
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
    fontWeight: '600',
    color: '#9E9E9E',
  },
  dailyCountdownTime: {
    fontSize: 13,
    fontWeight: '800',
    color: '#5D4037',
    fontVariant: ['tabular-nums'],
    marginTop: 2,
  },
  dailyPlayBtn: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
    shadowColor: '#FF9800',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  dailyPlayBtnDone: {
    backgroundColor: '#26A69A',
    shadowColor: '#26A69A',
  },
  dailyPlayBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
