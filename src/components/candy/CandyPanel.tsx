import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CANDY_SURFACE, CANDY_METRICS } from '../../utils/theme';

interface CandyPanelProps {
  children?: React.ReactNode;
  /** `raised` reads as a lit card, `well` as a recessed tray. */
  variant?: 'raised' | 'well';
  radius?: number;
  /** Hide the top sheen for dense content like stat rows. */
  gloss?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

/**
 * Framed candy surface used for HUD chips, cards and modal bodies. Raised
 * panels sit on a solid bevel so they feel stacked above the backdrop.
 */
export const CandyPanel: React.FC<CandyPanelProps> = ({
  children,
  variant = 'raised',
  radius = CANDY_METRICS.radiusPanel,
  gloss = true,
  style,
  contentStyle,
}) => {
  const isWell = variant === 'well';
  const colors: [string, string] = isWell
    ? [CANDY_SURFACE.wellTop, CANDY_SURFACE.wellBottom]
    : [CANDY_SURFACE.top, CANDY_SURFACE.bottom];

  return (
    <View
      style={[
        {
          backgroundColor: CANDY_SURFACE.bevel,
          borderRadius: radius,
          paddingBottom: isWell ? 0 : 3,
        },
        style,
      ]}
    >
      <LinearGradient
        colors={colors}
        style={[
          styles.face,
          {
            borderRadius: radius,
            borderColor: isWell ? CANDY_SURFACE.bevel : CANDY_SURFACE.border,
          },
          contentStyle,
        ]}
      >
        {gloss && !isWell && (
          <View
            pointerEvents="none"
            style={[styles.gloss, { borderRadius: radius * 0.8 }]}
          />
        )}
        {children}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  face: {
    borderWidth: 1.5,
    overflow: 'hidden',
  },
  gloss: {
    position: 'absolute',
    top: 2,
    left: '4%',
    right: '4%',
    height: 26,
    backgroundColor: CANDY_SURFACE.gloss,
  },
});
