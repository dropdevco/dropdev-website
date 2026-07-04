/*
 * ReactBits — SplitText (Text Animation)
 * Source: https://reactbits.dev/text-animations/split-text
 * GitHub:  https://github.com/DavidHDev/react-bits/tree/main/src/content/TextAnimations/SplitText
 *
 * Dependencies: gsap, @gsap/react
 *   npm install gsap @gsap/react
 *
 * IMPORTANT LICENSING NOTE: this component uses GSAP's `SplitText` plugin
 * (`gsap/SplitText`). Historically SplitText was a paid "Club GSAP" bonus
 * plugin; as of GSAP v3.13 (2025) all bonus plugins including SplitText
 * were made free to use with the standard `gsap` npm package (Webflow
 * acquired GSAP and open-sourced the paid plugins). Confirm the installed
 * gsap version is >=3.13 so `gsap/SplitText` resolves without a private
 * registry/club token.
 *
 * Splits text into chars/words/lines and animates each piece in with a
 * stagger, gated behind a GSAP ScrollTrigger so the reveal fires once the
 * element scrolls into view. Ideal for hero headline + per-planet-section
 * title reveals in the scrollytelling flow -- this is the most directly
 * "scroll-triggered text reveal" component in the whole library.
 *
 * Usage:
 *   import SplitText from './split-text';
 *   <SplitText text="Building Software That Matters" splitType="chars" tag="h1" />
 *
 * Props:
 *   text: string                 - the text content to split & animate
 *   className: string             - extra class names
 *   delay: number (ms)             - stagger delay between each split piece
 *   duration: number (s)           - duration of each piece's tween
 *   ease: string                    - GSAP ease string (e.g. 'power3.out')
 *   splitType: 'chars'|'words'|'lines' (or combos like 'chars,words')
 *   from / to: object              - GSAP fromTo() vars (e.g. {opacity:0,y:40} -> {opacity:1,y:0})
 *   threshold: number (0-1)        - ScrollTrigger visibility threshold
 *   rootMargin: string              - CSS-margin-like offset adjusting trigger start point
 *   textAlign: string                - text-align on the wrapping tag
 *   tag: string                      - wrapping element tag, e.g. 'h1' | 'p'
 *   onLetterAnimationComplete: fn   - callback fired once stagger finishes
 */
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

const SplitText = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}) => {
  const ref = useRef(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Keep callback ref updated
  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      // Prevent re-animation if already completed
      if (animationCompletedRef.current) return;
      const el = ref.current;

      if (el._rbsplitInstance) {
        try {
          el._rbsplitInstance.revert();
        } catch (_) {
          /* noop */
        }
        el._rbsplitInstance = null;
      }

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      let targets;
      const assignTargets = self => {
        if (splitType.includes('chars') && self.chars.length) targets = self.chars;
        if (!targets && splitType.includes('words') && self.words.length) targets = self.words;
        if (!targets && splitType.includes('lines') && self.lines.length) targets = self.lines;
        if (!targets) targets = self.chars || self.words || self.lines;
      };

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType === 'lines',
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char',
        reduceWhiteSpace: false,
        onSplit: self => {
          assignTargets(self);
          const tween = gsap.fromTo(
            targets,
            { ...from },
            {
              ...to,
              duration,
              ease,
              stagger: delay / 1000,
              scrollTrigger: {
                trigger: el,
                start,
                once: true,
                fastScrollEnd: true,
                anticipatePin: 0.4
              },
              onComplete: () => {
                animationCompletedRef.current = true;
                onCompleteRef.current?.();
              },
              willChange: 'transform, opacity',
              force3D: true
            }
          );
          return tween;
        }
      });

      el._rbsplitInstance = splitInstance;

      return () => {
        ScrollTrigger.getAll().forEach(st => {
          if (st.trigger === el) st.kill();
        });
        try {
          splitInstance.revert();
        } catch (_) {
          /* noop */
        }
        el._rbsplitInstance = null;
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded
      ],
      scope: ref
    }
  );

  const renderTag = () => {
    const style = {
      textAlign,
      overflow: 'hidden',
      display: 'inline-block',
      whiteSpace: 'normal',
      wordWrap: 'break-word',
      willChange: 'transform, opacity'
    };
    const classes = `split-parent ${className}`;
    const Tag = tag || 'p';

    return (
      <Tag ref={ref} style={style} className={classes}>
        {text}
      </Tag>
    );
  };
  return renderTag();
};

export default SplitText;
