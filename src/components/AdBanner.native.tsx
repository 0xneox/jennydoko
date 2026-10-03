import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AD_UNITS } from '../ads/adConfig';
import { adsAvailable, subscribeAdsReady } from '../ads/adManager';

/**
 * Anchored adaptive banner — renders only once the ad SDK reports ready
 * (consent gathered + initialized). Collapses to nothing otherwise.
 */
export const AdBanner: React.FC = () => {
  const [ready, setReady] = useState(adsAvailable());

  useEffect(() => subscribeAdsReady(() => setReady(adsAvailable())), []);

  if (!ready) return null;

  // Lazy-require keeps this file importable in Expo Go, where the native
  // module isn't linked — adsAvailable() is false there anyway.
  const { BannerAd, BannerAdSize } = require('react-native-google-mobile-ads');

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={AD_UNITS.banner}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
