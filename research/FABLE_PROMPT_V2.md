# Fable Build Prompt V2 — Drop Dev Galaxy Site (Revision Pass)

> This is a **revision** of an existing, working site — not a rebuild. The galaxy scrollytelling
> site already exists in this repo (React 19 + Vite, Tailwind v4, `motion`, `gsap`, `ogl`). Your
> job is to **edit the existing files in place** to execute the changes below. Do not re-architect,
> do not rename the project, do not swap libraries. Keep it a static-hostable SPA (deploys to
> GitHub Pages) with real HTML text, `prefers-reduced-motion` fallbacks, and mobile support intact.
>
> **Every instruction below is prescriptive. Implement it as written.** Where a specific value,
> file, or mechanism is named, use it. Don't deliberate over alternatives — build this.

## Current file map (what you're editing)

- `src/GalaxySite.jsx` — top-level composition; owns the master scroll → galaxy `controls` ref.
- `src/components/galaxy/Galaxy.jsx` — WebGL starfield (ogl); reads `controlsRef` each frame.
- `src/components/galaxy/Orb.jsx` — the planet orb (ogl), one per focus area.
- `src/components/galaxy/StaticStars.jsx` — Canvas2D reduced-motion fallback.
- `src/sections/Hero.jsx`, `PlanetSection.jsx`, `CapabilityCluster.jsx`, `IndustriesBelt.jsx`,
  `Arrival.jsx`, `Nav.jsx` — the page sections.
- `src/components/ui/*` — SpotlightCard, OrbitingCircles, Magnetic, Reveal, ScrollRevealText,
  StarBorder.
- `src/data/content.js` — all copy (planets, capabilities, industries, contact).
- `src/index.css` — Tailwind v4 `@theme` (palette, fonts, keyframes).

---

## 1 — FIX the background scroll behavior (highest priority, it's the worst offense)

**The bug, precisely:** In `Galaxy.jsx`'s render loop, star-layer *position* is computed in the
shader as `fract(i + uStarSpeed * uSpeed)`. The site currently feeds scroll **velocity** into
`uSpeed` (via a `warp` value that springs up while scrolling and relaxes to zero after). Because
`uSpeed` multiplies star position, the entire field lurches forward while scrolling and then
**slides backward as the velocity spring relaxes** when you stop. That backward settle is the
"unpleasant" motion. Separately, the forward advance is over-scaled so it feels faster than the
scroll.

**Do exactly this:**

1. In `Galaxy.jsx`, add an internal eased follower (a plain lerp — it never overshoots, so the
   field can never reverse). At the top of the effect, `let flightCurrent = 0;`. In the `update(t)`
   loop, replace the current `uStarSpeed` / `uSpeed` / `warp` lines with:
   ```js
   const targetFlight = controls ? controls.flight : 0;      // 0→1 absolute scroll progress
   flightCurrent += (targetFlight - flightCurrent) * 0.06;    // smooth, monotonic follow
   program.uniforms.uTime.value = t * 0.001;
   // very slow constant ambient drift + gentle scroll-proportional advance
   program.uniforms.uStarSpeed.value = (t * 0.001 * p.starSpeed) / 40.0 + flightCurrent * 0.6;
   program.uniforms.uSpeed.value = p.speed; // CONSTANT — velocity must never modulate position
   ```
2. In `GalaxySite.jsx`, **delete the velocity/warp system entirely**: remove `useVelocity`,
   `useSpring`, `smoothVelocity`, and the `useMotionValueEvent(smoothVelocity, …)` block that sets
   `controls.current.warp`. Keep only the `flight` and `hue` writes:
   ```js
   useMotionValueEvent(scrollYProgress, 'change', (v) => {
       controls.current.flight = v;
       controls.current.hue = 140 + v * 80;
   });
   ```
3. Remove the now-unused `warp` reads in `Galaxy.jsx`.

**Acceptance:** Scrolling advances the starfield gently and proportionally; when you stop, the
field keeps a barely-perceptible forward drift and **never** slides backward. It should read as
"gliding through space," not "racing."

---

## 2 — ADD an interactive meteor (this is a showcase — make the background do something)

The user's note: *"let me have a meteor going in the back every once in a while that you can crush
or that you can tap on and does something."*

Create `src/components/galaxy/Meteors.jsx` and mount it inside the fixed background layer in
`GalaxySite.jsx` (as a sibling above the galaxy canvas, below the content). Build it as:

- A full-viewport `pointer-events-none` overlay containing meteors that DO have
  `pointer-events-auto` on their own small hit area.
- Every **9–18s** (randomized), spawn one meteor: a bright head with a tapering trailing streak,
  entering from a random top/right edge and crossing on a diagonal over ~1.6s, then despawning.
  Use the violet→cyan accent palette. Respect `prefers-reduced-motion` → spawn nothing.
- **Clicking/tapping a meteor "crushes" it:** cancel its travel, spawn a small radial particle
  burst (8–12 shards flung out with easing + fade, pure transform/opacity), and briefly show a
  tiny monospace label near the impact like `+1 STAR CRUSHED`. Maintain a session counter in a
  `useRef`/state; after several crushes it's fine for the label to just keep counting. Keep it
  tasteful and quick (~600ms), no sound.
