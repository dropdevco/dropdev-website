# Synthesis — Galaxy Redesign Component Research

Consolidated findings from all 5 sources. Full detail lives in each source's own
`INVENTORY.md` / `INSPIRATION.md` under `research/components/<site>/`.

## The shortlist (what actually builds the galaxy experience)

### 1. The galaxy background itself
**`reactbits/galaxy-background.jsx`** — WebGL (via `ogl`, ~lightweight, not three.js) raymarched
starfield: 4 parallax star layers, per-star twinkle, hue-shift, glow, mouse-repulsion. This is
the single closest match to "a galaxy/solar system in the background, not CSS." Dependency:
`npm install ogl`.

Backups/complements from the same source, same `ogl` dependency:
- `orb-background.jsx` — glowing hue-controllable sphere. Best literal **planet** primitive —
  drop one per focus-area section, recolor per section.
- `particles-background.jsx` — 3D point-cloud star cluster with real camera depth.
- `aurora-background.jsx` / `threads-background.jsx` — nebula wash / comet-trail streaks, good
  accent layers behind content panels.
- `hyperspeed-background.md` (notes only, not fully copied — heavy three.js+postprocessing) —
  the most literal "travelling through space" warp effect, but it's a highway metaphor, not
  stars, and it's the heaviest dependency. Keep as a stretch option, not a default.

MagicUI's **`particles.tsx`** (zero-dep Canvas2D) and **`meteors.tsx`** (pure CSS) are a lighter
fallback pairing if `ogl`/WebGL feels like too much risk for a first pass — cheaper, less
immersive, but zero extra runtime cost.

### 2. Scroll-driven camera/travel mechanic
This is the piece none of the 5 sites hand you fully solved — it needs to be assembled:
- **Driver:** `motion-primitives/scroll-progress.tsx` or `magicui/scroll-progress.tsx` (both
  expose a `scrollYProgress`-style value) — use this as the single source of truth for "how far
  through the galaxy are we," then derive zoom/translate/opacity of planets from it.
- **Per-section scrub:** `reactbits/scroll-float-text.jsx` and `scroll-reveal-text.jsx` are
  GSAP ScrollTrigger–based and **scroll-scrubbed** (tied directly to scroll position, not just
  triggered once) — the right pattern for "content reveals as you arrive at a planet."
  Dependency: `gsap` + `@gsap/react`.
- **Simple reveal fallback:** `motion-primitives/in-view.tsx` + `kokonutui/scroll-text.tsx` for
  lighter-weight one-shot reveals where full scrubbing is overkill.

### 3. Planet / focus-area cards
- **`kokonutui/spotlight-cards.tsx`** — color-tinted ambient glow + magnetic 3D tilt, already
  modeled as a list of items. Closest 1:1 fit for "one card per focus area."
  Complement with `motion-primitives/magnetic.tsx` (literal gravity-well cursor pull — the
  metaphor writes itself) and `motion-primitives/glow-effect.tsx` (nebula-glow aura).
- **`magicui/orbiting-circles.tsx`** (pure CSS) — moons/sub-services orbiting a planet card.
- **`magicui/animated-beam.tsx`** — glowing gradient beam along an SVG path between two DOM
  refs; best match for drawing a "travel path" line between planets on a galaxy-map overview.
- **`kokonutui/bento-grid.tsx`** or **`magicui/bento-grid.tsx`** — an optional "galaxy map"
  overview grid if we want a non-linear jump-to-section nav.

### 4. Hero / headline
- **`kokonutui/shape-hero.tsx`** — large soft gradient shapes drifting behind title; shapes can
  double as distant planet glow.
- Text treatments (pick 1-2, don't stack): `reactbits/split-text.jsx` (GSAP, scroll-in), 
  `motion-primitives/text-shimmer.tsx` or `magicui/animated-gradient-text.tsx` for a premium
  static-page headline shimmer.

### 5. Cursor / micro-interaction polish
`motion-primitives/cursor.tsx`, `tilt.tsx`, `border-trail.tsx`, `kokonutui/mouse-effect-card.tsx`
(dot-particle field that repels from cursor — a mini reactive starfield inside a card).
`reactbits/star-border.jsx` is a cheap zero-dep CSS "comet trail" for CTA buttons.

## Design direction (from refero.design inspiration)
- Near-pure-black backgrounds (not navy) with **one** dominant accent color — violet came up
  most often across cosmic-themed references; teal/cyan is a viable alternate.
- Hairline borders over drop-shadows for a more "instrument panel" feel than a typical SaaS card.
- Oversized display type, tight letter-spacing at large sizes, wide letter-spacing on uppercase
  labels; geometric-sans + monospace pairing reads as technical/precise.
- Named references worth screenshotting for the Fable prompt: **GT-Planar** (warp-speed hero),
  **Active Theory** (slow "gravitational" scroll pacing, 0.8–9s fades), **Dala** (particle
  constellation technique), **Auros** (rotating particle-sphere planet), **OHZI** (one glowing
  3D object as sole color source per section).

## Dependency summary (nothing currently installed — project is plain React 19 + Vite + CSS)

| Package | Needed for | Weight |
|---|---|---|
| `motion` (renamed `framer-motion`) | most motion-primitives + magicui components, shiny-text | medium |
| `ogl` | reactbits galaxy/orb/particles/aurora/threads backgrounds | light, WebGL |
| `gsap` + `@gsap/react` | reactbits scroll-scrubbed text/reveal components | medium |
| `cobe` | magicui globe (optional — recolor away from Earth map to use as a planet) | light |
| `tailwindcss` v4 | nearly everything is styled in Tailwind utility classes | needs setup, no plugins |
| `three` + `postprocessing` | reactbits Hyperspeed only — **skip unless we commit to warp-speed hero** | heavy, optional |

A small `cn()` helper (clsx + tailwind-merge) is assumed throughout motion-primitives/magicui —
trivial to add. Several kokonutui/magicui files assume Next.js (`next/link`, `next/font`) or
shadcn/ui primitives (`Button`, `Card`) — straightforward swaps for `react-router-dom`'s `Link`
and hand-rolled equivalents.

## Recommended stack decision for the rebuild
Adopt: `tailwindcss`, `motion`, `ogl`, `gsap`+`@gsap/react`. Skip for v1: `three`/`postprocessing`
(Hyperspeed), `cobe` (globe) — revisit only if the flatter `ogl`/CSS options feel insufficient
once built.
