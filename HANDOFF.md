# HANDOFF.md

## 1. Purpose

This is **dropdev.co / www.dropdev.co** — the public marketing website for Drop Dev, an AI product studio. It's a single-page-feeling "galaxy" scrollytelling experience (WebGL starfield, orbiting "planet" sections for the studio's two focus areas — Vertical AI SaaS and Community Marketplaces) plus a secondary `/about` route. There is no backend, no API calls, and no data persistence — it's a fully static React SPA that renders hard-coded copy from `src/data/content.js`. Since this is the studio's own storefront, its visual polish and animation quality double as a demonstration of the studio's frontend capability to prospective clients.

## 2. Status

**Active.** Last commit: `cf0facc3` — "V3: star cursor, grabbable planets, About page, routing" — 2026-07-05 (per `git log -1`). Current branch: `main`. Working tree is clean (no uncommitted changes at time of writing). No open PRs or CI failures observed.

Sibling repo note: a `dd-website` repo also exists locally (checked out alongside this one). It is a **separate, differently-stacked project** (package name `react-three-next`, a Next.js/Chakra UI app, `engines.node: 18`, remote `origin` → `CarlosGonzalez0211/dd-website`, `upstream` → `idropdev/dd-website`), last commit "SMS Landing Pgae V1" (2026-02-23). It shares the `idropdev` GitHub org with this repo but is not the same codebase as this Vite/React repo — do not assume code or conventions transfer between them without checking.

## 3. Stack

Read directly from `package.json` (no versions guessed):

- **React** 19.2.0 / **react-dom** 19.2.0
- **react-router-dom** 7.12.0 (client-side routing, `BrowserRouter`)
- **Vite** 7.2.4 (build tool) + `@vitejs/plugin-react` 5.1.1
- **Tailwind CSS** 4.3.2 + `@tailwindcss/vite` 4.3.2 (Vite plugin, no separate `tailwind.config.js` needed for v4)
- **GSAP** 3.15.0 + `@gsap/react` 2.1.2
- **motion** (Framer Motion successor) 12.42.2
- **ogl** 1.0.11 — minimal WebGL library, used for the animated `Galaxy` background
- **clsx** 2.1.1 + **tailwind-merge** 3.6.0 (className merging, see `src/lib/utils.js`)
- Dev/lint: **ESLint** 9.39.1 (flat config), `eslint-plugin-react-hooks` 7.0.1, `eslint-plugin-react-refresh` 0.4.24
- **gh-pages** 6.3.0 (present as a devDependency for manual deploy, but see Setup & Commands — CI does not use it)
- No TypeScript at runtime (plain `.jsx`), though `@types/react` / `@types/react-dom` are present for editor tooling only.
- No `.nvmrc` and no `engines` field in `package.json`. CI (`.github/workflows/deploy.yml`) pins **Node 20** — treat that as the target runtime.

## 4. Setup & Commands

```
npm install       # install dependencies
npm run dev        # vite dev server (default port 5173, see .claude/launch.json)
npm run build       # vite build -> dist/
npm run preview     # serve the production build locally
npm run lint        # eslint .
npm run deploy       # predeploy (build) + gh-pages -d dist — manual publish path
```

No test script defined — `package.json` has no `test` entry. Do not assume a test suite exists.

Verified `npm run lint` (`npx eslint .`) exits 0 with no warnings on the current tree.

Production deploys actually happen via **GitHub Actions** (`.github/workflows/deploy.yml`), not the `deploy` npm script: on every push to `main`, it runs `npm install`, `npm run build`, then uploads `dist/` to GitHub Pages via `actions/deploy-pages@v4`. The `gh-pages` script/package is a legacy/manual fallback — prefer just pushing to `main` for real deploys.

## 5. Architecture Map

```
index.html                 Vite entry HTML, mounts #root
src/
  main.jsx                 React root, wraps <App/> in <StrictMode>
  App.jsx                  BrowserRouter + route table + GH Pages SPA-redirect restore
  GalaxySite.jsx            "/" route content: composes the scrollytelling sections
  index.css                 Tailwind v4 entry + custom theme tokens (bg-space, accent colors)
  lib/utils.js              cn() — clsx + tailwind-merge helper (most-used symbol in repo)
  data/content.js           ALL page copy: planets, capabilities, industries, contact — edit here for copy changes
  components/
    Layout.jsx              Shared shell for every route (persistent WebGL galaxy, nav, cursor,
                             meteors, footer, scroll-progress bar, first-load Preloader). Mounts once.
    Preloader.jsx           First-load "Preparing your experience" gate + FPS quality probe
    StarCursor.jsx          Custom cursor (desktop precise-pointer only)
    ScrollToAnchor.jsx      Scrolls to #hash on route change
    galaxy/                 WebGL scene: Galaxy.jsx (ogl-based), Orb.jsx, Meteors.jsx, StaticStars.jsx
                             (StaticStars is the no-WebGL / reduced-motion fallback)
    ui/                     Small reusable primitives: Reveal, ScrollRevealText, Magnetic,
                             OrbitingCircles, SpotlightCard, StarBorder — each adapted from a
                             reference component under research/components/ (see file-header comments)
  sections/                 Page sections composed by GalaxySite.jsx: Hero, PlanetSection,
                             CapabilityCluster, IndustriesBelt, Arrival, Nav
  pages/
    About.jsx                "/about" route
public/
  404.html                  GitHub Pages SPA fallback (stashes path in sessionStorage, redirects to "/")
  CNAME                     dropdev.co  (APEX — differs from root CNAME! see Gotchas)
research/                   Design reference material: BRIEF.md, FABLE_PROMPT*.md, SYNTHESIS.md,
                             and copied third-party component sources (kokonutui, magicui,
                             motion-primitives, reactbits, refero-styles) used as adaptation
                             references. NOT imported by src/ at build time — grep confirms only
                             comment-level attributions, no actual imports. Tracked in git (95 files).
.github/workflows/deploy.yml  CI/CD: build + deploy to GitHub Pages on push to main
.claude/launch.json          Dev-server launch config for AI coding tools (npm run dev, port 5173)
dist/                        Build output — present locally but gitignored, not tracked
```

