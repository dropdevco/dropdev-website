# Refero Styles — Inspiration Notes

## What this site actually is

`styles.refero.design` is **not** a copy-paste component/code library like the other four
sites in this research set. It's a curated gallery of **"DESIGN.md" style extractions**:
for ~2,000+ real product/marketing websites, Refero has reverse-engineered a structured
design system (color palette with named tokens, typography scale, spacing/layout rules,
component specs, "do/don't" guidelines, and a short mood description) intended to be fed
to AI coding tools (Cursor, Claude Code, v0, Lovable, etc.) as a style brief.

There is no reusable code/CSS to lift directly — no components, no animation snippets, no
downloadable assets. The value here is **visual direction and mood-board reference**: hex
palettes, font pairings, and named "vibe" descriptions for dark/cosmic/tech sites, plus
pointers to the original live sites (which are worth visiting directly for their actual
motion/scrollytelling behavior, since Refero's extraction focuses on static design tokens,
not scroll/animation systems). Accordingly, no separate code files were saved to this
folder — this INSPIRATION.md is the sole output, as instructed for a reference-only site.

Note: Refero has no dedicated "scrollytelling," "parallax," or "space/orbit" tag or
category. Space/cosmic-adjacent references had to be found via its "dark mode," "AI
startup," and "agency" category pages and general search — treat the site as a source of
**palette/typography/mood inspiration**, and go to the original source URLs for actual
scroll-mechanics reference.

---

## Most relevant entries found

### 1. GT-Planar — "cockpit HUD at warp speed"
- Refero page: https://styles.refero.design/style/3f22028a-05d4-4648-a6d1-591134af06a4
- Original site: https://gt-planar.com
- Style: Pitch-black canvas with a full-bleed **procedural starfield/hyperspace hero
  animation** — "white light streaks radiating from a central vanishing point on pure
  black, evoking faster-than-light travel." Instrument-panel / heads-up-display aesthetic:
  everything built from 1px white wireframe borders (no shadows, no blur, no gradients),
  neon violet/green/yellow accents, uppercase pill buttons, tabular data tables.
- Why relevant: This is the closest thing on the site to a literal "traveling through
  space" motif — a hyperspace warp effect as the actual hero animation. Its "every line is
  a wireframe / every border is structural" philosophy is a good literal reference for
  rendering a galaxy as *vector/SVG line art* rather than photographic space imagery,
  matching the brief's requirement for SVG/vector (not CSS-gradient) galaxy assets.
- Palette: Null Black `#000000` canvas, Photon White `#ffffff` wireframes, Hyperspace
  Violet `#6100ff`, Plasma Green `#00ff85`, Reactor Yellow `#fcff76`, Crimson Alert
  `#ff003d` (warning only), Amber Signal `#ff8a00`, Plum Void `#1a0014`.
- Type: GT Planar (fallback Space Grotesk / Space Mono / JetBrains Mono), extreme
  letter-spacing swings (tight body, very wide display), Minor Third scale from 18px base.
- Similar refs it cites: Warp Terminal, Cyberpunk 2077 promo site, Linear (dark/compact),
  NASA Mission Control dashboards.

### 2. Active Theory — "cosmic void with a single luminous point"
- Refero page: https://styles.refero.design/style/3416bd14-96bb-4c23-bd01-b2ea178ba5ce
- Original site: https://activetheory.net
- Style: Minimalist dark **WebGL 3D scene** design system — UI chrome recedes to near
  invisibility so a central 3D composition (abstract wireframe portal + particle effects)
  carries all visual weight. Motion is described as "gravitational and unhurried, not
  snappy," with long 0.8–9s scene transitions and opacity-based (not slide-based) reveals.
  Active Theory (the studio) is well known for award-winning WebGL/scrollytelling sites —
  worth visiting directly for actual scroll-camera-movement reference beyond this palette
  extraction.
- Why relevant: Best match for "traveling through space" pacing and mood — a true "void"
  backdrop with one glowing focal object, plus documented *motion timing philosophy*
  (slow, gravitational, fade-dominant) directly transferable to a scroll-driven galaxy
  camera move.
- Palette: Void Black `#000000`, Ghost White `#ffffff`, Ash Border `#4d4d4d`, Dusk Violet
  `#343755` (sole chromatic accent, used sparingly for CTAs only).
  Type: geometric sans "nbarchitekt" for UI/nav (Space Grotesk/Inter fallback) contrasted
  with a serif (Times) for body copy — a UI/prose contrast pairing.
