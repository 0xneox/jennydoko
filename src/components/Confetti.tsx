import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface ConfettiProps {
  visible: boolean;
}

interface Particle {
  id: number;
  x: Animated.Value;
  initialX: number;
  y: Animated.Value;
  rotation: Animated.Value;
  scale: Animated.Value;
  color: string;
  isPaw: boolean;
}

// Bright candy confetti. The muted pastels these replaced were tuned for the
// old cream canvas and turned muddy against the deep grape backdrop.
const CANDY_CONFETTI_COLORS = [
  '#6BEE8C', // Candy Lime
  '#7FD4FF', // Bubblegum Sky
  '#FFD84D', // Lemon Drop
  '#C89BFF', // Grape Fizz
  '#FF8AB0', // Strawberry Taffy
  '#FF7A5C', // Orange Sherbet
  '#FFFFFF', // Sugar Sparkle
];

// Little paw print component for confetti particles
const PawPrint: React.FC<{ color: string; size?: number }> = ({ color, size = 16 }) => {
  const padSize = size * 0.6;
  const toeSize = size * 0.26;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {/* 4 Toe pads */}
      <View style={{ flexDirection: 'row', gap: 1.5, marginBottom: 1 }}>
        <View
          style={{
            width: toeSize * 0.9,
            height: toeSize * 1.1,
            borderRadius: toeSize / 2,
            backgroundColor: color,
            transform: [{ rotate: '-20deg' }],
          }}
        />
        <View
          style={{
            width: toeSize,
            height: toeSize * 1.2,
            borderRadius: toeSize / 2,
            backgroundColor: color,
            marginTop: -2,
          }}
        />
        <View
          style={{
            width: toeSize,
            height: toeSize * 1.2,
            borderRadius: toeSize / 2,
            backgroundColor: color,
            marginTop: -2,
          }}
        />
        <View
          style={{
            width: toeSize * 0.9,
            height: toeSize * 1.1,
            borderRadius: toeSize / 2,
            backgroundColor: color,
            transform: [{ rotate: '20deg' }],
          }}
        />
      </View>
      {/* Main pad */}
      <View
        style={{
          width: padSize,
          height: padSize * 0.75,
          borderRadius: padSize * 0.45,
          backgroundColor: color,
        }}
      />
    </View>
  );
};

export const Confetti: React.FC<ConfettiProps> = ({ visible }) => {
  const particles = useRef<Particle[]>([]);
  const opacity = useRef(new Animated.Value(0)).current;
  const particleAnimations = useRef<Animated.CompositeAnimation[]>([]);
  const fadeAnimation = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (visible) {
      const newParticles: Particle[] = [];
      const count = 45;

      for (let i = 0; i < count; i++) {
        const initialX = Math.random() * 440 - 220;
        newParticles.push({
          id: i,
          x: new Animated.Value(initialX),
          initialX,
          y: new Animated.Value(-120 - Math.random() * 120),
          rotation: new Animated.Value(0),
          scale: new Animated.Value(0.7 + Math.random() * 0.5),
          color:
            CANDY_CONFETTI_COLORS[
              Math.floor(Math.random() * CANDY_CONFETTI_COLORS.length)
            ],
          isPaw: i % 2 === 0, // 50% are cute paw prints, 50% are candy ribbons
        });
      }
      particles.current = newParticles;

      opacity.setValue(1);

      particles.current.forEach((particle) => {
        const duration = 2400 + Math.random() * 1200;
        const drift = (Math.random() - 0.5) * 220;

        const anim = Animated.parallel([
          Animated.timing(particle.y, {
            toValue: 650 + Math.random() * 200,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(particle.x, {
            toValue: particle.initialX + drift,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(particle.rotation, {
            toValue: 360 + Math.random() * 360,
            duration,
            useNativeDriver: true,
          }),
        ]);
        particleAnimations.current.push(anim);
        anim.start();
      });

      // Fade out after celebration
      const fadeTimeout = setTimeout(() => {
        const fade = Animated.timing(opacity, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        });
        fadeAnimation.current = fade;
        fade.start();
      }, 2600);

      return () => {
        clearTimeout(fadeTimeout);
        if (fadeAnimation.current) {
          fadeAnimation.current.stop();
          fadeAnimation.current = null;
        }
        particleAnimations.current.forEach(anim => anim.stop());
        particleAnimations.current = [];
      };
    }
  }, [visible, opacity]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      {particles.current.map((particle) => (
        <Animated.View
          key={particle.id}
          style={[
            styles.particle,
            {
              transform: [
                { translateX: particle.x },
                { translateY: particle.y },
                {
                  rotate: particle.rotation.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
                { scale: particle.scale },
              ],
            },
          ]}
        >
          {particle.isPaw ? (
            <PawPrint color={particle.color} size={18} />
          ) : (
            <View
              style={[
                styles.ribbon,
                {
                  backgroundColor: particle.color,
                },
              ]}
            />
          )}
        </Animated.View>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    zIndex: 2000,
  },
  particle: {
    position: 'absolute',
  },
  ribbon: {
    width: 10,
    height: 6,
    borderRadius: 3,
    shadowColor: 'rgba(0,0,0,0.08)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
});
