<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project notes

- Content is data: edit `src/content/profile.ts`, `publications.ts` and `places.json`, not the components. The website, `/cv` and the PDF all render from these files.
- The monogram geometry lives in `src/components/brand/monogram.json`; `npm run generate:brand` rebuilds every logo, icon and link-preview file from it.
- After content changes run `npm run build` then `npm run generate:cv` so `public/Bakhtiyar-Badalov-CV.pdf` matches `/cv`.
- The folder is on an exFAT drive: use `npm run <script>` (no `node_modules/.bin`), and ignore `._*` AppleDouble files. See "Working from the exFAT drive" in README.md.
- Colours are CSS custom properties in `src/app/globals.css` with light, dark and print values; style components through the tokens.
