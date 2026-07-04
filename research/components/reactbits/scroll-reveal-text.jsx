/*
 * ReactBits — ScrollReveal (Text Animation)
 * Source: https://reactbits.dev/text-animations/scroll-reveal
 * GitHub:  https://github.com/DavidHDev/react-bits/tree/main/src/content/TextAnimations/ScrollReveal
 *
 * Dependencies: gsap
 *   npm install gsap
 *
 * Word-by-word scroll-SCRUBBED (not just triggered-once) reveal: as the
 * user scrolls the paragraph into view, it un-rotates from a slight tilt,
 * each word fades from low opacity to full, and (optionally) un-blurs.
 * Because `scrub: true` ties the whole animation directly to scroll
 * position (not just a play-once trigger), this is one of the best
 * matches in the entire library for the brief's "scroll-linked animation /
 * parallax / reveal-on-scroll" requirement. Also accepts a custom
 * `scrollContainerRef` for cases where the page uses a custom scroll
 * container instead of `window` (relevant if the galaxy scrollytelling
 * section pins/hijacks scroll inside a wrapper div).
 *
 * Usage:
 *   import ScrollReveal from './scroll-reveal-text';
 *   <ScrollReveal>Web development is how we turn ideas into products.</ScrollReveal>
 *
 * Props:
 *   children: string                  - the paragraph text (split into words internally)
 *   scrollContainerRef: ref            - optional ref to a custom scrollable container (defaults to window)
 *   enableBlur: boolean                 - animate a blur-to-sharp effect alongside opacity
 *   baseOpacity: number (0-1)            - starting opacity per word before reveal
 *   baseRotation: number (deg)            - starting tilt of the whole block before it straightens
 *   blurStrength: number (px)              - max blur amount when enableBlur is true
 *   containerClassName / textClassName: string
 *   rotationEnd: string                    - GSAP ScrollTrigger "end" value for the rotation tween
 *   wordAnimationEnd: string                - GSAP ScrollTrigger "end" value for the word opacity/blur tween
 */
import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './scroll-reveal-text.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom'
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    gsap.fromTo(
      el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom',
          end: rotationEnd,
          scrub: true
        }
      }
    );

    const wordElements = el.querySelectorAll('.word');

    gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: 'opacity' },
      {
        ease: 'none',
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom-=20%',
          end: wordAnimationEnd,
          scrub: true
        }
      }
    );

    if (enableBlur) {
      gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: 'none',
          filter: 'blur(0px)',
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom-=20%',
            end: wordAnimationEnd,
            scrub: true
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
    </h2>
  );
};

export default ScrollReveal;
