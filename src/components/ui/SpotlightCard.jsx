/*
 * Adapted from KokonutUI — spotlight-cards (research/components/kokonutui/spotlight-cards.tsx)
 * Changes: JSX (no TS), emoji icon slot instead of lucide-react (matches the
 * existing Drop Dev content data), dark-only instrument styling, and the
 * grid/section shell stripped (sections compose their own layout).
 */
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import { cn } from '../../lib/utils';

const TILT_MAX = 9;
const TILT_SPRING = { stiffness: 300, damping: 28 };
const GLOW_SPRING = { stiffness: 180, damping: 22 };

export default function SpotlightCard({ item, dimmed = false, onHoverStart, onHoverEnd, className }) {
    const cardRef = useRef(null);
    const reduced = useReducedMotion();

    const normX = useMotionValue(0.5);
    const normY = useMotionValue(0.5);

    const rawRotateX = useTransform(normY, [0, 1], [TILT_MAX, -TILT_MAX]);
    const rawRotateY = useTransform(normX, [0, 1], [-TILT_MAX, TILT_MAX]);

    const rotateX = useSpring(rawRotateX, TILT_SPRING);
    const rotateY = useSpring(rawRotateY, TILT_SPRING);
    const glowOpacity = useSpring(0, GLOW_SPRING);

    const handleMouseMove = (e) => {
        if (reduced) return;
        const el = cardRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        normX.set((e.clientX - rect.left) / rect.width);
        normY.set((e.clientY - rect.top) / rect.height);
    };

    const handleMouseEnter = () => {
        glowOpacity.set(1);
        onHoverStart?.();
    };

    const handleMouseLeave = () => {
        normX.set(0.5);
        normY.set(0.5);
        glowOpacity.set(0);
        onHoverEnd?.();
    };

    return (
        <motion.div
            animate={{ scale: dimmed ? 0.96 : 1, opacity: dimmed ? 0.5 : 1 }}
            className={cn(
                'group relative flex flex-col gap-5 overflow-hidden rounded-2xl border p-6',
                'border-hairline bg-white/3',
                'transition-[border-color] duration-300 hover:border-white/15',
                className
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            ref={cardRef}
            style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
        >
            {/* Static accent tint — always visible */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                    background: `radial-gradient(ellipse at 20% 20%, ${item.color}14, transparent 65%)`,
                }}
            />

            {/* Hover glow layer */}
            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                    opacity: glowOpacity,
                    background: `radial-gradient(ellipse at 20% 20%, ${item.color}2e, transparent 65%)`,
                }}
            />

            {/* Shimmer sweep */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-[55%] -translate-x-full -skew-x-12 bg-linear-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[280%]"
            />

            {/* Icon badge */}
            <div
                className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl text-lg"
                style={{
                    background: `${item.color}18`,
                    boxShadow: `inset 0 0 0 1px ${item.color}30`,
                }}
                aria-hidden="true"
            >
                {item.icon}
            </div>

            {/* Text */}
            <div className="relative z-10 flex flex-col gap-2">
                <h3 className="text-[15px] font-semibold tracking-tight text-white">{item.title}</h3>
                <p className="text-[13px] leading-relaxed text-white/45">{item.description}</p>
            </div>

            {/* Accent bottom line */}
            <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full transition-all duration-500 group-hover:w-full"
                style={{
                    background: `linear-gradient(to right, ${item.color}80, transparent)`,
                }}
            />
        </motion.div>
    );
}
