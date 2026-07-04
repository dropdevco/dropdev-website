# MagicUI Component Inventory

Source: https://magicui.design/ (MIT-licensed, React + Tailwind CSS v4 + Framer
Motion "motion" library, shadcn/ui-style copy-paste registry). Full component
index fetched from https://magicui.design/docs/components. Source code for
each component below was pulled from the site's shadcn-compatible JSON
registry endpoints (`https://magicui.design/r/<component>.json`), which return
exact, unmodified source — more reliable than scraping the rendered docs page.

All components assume Tailwind CSS (v4 syntax, e.g. `bg-linear-to-r`,
arbitrary property syntax like `top-(--x)`) and a `cn()` utility at
`@/lib/utils` (a thin `clsx` + `tailwind-merge` wrapper, standard in
shadcn-style projects). **This project has neither Tailwind nor the
shadcn `cn()` helper installed yet** — both would need to be added, or the
Tailwind utility classes manually translated to plain CSS per the brief's
current per-component CSS-file convention.

| Component | Source URL | Why relevant to galaxy theme | Dependencies | Notes/complexity |
|---|---|---|---|---|
| **Particles** | https://magicui.design/docs/components/particles | Canvas-based drifting/glowing particle field with mouse-magnetism — direct starfield background candidate. | None (canvas 2D API only) | Low-medium. Self-contained; ~230 lines, all vanilla canvas + React refs. No animation library needed. |
| **Meteors** | https://magicui.design/docs/components/meteors | Literally a meteor-shower effect — diagonal streaking light trails. Strong 1:1 fit for galaxy background accents. | None (CSS keyframe animation) | Low. Small component; needs the `@keyframes meteor` + `animate-meteor` Tailwind theme animation registered (or ported to plain CSS). |
| **Orbiting Circles** | https://magicui.design/docs/components/orbiting-circles | Icons/elements revolving around a center point on a circular path — maps directly onto "moons/services orbiting a planet" or a solar-system diagram. | None (CSS keyframe animation) | Low. Needs the `@keyframes orbit` + `animate-orbit` Tailwind theme animation (portable to plain CSS custom properties). |
| **Globe** | https://magicui.design/docs/components/globe | Interactive rotating 3D WebGL globe/sphere — usable directly as a "planet," draggable and auto-rotating. | `cobe` (^0.6.4, WebGL globe renderer), `motion` (spring-based drag physics) | Medium. Renders an Earth world-map texture by default (lat/lng markers); would need `config` retuning (remove markers, adjust `baseColor`/`glowColor`/`dark`) or a custom texture to look like a non-Earth planet rather than a literal globe. |
| **Animated Beam** | https://magicui.design/docs/components/animated-beam | Animated gradient light beam traveling along an SVG path between two DOM elements — near-literal match for "travel paths connecting planets." | `motion` | Medium. Requires `containerRef`/`fromRef`/`toRef` DOM refs of positioned elements; renders an SVG overlay with a quadratic curve + animated gradient stop positions. Supports bi-directional/multi-beam layouts. |
| **Scroll Progress** | https://magicui.design/docs/components/scroll-progress | Fixed top-of-page bar tied to `useScroll().scrollYProgress` — the core Framer Motion scroll-linked primitive; same hook pattern drives camera-zoom/parallax transforms elsewhere. | `motion` | Low. ~20 lines. The real value is the `useScroll`/`useTransform` pattern it demonstrates, reusable for scroll-driven "travel through the galaxy" camera effects. |
| **Marquee** | https://magicui.design/docs/components/marquee | Infinite horizontal/vertical scrolling row — good for a logos/tech-stack/testimonial strip inside a planet's content panel. | None (CSS keyframe animation) | Low. Needs `@keyframes marquee` / `marquee-vertical` Tailwind theme animations (or plain CSS). Not galaxy-specific but cheap and high production value. |
| **Bento Grid** | https://magicui.design/docs/components/bento-grid | Grid layout for summarizing multiple features/services at a glance (e.g. an end-of-scroll recap of all service "planets"). | `@radix-ui/react-icons`, shadcn/ui `Button` component (registry dep) | Medium. Not galaxy-specific; pulls in Radix icons + assumes a shadcn Button — either install both or swap `<Button>` for a plain anchor/button. Pairs well with Particles/Globe as a card's `background` prop. |
| **Animated List** | https://magicui.design/docs/components/animated-list | Staggered reveal of list items over time with spring physics — good for revealing feature bullets/services one at a time as a section scrolls into view. | `motion` | Low-medium. Timer-based reveal (not natively scroll-triggered); would need to gate the internal `setTimeout` loop behind an IntersectionObserver to tie it to scroll position. |
| **Icon Cloud** | https://magicui.design/docs/components/icon-cloud | Interactive 3D-look tag/icon sphere (drag-to-rotate, click-to-focus) rendered with plain Canvas 2D on a Fibonacci sphere distribution — zero extra dependencies. Numbered-circle fallback (no icons) could double as a stylized "planet made of nodes." | None | Medium. ~300 lines of canvas math (rotation matrices, easing); cheapest of the sphere-like options dependency-wise since it avoids WebGL/three.js entirely. |
| **Text Animate** | https://magicui.design/docs/components/text-animate | Scroll-triggered (`whileInView`) word/character/line text reveal with many presets (fadeIn, blurIn, slideUp, scaleUp, etc). Primary hero-copy / section-heading reveal primitive. | `motion` | Medium. Large prop surface but self-contained; supports `startOnView` + `once` for scrollytelling-style reveals. |
| **Typing Animation** | https://magicui.design/docs/components/typing-animation | Classic typewriter effect, supports cycling through a `words` array (type → pause → delete → next word). Good for a hero line cycling through Drop Dev's service verticals. | `motion` | Low-medium. Self-contained; `useInView` gates the start when `startOnView` is true. |
| **Animated Gradient Text** | https://magicui.design/docs/components/animated-gradient-text | Cheap animated gradient-fill text, easily retuned to a purple/blue/cyan "nebula" palette for hero/accent copy. | None (CSS keyframe animation) | Low. ~30 lines; needs the `@keyframes gradient` / `animate-gradient` Tailwind theme animation (or plain CSS equivalent). |
| **Hyper Text** | https://magicui.design/docs/components/hyper-text | Scrambles random characters before resolving to final text, on-view or on-hover — a "decrypting a deep-space transmission" flourish that also fits a dev/hacker brand voice. | `motion` | Low-medium. Self-contained; uses `requestAnimationFrame` for the scramble loop plus an IntersectionObserver for `startOnView`. |
| **Warp Background** | https://magicui.design/docs/components/warp-background | 3D-perspective box with colored light beams warping past on all 4 sides — literal "hyperspace/warp-speed" transition effect, strong fit for a scroll-triggered transition *between* planet sections. | `motion` | High. Heavily relies on modern CSS (container queries `@container`, `perspective-()` and `transform-3d` arbitrary properties) that are Tailwind v4-specific syntax sugar — verify browser support and Tailwind version compatibility before use; would need adaptation for Tailwind v3 or hand-written CSS. |
| **Light Rays** | https://magicui.design/docs/components/light-rays | Soft animated god-rays/light-shaft background, fully color-configurable — good ambient light behind a "sun"/star planet or hero section. | `motion` | Low-medium. Self-contained; randomized ray generation on mount, CSS `mix-blend-screen` + blur for glow look. |
| **Retro Grid** | https://magicui.design/docs/components/retro-grid | Perspective grid receding to the horizon, rendered via a custom raw WebGL1 + GLSL shader (no three.js/ogl) with a CSS-only fallback and `prefers-reduced-motion` support. Could work as a sci-fi "hyperspace floor," though its synthwave look needs recoloring to fit a softer galaxy palette. | None (raw WebGL, zero extra npm installs) | High. Long, dense shader code (~500 lines total incl. LOD/anti-aliasing logic); highest implementation complexity in this set despite zero dependencies. |
| **Dotted Map** | https://magicui.design/docs/components/dotted-map | NOT a direct galaxy fit (renders a world-map silhouette dot pattern from lat/lng). Kept as a reference for its technique: pure SVG procedural dot field + pulsing animated markers via native SVG `<animate>` (no JS animation library/canvas). | `svg-dotted-map` | Medium. The `createMap` call is geography-specific; a galaxy "starfield with pulsing planet markers" would need a custom point generator swapped in instead of `svg-dotted-map`. |

