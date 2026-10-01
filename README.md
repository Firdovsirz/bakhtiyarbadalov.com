# bakhtiyarbadalov.com

Personal website and CV of **Bakhtiyar Badalov** (Bəxtiyar Bədəlov), Director of the Research, Development & Reputation Department at Azerbaijan Technical University, Baku.

Built with Next.js 16 (App Router, TypeScript, Turbopack). Every page is static, so the site can be hosted anywhere.

## What's included

| Route | What it is |
| --- | --- |
| `/` | The website: hero with the BB seal, About, Experience, Education, Achievements, a map of his international reach centred on Baku, Publications (filterable), Contact, and a colophon about the monogram |
| `/cv` | The CV as a web page, with **Download PDF** and **Print** |
| `/Bakhtiyar-Badalov-CV.pdf` | The downloadable CV, printed from `/cv` |
| `/brand/*` | Logo files: SVG and PNG monogram, seal, app icons |
| `/opengraph-image.png`, `/twitter-image.png` | Link preview shown when the site is shared |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` | Search engines and "add to home screen" |

The home page also carries `schema.org/Person` data linking the site to his LinkedIn and Google Scholar profiles.

## Commands

```bash
npm install            # once
npm run dev            # http://localhost:3000, reloads on save
npm run build          # production build (also type-checks)
npm start              # serve the production build
npm run lint           # ESLint
npm run typecheck      # TypeScript only
```

## Editing content

All text lives in `src/content/`:

- `profile.ts`: name, links, bio, experience, education, training, grants, rankings, languages
- `publications.ts`: publications and their themes (the filter buttons are built from these)
- `places.json`: cities on the map and on the seal's compass ticks

After editing, refresh the generated files:

```bash
npm run generate:map     # after changing places.json: map projection and distances
npm run build
npm run generate:cv      # prints /cv to public/Bakhtiyar-Badalov-CV.pdf
```

`generate:cv` starts the built site on a spare port and prints it with a local Chromium-based browser (Chrome, Brave, Edge or Chromium; set `CHROME_PATH` to choose one). To print a deployed site instead: `CV_URL=https://bakhtiyarbadalov.com/cv npm run generate:cv`.

## The monogram

Two B's, for Bakhtiyar and Badalov, interlocked like chain links: each passes over the other twice and under it twice, and the second B stands one step higher. Every corner is cut at 45°, the angle of the Azerbaijani eight-pointed star.

The geometry is defined once in `src/components/brand/monogram.json`. The site's components (`Monogram.tsx`, `Seal.tsx`) and the asset script all read it:

```bash
npm run generate:brand   # rewrites public/brand/*, src/app/icon.svg, favicon.ico, apple-icon.png, opengraph-image.png
```

Logo files in `public/brand/`:

| File | Use |
| --- | --- |
| `bb-monogram.svg` / `-brass.svg` / `-white.svg` | Vector monogram in ink, brass or white |
| `bb-monogram-1024.png` | Ink monogram on transparent background |
| `bb-monogram-brass-on-caspian-1024.png` | Brass on dark square, for social avatars |
| `bb-seal.svg`, `bb-seal-dark.svg`, `bb-seal-1200.png` | The full seal (ring text uses Martian Mono) |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `favicon-*.png` | App and browser icons |

Brand colours: ink `#0F2328`, limestone `#EDF1EF`, brass `#B48D3A` (light `#DDB566`), Caspian `#0B181C`.
Fonts: Brygada 1918 (display), Schibsted Grotesk (text), Martian Mono (labels), self-hosted by `next/font`.

## Deploying

The simplest route is [Vercel](https://vercel.com/new): import the repository, keep the defaults, then add the domain `bakhtiyarbadalov.com` under **Settings → Domains**. Any Node.js host works too (`npm run build && npm start`).

The site's canonical address is set in `src/content/profile.ts` (`site.url`); change it there if the domain changes.

## Working from the exFAT drive

This folder lives on an exFAT drive, which needs three accommodations (all already set up):

1. **No symlinks.** `.npmrc` sets `bin-links=false`, and the `package.json` scripts call each tool's entry file directly, so always use `npm run …` rather than `npx next …`.
2. **AppleDouble files.** macOS writes a `._name` companion for every file on exFAT. TypeScript, ESLint and git ignore them (`tsconfig.json`, `eslint.config.mjs`, `.gitignore`). To remove them, for example before zipping the folder: `npm run clean:appledouble`.
3. **No Turbopack disk cache.** Those `._` files corrupt Turbopack's cache in `.next`, so `next.config.ts` turns the cache off when the project runs from `/Volumes/…`. Builds elsewhere (Vercel, CI, an internal disk) keep it. If a build ever fails with "Failed to open database", delete `.next` and build again.

## Facts to confirm

The content comes from public sources: his Google Scholar profile, his 2017 CV on Khazar University's site, and news from AzTU, Azerbaijan University, AZERTAC and partner universities. These points are still unconfirmed:

- the year he joined AzTU (shown as "Current role")
- end dates at Azerbaijan University ("From 2013") and Qafqaz University ("From 2012")
- the date of the UET Lahore visit
- whether his language levels (from the 2017 CV) are current
- a public email address, if he wants one on the Contact section
