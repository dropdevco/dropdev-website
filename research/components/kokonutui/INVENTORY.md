# Kokonut UI — Component Inventory

Source: https://kokonutui.com/ (docs pages render client-side, so source was pulled directly
from the public GitHub repo [kokonut-labs/kokonutui](https://github.com/kokonut-labs/kokonutui),
`main` branch, `components/kokonutui/*.tsx`). All components are copy-paste (shadcn-style),
built with **React + TypeScript + Tailwind CSS v4 + Motion** (the renamed `framer-motion`
package, imported as `motion/react`). None currently exist in the Drop Dev codebase — Tailwind
and Motion would need to be installed to use these as-is verbatim, though most animation logic
(especially the canvas-based ones) has zero Tailwind dependency and can be ported to plain CSS.

Global note on adaptation cost: every component using `next/link` or `next/font/google` needs a
one-line swap (`react-router-dom` `Link`, or a regular `@font-face`/Google Fonts `<link>` tag) to
run under Vite — flagged per-row below. Components importing `@/components/ui/*` depend on
shadcn/ui primitives (Button, Card) that aren't installed; either install shadcn or replace with
plain elements — also flagged below.

| Component | Source URL | Why relevant to galaxy theme | Dependencies | Notes/complexity |
|---|---|---|---|---|
| **Flow Field** (`flow-field.tsx`) | https://kokonutui.com/docs/backgrounds/flow-field | Canvas particle system with a noise-driven vector field — has a built-in **"aurora"** theme (green/violet hues) and "ocean"/"ember" variants. This is the single closest out-of-the-box match to an animated galaxy/starfield background; particles drift, fade in/out, leave glowing trails. Pure `<canvas>` + `requestAnimationFrame`, no SVG. | `motion` (only for optional text overlay), `@/lib/utils` (cn helper, trivial to inline) | Medium complexity, ~250 lines. Canvas logic is framework-agnostic — no Tailwind required for the particle engine itself, only for the optional overlay text/vignette divs. Very strong reuse candidate for the galaxy background layer. |
| **Beams Background** (`beams-background.tsx`) | https://kokonutui.com/docs/backgrounds/beams-background | Large soft animated light-beam shapes drifting across a dark background — reads as nebula/aurora glow. Good candidate for a "deep space" ambient backdrop behind planet sections. | `motion` | Medium. Uses Motion for beam transforms; Tailwind-based styling (gradients, blur). Would need beam colors retuned for the galaxy palette. |
| **Shapes Hero** (`shape-hero.tsx`) | https://kokonutui.com/docs/backgrounds/shape-hero | Full hero section with large soft-edged gradient "shapes" that fade/float in and drift continuously (`y: [0,15,0]` loop) behind a title. Could be adapted so each shape becomes a distant "planet" glow in the hero. | `motion`, `next/font/google` (Pacifico script font) | Medium. Uses `next/font` — swap for a Google Fonts `<link>` or `@fontsource` package under Vite. Rest is pure Tailwind + Motion, straightforward port. |
| **Background Paths** (`background-paths.tsx`) | https://kokonutui.com/docs/backgrounds/background-paths | Animated SVG line paths drawn/animated across the background — directly usable as an literal "SVG vector galaxy" layer per the brief's requirement for SVG-based (not CSS-gradient) art direction. | `motion` | Medium. Confirm actual SVG path animation approach in file (uses motion path animation); good reference for how to animate stroke-dasharray-style reveals with Motion. |
| **Spotlight Cards** (`spotlight-cards.tsx`) | https://kokonutui.com/docs/cards/spotlight-cards | **Best "planet card" candidate.** Feature/spotlight grid item with per-card aurora-style ambient glow tied to a `color` prop, magnetic 3D tilt on mouse move (spring-based), and icon + title + description slots — maps almost 1:1 onto "one card per focus area/planet" with a distinct glow color per service. | `motion` (useMotionValue/useSpring/useTransform), `lucide-react` (icons) | Medium-high. Self-contained data model (`SpotlightItem[]`) already anticipates a list of features/services — minimal adaptation needed, just swap icons/copy/colors per Drop Dev service. Strong pick. |
| **Mouse Effect Card** (`mouse-effect-card.tsx`) | https://kokonutui.com/docs/cards/mouse-effect-card | Card with an animated dot-particle field inside that reacts/repels from cursor position — reads like a starfield/particle nebula contained in a card. Good for a "hover a planet card, see its stars react" micro-interaction. | `motion`, `@/components/ui/button`, `@/components/ui/card` (shadcn primitives) | High complexity (~300+ lines, physics/repulsion math per dot). Requires shadcn `Button`/`Card` components installed, or refactor to plain divs. |
| **Card Flip** (`card-flip.tsx`) | https://kokonutui.com/docs/cards/card-flip | 3D flip-card interaction (front summary / back detail) — useful for a planet card that flips to reveal service details on click/hover instead of navigating away. | `lucide-react` | Low-medium. No Motion dependency — likely CSS 3D transforms (`rotateY`, `perspective`, `backface-visibility`), so it's cheap to port even without installing Motion. |
| **Card Stack** (`card-stack.tsx`) | https://kokonutui.com/docs/cards/card-stack | Stacked/layered card interaction (cards fan out or stack with depth) — could represent overlapping "planets" or a stack of sub-services within one focus area. | `motion` | Medium. Uses `next/link` — swap for react-router `Link` or remove. |
| **Liquid Glass Card** (`liquid-glass-card.tsx`) | https://kokonutui.com/docs/cards/liquid-glass-card | Glassmorphic card with refractive/liquid highlight effect — could work as an overlay panel that appears when "arriving" at a planet (frosted glass over the galaxy backdrop). | `lucide-react`, `@/components/ui/*` (shadcn), `next/link` | High complexity/heavy file (~14KB). Requires shadcn primitives + react-router swap. Visually striking but the most work to port. |
| **Carousel Cards** (`carousel-cards.tsx`) | https://kokonutui.com/docs/cards/carousel-cards | Horizontal card carousel — could sequence through focus areas/services as an alternate/secondary navigation (e.g. a mini "solar system map" list). | `lucide-react`, `@/components/ui/*`, `next/link` | Medium-high. Needs shadcn + router swap. Useful mainly as a fallback/summary nav, not the primary scrollytelling mechanism. |
| **Bento Grid** (`bento-grid.tsx`) | https://kokonutui.com/docs/cards/bento-grid | Multi-size feature grid (2.0, "aurora ambient + magnetic 3D tilt + focus-dim siblings") — good structural reference for an overview/summary section listing all focus areas at once (e.g. a "map of the galaxy" recap grid before/after the scrollytelling section). | `lucide-react`, `motion`, `next/link`, bundled custom AI-brand icon SVGs (Anthropic/OpenAI/Gemini/Mistral/DeepSeek — irrelevant, would be swapped for Drop Dev's own service icons) | High complexity, largest file (~27KB). Needs `next/link` swap and stripping the AI-vendor icon imports (`components/icons/*`), replacing with Drop Dev's own icon set. Worth it for the "focus-dim siblings on hover" interaction pattern alone. |
| **Scroll Text** (`scroll-text.tsx`) | https://kokonutui.com/docs/texts/scroll-text | Text reveal driven by `whileInView` (Motion's scroll-triggered variant) — directly demonstrates the "reveal content on arrival at a planet" pattern the brief calls for. | `motion` | Low-medium (~4KB). Clean, minimal reference implementation for scroll-triggered reveal; easy to generalize to any section, not just text. |
| **Shimmer Text** (`shimmer-text.tsx`) | https://kokonutui.com/docs/texts/shimmer-text | Subtle shimmering gradient sweep across text — could mark a planet's name/heading as "energized" on arrival. | `motion` | Low, tiny file (~1.3KB). Cheap, safe pick. |
| **Dynamic Text** (`dynamic-text.tsx`) | https://kokonutui.com/docs/texts/dynamic-text | Word/phrase switcher/cross-fade animation — useful for rotating taglines per service or a hero headline that cycles through Drop Dev's focus areas. | `motion` | Low (~3KB). |
| **Typing Text / Type Writer** (`type-writer.tsx`) | https://kokonutui.com/docs/texts/type-writer | Classic typewriter effect — could suit a "terminal/code" flavored moment for the software-dev company angle. | `motion` | Low-medium (~6KB). |
| **Glitch Text** (`glitch-text.tsx`) | https://kokonutui.com/docs/texts/glitch-text | Digital glitch/RGB-split text effect — thematically fits a "tech/software" brand accent, could be used sparingly on a section transition. | `motion` | Medium (~8KB, largest of the text components — likely layered pseudo-text spans). |
| **Matrix Text** (`matrix-text.tsx`) | https://kokonutui.com/docs/texts/matrix-text | Character-scramble-into-place reveal (Matrix-style) — strong "software company" flavor, good for a section heading reveal. | `motion` | Low-medium (~4KB). |
| **Swoosh Text** (`swoosh-text.tsx`) | https://kokonutui.com/docs/texts/swoosh-text | Motion-blur swoosh entrance for text — fits a fast "zooming past a planet" transition moment. | `motion` | Low, tiny file (~1.6KB). |
| **Sliced Text** (`sliced-text.tsx`) | https://kokonutui.com/docs/texts/sliced-text | Text split into slices that animate in independently — another scroll-reveal heading option. | `motion` | Low, tiny file (~1.7KB). |
| **Magnet / Attract Button** (`attract-button.tsx`) | https://kokonutui.com/docs/buttons/attract-button | Button with particles/elements attracted toward the cursor on hover — orbit/gravity visual metaphor fits the galaxy theme directly for CTAs ("pulled in" like gravity). | `lucide-react`, `motion` | Low-medium (~3KB). |
| **Particle Button** (`particle-button.tsx`) | https://kokonutui.com/docs/buttons/particle-button | Button that emits a particle burst on click — good for a "launch"/CTA interaction with a starburst feel. | `lucide-react`, `motion` | Low (~2.5KB). |
| **Gradient Button** (`gradient-button.tsx`) | https://kokonutui.com/docs/buttons/gradient-button | Animated gradient-shift button — simple, reusable CTA styling consistent with a cosmic color palette. | none beyond `@/components/ui/button` (shadcn) + `@/lib/utils` | Low, but requires shadcn `Button` primitive (or trivial de-shadcn refactor). |
| **AI Loading / AI State Loading** (`ai-loading.tsx`) | https://kokonutui.com/docs/ai/ai-loading | Animated abstract loading state (blob/orb-style morphing shape) — reusable as a glowing "orb" motif representing a planet or a loading/transition state between scroll sections. | `motion` | Medium (~8KB). Worth checking visually — orb/blob morph shapes are one of the more literally "planet-like" visuals in the library. |
| **AI Text Loading** (`ai-text-loading.tsx`) | https://kokonutui.com/docs/ai/ai-text-loading | Small animated loading indicator paired with text — minor utility component, low priority but cheap. | `motion` | Low, tiny file (~2.3KB). |
| **Toolbar** (`toolbar.tsx`) | https://kokonutui.com/docs/navigation/toolbar | Floating animated toolbar/dock — potential candidate for a persistent "mission control" nav that lets users jump between planets without relying purely on scroll. | `lucide-react`, `motion` | Medium (~7KB). Secondary priority — a "jump to section" utility rather than core visual theme. |
| **Smooth Tab** (`smooth-tab.tsx`) | https://kokonutui.com/docs/navigation/smooth-tab | Animated sliding-indicator tab switcher — could work as a secondary in-page filter (e.g. switch between "services" view and "case studies" view within a planet section). | `lucide-react`, `motion` | Medium (~10KB). Lower priority; general-purpose UI utility, not galaxy-specific. |