## Standout picks for the galaxy/scrollytelling concept

1. **Particles** — zero-dependency animated starfield/particle canvas; best default background layer.
2. **Meteors** — zero-dependency (beyond a CSS keyframe) meteor-shower streaks; layers well on top of Particles.
3. **Orbiting Circles** — zero-dependency orbit animation; near-literal "planet with orbiting moons/services" diagram.
4. **Animated Beam** — needs `motion`; best literal match for "travel paths between planets" (glowing beam along an SVG path between two DOM nodes).
5. **Globe** — needs `cobe` + `motion`; a real interactive rotating sphere, usable as a planet with retuned colors/markers.

## npm packages referenced across saved components

- `motion` (Framer Motion's new package name) — used by: animated-beam, scroll-progress, animated-list, text-animate, typing-animation, hyper-text, warp-background, light-rays, globe.
- `cobe` (^0.6.4) — used by: globe.
- `@radix-ui/react-icons` — used by: bento-grid (also assumes a shadcn/ui `Button` component).
- `svg-dotted-map` — used by: dotted-map.
- No component in this set requires `three.js`, `ogl`, or GSAP — MagicUI leans on Framer Motion (`motion`) plus vanilla Canvas2D/WebGL1/SVG for its "flashy" effects.
- All components assume Tailwind CSS (v4 arbitrary-property syntax) and a `cn()` helper at `@/lib/utils` — neither exists in this project yet per the brief; would need to be added (or classes/keyframes manually ported to plain CSS files, consistent with the project's current per-component CSS convention).
