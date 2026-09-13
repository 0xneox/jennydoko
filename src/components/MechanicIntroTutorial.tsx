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
import { setMechanicIntroSeen, MechanicIntroKey } from '../utils/storage';
import { JennyAvatar } from './assets/JennyAvatar';
import { PuppySprite } from './assets/PuppySprite';
import { CandyButton } from './candy/CandyButton';
import { CANDY_GOLD, CANDY_SURFACE, CANDY_TEXT } from '../utils/theme';

const PAW_IMAGE = require('../../assets/paw.png');

export type MechanicType = 'cats' | 'linked' | 'twin';

interface MechanicIntroTutorialProps {
  visible: boolean;
  mechanic: MechanicType;
  onClose: () => void;
}

interface MechanicScript {
  emoji: string;
  title: string;
  prompt: string;
  jennyLine: string;
  successLine: string;
  buttonLabel: string;
}

const SCRIPTS: Record<MechanicType, MechanicScript> = {
  cats: {
    emoji: '😾',
    title: 'Grumpy Cats!',
    prompt: '👇 Tap any cell around Whiskers to see her space rule:',
    jennyLine: 'That\'s Whiskers! She needs lots of personal space — no puppy can sit next to her, not even diagonally!',
    successLine: 'Cats need space. You\'ve got this! 🐾',
    buttonLabel: 'Got it! Let\'s play! 🐕',
  },
  linked: {
    emoji: '🔗',
    title: 'Twinsies Beds!',
    prompt: '👇 Tap a bed to see its twin light up:',
    jennyLine: 'These flower beds are TWINSIES 🔗 — they share one puppy! Place a pup in either bed and both are happy!',
    successLine: 'One pup, two beds — twinsies! You\'ve got this! 🐾',
    buttonLabel: 'Got it! Let\'s play! 🐕',
  },
  twin: {
    emoji: '👯',
    title: 'Twin Puppies!',
    prompt: '👇 Tap the row to see two pups bounce in:',
    jennyLine: 'TWO pups per row, column, and patch now! Double the puppies, double the fun — but they still can\'t touch!',
    successLine: 'Two pups per row — double trouble! You\'ve got this! 🐾',
    buttonLabel: 'Got it! Let\'s play! 🐕',
  },
};