## Components checked but skipped
- Basic inputs (file-upload, avatar-picker, team-selector, action-search-bar, ai-input-search,
  ai-prompt/ai-voice) — form/utility components not relevant to a marketing/showcase site.
- Apple Activity Card, Currency Transfer, Tweet/X Card, Profile Dropdown — app-dashboard-style
  data widgets, not applicable to a marketing site.
- Command Button, Switch Button, Social Button, Hold Button, V0 Button — standard button
  variants with no space/galaxy-specific visual value beyond what's already captured above.
- Smooth Drawer, Morphic Navbar — standard nav/drawer utilities, lower priority than Toolbar/
  Smooth Tab which were kept as the representative nav picks.

## npm packages required (if adopting any of the above as-is)
- `motion` (the current name for what was `framer-motion`) — required by the large majority of
  components above (all animation/spring/scroll-driven behavior).
- `lucide-react` — icon set used across cards/buttons.
- `tailwindcss` (v4) — all components are styled with Tailwind utility classes; none of this
  code will look right without it (or a manual CSS port of every class).
- Optional, only if adopting components as literal copy-paste rather than porting logic:
  `shadcn/ui` CLI + its generated `components/ui/button.tsx`, `components/ui/card.tsx` (needed
  by mouse-effect-card, liquid-glass-card, carousel-cards, gradient-button, particle-button).
- `next/font/google` and `next/link` appear in shape-hero, bento-grid, card-stack,
  liquid-glass-card, carousel-cards — all trivially replaceable with a Google Fonts `<link>` tag
  and `react-router-dom`'s `Link` respectively; not a blocker, just a required edit per file.
