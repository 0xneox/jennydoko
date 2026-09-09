import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Animated, Text } from 'react-native';

export type JennyMood = 'friendly' | 'thinking' | 'cheering' | 'sympathetic';

interface JennyAvatarProps {
  size?: number;
  mood?: JennyMood;
  showBadge?: boolean;
  showGlow?: boolean;
}

export const JennyAvatar: React.FC<JennyAvatarProps> = ({
  size = 52,
  mood = 'friendly',
  showBadge = true,
  showGlow = true,
}) => {
  const bounceAnim = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const tiltAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (mood === 'cheering') {
      const cheerLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, { toValue: 1.12, duration: 250, useNativeDriver: true }),
          Animated.timing(bounceAnim, { toValue: 0.96, duration: 200, useNativeDriver: true }),
          Animated.timing(bounceAnim, { toValue: 1, duration: 180, useNativeDriver: true }),
        ])
      );
      cheerLoop.start();
      return () => cheerLoop.stop();
    } else if (mood === 'sympathetic') {
      const tiltLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(tiltAnim, { toValue: -6, duration: 600, useNativeDriver: true }),
          Animated.timing(tiltAnim, { toValue: 4, duration: 700, useNativeDriver: true }),
          Animated.timing(tiltAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
          Animated.delay(1000),
        ])
      );
      tiltLoop.start();
      return () => tiltLoop.stop();
    } else {
      const floatLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, { toValue: -3, duration: 1400, useNativeDriver: true }),
          Animated.timing(floatAnim, { toValue: 0, duration: 1400, useNativeDriver: true }),
        ])
      );
      floatLoop.start();
      return () => floatLoop.stop();
    }
  }, [mood, bounceAnim, floatAnim, tiltAnim]);

  const badgeEmoji = mood === 'cheering' ? '🎉' : mood === 'thinking' ? '💡' : mood === 'sympathetic' ? '🥺' : '🐾';
  const badgeBg = mood === 'cheering' ? '#FFD166' : mood === 'thinking' ? '#FFEAA7' : mood === 'sympathetic' ? '#FFB8B8' : '#74B9FF';

  const avatarSource = require('../../../assets/jenny/jenny_avatar.jpg');

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          width: size,
          height: size,
          transform: [
            { scale: mood === 'cheering' ? bounceAnim : 1 },
            { translateY: mood === 'cheering' ? 0 : floatAnim },
            {
              rotate: tiltAnim.interpolate({
                inputRange: [-10, 10],
                outputRange: ['-10deg', '10deg'],
              }),
            },
          ],
        },
      ]}
    >
      {showGlow && (
        <View
          style={[
            styles.glowRing,
            {
              width: size + 8,
              height: size + 8,
              borderRadius: (size + 8) / 2,
              backgroundColor:
                mood === 'cheering'
                  ? 'rgba(255, 209, 102, 0.35)'
                  : mood === 'sympathetic'
                  ? 'rgba(255, 184, 184, 0.35)'
                  : 'rgba(116, 185, 255, 0.25)',
            },
          ]}
        />
      )}

      <View
        style={[
          styles.imageContainer,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: size > 40 ? 2.5 : 1.5,
            borderColor: mood === 'cheering' ? '#F39C12' : '#74B9FF',
          },
        ]}
      >
        <Image
          source={avatarSource}
          style={{ width: size, height: size, borderRadius: size / 2 }}
          resizeMode="cover"
        />
      </View>

      {showBadge && (
        <View
          style={[
            styles.badge,
            {
              backgroundColor: badgeBg,
              width: Math.max(16, size * 0.38),
              height: Math.max(16, size * 0.38),
              borderRadius: Math.max(8, (size * 0.38) / 2),
            },
          ]}
        >
          <Text style={[styles.badgeText, { fontSize: Math.max(9, size * 0.22) }]}>
            {badgeEmoji}
          </Text>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowRing: {
    position: 'absolute',
    top: -4,
    left: -4,
  },
  imageContainer: {
    overflow: 'hidden',
    backgroundColor: '#FFF4E6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  badge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  badgeText: {
    textAlign: 'center',
  },
});
