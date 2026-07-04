/*
 * Adapted from ReactBits — ScrollReveal
 * (research/components/reactbits/scroll-reveal-text.jsx). GSAP ScrollTrigger,
 * scrubbed: each word sharpens from dim/blurred to crisp, tied directly to
 * scroll position — the "arriving at a planet" text treatment.
 *
 * The markup is fully visible by default; GSAP only animates when motion is
 * allowed, so reduced-motion users and crawlers always get readable text.
 */
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from 'motion/react';
import { cn } from '../../lib/utils';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollRevealText({ children, className, as: Tag = 'p' }) {
    const ref = useRef(null);
    const reduced = useReducedMotion();
    const text = typeof children === 'string' ? children : '';

    useGSAP(
        () => {
            if (reduced || !ref.current) return;
            const words = ref.current.querySelectorAll('.srt-word');
            gsap.fromTo(
                words,
                { opacity: 0.12, filter: 'blur(5px)', y: 10 },
                {
                    opacity: 1,
                    filter: 'blur(0px)',
                    y: 0,
                    stagger: 0.06,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: ref.current,
                        start: 'top 82%',
                        end: 'top 38%',
                        scrub: 0.6,
                    },
                }
            );
        },
        { scope: ref, dependencies: [reduced] }
    );

    return (
        <Tag ref={ref} className={cn('will-change-transform', className)}>
            {text.split(/(\s+)/).map((part, i) =>
                part.trim() ? (
                    <span key={i} className="srt-word inline-block">
                        {part}
                    </span>
                ) : (
                    <span key={i}> </span>
                )
            )}
        </Tag>
    );
}
