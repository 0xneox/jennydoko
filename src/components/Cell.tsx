import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import { CellValue } from '../game/types';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { getRegionColor, getRegionBorderColor } from '../utils/colors';
import { PuppySprite, PuppyBreed } from './assets/PuppySprite';
import { ChalkMarkSprite } from './assets/ChalkMarkSprite';

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
  size: number;
  isHighlighted?: boolean;
  isWrong?: boolean;
  isCompleting?: boolean;
  borders?: CellBorders;
  row?: number;
  col?: number;
}

export const Cell: React.FC<CellProps> = ({
  value,
  onPress,
  regionId,
  size,
  isHighlighted,
  isWrong,
  isCompleting,
  borders = { top: true, bottom: true, left: true, right: true },
  row = 0,
  col = 0,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const heartAnim = useRef(new Animated.Value(0)).current;
  const [showHeart, setShowHeart] = useState(false);
  const prevValue = useRef(value);

  // Animate on value change
  useEffect(() => {
    if (prevValue.current !== value) {
      if (value === 'puppy') {
        scaleAnim.setValue(0.7);
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          tension: 90,
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
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 140,
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

  // Animate subtle pulse on hint highlight
  useEffect(() => {
    if (isHighlighted) {
      const pulseLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.08, duration: 400, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
        ])
      );
      pulseLoop.start();
      return () => {
        pulseLoop.stop();
        pulseAnim.setValue(1);
      };
    } else {
      pulseAnim.setValue(1);
    }
  }, [isHighlighted, pulseAnim]);

  // Cycle breeds by region or location for warm visual variety
  const breeds: PuppyBreed[] = ['corgi', 'golden', 'shiba'];
  const breedIndex = regionId ? (regionId - 1) % breeds.length : (row + col) % breeds.length;
  const currentBreed = breeds[breedIndex];

  // Dynamic boundary styling: outer strokes separate regions, inner seams are soft
  const outerBorderColor = getRegionBorderColor(regionId);
  const innerSeamColor = 'rgba(255, 255, 255, 0.28)';

  const boundaryStyle = {
    borderTopWidth: borders.top ? 2.5 : 0.5,
    borderBottomWidth: borders.bottom ? 2.5 : 0.5,
    borderLeftWidth: borders.left ? 2.5 : 0.5,
    borderRightWidth: borders.right ? 2.5 : 0.5,

    borderTopColor: borders.top ? outerBorderColor : innerSeamColor,
    borderBottomColor: borders.bottom ? outerBorderColor : innerSeamColor,
    borderLeftColor: borders.left ? outerBorderColor : innerSeamColor,
    borderRightColor: borders.right ? outerBorderColor : innerSeamColor,

    borderTopLeftRadius: borders.top && borders.left ? 10 : 3,
    borderTopRightRadius: borders.top && borders.right ? 10 : 3,
    borderBottomLeftRadius: borders.bottom && borders.left ? 10 : 3,
    borderBottomRightRadius: borders.bottom && borders.right ? 10 : 3,
  };

  const tapGesture = Gesture.Tap()
    .onEnd(() => {
      onPress();
    })
    .simultaneousWithExternalGesture(Gesture.Native())
    .runOnJS(true);

  return (
    <Animated.View
      style={{
        transform: [
          { translateX: shakeAnim },
          { scale: isHighlighted ? pulseAnim : scaleAnim },
        ],
      }}
    >
      <GestureDetector gesture={tapGesture}>
        <View
          style={[
            styles.cell,
            {
              width: size,
              height: size,
              backgroundColor: getRegionColor(regionId),
            },
            boundaryStyle,
            isHighlighted && styles.highlightedCell,
            isWrong && styles.wrongCell,
          ]}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          {value === 'puppy' && (
            <PuppySprite
              size={Math.max(22, size * 0.78)}
              breed={currentBreed}
              isCompleting={isCompleting}
              completionDelay={(row + col) * 70}
            />
          )}

          {value === 'marked' && (
            <ChalkMarkSprite size={Math.max(14, size * 0.48)} />
          )}

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

          {isHighlighted && <View style={styles.hintOverlay} />}
        </View>
      </GestureDetector>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1.5,
    position: 'relative',
    overflow: 'hidden',
  },
  heartBubble: {
    position: 'absolute',
    top: 2,
    fontSize: 14,
    zIndex: 25,
  },
  highlightedCell: {
    borderColor: '#F39C12',
    borderWidth: 3,
    shadowColor: '#F39C12',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 6,
  },
  wrongCell: {
    borderColor: '#D9534F',
    borderWidth: 3,
  },
  hintOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 235, 140, 0.35)',
  },
});
