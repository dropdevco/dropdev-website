# Fable Build Prompt V3 — Drop Dev Galaxy Site (Revision + About page)

> This is a **revision** of the existing, working galaxy site in this repo (React 19 + Vite,
> Tailwind v4, `motion`, `gsap`, `ogl`, `react-router-dom` is installed but not currently wired).
> **Edit the existing files in place** and add the few new ones named below. Keep it a
> static-hostable SPA (GitHub Pages, custom domain `dropdev.co` via CNAME), real HTML text,
> `prefers-reduced-motion` + mobile fallbacks intact.
>
> **Every instruction is prescriptive — implement it as written.** Don't deliberate; build this.

## Current architecture (what you're touching)
- `src/App.jsx` → renders `<GalaxySite />` directly (no router today).
- `src/GalaxySite.jsx` — owns the fixed galaxy background, `<Meteors/>`, `<Preloader/>`, the
  master scroll→galaxy `controls` ref (flight/hue), the FPS `quality` tier, `<Nav/>`, and the
  home page sections.
- `src/components/galaxy/` — `Galaxy.jsx` (ogl starfield), `Orb.jsx` (ogl planet; has a `rot`
  uniform + `rotateOnHover`), `StaticStars.jsx`, `Meteors.jsx`.
- `src/components/Preloader.jsx`.
- `src/sections/` — `Nav.jsx`, `Hero.jsx`, `PlanetSection.jsx`, `CapabilityCluster.jsx`,
  `IndustriesBelt.jsx`, `Arrival.jsx`.
- `src/components/ui/` — `Orb`… no: `StarBorder.jsx`, `Magnetic.jsx`, `Reveal.jsx`,
  `ScrollRevealText.jsx`, `OrbitingCircles.jsx`, `SpotlightCard.jsx`.
- `src/data/content.js`, `src/index.css` (Tailwind `@theme`), `src/lib/utils.js` (`cn`).

---

## 1 — Custom STAR cursor (replace the pointer)

Add `src/components/StarCursor.jsx` and mount it once in the shared layout (see §5).

- Hide the native cursor **only when a precise pointer is present**: add `cursor: none` to
  `html` under `@media (pointer: fine)` in `index.css`. On touch/coarse pointers render nothing
  and keep the native cursor.
- Render a `fixed`, `pointer-events-none`, top-layer (z ~[90]) SVG **star** (a 4- or 5-point
  sparkle in the violet→cyan accent) that follows the mouse. Use a `motion` spring (or a rAF
  lerp) so it trails with a slight, smooth lag; add a faint secondary "sparkle" dot that lags
  a touch more for a comet feel. A gentle continuous rotation on the star is welcome.
- **Interactive-hover state:** when the pointer is over an `a`, `button`, or `[role="button"]`,
  scale the star up ~1.6× and brighten/glow it (detect via `mouseover`/`mouseout` on
  `document`, checking `e.target.closest('a,button,[role="button"]')`). Return to normal
  otherwise.
- Never intercept clicks (pointer-events-none). Respect `prefers-reduced-motion` by dropping the
  trailing lag (position it directly) but you may keep the star.

**Acceptance:** On desktop the cursor is a small trailing star that grows over clickable things;
touch devices are unaffected; clicking still works everywhere.

---

## 2 — Focus-area planets become real, grabbable planets (drop the moon buttons)

The orbiting moon chips (“Compliant by design”, etc.) read as buttons and don't belong on a
planet. Replace that with a planet you can **grab and spin**.

**In `Orb.jsx` — add pointer-drag rotation with inertia:**
- The fragment shader already has a `rot` uniform. Drive it from interaction instead of
  hover-only:
  - Maintain `currentRot`, `targetVel` (angular velocity), and a drag state.
  - `pointerdown` on the container → capture pointer, record last X, set a `grabbing` flag.
  - `pointermove` while grabbing → `currentRot += (e.movementX or dx) * 0.005`; track velocity.
  - `pointerup`/`pointercancel` → release; apply **inertia**: keep adding the last velocity to
    `currentRot` each frame, decaying it (`vel *= 0.94`) until it settles.
  - Always add a slow idle auto-spin (e.g. `currentRot += dt * 0.05`) so the planet lives.
  - Feed `currentRot` into `program.uniforms.rot.value` every frame.
