import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { soundManager } from './src/utils/soundManager';
import { useGameStore, ScreenName } from './src/store/gameStore';
import { HomeScreen } from './src/screens/HomeScreen';
import { WorldMapScreen } from './src/screens/WorldMapScreen';
import { GameScreen } from './src/screens/GameScreen';

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
      <Animated.View style={[styles.screenContainer, { opacity: fadeAnim }]}>
        {renderedScreen === 'home' && <HomeScreen />}
        {renderedScreen === 'map' && <WorldMapScreen />}
        {renderedScreen === 'game' && <GameScreen />}
      </Animated.View>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FBF9F5',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#FBF9F5',
  },
});
