import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { soundManager } from '../utils/soundManager';
import { setStorySeen } from '../utils/storage';
import { JennyAvatar } from './assets/JennyAvatar';
import { CandyButton } from './candy/CandyButton';
import { CANDY_GOLD } from '../utils/theme';

interface StoryComicModalProps {
  visible: boolean;
  onClose: () => void;
  onStartGame?: () => void;
}

interface ComicPage {
  chapter: string;
  headline: string;
  dialogue: string;
  imageSource: any;
  highlightColor: string;
}

const COMIC_PAGES: ComicPage[] = [
  {
    chapter: 'Part 1 • Greenbark Meadow',
    headline: 'Jenny is a puppy sitter at Greenbark Meadow.',
    dialogue: 'Hi I\'m Jenny !\nSofie brings me to Greenbark Meadow, where I get to play with so many amazing friends !',
    imageSource: require('../../assets/story/story_1_meadow.jpg'),
    highlightColor: '#27AE60',
  },
  {
    chapter: 'Part 2 • The Flower Beds',
    headline: 'The park is vast, and the playful pups love hiding in their favorite colored flower beds!',
    dialogue: 'We all love these flower beds !\nI like the cheerful daisies, and my friends enjoy the bluebells, lavender and poppies. We always have so much fun together !',
    imageSource: require('../../assets/story/story_2_flowerbeds.jpg'),
    highlightColor: '#8E44AD',
  },
  {
    chapter: 'Part 3 • The Quest',
    headline: 'Can you help Jenny ensure every puppy gets their own sunny spot?',
    dialogue: 'They love their personal space and need room to stretch ! Lets explore together and find the perfect sunny spot for each of us across many gardens !',
    imageSource: require('../../assets/story/story_3_adventure.jpg'),
    highlightColor: '#E67E22',
  },
];