- Keep it cheap: cap to **one active meteor at a time**; particles are DOM elements animated with
  `motion` and removed on completion. Never block scroll — only the meteor head is clickable.

**Acceptance:** Occasionally a meteor streaks behind the content; clicking it produces a
satisfying burst + counter; it never interferes with scrolling or text selection.

---

## 3 — REMOVE the "enlisting" framing on the focus-area planets

The user dislikes the "Focus Area 01 / 02" labels and the giant `01`/`02` numerals — it reads like
a checklist, but this is a showcase.

In `PlanetSection.jsx`:
- **Delete the giant background numeral** (`{num}` span) entirely.
- **Delete the `planet.label` eyebrow** ("FOCUS AREA 01/02"). Replace it with a short thematic
  kicker drawn from a new `planet.kicker` field (see §4 copy) — e.g. `A WORLD WE BUILD` — styled
  the same (mono, tracked, accent) but evocative, not enumerated.
- Remove the `label` field usage; the title now leads.

In `data/content.js`, remove the `label` values and add the `kicker` field (§4).

**Acceptance:** No numerals, no "Focus Area N." Each planet leads with its name under a short
evocative kicker.

---

## 4 — Make the orbiting moons MEAN something (clarify "Compliance-Native", "Value Loops")

The user likes the orbiting circles but the one-word moon labels are opaque. Give each moon a
plain-language name **and** a short meaning, and surface the meaning on interaction.

Update `data/content.js` planets to this shape (use this copy verbatim):

```js
export const planets = [
  {
    id: 'vertical-ai',
    kicker: 'A world we build',
    title: 'Vertical AI SaaS',
    hue: 0,
    accent: '#a78bfa',
    description:
      'Purpose-built AI that speaks your industry — its workflows, its language, its rules — instead of a generic model bolted on.',
    moons: [
      { label: 'Domain-trained', meaning: 'Models tuned on your field’s real documents and terminology, not the open web.' },
      { label: 'Fits your workflow', meaning: 'Drops into the tools your team already uses — no rip-and-replace.' },
      { label: 'Compliant by design', meaning: 'Built to meet HIPAA, SOC 2, and industry rules from day one, not patched in later.' },
    ],
  },
  {
    id: 'marketplace',
    kicker: 'A world we build',
    title: 'Community Marketplaces',
    hue: 60,
    accent: '#4cc2e9',
    description:
      'Platforms that get more valuable as more people join — connecting a community and compounding on its own data.',
    moons: [
      { label: 'Network effects', meaning: 'Every new participant makes the platform more useful for everyone already on it.' },
      { label: 'Earned trust', meaning: 'Reputation, reviews, and verification that make strangers comfortable transacting.' },
      { label: 'Compounding data', meaning: 'Each interaction sharpens matching and pricing — an advantage rivals can’t buy.' },
    ],
  },
];
```

