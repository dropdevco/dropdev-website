/*
 * Adapted from Motion-Primitives — magnetic
 * (research/components/motion-primitives/magnetic.tsx). Simplified JSX port:
 * children are pulled toward the cursor like a gravity well.
 */
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import { useRef } from 'react';

const SPRING = { stiffness: 26, damping: 5, mass: 0.1 };

export default function Magnetic({ children, intensity = 0.35, range = 120, className }) {
    const ref = useRef(null);
    const reduced = useReducedMotion();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, SPRING);
    const springY = useSpring(y, SPRING);

    const handleMouseMove = (e) => {
        if (reduced || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist < range) {
            const pull = (1 - dist / range) * intensity;
            x.set(dx * pull);
            y.set(dy * pull);
        } else {
            x.set(0);
            y.set(0);
        }
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
            style={{ x: springX, y: springY }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
