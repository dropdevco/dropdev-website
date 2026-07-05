/*
 * Shared shell for every route: the fixed galaxy background (driven by one
 * master scroll-progress value), the interactive meteor layer, the star
 * cursor, the scroll-progress line, nav, footer, and the first-load
 * "Preparing your experience" gate with its FPS quality probe.
 *
 * These mount ONCE — navigating between pages swaps only the <Outlet/>, so
 * the WebGL galaxy never re-initializes.
 */
import { useCallback, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'motion/react';
import Galaxy from './galaxy/Galaxy';
import StaticStars from './galaxy/StaticStars';
import Meteors from './galaxy/Meteors';
import Preloader from './Preloader';
import StarCursor from './StarCursor';
import Footer from './Footer';
import Nav from '../sections/Nav';

function supportsWebGL() {
    try {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    } catch {
        return false;
    }
}

export default function Layout() {
    const reduced = useReducedMotion();
    const [webgl] = useState(supportsWebGL);
    const [ready, setReady] = useState(false);
    const [quality, setQuality] = useState('high');
    const controls = useRef({ flight: 0, hue: 140 });

    const { scrollYProgress } = useScroll();

    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        controls.current.flight = v;
        controls.current.hue = 140 + v * 80; // violet drifting toward cyan
    });

    const handleReady = useCallback((tier) => {
        setQuality(tier);
        setReady(true);
    }, []);

    const animatedGalaxy = webgl && !reduced;

    return (
        <div id="top" className="relative min-h-screen bg-space text-white">
            {/* The galaxy — always present behind everything */}
            <div className="fixed inset-0 z-0" aria-hidden="true">
                {animatedGalaxy ? (
                    <Galaxy key={quality} controlsRef={controls} quality={quality} />
                ) : (
                    <StaticStars />
                )}
                {/* Soft vignette to keep content legible over the stars */}
                <div className="absolute inset-0 bg-radial from-transparent via-transparent to-space/80" />
            </div>

            {/* Interactive meteor layer (above content for clickability, never blocks scroll) */}
            <Meteors />

            {/* Star cursor (desktop precise pointers only) */}
            <StarCursor />

            {/* Scroll progress — thin violet flight-path line */}
            <motion.div
                style={{ scaleX: scrollYProgress }}
                className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-linear-to-r from-accent-deep to-cyan-planet"
                aria-hidden="true"
            />

            <Nav />

            <main className="relative z-10">
                <Outlet />
            </main>

            <Footer />

            <AnimatePresence>
                {!ready && <Preloader key="preloader" onReady={handleReady} />}
            </AnimatePresence>
        </div>
    );
}