In `PlanetSection.jsx` and `OrbitingCircles` usage: render each moon chip with `moon.label`. On
**hover or tap of a moon chip**, reveal `moon.meaning` in a small glass tooltip/caption (a hairline
panel near the planet, or a caption line under the title that swaps to the hovered moon's meaning).
On mobile (static chips), tapping a chip expands its meaning inline. Keep the orbit animation.

**Acceptance:** Moons read as real, understandable ideas; hovering/tapping any moon explains it in
one clear sentence.

---

## 5 — "Four core systems": remove icons, add a flashlight-cursor reveal

The user finds the emoji icons childish and wants a premium, on-theme interaction: *the cursor is a
flashlight; moving it over the text illuminates it "like putting a flashlight on a gem on an
asteroid."*

Rework `CapabilityCluster.jsx` (and stop using `SpotlightCard`'s icon):

- **Remove all icons** from the capability cards. In `data/content.js`, the `icon` field on
  `capabilities` is no longer rendered (leave the field or delete it — just don't display it).
- Redesign the four capabilities as a **dark "asteroid surface" panel**. Text (title + description)
  sits at **~12–15% opacity by default** — barely legible, like unlit rock.
- A **flashlight** follows the cursor across the whole section: a soft radial light (~220px
  radius). Where the light falls, the text under it is revealed to **full brightness with a subtle
  gem-like sheen** (a faint violet→cyan gradient + slight glow). Implement with a bright duplicate
  text layer masked by a radial-gradient `mask-image` whose center tracks the cursor
  (`--mx`/`--my` CSS vars updated on `mousemove`, throttled via rAF). The dim base layer stays
  underneath so text is always present for SEO/readers.
- Add a faint noise/asteroid texture or subtle vignette to the panel to sell the "rock" read.
- **Fallbacks:** on touch / no hover (`@media (hover: none)`) and under `prefers-reduced-motion`,
  skip the flashlight and render all text at full brightness (a normal readable card grid).

**Acceptance:** No icons; text is dim until the cursor's flashlight sweeps over it, then it glints
like a lit gem; fully readable without a mouse.

---

## 6 — ADD a preloader / "Preparing your experience" gate (and adaptive quality)

The user reports lag and wants a loading state that ensures the site runs smoothly before revealing
it (a common premium pattern).

Create `src/components/Preloader.jsx` and gate the app in `GalaxySite.jsx`:

- Full-screen `--color-space` overlay, centered: the Drop Dev mark, a slow starfield or a single
  forming-orb animation, and the line **"Preparing your experience"** with a thin indeterminate or
  progress-based bar in the accent gradient.
- Hold the overlay until ALL are true: (a) `document.fonts.ready` resolved; (b) the galaxy WebGL
  context has created successfully and rendered its **first few frames**; (c) a minimum display
  time of ~900ms elapsed (so it never flashes). Then **fade the overlay out** (~600ms) and reveal
  the site.
- **Adaptive quality probe:** during the preloader, sample frame timing for ~40 frames to estimate
  FPS. Store a quality tier (`'high' | 'low'`) in React context or a module singleton. If FPS is
  poor (< ~45), set `'low'` and have the galaxy/orbs read it to reduce cost: lower star `density`,
  cap devicePixelRatio at **1.25**, and render the galaxy canvas at **0.75× resolution scale**
  (multiply `setSize` inputs by 0.75, CSS-stretch to full). On `'high'`, keep full quality.
- Also add these unconditional perf wins: pause the galaxy `requestAnimationFrame` on
  `document.hidden` (visibilitychange) and resume on focus; cap the Orb DPR at **1.5** (currently
  2). Keep the existing IntersectionObserver that pauses off-screen orbs.

**Acceptance:** First load shows "Preparing your experience," then fades into a site that holds a
smooth frame rate; low-end devices automatically get the reduced-quality path.

---

## 7 — Rebuild the Industries section as an interactive solar system

The user's vision: *right side = a solar system with visible orbital ovals; each planet orbits its
oval; the whole thing rotates and cycles through industries when idle; clicking a planet (or its
oval) selects that industry and shows its details on the left.*

Replace the current chip-belt in `IndustriesBelt.jsx` with a **two-column layout** (stack to one
column on mobile: solar system on top, detail below):

**Right column — the solar system:**
- A central sun (the Drop Dev core — a small glowing orb or the logo mark).
- **6 concentric elliptical orbit rings** (SVG `<ellipse>`, hairline stroke), one per industry,
  at increasing radii.
- One **planet dot per ring**, each a distinct hue, traveling along its ellipse. Use CSS/`motion`
  keyframe animation following the elliptical path (offset each planet's start angle and give outer
  rings slower periods — real orbital feel). Planets and rings are clickable (generous hit areas).
- **Idle behavior:** planets orbit continuously, and the selection **auto-cycles** every ~3.5s
  through the industries, highlighting the active planet + ring (brightened stroke, enlarged dot,
  soft glow) so the system "shows you each of them" on its own.
- **On click** of a planet or its ring: select that industry, **pause the auto-cycle**, emphasize
  the chosen orbit, and dim the others. Clicking the sun (or a "resume" affordance) returns to
  auto-cycle.
- Respect `prefers-reduced-motion`: freeze orbital motion (planets sit at rest positions), keep
  click-to-select and a static highlight; no auto-spin.

**Left column — the detail panel:**
- Reflects the currently active industry (whether auto-cycled or clicked). Cross-fade content on
  change (~0.4s). Show: the industry name + icon, a fuller description, and a clear **"What we can
  do for you"** block. Use the existing `problemSpace` / `aiOpportunity` / `whyItWins` as
  supporting detail, and add the new `howWeHelp` line below.

Add `howWeHelp` to each industry in `data/content.js` (use verbatim):
- **Healthcare:** "We build HIPAA-ready document pipelines and on-prem RAG so clinical data never leaves your network — and automate the paperwork clinicians dread."
- **Legal:** "We deploy contract-analysis and legal-research assistants grounded in your own case files, with full citation traceability."
- **Real Estate:** "We build valuation and due-diligence models, plus marketplace platforms that connect every party in a transaction."
- **Finance:** "We build risk, fraud, and compliance systems that run locally, so sensitive financial data stays inside your walls."
- **Education:** "We build adaptive-learning engines and skills-mapping platforms that link learners, educators, and employers."
- **Logistics:** "We build demand-forecasting and route-optimization systems that turn your operational data into a durable advantage."

**Acceptance:** Right side is a living solar system that auto-tours the industries and responds to
clicks on planets/orbits; left side always shows the active industry with a concrete "what we can
do for you." Works stacked on mobile and static under reduced motion.

---

## Global acceptance checklist (verify before finishing)
- `npm run build` and `npm run lint` pass clean.
- No console errors on load or while scrolling the full page.
- Background never reverses on scroll-stop (§1).
- Meteor spawns, is crushable, and never blocks scroll (§2).
- No "Focus Area / 01 / 02" anywhere; moons explain themselves (§3, §4).
- Capability text is dim until the flashlight reveals it; readable without a mouse (§5).
- Preloader gates first paint; low-FPS devices get reduced quality (§6).
- Industries is a clickable, auto-touring solar system with a live detail panel (§7).
- `prefers-reduced-motion` and mobile paths handled for every new interaction.
