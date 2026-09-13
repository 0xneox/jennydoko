import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { soundManager } from '../utils/soundManager';
import { setChapterStorySeen } from '../utils/storage';
import { JennyAvatar } from './assets/JennyAvatar';
import { CandyButton } from './candy/CandyButton';
import { CANDY_GOLD, CANDY_SURFACE, CANDY_TEXT } from '../utils/theme';
import { ChapterStory } from '../data/chapterStories';

interface ChapterStoryModalProps {
  visible: boolean;
  story: ChapterStory | null;
  onClose: () => void;
}

export const ChapterStoryModal: React.FC<ChapterStoryModalProps> = ({
  visible,
  story,
  onClose,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageKey, setPageKey] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const mountedRef = useRef(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const shellFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      fadeAnim.stopAnimation();
      slideAnim.stopAnimation();
      shellFadeAnim.stopAnimation();
    };
  }, []);

  useEffect(() => {
    if (visible) {
      setCurrentPage(0);
      setPageKey(k => k + 1);
      setIsTransitioning(false);
      fadeAnim.setValue(1);
      slideAnim.setValue(0);
      shellFadeAnim.setValue(0);
      Animated.timing(shellFadeAnim, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }).start();
    } else {
      setIsTransitioning(false);
      fadeAnim.stopAnimation();
      slideAnim.stopAnimation();
      shellFadeAnim.stopAnimation();
    }
  }, [visible, fadeAnim, slideAnim, shellFadeAnim]);

  if (!visible || !story) return null;

  const pages = story.pages;
  const current = pages[currentPage];
  const isLastPage = currentPage === pages.length - 1;

  const transitionToPage = (newPage: number, direction: 'forward' | 'backward') => {
    if (isTransitioning || newPage < 0 || newPage >= pages.length) return;
    setIsTransitioning(true);

    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 130, useNativeDriver: true }),
      Animated.timing(slideAnim, {
        toValue: direction === 'forward' ? -18 : 18,
        duration: 130,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (!finished || !mountedRef.current) {
        if (mountedRef.current) setIsTransitioning(false);
        return;
      }
      slideAnim.setValue(direction === 'forward' ? 18 : -18);
      fadeAnim.setValue(0);
      setCurrentPage(newPage);
      setPageKey(k => k + 1);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 190, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 190, useNativeDriver: true }),
      ]).start(({ finished: f2 }) => {
        if (f2 && mountedRef.current) setIsTransitioning(false);
      });
    });
  };

  const handleNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    soundManager.play('button');
    if (!isLastPage) {
      transitionToPage(currentPage + 1, 'forward');
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      soundManager.play('button');
      transitionToPage(currentPage - 1, 'backward');
    }
  };

  const handleFinish = () => {
    setChapterStorySeen(story.chapterId);
    onClose();
  };

  const handleSkip = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    soundManager.play('button');
    setChapterStorySeen(story.chapterId);
    onClose();
  };

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.cardContainer, { opacity: shellFadeAnim }]}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={[styles.pageBadge, { backgroundColor: current.highlightColor }]}>
            <Text style={styles.pageBadgeText}>📖 {story.title}</Text>
          </View>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip} activeOpacity={0.7}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Comic Card */}
        <View style={styles.comicCard}>
          <Animated.View
            key={pageKey}
            style={{
              opacity: fadeAnim,
              transform: [{ translateX: slideAnim }],
              width: '100%',
            }}
          >
            {/* Chapter Pill */}
            <View style={[styles.chapterPill, { backgroundColor: current.highlightColor }]}>
              <Text style={styles.chapterPillText}>{current.chapter}</Text>
            </View>

            {/* Big Emoji Illustration */}
            <View style={[styles.emojiFrame, { borderColor: current.highlightColor }]}>
              <Text style={styles.bigEmoji}>{current.emoji}</Text>
            </View>

            {/* Headline */}
            <View style={styles.headlineBox}>
              <Text style={styles.headlineText}>{current.headline}</Text>
            </View>

            {/* Jenny Speech */}
            <View style={styles.speechBubbleRow}>
              <JennyAvatar size={48} mood={isLastPage ? 'cheering' : 'friendly'} />
              <View style={styles.speechBubble}>
                <View style={styles.bubbleArrow} />
                <Text style={styles.dialogueText}>"{current.dialogue}"</Text>
              </View>
            </View>
          </Animated.View>
        </View>

        {/* Navigation */}
        <View style={styles.navRow}>
          {currentPage > 0 ? (
            <TouchableOpacity style={styles.navButton} onPress={handlePrev} activeOpacity={0.7}>
              <Text style={styles.navText}>← Back</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.navSpacer} />
          )}

          {/* Page dots */}
          <View style={styles.dotsRow}>
            {pages.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i === currentPage && styles.dotActive]}
              />
            ))}
          </View>

          {isLastPage ? (
            <CandyButton
              skin="green"
              label="Let's Go! 🐾"
              onPress={handleFinish}
            />
          ) : (
            <TouchableOpacity style={styles.navButton} onPress={handleNext} activeOpacity={0.7}>
              <Text style={styles.navText}>Next →</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(23, 17, 13, 0.82)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1600,
    padding: 16,
  },
  cardContainer: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: CANDY_SURFACE.top,
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: CANDY_GOLD.base,
    shadowColor: '#0E0620',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.55,
    shadowRadius: 22,
    elevation: 14,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  pageBadge: {
    borderWidth: 1.5,
    borderColor: CANDY_GOLD.base,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
  },
  pageBadgeText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 12,
    letterSpacing: 0.3,
  },
  skipButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: 'rgba(20, 10, 44, 0.45)',
    borderWidth: 1,
    borderColor: CANDY_SURFACE.border,
  },
  skipText: {
    fontSize: 12,
    fontWeight: '800',
    color: CANDY_TEXT.onDarkSoft,
  },
  comicCard: {
    backgroundColor: 'rgba(20, 10, 44, 0.42)',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: CANDY_SURFACE.border,
    marginBottom: 16,
  },
  chapterPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    marginBottom: 14,
  },
  chapterPillText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 11,
    letterSpacing: 0.3,
  },
  emojiFrame: {
    width: '100%',
    height: 120,
    borderRadius: 16,
    borderWidth: 2,
    backgroundColor: 'rgba(20, 10, 44, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  bigEmoji: {
    fontSize: 56,
  },
  headlineBox: {
    marginBottom: 12,
  },
  headlineText: {
    fontSize: 16,
    fontWeight: '900',
    color: CANDY_TEXT.onDark,
    textAlign: 'center',
    lineHeight: 21,
  },
  speechBubbleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  speechBubble: {
    flex: 1,
    backgroundColor: 'rgba(245, 179, 36, 0.12)',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: CANDY_GOLD.base,
    padding: 12,
    position: 'relative',
  },
  bubbleArrow: {
    position: 'absolute',
    left: -7,
    top: 14,
    width: 0,
    height: 0,
    borderRightWidth: 8,
    borderRightColor: CANDY_GOLD.base,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  dialogueText: {
    fontSize: 13,
    fontWeight: '600',
    color: CANDY_TEXT.onDark,
    lineHeight: 18,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(20, 10, 44, 0.45)',
    borderWidth: 1,
    borderColor: CANDY_SURFACE.border,
  },
  navText: {
    fontSize: 13,
    fontWeight: '800',
    color: CANDY_TEXT.onDark,
  },
  navSpacer: {
    width: 60,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 5,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  dotActive: {
    backgroundColor: CANDY_GOLD.base,
    width: 18,
  },
});
