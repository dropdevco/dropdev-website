/*
 * Adapted from Motion-Primitives — in-view
 * (research/components/motion-primitives/in-view.tsx). One-shot rise/fade
 * reveal for content where full scroll-scrubbing is overkill. Falls back to
 * a plain opacity fade under prefers-reduced-motion.
 */
import { motion, useReducedMotion } from 'motion/react';

export default function Reveal({ children, delay = 0, y = 32, className, once = true }) {
    const reduced = useReducedMotion();

    return (
        <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once, margin: '-80px' }}
            transition={{ duration: reduced ? 0.3 : 0.9, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
