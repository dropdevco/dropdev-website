/*
 * Star cursor — replaces the native pointer on precise-pointer devices with a
 * small trailing four-point star (violet→cyan) plus a lagging sparkle dot.
 * Grows and glows over interactive elements (a / button / [role=button]).
 * pointer-events-none throughout: it never intercepts clicks. Touch/coarse
 * pointers render nothing (native behavior untouched); the matching
 * `cursor: none` rule in index.css is scoped to `@media (pointer: fine)`.
 */
import { useEffect, useState, useSyncExternalStore } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

const fineQuery = '(pointer: fine)';
function subscribeFine(cb) {
    const m = window.matchMedia(fineQuery);
    m.addEventListener('change', cb);
    return () => m.removeEventListener('change', cb);
}
const getFine = () => window.matchMedia(fineQuery).matches;

const STAR_SPRING = { stiffness: 650, damping: 40, mass: 0.6 };
const SPARKLE_SPRING = { stiffness: 220, damping: 28, mass: 0.8 };

export default function StarCursor() {
    const fine = useSyncExternalStore(subscribeFine, getFine, () => false);
    const reduced = useReducedMotion();
    const [visible, setVisible] = useState(false);
    const [hot, setHot] = useState(false); // over an interactive element

    const mx = useMotionValue(-100);
    const my = useMotionValue(-100);
    const starX = useSpring(mx, STAR_SPRING);
    const starY = useSpring(my, STAR_SPRING);
    const sparkX = useSpring(mx, SPARKLE_SPRING);
    const sparkY = useSpring(my, SPARKLE_SPRING);

    // Reduced motion: no trailing lag — position directly.
    const sx = reduced ? mx : starX;
    const sy = reduced ? my : starY;

    useEffect(() => {
        if (!fine) return;
        const onMove = (e) => {
            mx.set(e.clientX);
            my.set(e.clientY);
            setVisible(true);
        };
        const onOver = (e) => {
            setHot(!!e.target.closest?.('a,button,[role="button"]'));
        };
        const onLeave = () => setVisible(false);
        window.addEventListener('mousemove', onMove, { passive: true });
        document.addEventListener('mouseover', onOver, { passive: true });
        document.documentElement.addEventListener('mouseleave', onLeave);
        return () => {
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseover', onOver);
            document.documentElement.removeEventListener('mouseleave', onLeave);
        };
    }, [fine, mx, my]);

    if (!fine) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[90]" aria-hidden="true">
            {/* Trailing sparkle dot (lags a touch more — comet feel) */}
            {!reduced && (
                <motion.div
                    style={{ x: sparkX, y: sparkY, opacity: visible ? 0.7 : 0 }}
                    className="absolute top-0 left-0"
                >
                    <div
                        className="h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-planet"
                        style={{ boxShadow: '0 0 6px 1px rgba(76,194,233,0.8)' }}
                    />
                </motion.div>
            )}

            {/* The star */}
            <motion.div
                style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
                className="absolute top-0 left-0"
            >
                <motion.svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    className="-translate-x-1/2 -translate-y-1/2 motion-safe:animate-[spin_7s_linear_infinite]"
                    animate={{
                        scale: hot ? 1.6 : 1,
                        filter: hot
                            ? 'drop-shadow(0 0 8px rgba(167,139,250,0.95))'
                            : 'drop-shadow(0 0 4px rgba(167,139,250,0.55))',
                    }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                    <defs>
                        <linearGradient id="star-cursor-grad" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#a78bfa" />
                            <stop offset="100%" stopColor="#4cc2e9" />
                        </linearGradient>
                    </defs>
                    {/* four-point sparkle */}
                    <path
                        d="M12 1 L14.2 9.8 L23 12 L14.2 14.2 L12 23 L9.8 14.2 L1 12 L9.8 9.8 Z"
                        fill="url(#star-cursor-grad)"
                    />
                </motion.svg>
            </motion.div>
        </div>
    );
}