- Similar refs it cites: Lusion, OHZI Interactive Studio, Unicorn Studio, Astro ("deep
  space mission control"), North Kingdom ("cinematic void with luminous type"), Ciridae.

### 3. Dala — "constellation floating on black"
- Refero page: https://styles.refero.design/style/e5f5f8cf-e68d-4ed1-bbf5-6b67569af648
- Original site: https://dala.craftedbygc.com
- Style: Pure black void with a signature **animated constellation of thousands of tiny
  multicolored triangular particles forming an organic shape** ("knowledge visualized as
  distributed intelligence" — a brain, but the technique generalizes directly to a
  particle-based planet/star map). Monolithic weightless type at 78–113px with aggressive
  negative tracking; no cards, borders, or panels — the void itself is the design material.
- Why relevant: This is the most directly reusable *visual technique* for the brief's
  galaxy background — a large-scale animated point-field/particle constellation rendered
  in spectrum colors (violet/amber/teal/magenta/blue) against black, exactly the kind of
  discrete animated vector asset the brief calls for (as opposed to a flat gradient).
- Palette: Void `#000000`, Bone White `#ffffff`, Electric Iris `#8052ff` (single dominant
  accent), Saffron Spark `#ffb829`, Deep Verdant `#15846e`.
- Type: PPNeueMontreal at ultra-light weight 200 for body (unusual — most body text is
  much heavier), weight 400 for display, letter-spacing tightens sharply at large sizes.
- Similar refs it cites: Linear, Vercel, Anthropic, **Runway** ("dark void with
  particle/constellation generative visuals" — another good one to look up directly).

### 4. Auros — "abyssal terminal" / bioluminescent data orb
- Refero page: https://styles.refero.design/style/21cfe0c1-778d-4613-9f47-a5718eb929b3
- Original site: https://auros.global
- Style: Near-black deep-teal ("abyssal") canvas with a **3D rotating particle sphere** —
  "thousands of teal-cyan and white dots functioning as a bioluminescent data entity" that
  anchors the brand across pages. Depth communicated via tonal "depth-of-water" layering
  rather than shadows.
- Why relevant: A ready-made **orbit/planet motif** — a rotating dot-sphere is essentially
  a planet built from particles, directly applicable to rendering one of Drop Dev's
  "planets" as an interactive 3D/2D point-cloud sphere rather than a flat icon.
  Also a strong example of a secondary cool-toned palette (teal/cyan vs. the more common
  violet) if the galaxy needs per-planet color variation.
- Palette: Liquid Abyss `#012624`, Liquid Kelp `#003734`, Platinum `#ffffff`, Bioluminescent
  Gradient (teal `#00827c` → pale cyan `#cbfffc`), Aurora Gradient (cyan → pink `#fad1ff`).
- Type: Custom "Matter" typeface, medium weight, aggressive negative tracking at display
  sizes, wide positive tracking on uppercase labels — a "no bold, no light" strategy.
- Similar refs it cites: Galaxy Digital ("deep canvas, luminous accents, cinematic
  financial atmosphere" — name is coincidental but the palette described is on-theme).

### 5. OHZI Interactive Studio — "glowing object suspended in a dark void"
- Refero page: https://styles.refero.design/style/03e03554-d7aa-40da-9764-79320ecfa1d0
- Original site: https://ohzi.io
- Style: Grayscale UI (pure black/white only) with a single **glowing 3D object as the
  sole source of color** — "the 3D render carries all the visual energy," reflective
  wet-floor effect, 0px border radius everywhere, wide-tracked uppercase Unbounded type.
- Why relevant: A clean template for the "one planet per viewport" idea — minimal, mono-
  chrome UI chrome that gets out of the way of a single glowing focal object per scroll
  section, which maps well onto "arriving at a planet reveals content about that
  capability."
- Similar refs it cites: Apple Vision Pro, Unity Technologies, Spline, Activision — all
  dark-void/single-3D-object agency or product sites worth a direct look.

### 6. Ciridae — "void chamber with ember pulse"
- Refero page: https://styles.refero.design/style/a1b78a21-a304-482b-8ce5-f612d95d44fe
- Original site: https://www.ciridae.com
- Style: Near-black "cathedral" aesthetic, terminal-like command-center feel, heavily
  blurred atmospheric photography (smoke/fire/marble) as ambient backdrop, single warm
  ember-rust accent `#cc6437`, extreme pill-radius buttons vs. sharp 10px cards, a fixed
  top "news ticker" bar in monospace for a live-data feel.
- Why relevant: Good reference for a **restrained, one-accent-color** version of the dark
  cosmic look if the full neon-multicolor GT-Planar approach feels too loud — shows how
  far you can go with just black + white + one warm accent and still feel "engineered."

### 7. GSAP (gsap.com) — motion-library marketing site
- Refero page: https://styles.refero.design/style/00537a20-e99e-4ef2-b119-c6f532c44cc9
- Original site: https://gsap.com
- Style: Not space-themed, but relevant because this *is* the marketing site for the GSAP
  animation library most likely to power the scrollytelling build. Near-black `#0e100f`
  canvas with warm cream `#fffce1` type, a five-color "discipline" tag system (GSAP/SVG/
  Scroll/Text/UI, each with its own accent), gradient-stroked (not gradient-filled) CTA
  buttons, curly-brace `{ }` section markers.
- Why relevant: Confirms GSAP's own brand uses restrained dark/cream palette + gradient-
  stroke accents rather than heavy neon — a useful "grown-up" counterpoint to the more
  cyberpunk references above. Also a reminder that **GSAP ScrollTrigger** (not currently
  installed in the Drop Dev stack) is the most direct code path to the scroll-driven
  zoom/pin/reveal behavior the brief wants; would need to be added as a dependency.

---

## Recurring color palette patterns across dark/cosmic entries

Nearly every relevant entry converges on the same formula:
- **Background:** true or near-true black (`#000000`, `#0b0b0b`, `#0e100f`, `#012624`) —
  almost never navy/blue-black; pure black reads more "void" than "night sky."
  Auros is the one exception with a deep-teal-black for a "deep ocean" variant.
  A blue-toned deep space navy (e.g. `#050818`, `#0a0e27`) was not observed in any entry —
  worth deliberately introducing if Drop Dev wants to differentiate from the very common
  pure-black tech aesthetic and lean into a more literal "night sky" look.
- **Text:** white or off-white/cream (`#ffffff`, `#fffce1`, `#edebe7`) at high contrast.
- **One dominant chromatic accent, used sparingly** — never more than 1–2 saturated
  colors doing real work, no matter how many are listed in the palette table. Common accent
  families: electric violet/purple (`#6100ff`, `#8052ff`, `#343755`), neon
  green (`#00ff85`, `#0ae448`), amber/orange (`#ffb829`, `#ff8a00`, `#cc6437`), or cyan/teal
  (`#00bae2`, `#cbfffc`). Violet appears the most often across entries and would be a safe,
  on-trend "signature accent" choice for Drop Dev's galaxy palette.
- **Multi-color only for a "constellation"/particle effect** (Dala, GSAP's discipline
  tags) — spectrum color is reserved for a specific generative visual, not for general UI.
- **Borders over shadows:** dark-mode entries consistently avoid box-shadow/blur for
  elevation, preferring 1px hairline borders or subtle tonal (one-shade-lighter) surface
  shifts. Good to keep in mind for planet "cards"/content panels in the redesign.

## Recurring typography patterns

- Large, confident **display type at massive sizes** (GSAP hero at 224px, Dala at 113px,
  GT-Planar display at 187px) with weight staying moderate (400–600) rather than bold —
  hierarchy is built from scale and negative tracking, not boldness.
- **Negative letter-spacing at display sizes, positive/wide letter-spacing on small
  uppercase labels/nav/badges** — this inverse-tracking pattern shows up in nearly every
  entry (GT-Planar, Dala, Auros, OHZI, Ciridae) and is worth adopting as a system rule.
  the exception: GT-Planar's outlier +0.70em tracking on very large display sizes.
- Geometric/grotesk sans is the default (Space Grotesk, Unbounded, PPNeueMontreal, Matter,
  Mori) — occasionally paired with a serif or monospace as a deliberate second voice for
  body copy or "terminal/data" text (Active Theory's Times body; Ciridae's Roboto Mono
  ticker). A geometric-sans-plus-monospace pairing (mono for labels/data, geometric sans
  for headings) reads as "engineered/instrument-like," matching the cosmic tech mood well.

## Recommendation for the Fable build prompt

Combine: **GT-Planar's** literal hyperspace/wireframe motion concept + **Dala's** particle-
constellation technique (generalized to a starfield/planet system) + **Active Theory's**
slow "gravitational" scroll pacing and void-with-single-luminous-point compositional
principle, on a near-black (not navy) background with a single violet or teal accent, using
a geometric sans with inverse letter-spacing tracking. For actual scroll-trigger/pin/zoom
mechanics, treat GSAP (gsap.com, plugin: ScrollTrigger) as the direct implementation
reference/dependency rather than relying on Refero's static palette extraction alone.
