import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export type PuppyBreed = 'corgi' | 'golden' | 'shiba';

interface PuppySpriteProps {
  size?: number;
  breed?: PuppyBreed;
  isCompleting?: boolean;
  completionDelay?: number;
}

export const PuppySprite: React.FC<PuppySpriteProps> = ({
  size = 44,
  breed = 'corgi',
  isCompleting = false,
  completionDelay = 0,
}) => {
  // Micro-animations
  const earTwitchAnim = useRef(new Animated.Value(0)).current;
  const tailWagAnim = useRef(new Animated.Value(0)).current;
  const celebrationBounceAnim = useRef(new Animated.Value(1)).current;

  // Gentle periodic idle ear twitch & tail wag
  useEffect(() => {
    const earAnimation = Animated.loop(
      Animated.sequence([
        Animated.delay(1800 + Math.random() * 800),
        Animated.timing(earTwitchAnim, { toValue: -6, duration: 90, useNativeDriver: true }),
        Animated.timing(earTwitchAnim, { toValue: 5, duration: 90, useNativeDriver: true }),
        Animated.timing(earTwitchAnim, { toValue: 0, duration: 90, useNativeDriver: true }),
        Animated.delay(2200),
      ])
    );

    const tailAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(tailWagAnim, { toValue: 12, duration: 180, useNativeDriver: true }),
        Animated.timing(tailWagAnim, { toValue: -12, duration: 180, useNativeDriver: true }),
        Animated.timing(tailWagAnim, { toValue: 8, duration: 160, useNativeDriver: true }),
        Animated.timing(tailWagAnim, { toValue: -8, duration: 160, useNativeDriver: true }),
        Animated.timing(tailWagAnim, { toValue: 0, duration: 140, useNativeDriver: true }),
        Animated.delay(1200 + Math.random() * 600),
      ])
    );

    earAnimation.start();
    tailAnimation.start();

    return () => {
      earAnimation.stop();
      tailAnimation.stop();
    };
  }, []);

  // Synchronized / cascading celebration wave bounce
  useEffect(() => {
    if (isCompleting) {
      let timeoutId: ReturnType<typeof setTimeout>;
      let loopAnim: Animated.CompositeAnimation | null = null;

      timeoutId = setTimeout(() => {
        loopAnim = Animated.loop(
          Animated.sequence([
            Animated.timing(celebrationBounceAnim, {
              toValue: 1.25,
              duration: 220,
              useNativeDriver: true,
            }),
            Animated.timing(celebrationBounceAnim, {
              toValue: 0.92,
              duration: 180,
              useNativeDriver: true,
            }),
            Animated.timing(celebrationBounceAnim, {
              toValue: 1.05,
              duration: 150,
              useNativeDriver: true,
            }),
            Animated.timing(celebrationBounceAnim, {
              toValue: 1,
              duration: 140,
              useNativeDriver: true,
            }),
            Animated.delay(300),
          ])
        );
        loopAnim.start();
      }, completionDelay);

      return () => {
        if (timeoutId) clearTimeout(timeoutId);
        if (loopAnim) loopAnim.stop();
        celebrationBounceAnim.setValue(1);
      };
    } else {
      celebrationBounceAnim.setValue(1);
    }
  }, [isCompleting, completionDelay]);

  // Scaled dimensions
  const scale = size / 60;

  // Breed color palettes
  const coatColor =
    breed === 'golden' ? '#E5B26E' : breed === 'shiba' ? '#D67D45' : '#E08E53'; // Corgi
  const darkFur =
    breed === 'golden' ? '#CA9653' : breed === 'shiba' ? '#B85E28' : '#C7753B';
  const muzzleColor =
    breed === 'golden' ? '#FDF5E6' : breed === 'shiba' ? '#FFFDF8' : '#FFF8EC';
  const collarColor =
    breed === 'golden' ? '#E05A47' : breed === 'shiba' ? '#48A977' : '#4592AF';

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          transform: [{ scale: celebrationBounceAnim }],
        },
      ]}
    >
      {/* Wagging Tail behind head */}
      <Animated.View
        style={[
          styles.tail,
          {
            backgroundColor: coatColor,
            width: 14 * scale,
            height: 18 * scale,
            top: 6 * scale,
            right: 4 * scale,
            transform: [
              {
                rotate: tailWagAnim.interpolate({
                  inputRange: [-15, 15],
                  outputRange: ['-25deg', '25deg'],
                }),
              },
            ],
          },
        ]}
      />

      {/* Left Ear */}
      <Animated.View
        style={[
          breed === 'golden' ? styles.droopyEarLeft : styles.perkyEarLeft,
          {
            backgroundColor: coatColor,
            width: 16 * scale,
            height: (breed === 'golden' ? 24 : 20) * scale,
            left: 5 * scale,
            top: (breed === 'golden' ? 10 : 2) * scale,
            transform: [
              {
                rotate: earTwitchAnim.interpolate({
                  inputRange: [-10, 10],
                  outputRange: ['-20deg', '-5deg'],
                }),
              },
            ],
          },
        ]}
      >
        {breed !== 'golden' && (
          <View
            style={[
              styles.innerEar,
              {
                width: 8 * scale,
                height: 11 * scale,
                backgroundColor: breed === 'shiba' ? '#FFF8ED' : '#F9D1C7',
              },
            ]}
          />
        )}
      </Animated.View>

      {/* Right Ear */}
      <Animated.View
        style={[
          breed === 'golden' ? styles.droopyEarRight : styles.perkyEarRight,
          {
            backgroundColor: coatColor,
            width: 16 * scale,
            height: (breed === 'golden' ? 24 : 20) * scale,
            right: 5 * scale,
            top: (breed === 'golden' ? 10 : 2) * scale,
            transform: [
              {
                rotate: earTwitchAnim.interpolate({
                  inputRange: [-10, 10],
                  outputRange: ['5deg', '20deg'],
                }),
              },
            ],
          },
        ]}
      >
        {breed !== 'golden' && (
          <View
            style={[
              styles.innerEar,
              {
                width: 8 * scale,
                height: 11 * scale,
                backgroundColor: breed === 'shiba' ? '#FFF8ED' : '#F9D1C7',
              },
            ]}
          />
        )}
      </Animated.View>

      {/* Main Puppy Head */}
      <View
        style={[
          styles.head,
          {
            width: 44 * scale,
            height: 38 * scale,
            backgroundColor: coatColor,
            borderRadius: 20 * scale,
            top: 10 * scale,
          },
        ]}
      >
        {/* Shiba eyebrow dots */}
        {breed === 'shiba' && (
          <View style={styles.eyebrowRow}>
            <View
              style={[
                styles.eyebrowDot,
                {
                  width: 5 * scale,
                  height: 4 * scale,
                  left: 10 * scale,
                  top: 7 * scale,
                },
              ]}
            />
            <View
              style={[
                styles.eyebrowDot,
                {
                  width: 5 * scale,
                  height: 4 * scale,
                  right: 10 * scale,
                  top: 7 * scale,
                },
              ]}
            />
          </View>
        )}

        {/* Eyes */}
        <View style={[styles.eyeRow, { top: 11 * scale }]}>
          <View
            style={[
              styles.eye,
              {
                width: 6 * scale,
                height: 6 * scale,
                borderRadius: 3 * scale,
                marginLeft: 9 * scale,
              },
            ]}
          >
            <View
              style={[
                styles.eyeHighlight,
                { width: 2 * scale, height: 2 * scale },
              ]}
            />
          </View>
          <View
            style={[
              styles.eye,
              {
                width: 6 * scale,
                height: 6 * scale,
                borderRadius: 3 * scale,
                marginRight: 9 * scale,
              },
            ]}
          >
            <View
              style={[
                styles.eyeHighlight,
                { width: 2 * scale, height: 2 * scale },
              ]}
            />
          </View>
        </View>

        {/* Cheeks Blush */}
        <View style={[styles.blushRow, { top: 16 * scale }]}>
          <View
            style={[
              styles.blush,
              {
                width: 7 * scale,
                height: 4 * scale,
                borderRadius: 2 * scale,
                marginLeft: 5 * scale,
              },
            ]}
          />
          <View
            style={[
              styles.blush,
              {
                width: 7 * scale,
                height: 4 * scale,
                borderRadius: 2 * scale,
                marginRight: 5 * scale,
              },
            ]}
          />
        </View>

        {/* Muzzle */}
        <View
          style={[
            styles.muzzle,
            {
              width: 22 * scale,
              height: 17 * scale,
              backgroundColor: muzzleColor,
              borderRadius: 10 * scale,
              bottom: 2 * scale,
            },
          ]}
        >
          {/* Nose */}
          <View
            style={[
              styles.nose,
              {
                width: 7 * scale,
                height: 5 * scale,
                borderRadius: 3 * scale,
                top: 2 * scale,
              },
            ]}
          />
          {/* Smile mouth */}
          <View
            style={[
              styles.mouth,
              {
                width: 8 * scale,
                height: 4 * scale,
                borderBottomLeftRadius: 4 * scale,
                borderBottomRightRadius: 4 * scale,
                bottom: 2.5 * scale,
              },
            ]}
          />
        </View>
      </View>

      {/* Collar & Little Charm */}
      <View
        style={[
          styles.collar,
          {
            width: 26 * scale,
            height: 6 * scale,
            backgroundColor: collarColor,
            borderRadius: 3 * scale,
            bottom: 3 * scale,
          },
        ]}
      >
        <View
          style={[
            styles.charm,
            {
              width: 5 * scale,
              height: 5 * scale,
              borderRadius: 2.5 * scale,
              bottom: -2 * scale,
            },
          ]}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tail: {
    position: 'absolute',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    zIndex: 1,
  },
  perkyEarLeft: {
    position: 'absolute',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  perkyEarRight: {
    position: 'absolute',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  droopyEarLeft: {
    position: 'absolute',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 8,
    zIndex: 4,
  },
  droopyEarRight: {
    position: 'absolute',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 8,
    zIndex: 4,
  },
  innerEar: {
    borderRadius: 4,
  },
  head: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 3,
    shadowColor: 'rgba(0,0,0,0.12)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  eyebrowRow: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eyebrowDot: {
    position: 'absolute',
    backgroundColor: '#FFFDF7',
    borderRadius: 2,
  },
  eyeRow: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eye: {
    backgroundColor: '#231B15',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    padding: 1,
  },
  eyeHighlight: {
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  blushRow: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  blush: {
    backgroundColor: 'rgba(238, 126, 114, 0.45)',
  },
  muzzle: {
    position: 'absolute',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.08)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  nose: {
    position: 'absolute',
    backgroundColor: '#281F1A',
  },
  mouth: {
    position: 'absolute',
    borderWidth: 1.2,
    borderColor: '#3D2F28',
    backgroundColor: 'transparent',
    borderTopWidth: 0,
  },
  collar: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 5,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  charm: {
    position: 'absolute',
    backgroundColor: '#F7DC6F',
    borderWidth: 0.5,
    borderColor: '#D4AC0D',
  },
});
