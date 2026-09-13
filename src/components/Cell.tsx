import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Image, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CellValue } from '../game/types';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { getRegionTheme } from '../utils/colors';
import { getTileGradient } from '../utils/theme';

const JENNY_PUPPY_IMAGE = require('../../assets/jennyim.png');
const PAW_IMAGE = require('../../assets/paw.png');

export interface CellBorders {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
}

interface CellProps {
  value: CellValue;
  onPress: () => void;
  regionId?: number;
  /** Slot size. The candy face is inset within this, so the grid pitch stays exactly `size`. */
  size: number;
  isWrong?: boolean;
  isHinted?: boolean;
  isCatAura?: boolean;
  isLinkedPulse?: boolean;
  /** When true, puppy renders with a colored bow (twin puppy mode). */
  showBow?: boolean;
  isCompleting?: boolean;
  /** True when this cell belongs to a non-contiguous "linked bed" region. */
  isLinked?: boolean;
  borders?: CellBorders;
  row?: number;
  col?: number;
}

const CellComponent: React.FC<CellProps> = ({
  value,
  onPress,
  regionId,
  size,
  isWrong,
  isHinted,
  isCatAura,
  isLinkedPulse,
  showBow,
  isCompleting,
  isLinked = false,
  borders = { top: true, bottom: true, left: true, right: true },
  row = 0,
  col = 0,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const heartAnim = useRef(new Animated.Value(0)).current;
  const celebrateAnim = useRef(new Animated.Value(1)).current;
  const hintPulseAnim = useRef(new Animated.Value(0)).current;
  const catWiggleAnim = useRef(new Animated.Value(0)).current;
  const zzzAnim = useRef(new Animated.Value(0)).current;
  const linkedPulseAnim = useRef(new Animated.Value(0)).current;
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [showHeart, setShowHeart] = useState(false);
  const [showZzz, setShowZzz] = useState(false);
  const prevValue = useRef(value);

  // Animate on value change
  useEffect(() => {
    if (prevValue.current !== value) {
      if (value === 'puppy') {
        // Overshoot squash-and-stretch: candy games sell a placement with a pop
        scaleAnim.setValue(0.55);
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 3.6,
          tension: 130,
          useNativeDriver: true,
        }).start();

        setShowHeart(true);
        heartAnim.setValue(0);
        Animated.timing(heartAnim, {
          toValue: 1,
          duration: 650,
          useNativeDriver: true,
        }).start(() => setShowHeart(false));
      } else if (value === 'marked') {
        scaleAnim.setValue(0.6);
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 5,
          tension: 100,
          useNativeDriver: true,
        }).start();
      }
      prevValue.current = value;
    }
  }, [value, scaleAnim, heartAnim]);

  // Animate wrong move shake
  useEffect(() => {
    if (isWrong) {
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: -7, duration: 40, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 7, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -5, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 5, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -2, duration: 40, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 40, useNativeDriver: true }),
      ]).start();
    }
  }, [isWrong, shakeAnim]);

  // Pulsing gold ring on the hinted cell — Jenny's spotlight
  useEffect(() => {
    if (!isHinted) {
      hintPulseAnim.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(hintPulseAnim, { toValue: 1, duration: 450, useNativeDriver: true }),
        Animated.timing(hintPulseAnim, { toValue: 0.35, duration: 450, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [isHinted, hintPulseAnim]);

  // Cat ear wiggle + Zzz bubble — cats are sleepy but alert
  useEffect(() => {
    if (value !== 'cat') {
      catWiggleAnim.setValue(0);
      setShowZzz(false);
      return;
    }
    // Gentle wiggle loop
    const wiggleLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(catWiggleAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(catWiggleAnim, { toValue: -1, duration: 800, useNativeDriver: true }),
      ])
    );
    wiggleLoop.start();

    // Zzz bubble: show after 1s, float up and fade, repeat
    let zzzLoop: Animated.CompositeAnimation | null = null;
    const zzzTimer = setTimeout(() => {
      setShowZzz(true);
      zzzLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(zzzAnim, { toValue: 1, duration: 2500, useNativeDriver: true }),
          Animated.timing(zzzAnim, { toValue: 0, duration: 0, useNativeDriver: true }),
        ])
      );
      zzzLoop.start();
    }, 1000);

    return () => {
      wiggleLoop.stop();
      clearTimeout(zzzTimer);
      if (zzzLoop) zzzLoop.stop();
      setShowZzz(false);
    };
  }, [value, catWiggleAnim, zzzAnim]);

  // Linked bed pulse: twin piece glows when its partner is tapped
  useEffect(() => {
    if (!isLinkedPulse) {
      linkedPulseAnim.setValue(0);
      return;
    }
    Animated.sequence([
      Animated.timing(linkedPulseAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(linkedPulseAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, [isLinkedPulse, linkedPulseAnim]);

  // Cascading celebration bounce + happy flip when the board completes
  useEffect(() => {
    if (!isCompleting || value !== 'puppy') {
      celebrateAnim.setValue(1);
      flipAnim.setValue(0);
      return;
    }
    let loopAnim: Animated.CompositeAnimation | null = null;
    const timeoutId = setTimeout(() => {
      // Happy flip: 360° spin before the bounce loop kicks in
      Animated.timing(flipAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
      loopAnim = Animated.loop(
        Animated.sequence([
          Animated.timing(celebrateAnim, { toValue: 1.25, duration: 220, useNativeDriver: true }),
          Animated.timing(celebrateAnim, { toValue: 0.92, duration: 180, useNativeDriver: true }),
          Animated.timing(celebrateAnim, { toValue: 1.05, duration: 150, useNativeDriver: true }),
          Animated.timing(celebrateAnim, { toValue: 1, duration: 140, useNativeDriver: true }),
          Animated.delay(300),
        ])
      );
      loopAnim.start();
    }, (row + col) * 70);

    return () => {
      clearTimeout(timeoutId);
      if (loopAnim) loopAnim.stop();
      celebrateAnim.setValue(1);
      flipAnim.setValue(0);
    };
  }, [isCompleting, value, row, col, celebrateAnim, flipAnim]);

  const theme = getRegionTheme(regionId);
  const gradient = getTileGradient(regionId);

  // Region identity is carried by hue plus whitespace: tiles on a region
  // boundary pull further in, so each region reads as its own cluster of candies
  // without needing asymmetric borders that break the rounded silhouette.
  const gapEdge = Math.max(2.5, size * 0.075);
  const gapInner = Math.max(1, size * 0.028);
  const inset = {
    top: borders.top ? gapEdge : gapInner,
    bottom: borders.bottom ? gapEdge : gapInner,
    left: borders.left ? gapEdge : gapInner,
    right: borders.right ? gapEdge : gapInner,
  };

  const faceWidth = size - inset.left - inset.right;
  const faceHeight = size - inset.top - inset.bottom;
  const radius = Math.max(5, Math.min(faceWidth, faceHeight) * 0.28);

  const tapGesture = Gesture.Tap()
    .onEnd(() => {
      onPress();
    })
    .simultaneousWithExternalGesture(Gesture.Native())
    .runOnJS(true);

  return (
    <GestureDetector gesture={tapGesture}>
      {/* Fixed-size slot keeps the grid pitch uniform for drag hit-testing */}
      <View style={{ width: size, height: size }} hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}>
        <Animated.View
          style={{
            position: 'absolute',
            top: inset.top,
            left: inset.left,
            width: faceWidth,
            height: faceHeight,
            transform: [{ translateX: shakeAnim }, { scale: scaleAnim }],
          }}
        >
          <LinearGradient
            colors={gradient}
            style={[
              styles.face,
              {
                borderRadius: radius,
                borderColor: isWrong ? '#FF3B3B' : isHinted ? '#FFD24A' : theme.border,
                borderWidth: isWrong ? 2.5 : isHinted ? 3 : 1.5,
              },
            ]}
          >
            {/* Jenny's pulsing hint spotlight */}
            {isHinted && (
              <Animated.View
                pointerEvents="none"
                style={[
                  StyleSheet.absoluteFill,
                  {
                    borderRadius: radius,
                    backgroundColor: '#FFD24A',
                    opacity: hintPulseAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.15, 0.45],
                    }),
                  },
                ]}
              />
            )}

            {/* Cat aura: soft red glow on cells touching a cat (board reveal) */}
            {isCatAura && (
              <View
                pointerEvents="none"
                style={[
                  StyleSheet.absoluteFill,
                  {
                    borderRadius: radius,
                    backgroundColor: 'rgba(255, 80, 100, 0.22)',
                    borderWidth: 1.5,
                    borderColor: 'rgba(255, 80, 100, 0.45)',
                  },
                ]}
              />
            )}

            {/* Linked bed pulse: twin piece glows when partner is tapped */}
            {isLinkedPulse && (
              <Animated.View
                pointerEvents="none"
                style={[
                  StyleSheet.absoluteFill,
                  {
                    borderRadius: radius,
                    backgroundColor: '#7FE9D8',
                    opacity: linkedPulseAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 0.5],
                    }),
                  },
                ]}
              />
            )}

            {/* Dark base wash for candy depth at the bottom of the dome */}
            <LinearGradient
              colors={['rgba(255,255,255,0)', 'rgba(0,0,0,0.22)']}
              style={StyleSheet.absoluteFill}
              pointerEvents="none"
            />

            {/* Inset rounded dome sheen — the real gloss cue */}
            <View
              pointerEvents="none"
              style={[
                styles.domeGloss,
                {
                  borderRadius: radius * 0.85,
                  height: faceHeight * 0.4,
                },
              ]}
            />

            {/* Inner light ring, as if the candy has a thin sugar shell */}
            <View
              pointerEvents="none"
              style={[styles.innerRing, { borderRadius: radius - 1.5 }]}
            />

            {/* Subtle paw-print emboss on unoccupied tiles */}
            {(value === 'empty' || value === 'marked') && (
              <Image
                source={PAW_IMAGE}
                style={[
                  styles.pawBackground,
                  { width: faceWidth * 0.5, height: faceWidth * 0.5 },
                ]}
                resizeMode="contain"
              />
            )}

            {value === 'puppy' && (
              <Animated.Image
                source={JENNY_PUPPY_IMAGE}
                resizeMode="contain"
                style={{
                  width: Math.max(20, faceWidth * 0.8),
                  height: Math.max(20, faceHeight * 0.8),
                  transform: [
                    { scale: celebrateAnim },
                    { rotateY: flipAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    })},
                  ],
                  zIndex: 10,
                }}
              />
            )}

            {value === 'puppy' && showBow && (
              <Text style={styles.bowBadge}>🎀</Text>
            )}

            {value === 'marked' && (
              <Image
                source={PAW_IMAGE}
                resizeMode="contain"
                style={[
                  styles.pawMark,
                  {
                    width: Math.max(12, faceWidth * 0.5),
                    height: Math.max(12, faceWidth * 0.5),
                  },
                ]}
              />
            )}

            {value === 'cat' && (
              <Animated.Text
                style={[
                  styles.catFace,
                  {
                    fontSize: Math.max(16, faceWidth * 0.52),
                    transform: [{ rotate: catWiggleAnim.interpolate({
                      inputRange: [-1, 0, 1],
                      outputRange: ['-8deg', '0deg', '8deg'],
                    })}],
                  },
                ]}
              >
                😾
              </Animated.Text>
            )}

            {value === 'cat' && showZzz && (
              <Animated.Text
                style={[
                  styles.zzzBubble,
                  {
                    opacity: zzzAnim.interpolate({
                      inputRange: [0, 0.3, 0.7, 1],
                      outputRange: [0, 0.8, 0.8, 0],
                    }),
                    transform: [{
                      translateY: zzzAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -faceHeight * 0.8],
                      }),
                    }],
                  },
                ]}
              >
                💤
              </Animated.Text>
            )}

            {isLinked && (
              <Text style={styles.linkBadge}>🔗</Text>
            )}
          </LinearGradient>

          {showHeart && (
            <Animated.Text
              style={[
                styles.heartBubble,
                {
                  opacity: heartAnim.interpolate({
                    inputRange: [0, 0.2, 0.7, 1],
                    outputRange: [0, 1, 1, 0],
                  }),
                  transform: [
                    {
                      translateY: heartAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -size * 0.6],
                      }),
                    },
                    {
                      scale: heartAnim.interpolate({
                        inputRange: [0, 0.3, 1],
                        outputRange: [0.6, 1.3, 0.9],
                      }),
                    },
                  ],
                },
              ]}
            >
              ❤️
            </Animated.Text>
          )}
        </Animated.View>
      </View>
    </GestureDetector>
  );
};

