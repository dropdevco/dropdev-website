/*
 * ReactBits — ScrollFloat (Text Animation)
 * Source: https://reactbits.dev/text-animations/scroll-float
 * GitHub:  https://github.com/DavidHDev/react-bits/tree/main/src/content/TextAnimations/ScrollFloat
 *
 * Dependencies: gsap
 *   npm install gsap
 *
 * Per-character scroll-scrubbed "pop up" effect: each letter starts
 * offset below (yPercent 120), squashed/stretched (scaleY 2.3/scaleX 0.7),
 * and transparent, then springs into place as the heading scrolls through
 * the viewport (scrub: true, so it's fully tied to scroll position, can
 * run forward/backward). Good for punchy per-planet section titles (e.g.
 * "WEB DEVELOPMENT" popping in as that planet's section arrives).
 *
 * Usage:
 *   import ScrollFloat from './scroll-float-text';
 *   <ScrollFloat>APP DEVELOPMENT</ScrollFloat>
 *
 * Props:
 *   children: string              - heading text (split into chars internally)
 *   scrollContainerRef: ref        - optional custom scroll container (defaults to window)
 *   containerClassName / textClassName: string
 *   animationDuration: number (s)    - length of each char's pop-in tween
 *   ease: string                      - GSAP ease string, default 'back.inOut(2)' (bouncy overshoot)
 *   scrollStart: string                - ScrollTrigger start position
 *   scrollEnd: string                   - ScrollTrigger end position
 *   stagger: number (s)                  - per-character stagger delay
 */
import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './scroll-float-text.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split('').map((char, index) => (
      <span className="char" key={index}>
        {char === ' ' ? ' ' : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const charElements = el.querySelectorAll('.char');

    gsap.fromTo(
      charElements,
      {
        willChange: 'opacity, transform',
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: '50% 0%'
      },
      {
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: true
        }
      }
    );
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <h2 ref={containerRef} className={`scroll-float ${containerClassName}`}>
      <span className={`scroll-float-text ${textClassName}`}>{splitText}</span>
    </h2>
  );
};

export default ScrollFloat;
