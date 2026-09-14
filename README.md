# JennyDoko Landing Page

Static landing page for the JennyDoko puzzle game. Built with [Astro](https://astro.build) — ships plain HTML/CSS, no JS framework.

## Commands

```bash
npm install    # first time only
npm run dev    # dev server at http://localhost:4321
npm run build  # static build → dist/
npm run preview # serve the built site
```

## Layout

- `src/pages/index.astro` — the whole landing page (markup + scoped styles)
- `public/assets/` — game art copied from the game repo (`jenny/assets/`)
- `public/JennyDoko-preview.apk` — the preview build the Download button serves
- `public/privacy.html`, `public/terms.html` — legal pages copied from `jenny/public/`

## Notes

- The APK is ~84 MB — under GitHub's 100 MB file limit, but it will bloat the
  repo. For a real launch, upload it to a GitHub Release (or use the Play Store
  link) and update `APK_URL` at the top of `src/pages/index.astro`.
- Deploy anywhere static: GitHub Pages, Netlify, Vercel, Cloudflare Pages —
  point it at `npm run build` with output dir `dist/`.
- Branding: the page says "JennyDoko" but the app icon/banner art still says
  "Jenny's Sudoku" — regenerate the logo art or update the name before launch.
