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

export const WorldMapScreen: React.FC = () => {
  const { currentLevel, unlockedLevels, startLevel, setActiveScreen } = useGameStore();
  const [stats, setStats] = useState<GameStats | null>(null);

  // Initialize selected chapter to the one containing currentLevel
  const initialChapterIndex = getChapterIndexForLevel(currentLevel);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(initialChapterIndex);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getTotalStats().then(s => setStats(s)).catch(() => {});

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();
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
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackHome}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backButtonText}>⬅️ Home</Text>
        </TouchableOpacity>

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
          <View
            style={[
              styles.chapterHeroCard,
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
          </View>

          {/* Level Nodes Grid */}
          <View style={styles.levelsSection}>
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
                            isCurrent && [
                              styles.levelNumberCurrent,
                              { color: activeChapter.accentColor },
                            ],
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
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F6F1',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EBE5D9',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#F3EFE6',
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5D5041',
  },
  headerTitleGroup: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2C3E50',
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8A7A68',
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
    fontWeight: '800',
    color: '#9C8E7D',
    letterSpacing: 0.8,
    marginBottom: 10,
    marginLeft: 4,
  },
  chapterCarousel: {
    paddingBottom: 8,
    gap: 12,
  },
  chapterCard: {
    width: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 2,
    borderColor: '#E8E2D6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  chapterCardSelected: {
    backgroundColor: '#FFFFFF',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
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
  },
  diffBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  chapterCardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2C3E50',
    marginBottom: 2,
  },
  chapterCardSub: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7F8C8D',
    marginBottom: 10,
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#EFEAE1',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9E9282',
    textAlign: 'right',
  },
  stampSealBadge: {
    borderWidth: 1.5,
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-4deg' }],
    backgroundColor: '#FAF5EE',
    marginTop: 2,
  },
  stampSealText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  chapterHeroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E8E2D6',
    borderLeftWidth: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
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
    fontWeight: '800',
    color: '#2C3E50',
  },
  chapterHeroGridSize: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7F8C8D',
    marginTop: 2,
  },
  chapterHeroDesc: {
    fontSize: 13,
    fontWeight: '500',
    color: '#5D5041',
    lineHeight: 18,
  },
  levelsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E8E2D6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  levelsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EBE1',
  },
  levelsSectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2C3E50',
  },
  levelsSectionHint: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9E9282',
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
    borderRadius: 16,
    backgroundColor: '#F9F7F2',
    borderWidth: 1.5,
    borderColor: '#E2D9C8',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  levelNodeCompleted: {
    backgroundColor: '#F4FBF7',
    borderColor: '#A3E0C1',
  },
  levelNodeCurrent: {
    borderWidth: 2.5,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  levelNodeLocked: {
    backgroundColor: '#ECE7DC',
    borderColor: '#DDD6C7',
    opacity: 0.65,
  },
  levelNumber: {
    fontSize: 17,
    fontWeight: '800',
    color: '#4B5563',
  },
  levelNumberCompleted: {
    color: '#27AE60',
  },
  levelNumberCurrent: {
    fontWeight: '900',
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
