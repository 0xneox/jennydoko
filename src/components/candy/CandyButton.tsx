import React, { useState } from 'react';
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  CANDY_SKINS,
  CandySkinName,
  CANDY_METRICS,
  CANDY_TEXT,
} from '../../utils/theme';

type CandySize = 'sm' | 'md' | 'lg';

interface CandyButtonProps {
  label?: string;
  onPress?: () => void;
  skin?: CandySkinName;
  size?: CandySize;
  disabled?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  /** Stretch to the full width of the parent. */
  block?: boolean;
  /** Rendered left of the label — an emoji Text, sprite or image. */
  icon?: React.ReactNode;
  /** Replaces the label entirely for fully custom faces. */
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const SIZES: Record<CandySize, { paddingV: number; paddingH: number; font: number; radius: number; bevel: number }> = {
  sm: { paddingV: 8, paddingH: 14, font: 13, radius: CANDY_METRICS.radiusChip, bevel: 3 },
  md: { paddingV: 12, paddingH: 18, font: 15, radius: CANDY_METRICS.radiusButton, bevel: CANDY_METRICS.bevelDepth },
  lg: { paddingV: 16, paddingH: 22, font: 18, radius: CANDY_METRICS.radiusButton, bevel: CANDY_METRICS.bevelDepthLarge },
};

/**
 * Chunky arcade button. The depth comes from a solid bevel block behind the
 * face: on press the face slides down onto the bevel, which reads as a physical
 * click far better than a blurred shadow.
 */
export const CandyButton: React.FC<CandyButtonProps> = ({
  label,
  onPress,
  skin = 'green',
  size = 'md',
  disabled,
  block,
  icon,
  children,
  style,
  textStyle,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const [pressed, setPressed] = useState(false);
  const s = CANDY_SKINS[skin];
  const dims = SIZES[size];

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      style={[
        styles.bevel,
        {
          backgroundColor: s.bevel,
          borderRadius: dims.radius,
          paddingBottom: dims.bevel,
        },
        block && styles.block,
        disabled && styles.disabled,
        style,
      ]}
    >
      <LinearGradient
        colors={s.gradient}
        style={[
          styles.face,
          {
            borderRadius: dims.radius,
            borderColor: s.border,
            paddingVertical: dims.paddingV,
            paddingHorizontal: dims.paddingH,
            transform: [{ translateY: pressed ? dims.bevel : 0 }],
          },
        ]}
      >
        {/* Rounded inset sheen — the dome highlight that makes it look glossy */}
        <View
          pointerEvents="none"
          style={[styles.gloss, { borderRadius: dims.radius * 0.8 }]}
        />
        {children ?? (
          <View style={styles.content}>
            {icon}
            {!!label && (
              <Text
                style={[
                  styles.label,
                  { fontSize: dims.font, color: s.text },
                  textStyle,
                ]}
                numberOfLines={1}
              >
                {label}
              </Text>
            )}
          </View>
        )}
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  bevel: {
    alignSelf: 'flex-start',
  },
  block: {
    alignSelf: 'stretch',
    width: '100%',
  },
  disabled: {
    opacity: 0.45,
  },
  face: {
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  gloss: {
    position: 'absolute',
    top: 2,
    left: '6%',
    right: '6%',
    height: '46%',
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  label: {
    fontWeight: '900',
    letterSpacing: 0.3,
    textAlign: 'center',
    textShadowColor: CANDY_TEXT.shadow,
    textShadowOffset: { width: 0, height: 1.5 },
    textShadowRadius: 0,
  },
});