export const StoryComicModal: React.FC<StoryComicModalProps> = ({
  visible,
  onClose,
  onStartGame,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageKey, setPageKey] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const mountedRef = useRef(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  // Separate mount-in animation so the shell only fades in once (not on every page)
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

  if (!visible) return null;

  const current = COMIC_PAGES[currentPage];
  const isLastPage = currentPage === COMIC_PAGES.length - 1;

  const transitionToPage = (newPage: number, direction: 'forward' | 'backward') => {
    if (isTransitioning || newPage < 0 || newPage >= COMIC_PAGES.length) return;
    setIsTransitioning(true);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 130,
        useNativeDriver: true,
      }),
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
      // CRITICAL ORDER: slideAnim.setValue FIRST (sync), THEN state setters (batched async).
      // This guarantees the Animated.Value is already at the off-screen entry position
      // when React re-renders with the new page — NO 1-frame flash at slide=0.
      slideAnim.setValue(direction === 'forward' ? 18 : -18);
      fadeAnim.setValue(0);
      setCurrentPage(newPage);
      setPageKey(k => k + 1);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 190,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 190,
          useNativeDriver: true,
        }),
      ]).start(({ finished: finished2 }) => {
        if (finished2 && mountedRef.current) setIsTransitioning(false);
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
    setStorySeen(true);
    onClose();
    if (onStartGame) {
      onStartGame();
    }
  };

  const handleSkip = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    soundManager.play('button');
    setStorySeen(true);
    onClose();
  };

  return (
    <View style={styles.overlay}>
      <SafeAreaView style={styles.safeArea}>
        <Animated.View
          style={[styles.cardContainer, { opacity: shellFadeAnim }]}
        >
          {/* Top Header — stays stable across page transitions */}
          <View style={styles.headerRow}>
            <View style={styles.pageBadge}>
              <Text style={styles.pageBadgeText}>📖 The Story of Jenny</Text>
            </View>
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip} activeOpacity={0.7}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>

          {/* Comic Card — frame stays stable, only inner CONTENT transitions */}
          <View style={styles.comicCard}>
            {/* Animated page content wrapper — this is the only thing that fades + slides */}
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

              {/* Illustration Frame */}
              <View style={styles.imageFrame}>
                <Image
                  key={`story-img-${pageKey}-${currentPage}`}
                  source={current.imageSource}
                  style={styles.comicImage}
                  resizeMode="cover"
                />
              </View>

              {/* Comic Caption Headline */}
              <View style={styles.headlineBox}>
                <Text style={styles.headlineText}>{current.headline}</Text>
              </View>

              {/* Jenny Speech Bubble */}
              <View style={styles.speechBubbleRow}>
                <JennyAvatar size={48} mood={isLastPage ? 'cheering' : 'friendly'} />
                <View style={styles.speechBubble}>
                  <View style={styles.bubbleArrow} />
                  <Text style={styles.dialogueText}>"{current.dialogue}"</Text>
                </View>
              </View>
            </Animated.View>
          </View>

          {/* Footer Controls — stays stable across page transitions */}
          <View style={styles.footerContainer}>
            {/* Dots */}
            <View style={styles.dotsRow}>
              {COMIC_PAGES.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    index === currentPage && [styles.dotActive, { backgroundColor: current.highlightColor }],
                  ]}
                />
              ))}
            </View>

            {/* Buttons */}
            <View style={styles.actionRow}>
              {/* Always-rendered Back (using opacity to hide on page 0 — avoids mount flicker) */}
              <CandyButton
                skin="neutral"
                label="⬅️ Back"
                onPress={handlePrev}
                disabled={currentPage === 0 || isTransitioning}
                style={[
                  styles.prevButton,
                  currentPage === 0 && styles.prevButtonHidden,
                ]}
              />

              <CandyButton
                size="lg"
                skin={isLastPage ? 'green' : 'grape'}
                label={isLastPage ? 'Start Adventure! 🐾' : 'Next ➡️'}
                onPress={handleNext}
                disabled={isTransitioning}
                style={[
                  styles.nextButton,
                  isTransitioning && { opacity: 0.7 },
                ]}
              />
            </View>
          </View>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(28, 20, 16, 0.88)',
    zIndex: 2000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Comic pages stay paper-white by design; the gold frame ties them to the
  // candy theme without hurting the illustrations' contrast.
  cardContainer: {
    width: '92%',
    maxWidth: 440,
    backgroundColor: '#FAF7F2',
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    shadowColor: '#0E0620',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.55,
    shadowRadius: 26,
    elevation: 16,
    borderWidth: 4,
    borderColor: CANDY_GOLD.base,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  pageBadge: {
    backgroundColor: '#EBE4D5',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
  },
  pageBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#635343',
    letterSpacing: 0.2,
  },
  skipButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  skipText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8C7B6B',
  },
  comicCard: {
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
  },
  chapterPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 10,
  },
  chapterPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  imageFrame: {
    width: '100%',
    height: Math.min(230, height * 0.3),
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#E8E1D3',
    borderWidth: 2,
    borderColor: '#E2D8C7',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  comicImage: {
    width: '100%',
    height: '100%',
  },
  headlineBox: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#EDE4D6',
    marginBottom: 12,
  },
  headlineText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2C3E50',
    lineHeight: 21,
    textAlign: 'center',
  },
  speechBubbleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 10,
    marginBottom: 16,
  },
  speechBubble: {
    flex: 1,
    backgroundColor: '#FFFDF9',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: '#E8DFCE',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  bubbleArrow: {
    position: 'absolute',
    left: -7,
    top: 16,
    width: 0,
    height: 0,
    borderTopWidth: 6,
    borderBottomWidth: 6,
    borderRightWidth: 8,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#E8DFCE',
  },
  dialogueText: {
    fontSize: 12.5,
    color: '#5D4A39',
    lineHeight: 18,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  footerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DDD4C4',
  },
  dotActive: {
    width: 22,
    borderRadius: 5,
  },
  actionRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  prevButton: {
    flex: 1,
  },
  prevButtonHidden: {
    opacity: 0,
  },
  nextButton: {
    flex: 1.5,
  },
});
