import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { soundManager } from '../utils/soundManager';
import { setTutorialSeen } from '../utils/storage';
import { JennyAvatar } from './assets/JennyAvatar';
import { PuppySprite } from './assets/PuppySprite';
import { ChalkMarkSprite } from './assets/ChalkMarkSprite';

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

  // Animations
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(15)).current;

  useEffect(() => {
    if (visible) {
      setStep(1);
      setHasTappedStep1(false);
      fadeAnim.setValue(0);
      slideAnim.setValue(15);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.spring(slideAnim, { toValue: 0, friction: 8, useNativeDriver: true }),
      ]).start();
    }
  }, [visible, fadeAnim, slideAnim]);

  useEffect(() => {
    // Pulse animation for target spotlight
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.15, duration: 600, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulseAnim]);

  if (!visible) return null;

  const handleStep1Tap = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    soundManager.play('placePuppy');
    setHasTappedStep1(true);
    // Place puppy at target cell (1, 3) for level 1
    onPlacePuppy(1, 3);

    // Auto advance to step 2 after a brief celebratory moment
    setTimeout(() => {
      advanceToStep(2);
    }, 700);
  };

  const advanceToStep = (nextStep: 2 | 3) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    soundManager.play('button');

    if (nextStep === 2) {
      // Auto-mark personal space cells around (1, 3)
      onMarkCell(0, 2);
      onMarkCell(0, 3);
      onMarkCell(1, 2);
      onMarkCell(2, 2);
      onMarkCell(2, 3);
    }

    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 120, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 180, useNativeDriver: true }),
    ]).start();

    setStep(nextStep);
  };

  const handleFinish = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    soundManager.play('complete');
    setTutorialSeen(true);
    onClose();
  };

  const handleSkip = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    soundManager.play('button');
    setTutorialSeen(true);
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
        {/* Top Bar with Step indicator and Skip */}
        <View style={styles.header}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>Rule {step} of 3</Text>
          </View>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip} activeOpacity={0.7}>
            <Text style={styles.skipText}>Skip Tutorial</Text>
          </TouchableOpacity>
        </View>

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
                "See those ✕ marks around the puppy? No other dog can touch this pup, even diagonally. They love their naps undisturbed!"}
              {step === 3 &&
                "Every row, column, and color patch will have exactly 1 happy puppy. You're ready to solve Level 1!"}
            </Text>
          </View>
        </View>

        {/* Interactive Spotlight Demonstration Box */}
        <View style={styles.spotlightCard}>
          {step === 1 && (
            <View style={styles.spotlightInteractiveArea}>
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
            <View style={styles.spotlightInteractiveArea}>
              <View style={styles.miniSpaceGrid}>
                {/* Visual 3x3 showing puppy in center and ✕ all around */}
                <View style={styles.miniRow}>
                  <View style={styles.miniCrossCell}><ChalkMarkSprite size={18} /></View>
                  <View style={styles.miniCrossCell}><ChalkMarkSprite size={18} /></View>
                  <View style={styles.miniCrossCell}><ChalkMarkSprite size={18} /></View>
                </View>
                <View style={styles.miniRow}>
                  <View style={styles.miniCrossCell}><ChalkMarkSprite size={18} /></View>
                  <View style={styles.miniPuppyCenter}>
                    <PuppySprite size={32} breed="corgi" />
                  </View>
                  <View style={styles.miniCrossCell}><ChalkMarkSprite size={18} /></View>
                </View>
                <View style={styles.miniRow}>
                  <View style={styles.miniCrossCell}><ChalkMarkSprite size={18} /></View>
                  <View style={styles.miniCrossCell}><ChalkMarkSprite size={18} /></View>
                  <View style={styles.miniCrossCell}><ChalkMarkSprite size={18} /></View>
                </View>
              </View>

              <Text style={styles.spaceNote}>
                🛡️ 8-directional personal space buffer is now marked!
              </Text>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => advanceToStep(3)}
                activeOpacity={0.85}
              >
                <Text style={styles.actionButtonText}>Next: Row & Column Rule ➡️</Text>
              </TouchableOpacity>
            </View>
          )}

          {step === 3 && (
            <View style={styles.spotlightInteractiveArea}>
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

              <TouchableOpacity
                style={[styles.actionButton, styles.finishButton]}
                onPress={handleFinish}
                activeOpacity={0.85}
              >
                <Text style={styles.actionButtonText}>Let's Solve Level 1! 🐕</Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: 'rgba(23, 17, 13, 0.78)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1500,
    padding: 16,
  },
  container: {
    width: '100%',
    maxWidth: 390,
    backgroundColor: '#FAF7F2',
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: '#EFE7DA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepBadge: {
    backgroundColor: '#27AE60',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
  },
  stepBadgeText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
    letterSpacing: 0.3,
  },
  skipButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  skipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8A7A68',
  },
  dialogueCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EAE1D2',
    gap: 12,
    alignItems: 'flex-start',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  avatarWrapper: {
    marginTop: 2,
  },
  speechContent: {
    flex: 1,
  },
  speakerName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#27AE60',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  ruleTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2C3E50',
    lineHeight: 20,
    marginBottom: 6,
  },
  ruleExplanation: {
    fontSize: 12.5,
    color: '#655745',
    lineHeight: 17,
  },
  spotlightCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#EFE7DA',
    alignItems: 'center',
  },
  spotlightInteractiveArea: {
    width: '100%',
    alignItems: 'center',
  },
  interactiveInstruction: {
    fontSize: 13,
    fontWeight: '700',
    color: '#7D6A56',
    marginBottom: 14,
  },
  targetSpotlightCell: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#FFF7D6',
    borderWidth: 3.5,
    borderColor: '#F39C12',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F39C12',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 8,
  },
  targetSpotlightCellTapped: {
    backgroundColor: '#E8F5E9',
    borderColor: '#27AE60',
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
    color: '#D35400',
    letterSpacing: 0.5,
  },
  successNote: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: '800',
    color: '#27AE60',
  },
  miniSpaceGrid: {
    backgroundColor: '#F7F4EE',
    padding: 10,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E2D9CA',
    marginBottom: 12,
  },
  miniRow: {
    flexDirection: 'row',
  },
  miniCrossCell: {
    width: 38,
    height: 38,
    margin: 2,
    backgroundColor: 'rgba(231, 76, 60, 0.08)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(231, 76, 60, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniPuppyCenter: {
    width: 38,
    height: 38,
    margin: 2,
    backgroundColor: '#FFF7D6',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#F39C12',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceNote: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7D6A56',
    textAlign: 'center',
    marginBottom: 14,
    lineHeight: 16,
  },
  actionButton: {
    width: '100%',
    backgroundColor: '#2980B9',
    paddingVertical: 13,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#2980B9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  finishButton: {
    backgroundColor: '#27AE60',
    shadowColor: '#27AE60',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 0.3,
  },
  ruleSummaryCard: {
    width: '100%',
    backgroundColor: '#FDFBF7',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EBE2D3',
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
    fontWeight: '700',
    color: '#2C3E50',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#EFE7DB',
  },
});
