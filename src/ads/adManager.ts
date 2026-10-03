/**
 * Web/Jest stub for the ad manager — the native Google Mobile Ads SDK doesn't
 * exist here, so every call is a safe no-op. Metro picks adManager.native.ts
 * on Android/iOS instead.
 */
export const initAds = async (): Promise<void> => {};

export const adsAvailable = (): boolean => false;

export const subscribeAdsReady = (_listener: () => void): (() => void) => {
  return () => {};
};

/** Resolves false — no reward can be earned without the native SDK. */
export const showRewardedAd = async (): Promise<boolean> => false;

/**
 * Frequency-capped interstitial. Resolves true when an ad was actually shown.
 */
export const maybeShowInterstitial = async (
  _completedLevel: number
): Promise<boolean> => false;

/** Opens the UMP privacy options form — no-op where ads don't exist. */
export const showConsentOptions = async (): Promise<void> => {};
