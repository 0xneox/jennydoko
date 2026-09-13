import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CANDY_BACKDROP } from '../../utils/theme';

interface CandyBackgroundProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Deep grape arcade backdrop. A vertical gradient plus a large soft glow behind
 * the play area, so the saturated tiles read as lit from within instead of
 * sitting flat on a single fill.
 */
export const CandyBackground: React.FC<CandyBackgroundProps> = ({ children, style }) => (
  <LinearGradient
    colors={[CANDY_BACKDROP.top, CANDY_BACKDROP.mid, CANDY_BACKDROP.bottom]}
    locations={[0, 0.55, 1]}
    style={[styles.fill, style]}
  >
    <View pointerEvents="none" style={styles.glow} />
    {children}
  </LinearGradient>
);

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  glow: {
    position: 'absolute',
    alignSelf: 'center',
    top: '18%',
    width: 520,
    height: 520,
    borderRadius: 260,
    backgroundColor: CANDY_BACKDROP.glowCenter,
    opacity: 0.5,
  },
});
