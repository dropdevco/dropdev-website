# ReactBits (reactbits.dev) — Component Inventory

Site: https://reactbits.dev/ (open source, GitHub: https://github.com/DavidHDev/react-bits)

Note on method: reactbits.dev's docs pages are a client-rendered SPA, so
direct WebFetch of doc URLs returned only the page shell. All code below was
pulled from the actual component source files in the GitHub repo (same code
the site's copy-paste tabs serve), via `raw.githubusercontent.com` — content
is verbatim, not paraphrased. Full site had 177 documented component pages
across Text Animations (26), Animations (36), Components (43), and
Backgrounds (48) — the lists below were enumerated from the sitemap and the
GitHub repo's `src/content/Backgrounds` directory (56 folders total; some
overlap/renames vs. the sitemap's 48).

## Backgrounds (space/galaxy priority)

| Component | Source URL | Why relevant to galaxy theme | Dependencies | Notes/complexity |
|---|---|---|---|---|
| **Galaxy** | https://reactbits.dev/backgrounds/galaxy | **Literal galaxy/starfield background.** WebGL raymarched star layers with parallax depth (4 layers), per-star twinkle, hue-shift, saturation, glow/flare, auto-rotation, and mouse-repulsion/parallax. This is the single most direct match for the brief's "animated galaxy background." | `ogl` (~lightweight WebGL micro-lib, npm i ogl) | Medium complexity: one canvas, self-contained useEffect, cleans up WebGL context on unmount. Renders full-bleed behind content (transparent option available) — ideal as the persistent background layer behind the whole scrollytelling page. |
| **Aurora** | https://reactbits.dev/backgrounds/aurora | Flowing nebula/aurora-borealis color wash (simplex noise + 3-stop color ramp). Good for a colorful "nebula" accent layer or transition wash between planet sections, distinct from the starfield itself. | `ogl` | Medium; lighter shader than Galaxy. Re-renders color ramp every frame from props (supports live color changes). |
| **Orb** | https://reactbits.dev/backgrounds/orb | Glowing WebGL sphere/orb with simplex-noise surface detail, hue control, hover-triggered rotation & ripple distortion. Strongest literal **"planet"** visual candidate — reusable per-section with different `hue` values to represent each service-area planet instead of needing bespoke planet art per section. | `ogl` | Medium. Mouse-hover interaction built in (`rotateOnHover`, `forceHoverState` to force an "active" look programmatically on scroll-into-view instead of only on hover). |
| **Threads** | https://reactbits.dev/backgrounds/threads | Animated flowing line/thread field (Perlin-noise driven), optional mouse interaction. Reads as comet trails / warp streaks / trajectory lines between sections. Includes IntersectionObserver + `document.hidden` checks to pause rendering off-screen — a good performance pattern to reuse for any canvas-heavy background on a long scroll page. | `ogl` | Medium-low; single shader, capped internal render resolution for perf on large/high-DPI screens. |
| **Particles** | https://reactbits.dev/backgrounds/particles | Dense field of glowing WebGL point-sprites with true 3D depth (perspective `Camera`), gentle per-particle drift, slow ambient rotation, optional cursor-parallax. Reads as a star cluster/dust field; cheaper shader than Galaxy since it's point-based rather than per-pixel raymarched noise. Good lightweight alternative/companion starfield layer. | `ogl` | Low-medium; straightforward point cloud, easy to retheme via `particleColors` array. |
| **Hyperspeed** | https://reactbits.dev/backgrounds/hyperspeed (full source: see `hyperspeed-background.md` in this folder — not duplicated in full due to size, ~650 lines) | Full three.js "warp speed" scene: perspective camera flying down an endless road with light-streak trails, bloom + SMAA post-processing. Most literal embodiment of "camera zooming/traveling through space," though the underlying metaphor is a Tron-style highway, not a starfield — would need shader/geometry forking to feel more "through space" than "down a road." Six built-in color/distortion presets. Best used as a single dramatic scroll-triggered transition moment rather than a persistent background, given its complexity. | `three`, `postprocessing` | **High** complexity — full custom scene graph (Road, CarLights, LightsSticks classes), instanced geometry, custom GLSL patched into three.js's fog shader chunks via `onBeforeCompile`. Heaviest asset captured. Treat as a stretch/reference item. |
| Waves, Silk, DarkVeil, Plasma, LightRays, DotGrid, PixelBlast, PrismaticBurst, Iridescence, Balatro, Ballpit, FaultyTerminal, LiquidChrome, LiquidEther, Grainient, Radar, and ~25 others | https://reactbits.dev/backgrounds/{slug} (see repo `src/content/Backgrounds/`) | Enumerated but not individually fetched — none read as more space/galaxy-relevant than the six saved above based on name/purpose (most are abstract gradient/fluid/grid effects aimed at generic hero sections, not literal space visuals). Worth a second pass only if the design direction shifts toward a more abstract "energy field" look rather than literal stars/planets. | Mostly `ogl`; a few use plain CSS or canvas 2D | Not fetched — logged for completeness only. |

## Text Animations

| Component | Source URL | Why relevant to galaxy theme | Dependencies | Notes/complexity |
|---|---|---|---|---|
| **SplitText** | https://reactbits.dev/text-animations/split-text | Splits text into chars/words/lines, animates each in with stagger, gated behind GSAP ScrollTrigger so it fires once scrolled into view. Best-in-class hero headline / per-planet-section-title reveal. | `gsap`, `@gsap/react` | Medium. **Licensing note:** uses `gsap/SplitText`, historically a paid "Club GSAP" plugin; as of GSAP v3.13 (2025, post Webflow acquisition) all bonus plugins including SplitText are free with the standard `gsap` package — just confirm the installed gsap version is ≥3.13. |
| **ScrollReveal** | https://reactbits.dev/text-animations/scroll-reveal | Word-by-word reveal **scrubbed directly to scroll position** (`scrollTrigger.scrub: true`, not just play-once) — paragraph un-tilts, words fade in and un-blur as you scroll. One of the closest matches to the brief's "scroll-linked animation" ask. Supports a custom `scrollContainerRef` for non-window scroll containers. | `gsap` | Medium. Good for body-copy paragraphs within each planet section. |
| **ScrollFloat** | https://reactbits.dev/text-animations/scroll-float | Per-character scroll-scrubbed "pop up" effect — each letter springs into place (squash/stretch + bounce ease) as the heading scrolls through view. Punchy option for big per-section display headings. | `gsap` | Medium. Also scrub-based (ties directly to scroll position, reversible). |
| **ShinyText** | https://reactbits.dev/text-animations/shiny-text | Looping diagonal "shine sweep" gradient text (not WebGL — CSS `background-clip:text` gradient animated via Motion's `useAnimationFrame`). Good for small accent labels/eyebrows/nav highlights rather than large headlines. | `motion` (renamed/current package for what was `framer-motion`) | Low. No canvas/WebGL; cheap to add anywhere. |
| CircularText, GradientText, BlurText, FuzzyText, GlitchText, RotatingText, TrueFocus, CountUp, CurvedLoop, DecryptedText, FallingText, ScrambledText, Shuffle, TextCursor, TextPressure, TextType, VariableProximity, ASCIIText, ScrollVelocity | https://reactbits.dev/text-animations/{slug} | Enumerated (25 total text-animation folders) but not individually fetched — none read as more directly space/scroll-relevant than the four saved above. `ScrollVelocity` (scroll-speed-linked text marquee) may be worth a follow-up look if a "scroll-speed reactive" ticker/marquee is wanted somewhere (e.g. a services ticker). | Mix of `gsap`, `motion`, plain CSS | Not fetched — logged for completeness. |

## Animations

| Component | Source URL | Why relevant to galaxy theme | Dependencies | Notes/complexity |
|---|---|---|---|---|
| **StarBorder** | https://reactbits.dev/animations/star-border | Literal "star" themed, dependency-free CSS component: two radial-gradient comet blobs loop around a border, evoking a shooting-star/orbit trail. Cheapest way to add a "space" motif to CTA buttons/nav pills/links without adding any new npm package. Polymorphic (`as` prop — button, `<a>`, etc). | **None** (plain CSS + React only) | Low complexity, zero new dependencies — easy win. |
| **AnimatedContent** | https://reactbits.dev/animations/animated-content | Generic scroll-triggered reveal wrapper: wraps any children, slides + fades (+ optional scale) in once scrolled into view via GSAP ScrollTrigger (`once: true`), with an optional auto-disappear-after-delay mode. Most reusable default "reveal on scroll" wrapper in the whole library — good for wrapping each planet section's content block. Note: defaults to looking for a `#snap-main-container` DOM id as its scroll container if none is passed explicitly. | `gsap` | Medium. Broadly reusable across many sections without bespoke per-element animation code. |
| TargetCursor, Magnet, MagnetLines, GhostCursor, BlobCursor, Crosshair, ElectricBorder, LaserFlow, MagicRings, OrbitImages, Ribbons, MetaBalls, Noise, and ~17 others | https://reactbits.dev/animations/{slug} | Enumerated (36 total) but not individually fetched. `OrbitImages` and `MagicRings` are worth a follow-up look given the orbit/ring naming suggests possible literal orbit-path visuals for a solar-system style planet layout, if that direction is pursued further. | Mix of `gsap`, `ogl`, plain CSS | Not fetched — logged for completeness. |

## Components (interactive UI, not fetched this pass)

Enumerated 43 folders (`AnimatedList`, `ScrollStack`, `TiltedCard`, `CardSwap`,
`Carousel`, `Dock`, `InfiniteMenu`, `CircularGallery`, `GlassSurface`, etc.)
via the GitHub repo directory listing but did not fetch individual source —
these are general-purpose interactive UI patterns (cards, menus, nav) rather
than space/galaxy-specific visuals, lower priority per the brief's ask to
prioritize literal space backgrounds and scroll-linked effects first. Worth a
follow-up pass once the "planet content card" layout is being designed —
`TiltedCard` (3D mouse-tilt card) and `ScrollStack` (stacked-card scroll
effect) look like plausible candidates for presenting each service area's
detail card.

## Summary of npm packages referenced across saved components

- `ogl` — WebGL micro-library (Galaxy, Aurora, Orb, Threads, Particles). Small
  (~25kb), no other dependencies. **Not currently installed** in the project.
- `three` + `postprocessing` — only needed for Hyperspeed. **Not installed.**
- `gsap` (+`@gsap/react`, `gsap/ScrollTrigger`) — SplitText, ScrollReveal,
  ScrollFloat, AnimatedContent. **Not installed** (brief confirms GSAP is
  available to add).
- `motion` — ShinyText (this is the current npm package name for what used
  to ship as `framer-motion`; brief listed "Framer Motion" as not yet
  installed — installing `motion` covers that need under its new package
  name). **Not installed.**
- `star-border.jsx` — zero dependencies (plain CSS).
