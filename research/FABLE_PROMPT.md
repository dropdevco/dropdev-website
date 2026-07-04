# Fable Build Prompt — Drop Dev "Galaxy" Website

> One-shot prompt to hand to Fable. Everything below the line is the prompt itself. The
> component references point at files saved in `research/components/` during the research phase —
> ship those files alongside this prompt so Fable can read the exact source.

---

## ROLE & GOAL

Build the new marketing site for **Drop Dev**, a software company specializing in **applied AI**.
The site's single job is to **showcase capability** — to make a visitor feel that this team can
build serious, technically deep software. It is **not** a lead-gen funnel: no multi-step contact
forms, no "book a consultation" as the centerpiece. A single understated "Get in touch" is enough.

The entire experience is a **scroll-driven journey through a galaxy**. Drop Dev's logo is a
galaxy, and we lean into it literally: the visitor starts zoomed out in deep space and, as they
scroll, the camera flies inward — past stars, toward and then *through* a series of planets. **Each
planet is one capability/focus area of the company.** Arriving at a planet reveals what Drop Dev
does in that area. Scrolling onward pulls the camera back out and on to the next planet. The site
is a single long vertical page (a scrollytelling experience), with the galaxy always present in
the background.

## NON-NEGOTIABLE CREATIVE CONSTRAINTS

1. **The galaxy background is real animated WebGL/vector art, not CSS gradients.** Use an actual
   canvas/WebGL starfield with depth, parallax, twinkle, and subtle mouse reaction. It must feel
   like a manipulable scene, not a static background image or a CSS radial-gradient fake.
2. **Scroll drives a camera.** A single scroll-progress value (0→1 over the whole page) is the
   source of truth. Derive from it: overall zoom/depth into the galaxy, which planet is
   "current," each planet's scale/position/opacity, and the reveal of each planet's content
   panel. Scrolling should feel like flying, not like a normal page scroll. Smooth/eased, never
   janky. (Optional: add inertial smooth-scroll, but keep native scroll working.)
3. **Planets are distinct glowing spheres**, each a different hue tied to its capability. They are
   vector/WebGL objects, recolored per section — not photos of real planets, not the actual solar
   system.
4. **Dark, premium, "instrument-panel" aesthetic** (see Design Direction). Near-black space,
   one dominant accent color, hairline borders, oversized precise typography.
5. **Performance & accessibility are part of the brief, not an afterthought:** must run at 60fps
   on a normal laptop; must fully respect `prefers-reduced-motion` (fall back to a calm static
   starfield + normal fade-in reveals, no camera flight); must be usable and legible on mobile
   (degrade the WebGL intensity, keep the narrative). Content must be real HTML text (SEO +
   screen readers), never baked into canvas.

## TECH STACK

- **React 19 + Vite** (existing project — plain SPA, statically hosted on GitHub Pages via
  gh-pages, so **no server/SSR, no Next.js**; convert any `next/link`→ react-router `Link` and
  `next/font`→ a Google Fonts `<link>`).
- **Tailwind CSS v4** for styling (add it; the component library code assumes it), plus a small
  `cn()` helper (clsx + tailwind-merge).
- **`motion`** (the renamed Framer Motion, imported from `motion/react`) for scroll progress,
  reveals, and micro-interactions.
- **`ogl`** for the WebGL galaxy/planet backgrounds (lightweight; preferred over three.js).
- **`gsap` + `@gsap/react`** for scroll-scrubbed (scroll-position-tied) text/section reveals.
- Do **not** pull in `three.js`/`postprocessing` or `cobe` for v1 — the `ogl`/CSS options cover
  the concept at a fraction of the weight.

## COMPONENTS TO USE (pre-researched — source provided in `research/components/`)

Prefer adapting these exact files over reinventing them. Adapt freely (recolor, restructure) to
serve the narrative.

**Galaxy & planet visuals**
- `reactbits/galaxy-background.jsx` (+`.css`) — the primary full-page WebGL starfield (ogl):
  parallax layers, twinkle, hue-shift, mouse-repulsion. This is the persistent background.
- `reactbits/orb-background.jsx` — the **planet** primitive; instance once per capability,
  recolored per hue.
- `reactbits/particles-background.jsx`, `aurora-background.jsx`, `threads-background.jsx` —
  optional accent layers (distant star cluster, nebula wash, comet-streaks between sections).
- Lightweight fallbacks if WebGL must be dialed back: `magicui/particles.tsx` (Canvas2D, zero
  dep) and `magicui/meteors.tsx` (CSS).

**Scroll mechanic**
- `motion-primitives/scroll-progress.tsx` **or** `magicui/scroll-progress.tsx` — expose the
  master `scrollYProgress`; use its value (not just its bar) to drive the camera.
- `reactbits/scroll-float-text.jsx` and `scroll-reveal-text.jsx` — GSAP scroll-**scrubbed**
  reveals for each planet's headline/copy as the camera arrives.
- `motion-primitives/in-view.tsx` + `kokonutui/scroll-text.tsx` — lighter one-shot reveals where
  full scrubbing is overkill.

**Planet / capability content cards**
- `kokonutui/spotlight-cards.tsx` — the capability cards (color-tinted glow + magnetic 3D tilt),
  one card (or card cluster) per planet.
