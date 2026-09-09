import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface ChalkMarkSpriteProps {
  size?: number;
  color?: string;
  variant?: 'chalk' | 'wood';
}

export const ChalkMarkSprite: React.FC<ChalkMarkSpriteProps> = ({
  size = 28,
  color,
  variant = 'chalk',
}) => {
  const popAnim = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.spring(popAnim, {
      toValue: 1,
      friction: 5,
      tension: 120,
      useNativeDriver: true,
    }).start();
  }, []);

  const barWidth = Math.max(3, size * 0.18);
  const barLength = size * 0.76;
  const borderRadius = barWidth / 2;

  // Colors
  const fillColor =
    color ||
    (variant === 'wood' ? '#8C6848' : '#FFFDF9');
  const shadowColor =
    variant === 'wood' ? 'rgba(46, 32, 20, 0.4)' : 'rgba(56, 42, 30, 0.25)';

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          transform: [{ scale: popAnim }],
        },
      ]}
    >
      {/* Drop shadow diagonal 1 */}
      <View
        style={[
          styles.stroke,
          {
            width: barWidth,
            height: barLength,
            borderRadius,
            backgroundColor: shadowColor,
            transform: [{ rotate: '45deg' }, { translateY: 1.5 }],
          },
        ]}
      />
      {/* Drop shadow diagonal 2 */}
      <View
        style={[
          styles.stroke,
          {
            width: barWidth,
            height: barLength,
            borderRadius,
            backgroundColor: shadowColor,
            transform: [{ rotate: '-45deg' }, { translateY: 1.5 }],
          },
        ]}
      />

      {/* Main Bar 1 (45 deg) */}
      <View
        style={[
          styles.stroke,
          {
            width: barWidth,
            height: barLength,
            borderRadius,
            backgroundColor: fillColor,
            transform: [{ rotate: '45deg' }],
            borderWidth: 0.5,
            borderColor: 'rgba(255, 255, 255, 0.4)',
          },
        ]}
      />

      {/* Main Bar 2 (-45 deg) */}
      <View
        style={[
          styles.stroke,
          {
            width: barWidth,
            height: barLength,
            borderRadius,
            backgroundColor: fillColor,
            transform: [{ rotate: '-45deg' }],
            borderWidth: 0.5,
            borderColor: 'rgba(255, 255, 255, 0.4)',
          },
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  stroke: {
    position: 'absolute',
  },
});