// onPress is excluded from the comparison: Board passes a per-cell closure over
// a stable callback, so a stale onPress still routes to the latest handler.
export const Cell = React.memo(CellComponent, (prev, next) => {
  const pb = prev.borders;
  const nb = next.borders;
  return (
    prev.value === next.value &&
    prev.regionId === next.regionId &&
    prev.size === next.size &&
    prev.isLinked === next.isLinked &&
    prev.isWrong === next.isWrong &&
    prev.isHinted === next.isHinted &&
    prev.isCatAura === next.isCatAura &&
    prev.isLinkedPulse === next.isLinkedPulse &&
    prev.showBow === next.showBow &&
    prev.isCompleting === next.isCompleting &&
    pb?.top === nb?.top &&
    pb?.bottom === nb?.bottom &&
    pb?.left === nb?.left &&
    pb?.right === nb?.right
  );
});

const styles = StyleSheet.create({
  face: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  domeGloss: {
    position: 'absolute',
    top: 1.5,
    left: '12%',
    right: '12%',
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
  },
  innerRing: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
  pawBackground: {
    position: 'absolute',
    opacity: 0.18,
  },
  pawMark: {
    position: 'absolute',
    opacity: 0.85,
    zIndex: 5,
  },
  catFace: {
    zIndex: 10,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 1.5 },
    textShadowRadius: 2,
  },
  linkBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    fontSize: 11,
    zIndex: 30,
  },
  bowBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    fontSize: Math.max(10, 12),
    zIndex: 20,
  },
  heartBubble: {
    position: 'absolute',
    top: 2,
    alignSelf: 'center',
    fontSize: 14,
    zIndex: 25,
  },
  zzzBubble: {
    position: 'absolute',
    top: 2,
    right: 6,
    fontSize: 13,
    zIndex: 25,
  },
});
