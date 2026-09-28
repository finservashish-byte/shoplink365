# ShopLink365 v2 — Redesign + Sanity, ready to replace your repo

## What this is

This is the shopping-app redesign (glass tiles, scratch card, hero carousel, WhatsApp
share, dynamic categories) rebuilt as real Next.js components, wired to your live
Sanity Studio (project `s95p658g`) instead of hardcoded mockup data.

It fully replaces your current `finservashish-byte/shoplink365` repo's `app/`,
`components/`, and `lib/` folders. The old Google Sheets pipeline (`scripts/fetch-products.mjs`,
the `PRODUCTS_SHEET_URL` secret) is no longer used — content now comes from Sanity.

## What's included

- `app/page.tsx` — the new homepage, fetching Platforms/Categories/Products/Hero
  Slides/Featured Offers/Guides from Sanity at build time
- `app/layout.tsx`, `app/globals.css` — shared shell + all mockup styling/animations
- `components/` — Header, QuickShopStrip, CategoryStrip, BigCategoryGrid, MiniEarnBar,
  HeroCarousel, ProductGrid (wishlist + WhatsApp share + sort/filter, all real,
  localStorage-based), CreditCardBanner, GuidesRail, BottomNav, ScratchCard (full
  canvas scratch interaction, once-per-day, confetti burst on reveal)
- `lib/sanity/client.ts`, `lib/sanity/queries.ts` — Sanity connection + GROQ queries
- `lib/basePath.ts`, `next.config.ts` — same GitHub Pages basePath setup as before
- `app/manifest.ts`, `app/sitemap.ts`, `app/robots.ts` — PWA + SEO basics preserved
- `.github/workflows/deploy.yml` — simplified: no longer needs `PRODUCTS_SHEET_URL`

## What's NOT included yet (follow-up work)

- Product detail page (`/reviews/[slug]`) — cards link there but the page doesn't exist yet
- `/category/[id]`, `/search`, `/guides`, `/guides/[slug]`, `/about`, `/contact`,
  `/categories`, `/wishlist` — nav links point here but pages aren't built
- Product images — Sanity products need real photos uploaded per product; until then,
  cards show colored gradient placeholders (same as the mockup)
- The "no exact match" search-comparison view from the mockup

None of this breaks the build — Next.js will just 404 on those routes until built.
Say the word and I'll build them next, same approach (Sanity-driven where it makes sense).

## Cleaning up + replacing the GitHub repo

**1. Delete the old code from the repo** (keep `.git` history — just remove these folders/files
via the GitHub web UI or locally):
   - `app/`
   - `components/`
   - `lib/`
   - `scripts/`
   - `.github/workflows/deploy.yml` (will be replaced)

   Easiest way locally:
   ```powershell
   cd path\to\your\local\shoplink365\clone
   git pull
   Remove-Item -Recurse -Force app, components, lib, scripts
   ```

**2. Copy in this entire `shoplink365-v2` folder's contents** (not the folder itself —
   its contents) into the repo root, so you end up with `app/`, `components/`, `lib/`,
   `.github/`, `next.config.ts`, `package.json`, `tsconfig.json` at the top level,
   same layout as before.

**3. Install the new dependency** (`next-sanity`, `@sanity/image-url`) and commit:
   ```powershell
   npm install
   git add .
   git commit -m "Replace basic template with shopping-app redesign, connect to Sanity"
   git push
   ```

**4. Watch the Actions tab** — the push triggers the same GitHub Pages deploy as before.
   Once green, refresh https://finservashish-byte.github.io/shoplink365/ — you should
   see the new shopping-app design, pulling live Platforms/Categories/Products straight
   from your Sanity Studio.

**5. Remember:** this is a static export — changing something in Sanity Studio does
   NOT update the live site by itself. You need to re-run the GitHub Actions workflow
   (or push any small commit) to rebuild and pick up the new content. Setting up an
   auto-rebuild webhook from Sanity is the next thing on the list after this.