## 6. Entry Points — Read These First

1. `src/App.jsx` — the entire route table lives here (2 routes: `/` and `/about`). Start here to see what pages exist.
2. `src/components/Layout.jsx` — the shared shell every route renders inside; explains the persistent-WebGL-background architecture and why routes only swap `<Outlet/>`.
3. `src/GalaxySite.jsx` — composition root for the home page; shows the section order (Hero → planets → CapabilityCluster → IndustriesBelt → Arrival).
4. `src/data/content.js` — all copy (planets, capabilities, industries, contact info) lives in one file; almost any "change the text" task starts and ends here.
5. `src/lib/utils.js` — the `cn()` helper, imported by nearly every component (18 edges per graphify — the most-connected symbol in the repo).
6. `src/components/galaxy/Galaxy.jsx` — the WebGL centerpiece; touch carefully, it drives the FPS-quality-tier logic in `Preloader.jsx`.
7. `.github/workflows/deploy.yml` — confirms how a merge to `main` actually reaches production.

## 7. Conventions & Gotchas

- **Layout mounts once, routes don't remount the galaxy.** The WebGL `Galaxy` component lives in `Layout.jsx`, not in individual routes — this is intentional (comment in the file explains it) so navigating between `/` and `/about` doesn't reinitialize WebGL. Don't move galaxy state into a route component without understanding why it was hoisted.
- **GitHub Pages SPA routing workaround**: `public/404.html` + the `RedirectHandler` in `App.jsx` implement the common GH-Pages SPA hack (stash path in `sessionStorage`, redirect to `/`, restore on boot). If deep-link routing breaks, check both halves of this pair together.
- **`research/` is reference material, not source.** It's tracked in git (95 files) and several `src/components/ui/*` files credit a specific `research/components/...` file in a header comment as their adaptation source, but nothing in `src/` imports from `research/` at runtime. Don't treat it as dead code to delete without checking the attribution comments first.
- **Two CNAME files exist and they DISAGREE.** `/CNAME` = `www.dropdev.co` (no trailing
  newline); `/public/CNAME` = `dropdev.co` (apex, CRLF-terminated). Verified with `od -c`.
  The `public/` copy is the one that ships in `dist/` and therefore sets the live GitHub
  Pages custom domain, so **apex wins in production** despite the root file saying `www`.
  Reconcile these before touching domain config.
- **Reduced-motion / no-WebGL fallback**: `Layout.jsx` checks `useReducedMotion()` and WebGL support before rendering `Galaxy`; falls back to `StaticStars.jsx`. Any new animated background work should preserve this fallback path.
- **Tailwind v4 config lives in `src/index.css`** (via `@theme`/CSS-based config), not a `tailwind.config.js` file — none exists in the repo root, which is expected for this Tailwind version, not a missing file.
- The `deploy` npm script (`gh-pages -d dist`) is **not** what actually deploys production; the GitHub Actions workflow is. Don't assume running `npm run deploy` locally is required or even the recommended path — pushing to `main` is.

## 8. External Dependencies & Environment

- **No environment variables** — confirmed via `grep -r "import.meta.env"` across `src/`, `public/`, and `index.html`: zero matches.
- **No external API calls** — confirmed via `grep -r "fetch(\|axios"` across `src/`: zero matches. This is a static, self-contained site.
- **Hosting**: GitHub Pages, custom domain `www.dropdev.co` (see `CNAME`), deployed via GitHub Actions (`actions/deploy-pages@v4`).
- **No database, no auth, no third-party SDKs** beyond the npm packages listed in Stack.

## 9. Known Issues & TODOs

None identified. `npm run lint` passes clean (exit 0, no warnings). No `TODO`/`FIXME` markers found in `src/`. No import cycles detected by graphify. Working tree is clean and the last commit message indicates a completed feature set ("star cursor, grabbable planets, About page, routing"), not a work-in-progress state.

One structural note worth knowing about (not a bug): graphify's report lists 214 "isolated" nodes and 41 "thin" communities — this mostly reflects how many small, self-contained UI primitive files this repo has (each with its own local types/constants), not missing functionality.

## 10. Fast Orientation for a New Agent

This repo has a graphify knowledge graph at `graphify-out/` (built from commit `cf0facc3` — run `git rev-parse HEAD` and compare; re-run `graphify update .` if stale). To orient before reading files:

```
export PATH="$HOME/.local/bin:$PATH"
graphify query "what is the entry point and overall architecture of this site"
graphify god-nodes --top 15
```

The single most useful first question for this specific repo:

```
graphify query "what does src/data/content.js drive, and which components consume it"
```

— because nearly every real task on this site (copy changes, adding a planet/capability/industry, tweaking the pitch) starts in that one data file, and this question shows you every consumer in one shot without having to trace imports by hand. After that, read `src/App.jsx` → `src/components/Layout.jsx` → `src/GalaxySite.jsx` in that order (Section 6 above) to understand routing and composition, then run `npm install && npm run dev` and open `http://localhost:5173` to see the site live before making changes.
