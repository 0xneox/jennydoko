import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CandyButton } from './candy/CandyButton';
import { CANDY_BACKDROP, CANDY_TEXT } from '../utils/theme';

interface Props {
  children: React.ReactNode;
  /** Called with the error so callers can forward to crash reporting. */
  onError?: (error: Error, componentStack: string) => void;
}

interface State {
  error: Error | null;
}

/**
 * Last line of defence: a render crash anywhere below shows a friendly Jenny
 * screen with a retry button instead of a white screen. Retry remounts the
 * subtree; the game store is module-level so progress survives.
 */
export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.props.onError?.(error, info.componentStack ?? '');
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  private reset = () => this.setState({ error: null });

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <View style={styles.root}>
        <Text style={styles.emoji}>🐶</Text>
        <Text style={styles.title}>Oops! A puppy knocked something over.</Text>
        <Text style={styles.sub}>Don't worry — your progress is safe. Let's try that again.</Text>
        <CandyButton skin="green" size="lg" label="Back to the Garden" onPress={this.reset} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 14,
    backgroundColor: CANDY_BACKDROP.bottom,
  },
  emoji: { fontSize: 64 },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: CANDY_TEXT.onDark,
    textAlign: 'center',
  },
  sub: {
    fontSize: 15,
    color: CANDY_TEXT.onDarkMuted,
    textAlign: 'center',
    marginBottom: 8,
  },
});
