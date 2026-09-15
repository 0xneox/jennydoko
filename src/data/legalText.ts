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
export const LEGAL_LAST_UPDATED = 'September 15, 2026';

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
      body: `${APP_NAME} is an offline puzzle game. We do not collect, transmit, or sell any personal data. Everything the game remembers — your progress, settings, and stats — stays on your device.`,
    },
    {
      heading: 'What is stored on your device',
      body: 'The game saves the following locally on your device (never sent to us or anyone else):\n\n• Level progress and unlocked levels\n• Game mode, sound, and music settings\n• Daily challenge streaks and stats\n• Story and tutorial "seen" flags\n\nThis data lives in your browser\'s local storage (web) or the app\'s private storage (Android/iOS).',
    },
    {
      heading: 'What we do NOT collect',
      body: `• No accounts or sign-ups\n• No analytics or tracking\n• No advertising or ad identifiers\n• No location data\n• No contacts, photos, or files\n• No crash reporting sent to third parties`,
    },
    {
      heading: 'Children\'s privacy',
      body: `${APP_NAME} collects no personal information from anyone, including children under 13. The game can be played fully offline.`,
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
