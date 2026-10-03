import { Platform } from 'react-native';

/**
 * AdMob ad unit configuration.
 *
 * This file intentionally does NOT import react-native-google-mobile-ads so it
 * is safe to load on web and in Jest.
 *
 * SETUP: once the AdMob account exists, create one ad unit per format
 * (banner / interstitial / rewarded) for the Android app, then replace the
 * PROD_UNITS placeholders below and the androidAppId/iosAppId in app.json.
 * __DEV__ builds always use Google's public test units, so nothing else is
 * needed for development.
 */

// Google's public test inventory — safe to show in dev builds.
const TEST_UNITS = {
  android: {
    banner: 'ca-app-pub-3940256099942544/6300978111',
    interstitial: 'ca-app-pub-3940256099942544/1033173712',
    rewarded: 'ca-app-pub-3940256099942544/5224354917',
  },
  ios: {
    banner: 'ca-app-pub-3940256099942544/2934735716',
    interstitial: 'ca-app-pub-3940256099942544/4411468910',
    rewarded: 'ca-app-pub-3940256099942544/1712485313',
  },
};

// TODO(release): replace with the real AdMob unit IDs.
const PROD_UNITS = {
  android: {
    banner: 'ca-app-pub-REPLACE_WITH_REAL_BANNER_UNIT',
    interstitial: 'ca-app-pub-REPLACE_WITH_REAL_INTERSTITIAL_UNIT',
    rewarded: 'ca-app-pub-REPLACE_WITH_REAL_REWARDED_UNIT',
  },
  ios: {
    banner: 'ca-app-pub-REPLACE_WITH_REAL_BANNER_UNIT',
    interstitial: 'ca-app-pub-REPLACE_WITH_REAL_INTERSTITIAL_UNIT',
    rewarded: 'ca-app-pub-REPLACE_WITH_REAL_REWARDED_UNIT',
  },
};

const units = __DEV__ ? TEST_UNITS : PROD_UNITS;

export const AD_UNITS =
  Platform.OS === 'ios' ? units.ios : units.android;

/** True when the unit IDs look like real AdMob units (or official test units). */
export const hasUsableAdUnits = (unitIds: typeof AD_UNITS = AD_UNITS): boolean =>
  Object.values(unitIds).every(
    id => id.startsWith('ca-app-pub-') && !id.includes('REPLACE_WITH_REAL')
  );

/** Hints a player can take per level before a rewarded ad is required. */
export const FREE_HINTS_PER_LEVEL = 3;

/** Interstitial frequency cap. */
export const INTERSTITIAL_MIN_LEVEL = 5;
export const INTERSTITIAL_EVERY_N_COMPLETIONS = 3;
export const INTERSTITIAL_MIN_INTERVAL_MS = 90_000;
