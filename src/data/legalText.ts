import { APP_NAME } from '../utils/theme';

/**
 * In-app legal documents, rendered by LegalDocumentModal and mirrored by the
 * static pages in public/*.html for web hosting (the Play Store listing needs
 * a public privacy policy URL).
 *
 * Public policy URL: https://jennydoko.fun/privacy.html
 * Public terms URL:  https://jennydoko.fun/terms.html
 */
export const CONTACT_EMAIL = 'neohex262@pm.me';
export const LEGAL_ENTITY = '21b Labs';
export const LEGAL_LAST_UPDATED = 'September 18, 2026';

export interface LegalSection {
  heading: string;
  body: string;
}

export interface LegalDocument {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export const PRIVACY_POLICY: LegalDocument = {
  title: 'Privacy Policy',
  lastUpdated: LEGAL_LAST_UPDATED,
  sections: [
    {
      heading: 'The short version',
      body: `${APP_NAME} is an offline puzzle game supported by ads. The game itself does not collect, transmit, or sell any personal data — your progress, settings, and stats stay on your device. Ads are served by Google AdMob, which processes limited device data to deliver and measure ads (see "Advertising" below).`,
    },
    {
      heading: 'What is stored on your device',
      body: 'The game saves the following locally on your device (never sent to us or anyone else):\n\n• Level progress and unlocked levels\n• Game mode, sound, and music settings\n• Daily challenge streaks and stats\n• Story and tutorial "seen" flags\n• Your ad consent choice (where consent is required)\n\nThis data lives in your browser\'s local storage (web) or the app\'s private storage (Android/iOS).',
    },
    {
      heading: 'Advertising (Google AdMob)',
      body: `${APP_NAME} shows ads provided by Google AdMob — banners, occasional interstitials between levels, and rewarded ads you can choose to watch for extra hints. To serve and measure ads, Google and its partners may process your device's advertising ID, IP address, and ad interaction data. Ad content is capped at a family-appropriate rating.\n\n• Where required by law (EEA, UK, Switzerland), a consent form lets you choose between personalized and non-personalized ads.\n• You can review or change your choice any time from Settings → Privacy & Ads.\n• No rewarded-ad reward is granted unless the ad finishes playing.\n\nSee how Google uses data: https://policies.google.com/technologies/partner-sites`,
    },
    {
      heading: 'What we do NOT collect',
      body: `• No accounts or sign-ups\n• No analytics or tracking by us\n• No location data\n• No contacts, photos, or files\n• No crash reporting sent to third parties\n\n(Our ad partner Google processes its own data under Google's policies — see "Advertising".)`,
    },
    {
      heading: 'Children\'s privacy',
      body: `${APP_NAME} itself collects no personal information from anyone, including children under 13, and the game can be played fully offline. Ads shown are limited to a family-appropriate content rating.`,
    },
    {
      heading: 'Data Safety (Play Store)',
      body: 'For the Play Console Data Safety form: the app shares the device advertising ID with Google AdMob for advertising purposes. No personal data is collected by or transmitted to the developer.',
    },
    {
      heading: 'Deleting your data',
      body: 'Uninstalling the app removes all locally stored data. On the web version, clearing your browser\'s site data removes it.',
    },
    {
      heading: 'Changes to this policy',
      body: `If ${APP_NAME} ever adds online features (such as a leaderboard), this policy will be updated before those features ship, and any new data handling will be described here.`,
    },
    {
      heading: 'Contact',
      body: `Questions about privacy? Contact ${LEGAL_ENTITY} at ${CONTACT_EMAIL}, or visit jennydoko.fun.`,
    },
  ],
};

export const TERMS_OF_SERVICE: LegalDocument = {
  title: 'Terms of Service',
  lastUpdated: LEGAL_LAST_UPDATED,
  sections: [
    {
      heading: 'Agreement',
      body: `By playing ${APP_NAME} you agree to these terms. If you don't agree, please don't play — though we'll be sad to see you go.`,
    },
    {
      heading: 'License to play',
      body: `${LEGAL_ENTITY} grants you a personal, non-exclusive, non-transferable license to install and play ${APP_NAME} for your own entertainment. You may not copy, redistribute, sell, or reverse-engineer the game or its artwork.`,
    },
    {
      heading: 'Your progress',
      body: 'Game progress is stored only on your device. We are not responsible for progress lost through uninstalling, clearing storage, device changes, or device failure.',
    },
    {
      heading: 'Acceptable use',
      body: 'Please don\'t use the game for anything unlawful, and don\'t attempt to disrupt it for other players.',
    },
    {
      heading: 'Advertising',
      body: 'The game is supported by advertising served through Google AdMob. Optional rewarded ads grant in-game bonuses such as extra hints; a reward is granted only when the ad completes. Ad availability depends on your region, consent choices, and network connectivity.',
    },
    {
      heading: 'No warranty',
      body: `${APP_NAME} is provided "as is" without warranties of any kind. We do our best to keep every puzzle solvable and bug-free, but we can't promise perfection.`,
    },
    {
      heading: 'Changes',
      body: `We may update the game or these terms from time to time. Continued play after an update means you accept the new terms.`,
    },
    {
      heading: 'Contact',
      body: `Questions about these terms? Contact ${LEGAL_ENTITY} at ${CONTACT_EMAIL}, or visit jennydoko.fun.`,
    },
  ],
};
