# Motion Primitives — Component Inventory

Source: https://motion-primitives.com/ (MIT licensed, copy-paste style, built by ibelick).
GitHub: https://github.com/ibelick/motion-primitives

Note: the live docs site returned 403/429 to automated fetches (bot protection), so source
code below was pulled from the GitHub repo's raw component files
(`components/core/*.tsx` on the `main` branch), which is the same source the docs site
copy-paste blocks are generated from. Doc page URLs are included for reference/browsing.

All components use **Tailwind CSS** classes and the **`motion/react`** package (the renamed
`framer-motion` — same API, new import name, published as `motion`). Most also import a
`cn()` helper from `@/lib/utils` (a thin `clsx` + `tailwind-merge` wrapper) — trivial to
replicate in our repo.

## Saved components

| Component | Source URL | Why relevant to galaxy theme | Dependencies | Notes/complexity |
|---|---|---|---|---|
| Scroll Progress | https://motion-primitives.com/docs/scroll-progress | Drives a scroll-linked progress bar via `useScroll`/`useSpring`; the exact primitive needed for a "how far through the galaxy have you traveled" indicator, or to drive camera-zoom math keyed off scroll position. | `motion/react`, tailwindcss | Low. ~35 lines. Easiest possible integration point for scroll-driven state — could repurpose `scrollYProgress` (not just the visual bar) to drive planet-to-planet camera transforms. |
| In View | https://motion-primitives.com/docs/in-view | Wraps `useInView` + variants to reveal content (planet info cards) as they scroll into the viewport. Core reveal-on-scroll primitive for each planet's content panel. | `motion/react` | Low. Generic wrapper, `once` flag included for one-shot reveals. |
| Spotlight | https://motion-primitives.com/docs/spotlight | Cursor-following radial gradient glow bound to a parent container — could reskin as a "torchlight"/proximity glow for planet cards on hover, playing into the space theme directly. | `motion/react`, tailwindcss | Low-medium. Mutates parent's `position`/`overflow` via ref — needs the planet card to be `relative`/`overflow-hidden`; colors are Tailwind zinc by default and easily reskinned to brand colors. |
| Glow Effect | https://motion-primitives.com/docs/glow-effect | Animated multi-color glow (rotate/pulse/breathe/colorShift/flowHorizontal/static modes) behind an element — strong fit for planet "auras" or nebula-like ambient glows behind hero content or CTA buttons. | `motion/react`, tailwindcss | Low-medium. Colors/mode/blur/duration all configurable; `colorShift`/`flowHorizontal` modes read as nebula gas clouds with minimal tweaking. |
| Tilt | https://motion-primitives.com/docs/tilt | 3D perspective tilt on mouse move (`rotateX`/`rotateY` via spring-smoothed motion values) — good for making a planet/card feel like a physical 3D object responding to the cursor, or a "look around the planet" effect. | `motion/react` | Low-medium. No Tailwind dependency in the logic itself (only for consumer styling); needs `transformStyle: preserve-3d` on children if nesting 3D layers. |
| Magnetic | https://motion-primitives.com/docs/magnetic | Element is pulled toward the cursor within a proximity radius — perfect for making planet icons/CTA buttons feel gravitationally "attracted" to the mouse, literalizing the galaxy metaphor. | `motion/react` | Low. Global `mousemove` listener; `actionArea` prop (`self`/`parent`/`global`) controls trigger scope — `global` mode lets a planet react to cursor anywhere on screen (true gravity-well feel). |
| Cursor | https://motion-primitives.com/docs/cursor | Custom cursor replacement that follows the pointer with spring physics; could render a small "spaceship" or glowing dot cursor, reinforcing the travel-through-space feel site-wide. | `motion/react`, tailwindcss | Medium. Hides the native cursor (`document.body.style.cursor = 'none'`) — must ensure a fallback/visible state for accessibility and touch devices. |
| Text Effect | https://motion-primitives.com/docs/text-effect | Per-word/per-char/per-line staggered reveal animation with presets (blur, fade-in-blur, scale, fade, slide) — ideal for headline/copy reveal as each planet section scrolls into view. | `motion/react`, tailwindcss | Medium. Most fully-featured text component in the kit; supports custom variants/transitions and `AnimatePresence` exit animations for re-triggering on scroll. |
| Text Shimmer | https://motion-primitives.com/docs/text-shimmer | Animated gradient "sheen" sweeping across text — good for a premium/metallic look on section headings or a loading/"scanning" effect for planet names. | `motion/react`, tailwindcss | Low. Single looping background-position animation; easy to retint via CSS custom properties. |
| Text Morph | https://motion-primitives.com/docs/text-morph | Smoothly morphs between two strings character-by-character using shared `layoutId`s — usable for a rotating tagline or animated stat/counter label as you travel between planets. | `motion/react` | Medium. Relies on `layoutId` per-character diffing so works best swapping short, similar-length strings. |
| Text Scramble | https://motion-primitives.com/docs/text-scramble | Matrix/hacker-style character scramble-to-reveal — strong thematic fit for a "software/dev" company (code-like decode effect) transitioning into a planet's heading. | `motion/react` | Low-medium. Uses `setInterval`, not spring-driven; cheap to run but should be throttled/triggered via `InView` rather than on mount for every heading. |
| Text Roll | https://motion-primitives.com/docs/text-roll | 3D "rolodex" per-letter flip transition — flashy accent effect for nav links or a hero headline flip between service names. | `motion/react` | Medium. Renders each letter twice (enter/exit layers) with `perspective`/`backface-visibility` tricks; moderate DOM weight for long strings. |
| Spinning Text | https://motion-primitives.com/docs/spinning-text | Circular rotating text (e.g. "SCROLL TO EXPLORE • SCROLL TO EXPLORE •") — literally an orbit-style component, great as a decorative ring around a planet or a scroll-cue badge. | `motion/react`, tailwindcss | Low. Pure CSS `transform`/trig-free (uses `translateY` + per-letter rotate); duration/radius/reverse all configurable. |
| Animated Background | https://motion-primitives.com/docs/animated-background | Shared-layout animated highlight (`layoutId`) that slides between sibling elements on hover/click — good for an active-planet indicator in a nav/orbit menu (e.g. highlighting which planet/section is currently active while scrolling). | `motion/react`, tailwindcss | Medium. Needs children to carry a `data-id` prop; works well as a scrollspy-style nav highlight if paired with scroll-position logic. |
| Animated Group | https://motion-primitives.com/docs/animated-group | Stagger-reveals a list of children with 10 presets (fade/slide/scale/blur/blur-slide/zoom/flip/bounce/rotate/swing) — reusable wrapper for revealing a group of feature bullets/icons within each planet's content panel. | `motion/react` | Low. Good general-purpose "reveal this list of cards/icons" utility; complements `In View` for scroll-triggered variants. |
| Border Trail | https://motion-primitives.com/docs/border-trail | A glowing dot/segment that continuously travels around an element's border using CSS `offset-path` — could visualize an "orbit path" around a planet card or a loading/active-state indicator. | `motion/react`, tailwindcss | Low. Relies on `offset-path`/`offset-distance` (good modern browser support, static-export friendly, no JS layout thrash). |
| Progressive Blur | https://motion-primitives.com/docs/progressive-blur | Layered directional blur gradient (e.g. fading a starfield/image into blur near a content panel edge) — useful for legibility of text placed over the animated galaxy background without a hard rectangle mask. | `motion/react`, tailwindcss | Low-medium. Stacks N `backdrop-filter: blur()` layers with mask gradients; can be pricey on low-end GPUs with many layers/large areas — tune `blurLayers`. |
| Image Comparison | https://motion-primitives.com/docs/image-comparison | Drag/hover slider revealing one image over another via clip-path — repurposable as a "before/after" or concept-to-shipped-product showcase within a service/planet detail section. | `motion/react`, tailwindcss | Medium. Context-provider pattern (3 sub-components); solid fit for a portfolio/case-study slider rather than the galaxy chrome itself. |
| Infinite Slider | https://motion-primitives.com/docs/infinite-slider | Seamless infinite marquee (logos, tech stack icons, client names) with hover-to-slow-down — useful for a "trusted by" or tech-stack strip; also generally reusable as a background star-field drift layer if fed small icon/dot children. | `motion/react`, `react-use-measure` | Low-medium. Needs the extra `react-use-measure` package (small, well-maintained) beyond `motion/react`. |
| Dock | https://motion-primitives.com/docs/dock | macOS-style magnifying icon dock (mouse-proximity scale via `useTransform`) — a premium, tactile nav pattern; could double as a "jump to planet" quick-nav if the site wants a persistent way to warp between sections. | `motion/react`, tailwindcss | Medium-high. Most complex saved component (context provider + 4 sub-components); very polished if used as primary navigation, but likely overkill unless the site wants a fixed dock-style nav. |