- `motion-primitives/magnetic.tsx` — gravity-well cursor pull on interactive elements (planets,
  CTAs) — literalizes the galaxy metaphor.
- `motion-primitives/glow-effect.tsx` — nebula-glow aura behind planet cards.
- `magicui/orbiting-circles.tsx` — small moons/sub-capabilities orbiting a planet.
- `magicui/animated-beam.tsx` — glowing gradient beams drawn along SVG paths **between planets**,
  for a "flight path" / galaxy-map overview if we include one.

**Hero & headline**
- `kokonutui/shape-hero.tsx` — drifting soft-glow shapes behind the hero title (can read as
  distant planets).
- Pick ONE headline treatment (don't stack): `reactbits/split-text.jsx` (GSAP scroll-in) or
  `motion-primitives/text-shimmer.tsx` / `magicui/animated-gradient-text.tsx`.

**Polish**
- `motion-primitives/cursor.tsx`, `tilt.tsx`, `border-trail.tsx`; `reactbits/star-border.jsx`
  (comet-trail CTA button); `kokonutui/mouse-effect-card.tsx` (reactive mini-starfield card).

## PAGE NARRATIVE (scroll top → bottom)

Real Drop Dev content — use it verbatim as the planets. (Positioning note: Drop Dev is applied-AI
software, so the planets are AI capabilities/focus areas, not generic "web/app dev.")

1. **Deep space / Hero.** Fully zoomed out. Galaxy slowly rotating. Big headline establishing
   Drop Dev as an applied-AI software studio + a one-line subhead. A subtle scroll cue ("scroll to
   travel"). Minimal nav (logo + a couple anchors + understated "Get in touch").

2. **Planet 1 — Vertical AI SaaS.** Camera flies to the first planet. Reveal: *Purpose-built AI
   solutions that understand industry-specific workflows, terminology, and compliance
   requirements.* Sub-points/moons: **Domain Expertise · Workflow Integration · Compliance-Native**.

3. **Planet 2 — Community Marketplaces.** *Network-effect platforms that create value through
   community participation and data aggregation.* Moons: **Network Effects · Community Trust ·
   Value Loops**. (Consider an `animated-beam`/orbit visual to convey the network effect.)

4. **The capability cluster — how we build it (the "engine room" of the galaxy).** Present the 4
   core AI capabilities as a tight constellation of `spotlight-cards`:
   - **OCR & Document Intelligence** — extract structured data from any document (medical records,
     contracts, invoices) with near-human accuracy at scale.
   - **RAG Systems** — retrieval-augmented generation grounded in your proprietary data,
     eliminating hallucinations.
   - **Local RAG (On-Premise)** — full RAG pipelines running inside your network; zero data
     leaves your infrastructure. For healthcare, legal, finance.
   - **Local AI Inference** — deploy open-source LLMs (Llama, Mistral, Gemma) on your own
     hardware; data sovereignty, no API costs, no lock-in.

5. **Industries orbit — who it's for.** A ring/belt of industries the camera passes through:
   **Healthcare · Legal · Real Estate · Finance · Education · Logistics.** Each can expand (hover/
   click) to a short problem→AI-opportunity→why-it-wins blurb (content exists in the current
   site's `Home.jsx` industry data — reuse it).

6. **Arrival / CTA.** Camera settles. Short, confident closing line about building serious AI
   software, and a single understated contact action. Footer with logo, links, and a last quiet
   starfield.

> Planet count is flexible — if 2 focus-area planets + a 4-capability cluster + industry belt is
> too many "stops," collapse capabilities into moons of the two focus-area planets. Keep the
> *feeling* of discrete arrivals over a smooth flight.

## DESIGN DIRECTION

- **Background:** near-pure-black (#04040a-ish), NOT navy. The galaxy provides the color.
- **Accent:** one dominant accent — **violet/purple** (matches the Drop Dev galaxy logo and the
  most common cosmic-web palette); a cool cyan as a secondary/planet-hue variant. Each planet gets
  its own hue but the UI chrome stays on the single violet accent.
- **Surfaces:** hairline 1px borders (low-opacity white/violet) instead of drop-shadows; glassy
  translucent panels over the galaxy for content, kept highly legible.
- **Typography:** oversized display headings, tight letter-spacing at large sizes; wide tracking on
  small uppercase labels ("FOCUS AREA 01"). Pair a clean geometric sans (headings/body) with a
  monospace for labels/technical accents ("instrument-like" feel).
- **Motion feel:** slow and "gravitational" — long eases (0.8s–2s+), opacity-led transitions,
  nothing snappy or bouncy. Reference pacing: Active Theory. Reference warp/hero energy: GT-Planar.
  Reference particle-constellation technique: Dala.

## DELIVERABLE

A single-page, scroll-driven React 19 + Vite site implementing the narrative above, with the
galaxy WebGL background, scroll-driven camera, per-planet reveals, real Drop Dev copy, the design
direction, and full `prefers-reduced-motion` + mobile fallbacks. Keep it a static-hostable SPA
(works when deployed to GitHub Pages). Preserve real HTML text for SEO/accessibility.