- Cursor affordance: set the container `style.cursor` to `grab`, and `grabbing` while dragging.
  (This overrides the star cursor locally — that's fine and correct.)
- Keep the existing hover ripple (`hover`/`hoverIntensity`) and the paused/reduced-motion static
  frame. Under `prefers-reduced-motion`, disable drag/inertia (static frame stays).

**In `PlanetSection.jsx` — remove the orbiting moons:**
- Delete the `<OrbitingCircles>` block and the moon **buttons** entirely, plus the desktop
  hover-meaning caption and the mobile tappable moon chips.
- Keep the planet (`<Orb/>`), the kicker, the title, and the `ScrollRevealText` description.
- So the sub-points aren't lost, render the three moon labels as a **single plain,
  non-interactive line** under the description — small mono, tracked, low-opacity, e.g.
  `Domain-trained · Fits your workflow · Compliant by design` (dot-separated). No buttons, no
  tooltips, no orbit. (You may drop `moon.meaning` from display; keep it in the data.)
- Make the planet feel grabbable: ensure the `<Orb/>` wrapper is above the scroll-transform layer
  so pointer drags register, and it still scales with the camera on scroll.

**Acceptance:** Each focus-area planet is a sphere you can click-drag to spin (with inertia) and
that idles with a slow rotation; no moon buttons anywhere; the three sub-points appear once as
plain text under the copy.

---

## 3 — Slow the meteors down (make them clickable)

In `Meteors.jsx`:
- Increase the crossing **duration from 1.6s to ~4.5s** (slower streak).
- Enlarge the clickable head hit area from 44px to **~64px**.
- Optionally shorten the spawn gap slightly (e.g. 7–14s) so one is usually on screen to catch.

**Acceptance:** Meteors drift slowly enough to comfortably click/tap and crush.

---

## 4 — Industries solar system: bigger, slower, no icons

In `IndustriesBelt.jsx`:
- **Bigger:** raise the stage size (currently `max-w-[440px]`) to **~`max-w-[640px]`** (and let
  it fill its column). Increase orbit geometry so planets are well spaced and easy to aim: bump
  the `ORBITS` semi-major axis (e.g. base ~18, step ~7) while keeping ellipses inside the
  viewBox. Enlarge planet dot sizes a little (idle and active) and their hit areas.
- **Slower:** greatly increase orbital periods — change `period: 22 + i * 4` to roughly
  `period: 70 + i * 14` seconds so planets crawl and are easy to target. (Keep the ~3.5s idle
  auto-tour of the highlight, or slow it to ~4.5s.)
- **No icons in the info panel:** remove the emoji `{selected.icon}` from the detail-panel header
  (and any other emoji in this section). Title + text only. The colored planet dots stay.
- Keep: elliptical rings, click planet/ring to select + pause, click core to resume, the
  `howWeHelp` "What we can do for you" block, and reduced-motion freeze.

**Acceptance:** The solar system is noticeably larger and rotates slowly enough to click a
specific planet easily; the detail panel has no emoji/icons.

---

## 5 — Introduce routing + shared layout (needed for the About page)

Wire real routing so we can add pages while the galaxy persists across them.

- Use **`BrowserRouter`** from `react-router-dom` (clean URLs; custom domain). For GitHub Pages
  deep-link support, add a **`public/404.html` that is a copy of the SPA shell / redirects to
  `/`** (the standard gh-pages SPA fallback) so `/about` resolves on refresh. Ensure the CNAME
  file remains in `public/`.
- Create `src/components/Layout.jsx` that renders **once around all routes**:
  - the fixed galaxy background (`<Galaxy/>` or `<StaticStars/>` with the `controls` ref +
    `quality`), the vignette, `<Meteors/>`, `<StarCursor/>` (§1), the scroll-progress bar,
    `<Nav/>`, the `<Preloader/>` gate, and an `<Outlet/>` for page content.
  - Move the galaxy/controls/quality/preloader/meteors ownership **out of `GalaxySite.jsx` into
    `Layout.jsx`.** `GalaxySite.jsx` becomes just the **home** page: `<Hero/>`, the
    `PlanetSection`s, `<CapabilityCluster/>`, `<IndustriesBelt/>`, `<Arrival/>`.
- `src/App.jsx`:
  ```jsx
  <BrowserRouter>
    <ScrollToAnchor />
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<GalaxySite />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  </BrowserRouter>
  ```
- Add `src/components/ScrollToAnchor.jsx` (scroll to `#hash` on navigation, else scroll to top on
  route change).
- **`Nav.jsx` route-awareness:** add an **“About”** link (router `Link` to `/about`). The section
  anchors (`#capabilities`, `#industries`, `#vertical-ai`) must work from any page: link them to
  `/#capabilities` etc. (navigate home, then `ScrollToAnchor` scrolls). The logo links to `/`.

**Acceptance:** `/` shows the galaxy home; `/about` shows the About page; the galaxy, star cursor,
meteors, nav, and preloader are shared and don't re-initialize between routes; nav anchors work
from both pages; refreshing `/about` still loads.

---

## 6 — Build the About page (`src/pages/About.jsx`)

Same galaxy aesthetic (near-black, violet accent, hairline borders, mono labels, oversized
display type, `Reveal`/`ScrollRevealText` entrances, `StarBorder` + `Magnetic` CTA) but a
**different, calmer structure** — a standard elegant scrolling page, NOT the planet-flight
scrollytelling, and **no emoji/icons anywhere** (drop the 🤝 / 🚀 from the source content). Use
the copy below verbatim. Wrap sections in `max-w-*` containers over the shared galaxy background.

**Hero**
- Kicker (mono, accent): `About Drop Dev`
- H1 (large, gem/gradient treatment welcome): **We Build What Others Only Imagine**
- Lead paragraph: *DropDev is a vertical AI consulting company. We bring cutting-edge
  technology—OCR, RAG systems, local AI, and purpose-built software—into communities and
  industries that need it most. We make the impossible possible.*

**Our Mission**
- Eyebrow: `Our Mission`
- Statement (large): **To empower people through technology.**
- Body (three paragraphs, verbatim):
  1. *We believe AI should not belong only to the Fortune 500. Our mission is to bring
     enterprise-grade artificial intelligence to organizations, communities, and industries that
     are ready to leap forward—but haven't had the right technology partner to get them there.*
  2. *We don't just consult. We look at what you're doing and show you how we can build it
     better—faster, smarter, and with AI at the core. If your competitors are using yesterday's
     tools, we'll help you build tomorrow's platform today.*

**Our Vision** — render as a large pull-quote (hairline left border or oversized quotation marks):
- *"We believe in a world where the best technology doesn't belong only to the largest companies.
  Our role is to bring AI capability to every community, every industry, every founder with an
  idea worth building—and show them what becomes possible."*

**How We Empower People** — two hairline panels, **no emoji**, title + description:
- **Technology Into Community** — *We build with communities, not just for them—ensuring
  technology adoption creates real, lasting value.*
- **The Impossible Made Possible** — *If you have a challenge that feels unsolvable, talk to us.
  We thrive at the edge of what's technically possible.*

**Our Philosophy** — four principles in a 2×2 (desktop) grid. Style the numbers as refined,
low-opacity mono numerals (`01`–`04`), title + paragraph:
- **01 · Vertical Beats Horizontal** — *Deep industry expertise creates defensible advantages
  that horizontal tools cannot match. We build for specific verticals, not generic use cases.*
- **02 · Local-First AI** — *Data privacy is not a feature—it's a foundation. We build AI systems
  that run where your data lives, giving you complete control and compliance confidence.*
- **03 · Ship, Then Improve** — *The best AI system is one that's actually running in production.
  We bias toward shipping working systems fast, then optimizing relentlessly.*
- **04 · We Can Build It Better** — *We look at what exists in your industry and we ask: how would
  we rebuild this from scratch with modern AI? The answer is always illuminating.*

**CTA (close)**
- H2: **Ready to See What's Possible?**
- Line: *Tell us what you're building—or what's holding you back. We'll bring the AI.*
- `StarBorder` (in `Magnetic`) → `mailto:info@dropdev.co`, label **Get in touch**.
- Reuse the existing footer from `Arrival.jsx` (extract it to a shared `Footer` if convenient, or
  render the same markup) so both pages share one footer.

Optionally add the About copy to `content.js` as an exported `about` object and import it — but
inline is fine. Keep everything real HTML text.

**Acceptance:** `/about` is a distinct, elegant page in the galaxy style with the exact copy
above, no icons, working CTA, shared nav/footer/background, and full reduced-motion + mobile
behavior.

---

## Global acceptance checklist
- `npm run build` and `npm run lint` pass clean; no console errors on either route.
- Star cursor trails on desktop, grows over clickables, absent on touch (§1).
- Focus-area planets grab-spin with inertia; no moon buttons; sub-points shown as plain text (§2).
- Meteors are slow and easily clickable (§3).
- Industries solar system is larger, slower, and icon-free in the detail panel (§4).
- `/` and `/about` both work, share the galaxy/cursor/meteors/nav/preloader, and survive refresh;
  nav anchors work cross-page (§5, §6).
- `prefers-reduced-motion` and mobile paths handled for every new interaction.
