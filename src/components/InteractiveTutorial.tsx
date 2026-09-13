import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { soundManager } from '../utils/soundManager';
import { setTutorialSeen } from '../utils/storage';
import { JennyAvatar } from './assets/JennyAvatar';
import { PuppySprite } from './assets/PuppySprite';
import { CandyButton } from './candy/CandyButton';
import { CANDY_GOLD, CANDY_SURFACE, CANDY_TEXT } from '../utils/theme';

const PAW_IMAGE = require('../../assets/paw.png');

interface InteractiveTutorialProps {
  visible: boolean;
  onClose: () => void;
  onPlacePuppy: (row: number, col: number) => boolean;
  onMarkCell: (row: number, col: number) => boolean;
}

export const InteractiveTutorial: React.FC<InteractiveTutorialProps> = ({
  visible,
  onClose,
  onPlacePuppy,
  onMarkCell,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [hasTappedStep1, setHasTappedStep1] = useState(false);
  const [contentKey, setContentKey] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const pulseLoopRef = useRef<Animated.CompositeAnimation | null>(null);
  const mountedRef = useRef(false);

  // Animations
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(15)).current;
  const contentFadeAnim = useRef(new Animated.Value(1)).current;

  const clearAllTimers = () => {
    timersRef.current.forEach(t => clearTimeout(t));
    timersRef.current = [];
  };

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      clearAllTimers();
      if (pulseLoopRef.current) {
        pulseLoopRef.current.stop();
        pulseLoopRef.current = null;
      }
      pulseAnim.stopAnimation();
      fadeAnim.stopAnimation();
      slideAnim.stopAnimation();
      contentFadeAnim.stopAnimation();
    };
  }, []);

  useEffect(() => {
    if (visible) {
      clearAllTimers();
      setStep(1);
      setHasTappedStep1(false);
      setContentKey(k => k + 1);
      fadeAnim.setValue(0);
      slideAnim.setValue(15);
      contentFadeAnim.setValue(1);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.spring(slideAnim, { toValue: 0, friction: 8, useNativeDriver: true }),
      ]).start();
    }
  }, [visible, fadeAnim, slideAnim]);

  useEffect(() => {
    // Pulse animation for target spotlight
    if (pulseLoopRef.current) {
      pulseLoopRef.current.stop();
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.15, duration: 600, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      ])
    );
    pulseLoopRef.current = loop;
    loop.start();
    return () => {
      if (pulseLoopRef.current) {
        pulseLoopRef.current.stop();
        pulseLoopRef.current = null;
      }
    };
  }, [pulseAnim]);

  if (!visible) return null;

  const handleStep1Tap = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    soundManager.play('placePuppy');
    setHasTappedStep1(true);
    // Do NOT place puppy on actual board during tutorial — visual only (hasTappedStep1)
    // The real placement happens on tutorial finish so board is clean until then

    // Auto advance to step 2 after a brief celebratory moment
    const t = setTimeout(() => {
      advanceToStep(2);
    }, 700);
    timersRef.current.push(t);
  };

  const advanceToStep = (nextStep: 2 | 3) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    soundManager.play('button');

    // Do NOT call onMarkCell during tutorial — those visuals are for learning only.
    // The real game board must stay clean until user finishes tutorial.

    // Step change: fade content OUT → swap step → fade content IN.
    // This prevents "flash" where new content appears mid-fade.
    Animated.timing(contentFadeAnim, {
      toValue: 0,
      duration: 120,
      useNativeDriver: true,
    }).start(() => {
      if (!mountedRef.current) return;
      setStep(nextStep);
      setContentKey(k => k + 1);
      Animated.timing(contentFadeAnim, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleFinish = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    soundManager.play('complete');
    setTutorialSeen(true);
    // NEVER auto-place on finish — getRandomizedLevel1() randomly transforms the puzzle,
    // so hardcoded (1, 3) is WRONG 7/8 of the time. The single-cell colour
    // region could be at any of 8 positions. User applies the concept on a clean board.
    onClose();
  };

  const handleSkip = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    soundManager.play('button');
    setTutorialSeen(true);
    // Skip = board stays clean, no auto-placements (user wants to try it fresh)
    onClose();
  };

  return (
    <View style={styles.overlay}>
      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Top Bar with Step indicator and Skip — stays stable across steps */}
        <View style={styles.header}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>Rule {step} of 3</Text>
          </View>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip} activeOpacity={0.7}>
            <Text style={styles.skipText}>Skip Tutorial</Text>
          </TouchableOpacity>
        </View>

        {/* Content area fades between steps — prevents flicker from React re-mounting */}
        <Animated.View
          key={contentKey}
          style={{
            opacity: contentFadeAnim,
          }}
        >
          {/* Character Lore Speech Card */}
          <View style={styles.dialogueCard}>
            <View style={styles.avatarWrapper}>
              <JennyAvatar size={54} mood={step === 3 ? 'cheering' : 'friendly'} />
            </View>
            <View style={styles.speechContent}>
              <Text style={styles.speakerName}>Jenny</Text>
              {step === 1 && (
                <Text style={styles.ruleTitle}>
                  "Every color patch has exactly ONE puppy!"
                </Text>
              )}
              {step === 2 && (
                <Text style={styles.ruleTitle}>
                  "Puppies need personal space! They cannot touch—not even diagonally!"
                </Text>
              )}
              {step === 3 && (
                <Text style={styles.ruleTitle}>
                  "Each row and column only has room for ONE puppy!"
                </Text>
              )}

              <Text style={styles.ruleExplanation}>
                {step === 1 &&
                  "Notice this small single-cell patch? A puppy must go right here! Tap the spotlight to place our first pup."}
                {step === 2 &&
                  "See those paw marks around the puppy? No other dog can touch this pup, even diagonally. They love their naps undisturbed!"}
                {step === 3 &&
                  "Every row, column, and color patch will have exactly 1 happy puppy. You're ready to solve Level 1!"}
              </Text>
            </View>
          </View>

          {/* Interactive Spotlight Demonstration Box */}
          <View style={styles.spotlightCard}>
            {step === 1 && (
              <View key="step1" style={styles.spotlightInteractiveArea}>
                <Text style={styles.interactiveInstruction}>
                  👇 Tap the sunny spot below:
                </Text>

                <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                  <TouchableOpacity
                    style={[
                      styles.targetSpotlightCell,
                      hasTappedStep1 && styles.targetSpotlightCellTapped,
                    ]}
                    onPress={handleStep1Tap}
                    activeOpacity={0.8}
                  >
                    {hasTappedStep1 ? (
                      <PuppySprite size={46} breed="corgi" />
                    ) : (
                      <View style={styles.targetInnerGlow}>
                        <Text style={styles.tapHandEmoji}>👆</Text>
                        <Text style={styles.targetLabel}>TAP HERE</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </Animated.View>

                {hasTappedStep1 && (
                  <Text style={styles.successNote}>🎉 Splendid! Puppy placed!</Text>
                )}
              </View>
            )}

            {step === 2 && (
              <View key="step2" style={styles.spotlightInteractiveArea}>
                <View style={styles.miniSpaceGrid}>
                  {/* Visual 3x3 showing puppy in center and ✕ all around */}
                  <View style={styles.miniRow}>
                    <View style={styles.miniCrossCell}><Image source={PAW_IMAGE} style={styles.miniPaw} resizeMode="contain" /></View>
                    <View style={styles.miniCrossCell}><Image source={PAW_IMAGE} style={styles.miniPaw} resizeMode="contain" /></View>
                    <View style={styles.miniCrossCell}><Image source={PAW_IMAGE} style={styles.miniPaw} resizeMode="contain" /></View>
                  </View>
                  <View style={styles.miniRow}>
                    <View style={styles.miniCrossCell}><Image source={PAW_IMAGE} style={styles.miniPaw} resizeMode="contain" /></View>
                    <View style={styles.miniPuppyCenter}>
                      <PuppySprite size={32} breed="corgi" />
                    </View>
                    <View style={styles.miniCrossCell}><Image source={PAW_IMAGE} style={styles.miniPaw} resizeMode="contain" /></View>
                  </View>
                  <View style={styles.miniRow}>
                    <View style={styles.miniCrossCell}><Image source={PAW_IMAGE} style={styles.miniPaw} resizeMode="contain" /></View>
                    <View style={styles.miniCrossCell}><Image source={PAW_IMAGE} style={styles.miniPaw} resizeMode="contain" /></View>
                    <View style={styles.miniCrossCell}><Image source={PAW_IMAGE} style={styles.miniPaw} resizeMode="contain" /></View>
                  </View>
                </View>

                <Text style={styles.spaceNote}>
                  🛡️ 8-directional personal space buffer is now marked!
                </Text>

                <CandyButton
                  block
                  skin="blue"
                  label="Next: Row & Column Rule ➡️"
                  onPress={() => advanceToStep(3)}
                  style={styles.actionButtonWrap}
                />
              </View>
            )}

            {step === 3 && (
              <View key="step3" style={styles.spotlightInteractiveArea}>
                <View style={styles.ruleSummaryCard}>
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryIcon}>🎨</Text>
                    <Text style={styles.summaryText}>1 Puppy per Color Patch</Text>
                  </View>
                  <View style={styles.summaryDivider} />
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryIcon}>🚫</Text>
                    <Text style={styles.summaryText}>No Touching (even diagonally)</Text>
                  </View>
                  <View style={styles.summaryDivider} />
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryIcon}>↔️</Text>
                    <Text style={styles.summaryText}>1 Puppy per Row & Column</Text>
                  </View>
                </View>

                <CandyButton
                  block
                  size="lg"
                  skin="green"
                  label="Let's Solve Level 1! 🐕"
                  onPress={handleFinish}
                  style={styles.actionButtonWrap}
                />
              </View>
            )}
          </View>
        </Animated.View>
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
    backgroundColor: 'rgba(23, 17, 13, 0.78)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1500,
    padding: 16,
  },
  container: {
    width: '100%',
    maxWidth: 390,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepBadge: {
    backgroundColor: '#25B84E',
    borderWidth: 1.5,
    borderColor: '#0F6B2B',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
  },
  stepBadgeText: {
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
  dialogueCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(20, 10, 44, 0.42)',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1.5,
    borderColor: CANDY_SURFACE.border,
    gap: 12,
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  avatarWrapper: {
    marginTop: 2,
  },
  speechContent: {
    flex: 1,
  },
  speakerName: {
    fontSize: 12,
    fontWeight: '900',
    color: CANDY_GOLD.base,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  ruleTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: CANDY_TEXT.onDark,
    lineHeight: 20,
    marginBottom: 6,
  },
  ruleExplanation: {
    fontSize: 12.5,
    fontWeight: '600',
    color: CANDY_TEXT.onDarkSoft,
    lineHeight: 17,
  },
  spotlightCard: {
    backgroundColor: 'rgba(20, 10, 44, 0.42)',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: CANDY_SURFACE.border,
    alignItems: 'center',
  },
  spotlightInteractiveArea: {
    width: '100%',
    alignItems: 'center',
  },
  interactiveInstruction: {
    fontSize: 13,
    fontWeight: '800',
    color: CANDY_TEXT.onDarkSoft,
    marginBottom: 14,
  },
  targetSpotlightCell: {
    width: 80,
    height: 80,
    borderRadius: 22,
    backgroundColor: '#F5B324',
    borderWidth: 3.5,
    borderColor: CANDY_GOLD.light,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: CANDY_GOLD.base,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 14,
    elevation: 10,
  },
  targetSpotlightCellTapped: {
    backgroundColor: '#25B84E',
    borderColor: '#8CFFA8',
    shadowColor: '#25B84E',
  },
  targetInnerGlow: {
    alignItems: 'center',
  },
  tapHandEmoji: {
    fontSize: 26,
    marginBottom: 2,
  },
  targetLabel: {
    fontSize: 11,
    fontWeight: '900',
    color: '#4A3000',
    letterSpacing: 0.5,
  },
  successNote: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: '900',
    color: '#8CFFA8',
  },
  miniSpaceGrid: {
    backgroundColor: 'rgba(20, 10, 44, 0.55)',
    padding: 10,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: CANDY_SURFACE.bevel,
    marginBottom: 12,
  },
  miniRow: {
    flexDirection: 'row',
  },
  miniCrossCell: {
    width: 38,
    height: 38,
    margin: 2,
    backgroundColor: 'rgba(255, 122, 138, 0.18)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 122, 138, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniPaw: {
    width: 20,
    height: 20,
    opacity: 0.85,
  },
  miniPuppyCenter: {
    width: 38,
    height: 38,
    margin: 2,
    backgroundColor: '#F5B324',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: CANDY_GOLD.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceNote: {
    fontSize: 12,
    fontWeight: '600',
    color: CANDY_TEXT.onDarkSoft,
    textAlign: 'center',
    marginBottom: 14,
    lineHeight: 16,
  },
  actionButtonWrap: {
    width: '100%',
  },
  ruleSummaryCard: {
    width: '100%',
    backgroundColor: 'rgba(20, 10, 44, 0.42)',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1.5,
    borderColor: CANDY_SURFACE.border,
    marginBottom: 14,
    gap: 8,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  summaryIcon: {
    fontSize: 18,
  },
  summaryText: {
    fontSize: 13,
    fontWeight: '800',
    color: CANDY_TEXT.onDark,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: CANDY_SURFACE.border,
  },
});
