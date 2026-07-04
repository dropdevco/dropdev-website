/*
 * ReactBits — AnimatedContent (Animation)
 * Source: https://reactbits.dev/animations/animated-content
 * GitHub:  https://github.com/DavidHDev/react-bits/tree/main/src/content/Animations/AnimatedContent
 *
 * Dependencies: gsap
 *   npm install gsap
 *
 * Generic scroll-triggered reveal wrapper: wraps ANY children, slides them
 * in from a direction (vertical/horizontal), fades opacity in, optionally
 * scales up from a smaller size, fires once when the wrapped element
 * scrolls into view (GSAP ScrollTrigger, `once: true`), and can optionally
 * auto-disappear again after a delay. Notably it looks for a
 * `document.getElementById('snap-main-container')` scroller target by
 * default if no `container`/`scrollContainerRef` is passed -- worth
 * matching that DOM id (or passing an explicit container ref) if the
 * eventual build uses a custom scroll-snap wrapper for the galaxy sections.
 *
 * This is the most generically reusable "reveal-on-scroll" wrapper found
 * in reactbits -- good default for wrapping each planet section's content
 * block (text, image, card grid, etc.) without needing per-element bespoke
 * animation code.
 *
 * Usage:
 *   import AnimatedContent from './animated-content';
 *   <AnimatedContent direction="vertical" distance={80} duration={0.9}>
 *     <ServiceCard ... />
 *   </AnimatedContent>
 *
 * Props:
 *   children: ReactNode
 *   container: string | HTMLElement    - explicit scroller target (id string or element)
 *   distance: number (px)                - how far off-position the element starts
 *   direction: 'vertical'|'horizontal'    - axis of the entrance slide
 *   reverse: boolean                       - flips the entrance direction sign
 *   duration: number (s)                    - entrance tween duration
 *   ease: string                             - GSAP ease string
 *   initialOpacity: number (0-1)              - starting opacity (if animateOpacity)
 *   animateOpacity: boolean                    - whether opacity is animated at all
 *   scale: number                               - target scale (entrance can also scale up to this)
 *   threshold: number (0-1)                      - ScrollTrigger visibility threshold
 *   delay: number (s)                              - delay before the entrance tween starts
 *   disappearAfter: number (s)                      - if >0, auto-reverses/hides after this delay post-entrance
 *   disappearDuration / disappearEase                - tween settings for the auto-disappear
 *   onComplete / onDisappearanceComplete: fn           - lifecycle callbacks
 *   className: string
 */
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedContent = ({
  children,
  container,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  ease = 'power3.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = 'power3.in',
  onComplete,
  onDisappearanceComplete,
  className = '',
  ...props
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let scrollerTarget = container || document.getElementById('snap-main-container') || null;

    if (typeof scrollerTarget === 'string') {
      scrollerTarget = document.querySelector(scrollerTarget);
    }

    const axis = direction === 'horizontal' ? 'x' : 'y';
    const offset = reverse ? -distance : distance;
    const startPct = (1 - threshold) * 100;

    gsap.set(el, {
      [axis]: offset,
      scale,
      opacity: animateOpacity ? initialOpacity : 1,
      visibility: 'visible'
    });

    const tl = gsap.timeline({
      paused: true,
      delay,
      onComplete: () => {
        if (onComplete) onComplete();
        if (disappearAfter > 0) {
          gsap.to(el, {
            [axis]: reverse ? distance : -distance,
            scale: 0.8,
            opacity: animateOpacity ? initialOpacity : 0,
            delay: disappearAfter,
            duration: disappearDuration,
            ease: disappearEase,
            onComplete: () => onDisappearanceComplete?.()
          });
        }
      }
    });

    tl.to(el, {
      [axis]: 0,
      scale: 1,
      opacity: 1,
      duration,
      ease
    });

    const st = ScrollTrigger.create({
      trigger: el,
      scroller: scrollerTarget,
      start: `top ${startPct}%`,
      once: true,
      onEnter: () => tl.play()
    });

    return () => {
      st.kill();
      tl.kill();
    };
  }, [
    container,
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    disappearAfter,
    disappearDuration,
    disappearEase,
    onComplete,
    onDisappearanceComplete
  ]);

  return (
    <div ref={ref} className={className} style={{ visibility: 'hidden' }} {...props}>
      {children}
    </div>
  );
};

export default AnimatedContent;
