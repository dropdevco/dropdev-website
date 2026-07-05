/*
 * Interactive meteor layer — a showcase toy. Every 9–18s a single meteor
 * streaks across; clicking/tapping it "crushes" it into a particle burst and
 * bumps a session counter. Container is pointer-events-none (never blocks
 * scroll or selection); only the meteor head is clickable. Nothing spawns
 * under prefers-reduced-motion.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

let uid = 0;

function makeMeteor() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const fromRight = Math.random() > 0.4;
    const sx = fromRight ? vw + 80 : vw * 0.15 + Math.random() * vw * 0.5;
    const sy = fromRight ? vh * 0.04 + Math.random() * vh * 0.3 : -80;
    const ex = sx - (vw * 0.5 + Math.random() * vw * 0.3);
    const ey = sy + (vh * 0.55 + Math.random() * vh * 0.35);
    const angleDeg = (Math.atan2(ey - sy, ex - sx) * 180) / Math.PI;
    return { id: ++uid, sx, sy, ex, ey, angleDeg };
}

// Deterministic radial spread (kept pure — no Math.random during render).
const SHARDS = Array.from({ length: 10 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 10 + (i % 2 ? 0.25 : 0);
    const d = 28 + (i % 3) * 12;
    return { dx: Math.cos(a) * d, dy: Math.sin(a) * d, key: i };
});

function Burst({ x, y }) {
    const shards = SHARDS;
    return (
        <div className="pointer-events-none absolute" style={{ left: x, top: y }}>
            {shards.map((s) => (
                <motion.span
                    key={s.key}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{ x: s.dx, y: s.dy, opacity: 0, scale: 0.4 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="absolute block h-1 w-1 rounded-full bg-white"
                    style={{ boxShadow: '0 0 6px 1px rgba(167,139,250,0.9)' }}
                />
            ))}
        </div>
    );
}

export default function Meteors() {
    const reduced = useReducedMotion();
    const [meteor, setMeteor] = useState(null);
    const [effects, setEffects] = useState([]); // bursts + labels
    const countRef = useRef(0);
    const timerRef = useRef(null);
    const activeRef = useRef(false); // one meteor at a time

    const spawn = useCallback(() => {
        if (activeRef.current) return;
        activeRef.current = true;
        setMeteor(makeMeteor());
    }, []);

    useEffect(() => {
        if (reduced) return;
        const schedule = (first) => {
            const delay = first ? 4000 : 9000 + Math.random() * 9000;
            timerRef.current = setTimeout(() => {
                spawn();
                schedule(false);
            }, delay);
        };
        schedule(true);
        return () => clearTimeout(timerRef.current);
    }, [reduced, spawn]);

    const crush = (e) => {
        e.stopPropagation();
        const x = e.clientX;
        const y = e.clientY;
        countRef.current += 1;
        const id = ++uid;
        setEffects((list) => [...list, { id, x, y, count: countRef.current }]);
        setMeteor(null);
        activeRef.current = false;
        setTimeout(() => {
            setEffects((list) => list.filter((f) => f.id !== id));
        }, 900);
    };

    if (reduced) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
            <AnimatePresence>
                {meteor && (
                    <motion.div
                        key={meteor.id}
                        initial={{ x: meteor.sx, y: meteor.sy, opacity: 0 }}
                        animate={{ x: meteor.ex, y: meteor.ey, opacity: [0, 1, 1, 0.9] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.6, ease: 'linear' }}
                        onAnimationComplete={() => {
                            activeRef.current = false;
                            setMeteor((m) => (m && m.id === meteor.id ? null : m));
                        }}
                        className="absolute top-0 left-0"
                        style={{ rotate: `${meteor.angleDeg}deg` }}
                    >
                        {/* clickable head */}
                        <button
                            type="button"
                            aria-label="Crush meteor"
                            onClick={crush}
                            className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                            style={{ width: 44, height: 44, borderRadius: '50%' }}
                        >
                            <span className="absolute inset-0 m-auto block h-2 w-2 rounded-full bg-white" style={{ boxShadow: '0 0 10px 2px rgba(167,139,250,0.95), 0 0 22px 6px rgba(76,194,233,0.5)' }} />
                        </button>
                        {/* tail — extends behind the head along travel axis */}
                        <span
                            className="absolute top-1/2 right-0 block h-px"
                            style={{
                                width: 160,
                                transform: 'translateY(-50%)',
                                background: 'linear-gradient(to left, rgba(255,255,255,0.9), rgba(167,139,250,0.5), transparent)',
                                mixBlendMode: 'screen',
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {effects.map((f) => (
                <div key={f.id}>
                    <Burst x={f.x} y={f.y} />
                    <motion.span
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: [0, 1, 1, 0], y: -18 }}
                        transition={{ duration: 0.9, ease: 'easeOut' }}
                        className="pointer-events-none absolute -translate-x-1/2 font-mono text-[10px] tracking-[0.2em] text-accent uppercase whitespace-nowrap"
                        style={{ left: f.x, top: f.y - 16 }}
                    >
                        +{f.count} star crushed
                    </motion.span>
                </div>
            ))}
        </div>
    );
}
