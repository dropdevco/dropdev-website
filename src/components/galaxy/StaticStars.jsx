/*
 * Calm Canvas2D starfield — the prefers-reduced-motion / no-WebGL fallback
 * for the animated Galaxy background. Draws once (and on resize); no
 * animation loop at all.
 */
import { useEffect, useRef } from 'react';

export default function StaticStars({ count = 380 }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        function draw() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.scale(dpr, dpr);
            ctx.clearRect(0, 0, w, h);

            // Deterministic pseudo-random so the sky doesn't reshuffle on resize
            let seed = 42;
            const rand = () => {
                seed = (seed * 16807) % 2147483647;
                return (seed - 1) / 2147483646;
            };

            for (let i = 0; i < count; i++) {
                const x = rand() * w;
                const y = rand() * h;
                const r = rand() * 1.4 + 0.2;
                const alpha = rand() * 0.7 + 0.15;
                // Mostly white, occasionally violet/cyan tinted
                const tint = rand();
                const color =
                    tint > 0.92 ? '167, 139, 250' : tint > 0.85 ? '76, 194, 233' : '255, 255, 255';
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${color}, ${alpha})`;
                ctx.fill();
            }
        }

        draw();
        window.addEventListener('resize', draw);
        return () => window.removeEventListener('resize', draw);
    }, [count]);

    return (
        <canvas
            ref={canvasRef}
            className="h-full w-full"
            aria-hidden="true"
        />
    );
}
