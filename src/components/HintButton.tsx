import React from 'react';
import { Text } from 'react-native';
import { CandyButton } from './candy/CandyButton';

interface HintButtonProps {
  tier?: 1 | 2;
  disabled?: boolean;
  onPress: () => void;
}

/**
 * 💡 Hint bulb — three escalating taps:
 *   1. Jenny explains the rule (tier 1)
 *   2. Spotlight the exact cell (tier 2)
 *   3. Auto-place it (no extra star cost)
 * Each *new* deduction costs half a star; escalating the same one is free.
 */
export const HintButton: React.FC<HintButtonProps> = ({ tier, disabled, onPress }) => {
  const label = tier === 2 ? 'Place it' : tier === 1 ? 'Show cell' : 'Hint';
  return (
    <CandyButton
      skin="orange"
      size="sm"
      label={label}
      icon={<Text style={{ fontSize: 18 }}>💡</Text>}
      accessibilityLabel={label}
      accessibilityHint={tier ? 'No extra star cost for this hint.' : 'Jenny explains a rule. Costs half a star.'}
      disabled={disabled}
      onPress={onPress}
      style={{ minHeight: 44 }}
    />
  );
};
