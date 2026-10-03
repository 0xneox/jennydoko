/**
 * Native ad manager (Android/iOS) — Metro picks this file over adManager.ts.
 *
 * The SDK is require()d lazily inside try/catch so the app still boots in Expo
 * Go and other environments where the native module isn't linked — ads simply
 * report themselves unavailable and every call degrades to a no-op.
 */
import {
  AD_UNITS,
  hasUsableAdUnits,
  INTERSTITIAL_MIN_LEVEL,
  INTERSTITIAL_EVERY_N_COMPLETIONS,
  INTERSTITIAL_MIN_INTERVAL_MS,
} from './adConfig';
import { getLastInterstitialAt, setLastInterstitialAt } from '../utils/storage';

type RNGMA = typeof import('react-native-google-mobile-ads');
type InterstitialAdType = import('react-native-google-mobile-ads').InterstitialAd;

let sdk: RNGMA | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  sdk = require('react-native-google-mobile-ads') as RNGMA;
} catch {
  sdk = null;
}
const mobileAds = sdk?.default ?? null;

let initStarted = false;
let ready = false;

let interstitial: InterstitialAdType | null = null;
let interstitialLoaded = false;
let interstitialShowing = false;
let completionsSinceAd = 0;
let lastInterstitialAt = 0;

const readyListeners = new Set<() => void>();

export const subscribeAdsReady = (listener: () => void): (() => void) => {
  readyListeners.add(listener);
  return () => {
    readyListeners.delete(listener);
  };
};

/** True once the SDK initialized AND consent allows requesting ads. */
export const adsAvailable = (): boolean => ready;

const preloadInterstitial = (): void => {
  if (!sdk || !ready) return;
  interstitialLoaded = false;
  const ad = sdk.InterstitialAd.createForAdRequest(AD_UNITS.interstitial);
  ad.addAdEventListener(sdk.AdEventType.LOADED, () => {
    interstitialLoaded = true;
  });
  ad.addAdEventListener(sdk.AdEventType.ERROR, () => {
    interstitialLoaded = false;
  });
  interstitial = ad;
  try {
    ad.load();
  } catch {
    interstitial = null;
  }
};

/**
 * Runs once at app start: Google UMP consent (EEA/UK GDPR), request
 * configuration, SDK init, then preloads the first interstitial.
 */
export const initAds = async (): Promise<void> => {
  if (initStarted) return;
  initStarted = true;
  if (!sdk || !mobileAds || !hasUsableAdUnits()) return;

  try {
    const consent = await sdk.AdsConsent.gatherConsent();
    if (!consent.canRequestAds) return;

    await mobileAds().setRequestConfiguration({
      maxAdContentRating: sdk.MaxAdContentRating.PG,
      tagForChildDirectedTreatment: false,
      tagForUnderAgeOfConsent: false,
    });
    await mobileAds().initialize();

    lastInterstitialAt = await getLastInterstitialAt();
    ready = true;
    readyListeners.forEach(l => l());
    preloadInterstitial();
  } catch (error) {
    if (__DEV__) console.warn('Ads init failed — running ad-free:', error);
  }
};

const AD_LOAD_TIMEOUT_MS = 30_000;

/**
 * Shows a rewarded ad. Resolves true only when the user earned the reward;
 * false on load failure, no-fill, or dismissal without reward.
 */
export const showRewardedAd = (): Promise<boolean> =>
  new Promise(resolve => {
    if (!ready || !sdk) return resolve(false);

    const ad = sdk.RewardedAd.createForAdRequest(AD_UNITS.rewarded);
    let earned = false;
    let settled = false;
    let timer: ReturnType<typeof setTimeout>;

    const done = (result: boolean) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      unsubs.forEach(u => u());
      resolve(result);
    };
    const unsubs = [
      ad.addAdEventListener(sdk.RewardedAdEventType.EARNED_REWARD, () => {
        earned = true;
      }),
      ad.addAdEventListener(sdk.AdEventType.LOADED, () => {
        try {
          ad.show();
        } catch {
          done(false);
        }
      }),
      ad.addAdEventListener(sdk.AdEventType.ERROR, () => done(false)),
      ad.addAdEventListener(sdk.AdEventType.CLOSED, () => done(earned)),
    ];
    timer = setTimeout(() => done(earned), AD_LOAD_TIMEOUT_MS);
    try {
      ad.load();
    } catch {
      done(false);
    }
  });

/**
 * Frequency-capped interstitial for level transitions. Counts every call as a
 * completion; shows only when the level gate, per-N-completions cadence, and
 * minimum time gap all pass, and only when one is already loaded (never makes
 * the player wait on an ad fetch).
 *
 * Resolves true when an ad was actually shown.
 */
export const maybeShowInterstitial = async (
  completedLevel: number
): Promise<boolean> => {
  completionsSinceAd++;
  if (!ready || !sdk || !interstitial || !interstitialLoaded) return false;
  if (interstitialShowing) return false;
  if (completedLevel < INTERSTITIAL_MIN_LEVEL) return false;
  if (completionsSinceAd < INTERSTITIAL_EVERY_N_COMPLETIONS) return false;
  if (Date.now() - lastInterstitialAt < INTERSTITIAL_MIN_INTERVAL_MS) return false;

  interstitialShowing = true;
  const ad = interstitial;
  interstitial = null;
  interstitialLoaded = false;

  const shown = await new Promise<boolean>(resolve => {
    let settled = false;
    let timer: ReturnType<typeof setTimeout>;
    const done = (result: boolean) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      unsubs.forEach(u => u());
      resolve(result);
    };
    const unsubs = [
      ad.addAdEventListener(sdk!.AdEventType.CLOSED, () => done(true)),
      ad.addAdEventListener(sdk!.AdEventType.ERROR, () => done(false)),
    ];
    timer = setTimeout(() => done(false), AD_LOAD_TIMEOUT_MS);
    try {
      ad.show();
    } catch {
      done(false);
    }
  });

  interstitialShowing = false;
  if (shown) {
    completionsSinceAd = 0;
    lastInterstitialAt = Date.now();
    setLastInterstitialAt(lastInterstitialAt);
  }
  preloadInterstitial();
  return shown;
};

/**
 * Opens Google's UMP privacy options form so users can review/withdraw ad
 * consent. Presents only when a privacy options entry point is required for
 * the user's region — safe to call unconditionally.
 */
export const showConsentOptions = async (): Promise<void> => {
  if (!sdk) return;
  try {
    await sdk.AdsConsent.showPrivacyOptionsForm();
  } catch (error) {
    if (__DEV__) console.warn('Consent options unavailable:', error);
  }
};
