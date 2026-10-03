# JennyDoko — Play Store release checklist

Status as of 2026-09-18: code is wired for AdMob (banner + interstitial + rewarded)
using Google's **test** ad units. Everything below that needs an account or a
console is marked [console]; everything code-side is done.

## 1. AdMob account — [console]

You have Play Console but no AdMob yet.

1. Sign up at https://admob.google.com with the same Google account as Play Console.
2. Create app → Android → "app is not published yet" is fine; link it to
   `com.jennydoko.game` once the Play listing exists.
3. Copy the **AdMob App ID** (`ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY`) into
   `app.json` → `plugins → react-native-google-mobile-ads → androidAppId`
   (and `iosAppId` if iOS ships). Currently Google's test app ID is used.
4. Create three ad units and paste their IDs (`ca-app-pub-…/NNNNNNNNNN`) into
   `src/ads/adConfig.ts` → `PROD_UNITS.android`:
   - `banner` — adaptive anchored banner (Home + World Map screens)
   - `interstitial` — level transitions (already frequency-capped in code)
   - `rewarded` — extra hints
   Until the placeholders are replaced, release builds show no ads (clean
   no-op); dev builds always use Google's test units.
5. AdMob → **Privacy & messaging** → publish a **GDPR (UMP) consent message**
   for the app. Required for EEA/UK users; `AdsConsent.gatherConsent()` in
   `src/ads/adManager.native.ts` drives it.
6. Publish `app-ads.txt` at `https://jennydoko.fun/app-ads.txt` containing:
   `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`
   (replace `pub-…` with your publisher ID; verify it in AdMob → app-ads.txt).
7. AdMob → Apps → link the app to the Play listing once the listing exists.

## 2. Build & submit — [console]

- Production AAB: `eas build -p android --profile production`
  (auto-increments versionCode via `appVersionSource: remote`).
- Signing: EAS build credentials for `com.jennydoko.game` point to the
  keystore registered in Play Console as the **upload key** —
  SHA-256 `1E:F9:33:F3:...:6C`, SHA-1 `07:37:15:3D:36:A6:1D:86:94:AF:58:BF:97:6D:5D:CA:9A:5E:CF:38`.
  Play rejects AABs signed with any other key. `@binarybodhi__jennydoko.jks`
  in the repo root is a *different* EAS keystore (SHA-256 `2B:6F:ED:49:...`) —
  kept as a spare; do not switch credentials to it without updating Play
  Console's upload key first (`eas credentials` or App integrity → reset).
- Submit: `eas submit -p android --profile production` needs
  `play-console-service-account.json` (gitignored) — create it in
  Play Console → Setup → API access → service account, grant "Release" rights.
  First upload of a new app must be done manually in Play Console UI
  (EAS submit can't create the app entry); subsequent uploads can use EAS.
- `eas.json` submit track is `internal` — promote internal → closed/open →
  production in Play Console.

## 3. Play Console listing — [console]

Data Safety answers (must match the privacy policy):
- Data collected: **none** sent to the developer.
- Data shared: **Device or other IDs** → Advertising ID → shared with third
  party (Google AdMob), purpose: advertising/marketing, not optional for
  ad-supported use (transfer off-device, not sold).
- No data collected → declare "No data collected" only for developer-side;
  the AdMob share must be declared.

Other console items:
- Content rating questionnaire → expect "Everyone"; ads capped at PG rating.
- Target audience: general audience (not "Designed for Families" — that
  program has stricter ad rules; if you want it, ads must come from
  Google Play certified ad networks only).
- Declare the app **contains ads** in the listing (required label).
- Privacy policy URL: https://jennydoko.fun/privacy.html (updated 2026-09-18).
- News/ads declaration form in Play Console must be filled for ad-supported apps.

### Store listing copy (ASO)

- **Title** (30 chars): `JennyDoko: Puppy Star Puzzle`
- **Short description** (80 chars):
  `Place every puppy in its own sunny spot — a 1,000-level logic puzzle.`
- **Full description** (draft, ≤4000 chars):

```
Help Jenny give every puppy its own sunny spot.

JennyDoko is a pure-logic puzzle game in the Star Battle family: place puppies
so that no two share a row, column, or fenced patch — and no two puppies touch,
not even diagonally. Every puzzle is solvable by deduction alone. No guessing,
no timers, no luck.

• 1,000 hand-tuned and verified puzzles across 50 story chapters
• New twists as you travel: grumpy cats that need space, linked beds that
  share a single pup, and twin-puppy boards with more than one solution
• Three play modes: Normal, Zen (unlimited chances), Challenge
• Stuck? Jenny explains the exact deduction — three levels of hint, from the
  rule to the cell to placing it for you
• Daily Garden puzzle with streaks and shareable results
• Collect all 50 Garden Stamps on the Puppy Passport
• Offline play, no account, no fuss

Rules: place exactly the required number of puppies in every row, column, and
fenced patch. Puppies may never touch — not even diagonally. Cats hate puppies:
keep them apart. Linked beds share a single puppy between them.

Free with ads. Optional rewarded ads only for extra hints.
```

- **Keywords to work into the listing text** (Play has no keyword field):
  logic puzzle, star battle, deduction puzzle, brain teaser, offline puzzle,
  daily puzzle, puppy game.
- Graphic assets needed [console/asset work]:
  - Feature graphic 1024×500 (required)
  - ≥2 phone screenshots 16:9 or 9:16 (recommend: HomeScreen, board mid-level,
    completion modal); tablet screenshots optional but help tablet ranking
  - Icon 512×512 (assets/icon.png — verify it looks right at that size)
- Category: Games → Puzzle → Logic. Tags: puzzle, logic, offline.

## 4. What is already done in code

- `react-native-google-mobile-ads` 16.5.0 installed; config plugin in app.json
  (currently Google's **test** app IDs — swap for real ones).
- `src/ads/adConfig.ts` — unit IDs, `FREE_HINTS_PER_LEVEL = 3`, interstitial
  cap (≥ level 5, every 3 completions, ≥ 90 s apart).
- `src/ads/adManager.native.ts` — UMP consent, SDK init, rewarded,
  frequency-capped interstitial, privacy options form.
- Rewarded ads gate hints after 3 free hints/level (Settings: Privacy & Ads
  opens Google's consent form).
- Interstitial only on "Next Level", level ≥ 5, every 3rd completion, ≥ 90 s
  apart; never blocks when no ad is loaded.
- Banner on Home + World Map only (not on the board — avoids accidental taps).
- Privacy policy + terms updated in-app and in `public/*.html`.
- Web build and Jest use no-op stubs; `npm test` unaffected.
- `expo-audio` plugin sets `enableBackgroundPlayback: false`, so no
  `FOREGROUND_SERVICE*` permissions are emitted — the Play Console
  "foreground service" declaration does not apply (BGM pauses in background).

## 5. Remaining [console] / asset work

- AdMob account + 3 ad units → paste IDs into `adConfig.ts` + app.json.
- UMP consent message published in AdMob (Privacy & messaging).
- app-ads.txt on jennydoko.fun.
- Play Console listing: data safety, content rating, ads declaration,
  screenshots + feature graphic, store copy above.
- First AAB upload is manual in Play Console; then `eas submit`.
- Service-account JSON for eas submit (gitignored pattern already added).
- Keep `.jks` upload key backed up off-repo; or let EAS manage credentials.
