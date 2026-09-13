import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useRef, useState } from 'react';
import { Animated, BackHandler, StyleSheet } from 'react-native';
import { soundManager } from './src/utils/soundManager';
import { useGameStore, ScreenName } from './src/store/gameStore';
import { HomeScreen } from './src/screens/HomeScreen';
import { WorldMapScreen } from './src/screens/WorldMapScreen';
import { GameScreen } from './src/screens/GameScreen';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { CANDY_BACKDROP } from './src/utils/theme';

export default function App() {
  const { activeScreen } = useGameStore();
  const [renderedScreen, setRenderedScreen] = useState<ScreenName>(activeScreen);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    soundManager.init();
    soundManager.startBgm();
    return () => {
      soundManager.cleanup();
    };
  }, []);

  // Android hardware back: step back through screens instead of exiting the app
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      const { activeScreen, isDailyChallenge, setActiveScreen } = useGameStore.getState();
      if (activeScreen === 'game') {
        setActiveScreen(isDailyChallenge ? 'home' : 'map');
        return true;
      }
      if (activeScreen === 'map') {
        setActiveScreen('home');
        return true;
      }
      return false; // home → default behavior (exit)
    });
    return () => sub.remove();
  }, []);

  useEffect(() => {
    if (activeScreen !== renderedScreen) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 120,
        useNativeDriver: true,
      }).start(() => {
        setRenderedScreen(activeScreen);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [activeScreen, renderedScreen]);

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <Animated.View style={[styles.screenContainer, { opacity: fadeAnim }]}>
          <ErrorBoundary>
            {renderedScreen === 'home' && <HomeScreen />}
            {renderedScreen === 'map' && <WorldMapScreen />}
            {renderedScreen === 'game' && <GameScreen />}
          </ErrorBoundary>
        </Animated.View>
        <StatusBar style="light" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  // Deep grape matches CANDY_BACKDROP.bottom. The cross-fade between screens
  // drops the outgoing screen to opacity 0, so a light root here flashed white
  // on every navigation.
  root: {
    flex: 1,
    backgroundColor: CANDY_BACKDROP.bottom,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: CANDY_BACKDROP.bottom,
  },
});