## Notable components reviewed but NOT saved (lower priority for this project)

These exist in the library but are generic UI utility (dialogs, accordions, sliders, toolbars)
rather than galaxy/scrollytelling-specific. Listed briefly for completeness per the brief's
guidance to note high-quality utilities in passing:

- **Accordion**, **Disclosure** — generic expand/collapse; useful later for an FAQ section but not thematically distinctive.
- **Dialog**, **Morphing Dialog**, **Morphing Popover** — modal/popover primitives with shared-layout open/close morphs; could be handy for a "case study" lightbox but out of scope for the core galaxy experience.
- **Carousel** — full-featured carousel/context primitive; overlaps with Infinite Slider for our purposes.
- **Animated Number**, **Sliding Number** — odometer-style number transitions; potentially useful for a stats section (e.g. "12 planets, 50 projects shipped") but not scroll/galaxy-specific.
- **Toolbar Dynamic**, **Toolbar Expandable** — expanding icon toolbars; generic nav utility, redundant with Dock for our nav needs.
- **Transition Panel** — indexed panel/tab transition; generic, not galaxy-specific.

## Dependencies summary (what we'd need to `npm install`)

To use any of the saved components as-is in the Drop Dev React 19 + Vite stack:

1. **`motion`** (the npm package `motion`, imported as `motion/react` — this is the successor/rename of `framer-motion`; same team, same API surface, actively maintained). This is the only hard runtime dependency shared by every component above.
2. **`tailwindcss`** — not yet installed per the brief; most components' visual styling (blur presets, gradients, dark-mode variants) assumes Tailwind utility classes. Components will still function without Tailwind (they're just React + inline/motion styles for the animation logic) but the `className` props and default look assume Tailwind is present. Recommend adding Tailwind if adopting more than 2-3 of these, since maintaining hand-written CSS equivalents for each preset (blur levels, gradient stops, etc.) will be more work than installing Tailwind.
3. **`clsx` + `tailwind-merge`** (or an equivalent `cn()` utility) — small peer utility used throughout for conditional class merging. Trivial ~5-line helper if avoiding the two extra packages.
4. **`react-use-measure`** — only needed for **Infinite Slider** (measures container size for the marquee loop math).
5. No component in this batch requires GSAP, Three.js, or Lenis/smooth-scroll libraries — motion-primitives achieves everything shown via `motion/react`'s `useScroll`, `useSpring`, `useTransform`, and CSS (`offset-path`, `backdrop-filter`, `clip-path`). Since the brief allows adding GSAP/Three.js/Lenis for other sites' techniques, motion-primitives components can sit alongside those without conflict — `motion/react` and GSAP/Three.js don't collide (different concerns: React declarative animation vs. imperative timeline/3D engines).

## Standout picks for the galaxy/scrollytelling concept

If narrowing to a shortlist for the Fable build prompt, the strongest thematic + technical fits are:

1. **Scroll Progress** — reusable as the literal driver of "how far into the galaxy journey" state, not just a visual bar.
2. **Magnetic** (global mode) — gives UI elements a literal gravity-well feel, directly literalizing the galaxy metaphor.
3. **Glow Effect** — nebula/aura backgrounds behind planet cards or CTAs.
4. **Spinning Text** — ready-made orbit-ring decoration or scroll-cue badge.
5. **In View** + **Text Effect** — the core reveal-on-scroll pairing for every planet's content panel as the camera "arrives."
