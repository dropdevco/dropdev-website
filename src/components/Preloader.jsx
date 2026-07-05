/*
 * Full-screen "Preparing your experience" gate. Holds the first paint until
 * fonts are ready, a minimum display time has elapsed, and an FPS probe has
 * sampled enough frames to pick a quality tier. Calls onReady(tier) once, then
 * the parent fades it out (via AnimatePresence).
 *
 * The galaxy renders behind this overlay while it's up, so the probe measures
 * the real rendering load, not just idle rAF cadence.
 */
import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

const MIN_MS = 1100; // never flash — always show for at least this long
const PROBE_FRAMES = 40; // frames to sample for the FPS estimate
const CAP_MS = 4500; // hard ceiling so we never hang

export default function Preloader({ onReady }) {
    const [progress, setProgress] = useState(0);
    const doneRef = useRef(false);

    useEffect(() => {
        const start = performance.now();
        let last = start;
        let frames = 0;
        const deltas = [];
        let rafId;

        const finish = () => {
            if (doneRef.current) return;
            doneRef.current = true;
            const avg = deltas.length ? deltas.reduce((a, b) => a + b, 0) / deltas.length : 16;
            const fps = 1000 / avg;
            onReady(fps < 45 ? 'low' : 'high');
        };

        const tick = (t) => {
            const dt = t - last;
            last = t;
            frames += 1;
            if (frames > 4) deltas.push(dt); // discard warmup frames
            setProgress(Math.min(1, (t - start) / MIN_MS));

            const fontsReady = document.fonts ? document.fonts.status === 'loaded' : true;
            const minElapsed = t - start >= MIN_MS;
            const probed = deltas.length >= PROBE_FRAMES;

            if (minElapsed && probed && fontsReady) {
                finish();
                return;
            }
            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);

        const cap = setTimeout(finish, CAP_MS);
        return () => {
            cancelAnimationFrame(rafId);
            clearTimeout(cap);
        };
    }, [onReady]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-space"
        >
            {/* Forming orb */}
            <div className="relative h-24 w-24">
                <div className="absolute inset-0 animate-[spin_3s_linear_infinite] rounded-full border border-hairline" />
                <div className="absolute inset-2 rounded-full bg-accent-deep/20 blur-md" />
                <div className="absolute inset-0 rounded-full bg-radial from-accent/40 to-transparent" />
                <img
                    src="/DropDev gradient (1).png"
                    alt="Drop Dev"
                    className="absolute inset-0 m-auto h-8 w-auto"
                />
            </div>

            <div className="flex flex-col items-center gap-4">
                <p className="font-mono text-[11px] tracking-[0.35em] text-white/60 uppercase">
                    Preparing your experience
                </p>
                {/* Progress bar */}
                <div className="h-px w-48 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                        className="h-full bg-linear-to-r from-accent-deep to-cyan-planet"
                        style={{ width: `${Math.round(progress * 100)}%` }}
                    />
                </div>
            </div>
        </motion.div>
    );
}
