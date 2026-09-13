import React, { useState, useEffect, useRef } from 'react';
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
import { CHAPTERS, getChapterIndexForLevel } from '../data/chapterData';
import { getTotalStats, GameStats } from '../utils/statistics';
import { soundManager } from '../utils/soundManager';
import { CandyBackground } from '../components/candy/CandyBackground';
import { CandyButton } from '../components/candy/CandyButton';
import { CandyPanel } from '../components/candy/CandyPanel';
import { CANDY_GOLD, CANDY_SURFACE, CANDY_TEXT } from '../utils/theme';

export const WorldMapScreen: React.FC = () => {
  const { currentLevel, unlockedLevels, startLevel, setActiveScreen } = useGameStore();
  const [stats, setStats] = useState<GameStats | null>(null);

  // Initialize selected chapter to the one containing currentLevel
  const initialChapterIndex = getChapterIndexForLevel(currentLevel);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(initialChapterIndex);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let cancelled = false;
    getTotalStats().then(s => { if (!cancelled) setStats(s); }).catch(() => {});

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();

    return () => {
      cancelled = true;
      fadeAnim.stopAnimation();
    };
  }, []);

  const activeChapter = CHAPTERS[selectedChapterIndex];

  // Helper to test if a level has been completed
  const isLevelCompleted = (lvl: number): boolean => {
    if (stats?.levelStats[lvl] && stats.levelStats[lvl].completions > 0) {
      return true;
    }
    return lvl < currentLevel;
  };

  // Calculate completed chapters (stamps earned)
  const stampsCollected = CHAPTERS.filter(ch => {
    for (let l = ch.start; l <= ch.end; l++) {
      if (!isLevelCompleted(l)) return false;
    }
    return true;
  }).length;

  const handleSelectLevel = (level: number) => {
    if (level > unlockedLevels) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    soundManager.play('button');
    startLevel(level);
  };

  const handleBackHome = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    soundManager.play('button');
    setActiveScreen('home');
  };

  return (
    <CandyBackground>
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header Bar */}
      <View style={styles.headerBar}>
        <CandyButton
          skin="grape"
          size="sm"
          label="Home"
          icon={<Text style={styles.backButtonIcon}>⬅️</Text>}
          onPress={handleBackHome}
        />

        <View style={styles.headerTitleGroup}>
          <Text style={styles.headerTitle}>Puppy Passport 🐾</Text>
          <Text style={styles.headerSubtitle}>
            {stampsCollected} of 50 Garden Stamps Collected
          </Text>
        </View>

        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.mainWrapper, { opacity: fadeAnim }]}>
          {/* Horizontal Chapter Selector Cards */}
          <Text style={styles.sectionHeader}>PASSPORT DESTINATIONS 🧭</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chapterCarousel}
          >
            {CHAPTERS.map((chapter, idx) => {
              const isSelected = idx === selectedChapterIndex;
              const chapterUnlocked = unlockedLevels >= chapter.start;
              
              // Calculate completion in this chapter
              let chapterCompletedCount = 0;
              for (let l = chapter.start; l <= chapter.end; l++) {
                if (isLevelCompleted(l)) chapterCompletedCount++;
              }
              const progressPct = Math.round(
                (chapterCompletedCount / (chapter.end - chapter.start + 1)) * 100
              );

              return (
                <TouchableOpacity
                  key={chapter.id}
                  style={[
                    styles.chapterCard,
                    isSelected && [
                      styles.chapterCardSelected,
                      { borderColor: chapter.accentColor },
                    ],
                  ]}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setSelectedChapterIndex(idx);
                  }}
                  activeOpacity={0.8}
                >
                  <View style={styles.chapterCardHeader}>
                    <Text style={styles.chapterIcon}>{chapter.icon}</Text>
                    <View
                      style={[
                        styles.diffBadge,
                        { backgroundColor: chapter.accentColor },
                      ]}
                    >
                      <Text style={styles.diffBadgeText}>
                        {chapter.difficultyBadge}
                      </Text>
                    </View>
                  </View>

                  <Text
                    style={[
                      styles.chapterCardTitle,
                      isSelected && { color: chapter.accentColor },
                    ]}
                    numberOfLines={1}
                  >
                    Stamp #{chapter.id}
                  </Text>
                  <Text style={styles.chapterCardSub} numberOfLines={1}>
                    {chapter.title}
                  </Text>

                  {/* Stamp Seal if 100% completed */}
                  {progressPct === 100 ? (
                    <View style={[styles.stampSealBadge, { borderColor: chapter.accentColor }]}>
                      <Text style={[styles.stampSealText, { color: chapter.accentColor }]}>
                        STAMPED 🐾
                      </Text>
                    </View>
                  ) : (
                    <>
                      {/* Mini Progress Bar */}
                      <View style={styles.progressTrack}>
                        <View
                          style={[
                            styles.progressBar,
                            {
                              width: `${progressPct}%`,
                              backgroundColor: chapter.accentColor,
                            },
                          ]}
                        />
                      </View>
                      <Text style={styles.progressText}>
                        {chapterCompletedCount}/20 ({progressPct}%)
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Chapter Details Hero Card */}
          <CandyPanel
            style={styles.chapterHeroCard}
            contentStyle={[
              styles.chapterHeroFace,
              { borderLeftColor: activeChapter.accentColor },
            ]}
          >
            <View style={styles.chapterHeroHeader}>
              <Text style={styles.chapterHeroEmoji}>{activeChapter.icon}</Text>
              <View style={styles.chapterHeroTextCol}>
                <Text style={styles.chapterHeroTitle}>
                  Stamp #{activeChapter.id}: {activeChapter.title}
                </Text>
                <Text style={styles.chapterHeroGridSize}>
                  Grid: {activeChapter.gridSizes} • {activeChapter.subtitle}
                </Text>
              </View>
            </View>
            <Text style={styles.chapterHeroDesc}>{activeChapter.description}</Text>
          </CandyPanel>

          {/* Level Nodes Grid */}
          <CandyPanel contentStyle={styles.levelsSection}>
            <View style={styles.levelsSectionHeader}>
              <Text style={styles.levelsSectionTitle}>Levels</Text>
              <Text style={styles.levelsSectionHint}>
                ⭐ Completed • 📍 Current • 🔒 Locked
              </Text>
            </View>

            <View style={styles.levelGrid}>
              {Array.from(
                { length: activeChapter.end - activeChapter.start + 1 },
                (_, i) => activeChapter.start + i
              ).map(lvl => {
                const completed = isLevelCompleted(lvl);
                const isCurrent = lvl === currentLevel;
                const isLocked = lvl > unlockedLevels;

                return (
                  <TouchableOpacity
                    key={lvl}
                    style={[
                      styles.levelNode,
                      completed && styles.levelNodeCompleted,
                      isCurrent && [
                        styles.levelNodeCurrent,
                        { borderColor: activeChapter.accentColor },
                      ],
                      isLocked && styles.levelNodeLocked,
                    ]}
                    onPress={() => handleSelectLevel(lvl)}
                    disabled={isLocked}
                    activeOpacity={0.7}
                  >
                    {isLocked ? (
                      <Text style={styles.lockIcon}>🔒</Text>
                    ) : (
                      <>
                        <Text
                          style={[
                            styles.levelNumber,
                            completed && styles.levelNumberCompleted,
                            isCurrent && styles.levelNumberCurrent,
                          ]}
                        >
                          {lvl}
                        </Text>
                        {completed && <Text style={styles.starBadge}>⭐</Text>}
                        {isCurrent && !completed && (
                          <View
                            style={[
                              styles.currentDot,
                              { backgroundColor: activeChapter.accentColor },
                            ]}
                          />
                        )}
                      </>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </CandyPanel>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
    </CandyBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1.5,
    borderBottomColor: CANDY_SURFACE.border,
    backgroundColor: 'rgba(20, 10, 44, 0.35)',
  },
  backButtonIcon: {
    fontSize: 14,
  },
  headerTitleGroup: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: CANDY_GOLD.light,
    textShadowColor: CANDY_TEXT.shadow,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 0,
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: '700',
    color: CANDY_TEXT.onDarkSoft,
    marginTop: 1,
  },
  headerPlaceholder: {
    width: 70,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  mainWrapper: {
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '900',
    color: CANDY_GOLD.base,
    letterSpacing: 1,
    marginBottom: 10,
    marginLeft: 4,
  },

  /* Chapter Carousel */
  chapterCarousel: {
    paddingBottom: 8,
    gap: 12,
  },
  chapterCard: {
    width: 140,
    backgroundColor: CANDY_SURFACE.top,
    borderRadius: 18,
    padding: 14,
    borderWidth: 2,
    borderColor: CANDY_SURFACE.bevel,
    shadowColor: '#0E0620',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  chapterCardSelected: {
    borderWidth: 2.5,
    shadowOpacity: 0.55,
    shadowRadius: 12,
    elevation: 7,
  },
  chapterCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  chapterIcon: {
    fontSize: 22,
  },
  diffBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
  diffBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  chapterCardTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: CANDY_TEXT.onDark,
    marginBottom: 2,
  },
  chapterCardSub: {
    fontSize: 12,
    fontWeight: '700',
    color: CANDY_TEXT.onDarkSoft,
    marginBottom: 10,
  },
  progressTrack: {
    height: 8,
    backgroundColor: 'rgba(20, 10, 44, 0.55)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
    borderWidth: 1,
    borderColor: CANDY_SURFACE.bevel,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 10,
    fontWeight: '800',
    color: CANDY_TEXT.onDarkMuted,
    textAlign: 'right',
  },
  stampSealBadge: {
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-4deg' }],
    backgroundColor: 'rgba(20, 10, 44, 0.5)',
    marginTop: 2,
  },
  stampSealText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  /* Chapter Hero Card */
  chapterHeroCard: {
    marginTop: 16,
    marginBottom: 18,
  },
  chapterHeroFace: {
    padding: 16,
    borderLeftWidth: 6,
  },
  chapterHeroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  chapterHeroEmoji: {
    fontSize: 28,
    marginRight: 12,
  },
  chapterHeroTextCol: {
    flex: 1,
  },
  chapterHeroTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: CANDY_TEXT.onDark,
  },
  chapterHeroGridSize: {
    fontSize: 12,
    fontWeight: '700',
    color: CANDY_TEXT.onDarkSoft,
    marginTop: 2,
  },
  chapterHeroDesc: {
    fontSize: 13,
    fontWeight: '600',
    color: CANDY_TEXT.onDarkSoft,
    lineHeight: 18,
  },

  /* Level Nodes */
  levelsSection: {
    padding: 18,
  },
  levelsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: CANDY_SURFACE.border,
  },
  levelsSectionTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: CANDY_GOLD.light,
  },
  levelsSectionHint: {
    fontSize: 11,
    fontWeight: '700',
    color: CANDY_TEXT.onDarkSoft,
  },
  levelGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'flex-start',
  },
  levelNode: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: '#7C5CBF',
    borderWidth: 2,
    borderColor: '#3D2670',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#0E0620',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },
  levelNodeCompleted: {
    backgroundColor: '#26B85B',
    borderColor: '#12692F',
  },
  levelNodeCurrent: {
    borderWidth: 3,
    backgroundColor: '#F5B324',
  },
  levelNodeLocked: {
    backgroundColor: 'rgba(20, 10, 44, 0.5)',
    borderColor: '#3D2670',
    opacity: 0.7,
    shadowOpacity: 0,
    elevation: 0,
  },
  levelNumber: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    textShadowColor: CANDY_TEXT.shadow,
    textShadowOffset: { width: 0, height: 1.5 },
    textShadowRadius: 0,
  },
  levelNumberCompleted: {
    color: '#FFFFFF',
  },
  levelNumberCurrent: {
    fontWeight: '900',
    color: '#4A3000',
  },
  lockIcon: {
    fontSize: 16,
  },
  starBadge: {
    position: 'absolute',
    bottom: 2,
    right: 3,
    fontSize: 11,
  },
  currentDot: {
    position: 'absolute',
    bottom: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