export const MechanicIntroTutorial: React.FC<MechanicIntroTutorialProps> = ({
  visible,
  mechanic,
  onClose,
}) => {
  const [hasTapped, setHasTapped] = useState(false);
  const [contentKey, setContentKey] = useState(0);
  const mountedRef = useRef(false);
  const pulseLoopRef = useRef<Animated.CompositeAnimation | null>(null);
  const linkedGlowLoop = useRef<Animated.CompositeAnimation | null>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(15)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const contentFadeAnim = useRef(new Animated.Value(1)).current;
  const glowA = useRef(new Animated.Value(0.3)).current;
  const glowB = useRef(new Animated.Value(0.8)).current;
  const twinBounceA = useRef(new Animated.Value(0)).current;
  const twinBounceB = useRef(new Animated.Value(0)).current;

  const script = SCRIPTS[mechanic];

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (pulseLoopRef.current) pulseLoopRef.current.stop();
      if (linkedGlowLoop.current) linkedGlowLoop.current.stop();
    };
  }, []);

  useEffect(() => {
    if (visible) {
      setHasTapped(false);
      setContentKey(k => k + 1);
      fadeAnim.setValue(0);
      slideAnim.setValue(15);
      contentFadeAnim.setValue(1);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.spring(slideAnim, { toValue: 0, friction: 8, useNativeDriver: true }),
      ]).start();
    }
  }, [visible, mechanic, fadeAnim, slideAnim]);

  // Pulse animation for the tap target
  useEffect(() => {
    if (!visible || hasTapped) return;
    if (pulseLoopRef.current) pulseLoopRef.current.stop();
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
  }, [visible, hasTapped, pulseAnim]);

  // Linked beds: alternate glow between two patches
  useEffect(() => {
    if (!visible || mechanic !== 'linked' || hasTapped) return;
    if (linkedGlowLoop.current) linkedGlowLoop.current.stop();
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(glowA, { toValue: 0.85, duration: 700, useNativeDriver: true }),
        Animated.timing(glowA, { toValue: 0.3, duration: 400, useNativeDriver: true }),
        Animated.timing(glowB, { toValue: 0.85, duration: 700, useNativeDriver: true }),
        Animated.timing(glowB, { toValue: 0.3, duration: 400, useNativeDriver: true }),
      ])
    );
    linkedGlowLoop.current = loop;
    loop.start();
    return () => {
      if (linkedGlowLoop.current) {
        linkedGlowLoop.current.stop();
        linkedGlowLoop.current = null;
      }
    };
  }, [visible, mechanic, hasTapped, glowA, glowB]);

  if (!visible) return null;

  const handleTap = () => {
    if (hasTapped) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    soundManager.play('placePuppy');
    setHasTapped(true);

    if (mechanic === 'twin') {
      // Bounce both pups in
      Animated.spring(twinBounceA, { toValue: 1, friction: 4, tension: 80, useNativeDriver: true }).start();
      setTimeout(() => {
        if (mountedRef.current) {
          Animated.spring(twinBounceB, { toValue: 1, friction: 4, tension: 80, useNativeDriver: true }).start();
        }
      }, 200);
    }
  };

  const handleFinish = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    soundManager.play('complete');
    setMechanicIntroSeen(mechanic as MechanicIntroKey);
    onClose();
  };

  const handleSkip = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    soundManager.play('button');
    setMechanicIntroSeen(mechanic as MechanicIntroKey);
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
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>New: {script.title}</Text>
          </View>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip} activeOpacity={0.7}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        <Animated.View key={contentKey} style={{ opacity: contentFadeAnim }}>
          {/* Jenny Speech */}
          <View style={styles.dialogueCard}>
            <View style={styles.avatarWrapper}>
              <JennyAvatar size={54} mood="friendly" />
            </View>
            <View style={styles.speechContent}>
              <Text style={styles.speakerName}>Jenny</Text>
              <Text style={styles.ruleTitle}>"{script.jennyLine}"</Text>
            </View>
          </View>

          {/* Interactive Demo */}
          <View style={styles.spotlightCard}>
            {!hasTapped && (
              <Text style={styles.interactiveInstruction}>{script.prompt}</Text>
            )}

            {/* CATS: mini 3x3 grid with cat in center, tap to X out neighbors */}
            {mechanic === 'cats' && (
              <View style={styles.miniGrid}>
                {[-1, 0, 1].map(dr => (
                  <View key={dr} style={styles.miniRow}>
                    {[-1, 0, 1].map(dc => {
                      const isCat = dr === 0 && dc === 0;
                      const isExcluded = !isCat;
                      return (
                        <View
                          key={`${dr}-${dc}`}
                          style={[
                            styles.miniCell,
                            isCat && styles.miniCatCell,
                            hasTapped && isExcluded && styles.miniExcludedCell,
                          ]}
                        >
                          {isCat && <Text style={styles.catEmoji}>😾</Text>}
                          {hasTapped && isExcluded && (
                            <Image source={PAW_IMAGE} style={styles.miniPaw} resizeMode="contain" />
                          )}
                        </View>
                      );
                    })}
                  </View>
                ))}
              </View>
            )}

            {/* LINKED: two patches glowing alternately, tap to place pup */}
            {mechanic === 'linked' && (
              <View style={styles.linkedDemo}>
                <Animated.View style={[styles.linkedPatch, { opacity: glowA }]}>
                  {hasTapped ? (
                    <PuppySprite size={36} breed="corgi" />
                  ) : (
                    <Text style={styles.patchEmoji}>🌸</Text>
                  )}
                </Animated.View>
                <Text style={styles.linkedArrow}>🔗</Text>
                <Animated.View style={[styles.linkedPatch, { opacity: glowB }]}>
                  {hasTapped ? (
                    <View style={styles.linkedGlowPup}>
                      <PuppySprite size={36} breed="corgi" />
                    </View>
                  ) : (
                    <Text style={styles.patchEmoji}>🌺</Text>
                  )}
                </Animated.View>
              </View>
            )}

            {/* TWIN: row with two bouncing pups */}
            {mechanic === 'twin' && (
              <View style={styles.twinDemo}>
                <View style={styles.twinRow}>
                  <Animated.View
                    style={[
                      styles.twinCell,
                      {
                        transform: [{
                          scale: twinBounceA.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.3, 1],
                          }),
                        }],
                        opacity: twinBounceA,
                      },
                    ]}
                  >
                    {hasTapped && <PuppySprite size={32} breed="corgi" />}
                  </Animated.View>
                  <View style={styles.twinCell} />
                  <View style={styles.twinCell} />
                  <Animated.View
                    style={[
                      styles.twinCell,
                      {
                        transform: [{
                          scale: twinBounceB.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.3, 1],
                          }),
                        }],
                        opacity: twinBounceB,
                      },
                    ]}
                  >
                    {hasTapped && <PuppySprite size={32} breed="corgi" />}
                  </Animated.View>
                </View>
                <Text style={styles.twinNote}>2 pups per row, column & patch!</Text>
              </View>
            )}

            {/* Tap target or success + finish */}
            {!hasTapped ? (
              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <TouchableOpacity
                  style={styles.tapTarget}
                  onPress={handleTap}
                  activeOpacity={0.8}
                >
                  <Text style={styles.tapHandEmoji}>👆</Text>
                  <Text style={styles.tapLabel}>TAP HERE</Text>
                </TouchableOpacity>
              </Animated.View>
            ) : (
              <View style={styles.successArea}>
                <Text style={styles.successNote}>🎉 {script.successLine}</Text>
                <CandyButton
                  block
                  size="lg"
                  skin="green"
                  label={script.buttonLabel}
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
    backgroundColor: '#7C5CBF',
    borderWidth: 1.5,
    borderColor: CANDY_GOLD.base,
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
    fontSize: 14,
    fontWeight: '800',
    color: CANDY_TEXT.onDark,
    lineHeight: 19,
  },
  spotlightCard: {
    backgroundColor: 'rgba(20, 10, 44, 0.42)',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: CANDY_SURFACE.border,
    alignItems: 'center',
  },
  interactiveInstruction: {
    fontSize: 13,
    fontWeight: '800',
    color: CANDY_TEXT.onDarkSoft,
    marginBottom: 14,
    textAlign: 'center',
  },
  miniGrid: {
    backgroundColor: 'rgba(20, 10, 44, 0.55)',
    padding: 10,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: CANDY_SURFACE.bevel,
    marginBottom: 14,
  },
  miniRow: {
    flexDirection: 'row',
  },
  miniCell: {
    width: 42,
    height: 42,
    margin: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniCatCell: {
    backgroundColor: '#5B2A4E',
    borderColor: '#A04A7E',
  },
  miniExcludedCell: {
    backgroundColor: 'rgba(255, 122, 138, 0.18)',
    borderColor: 'rgba(255, 122, 138, 0.45)',
  },
  catEmoji: {
    fontSize: 22,
  },
  miniPaw: {
    width: 18,
    height: 18,
    opacity: 0.85,
  },
  linkedDemo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 14,
  },
  linkedPatch: {
    width: 64,
    height: 64,
    borderRadius: 16,
    borderWidth: 2.5,
    borderColor: CANDY_GOLD.light,
    backgroundColor: 'rgba(245, 179, 36, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  patchEmoji: {
    fontSize: 28,
  },
  linkedArrow: {
    fontSize: 22,
  },
  linkedGlowPup: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  twinDemo: {
    alignItems: 'center',
    marginBottom: 14,
  },
  twinRow: {
    flexDirection: 'row',
    gap: 4,
    backgroundColor: 'rgba(20, 10, 44, 0.55)',
    padding: 8,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: CANDY_SURFACE.bevel,
  },
  twinCell: {
    width: 44,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  twinNote: {
    fontSize: 12,
    fontWeight: '700',
    color: CANDY_TEXT.onDarkSoft,
    marginTop: 10,
  },
  tapTarget: {
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
  tapHandEmoji: {
    fontSize: 26,
    marginBottom: 2,
  },
  tapLabel: {
    fontSize: 11,
    fontWeight: '900',
    color: '#4A3000',
    letterSpacing: 0.5,
  },
  successArea: {
    width: '100%',
    alignItems: 'center',
  },
  successNote: {
    fontSize: 13,
    fontWeight: '900',
    color: '#8CFFA8',
    marginBottom: 14,
    textAlign: 'center',
  },
  actionButtonWrap: {
    width: '100%',
  },
});
