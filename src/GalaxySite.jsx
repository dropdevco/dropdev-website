/*
 * Drop Dev — the galaxy scrollytelling site.
 *
 * One master scroll-progress value (0→1 over the whole page) is the source of
 * truth for the camera. It is written imperatively into `controls` (a mutable
 * ref read by the WebGL render loop every frame):
 *   flight — page progress: advances the star layers (gliding through space)
 *   hue    — drifts star color deeper into violet→cyan as you travel
 *
 * A preloader gates the first paint and picks a quality tier from an FPS probe.
 * prefers-reduced-motion (or missing WebGL) swaps the animated galaxy for a
 * calm static starfield and disables all camera transforms downstream.
 */
import { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'motion/react';
import Galaxy from './components/galaxy/Galaxy';
import StaticStars from './components/galaxy/StaticStars';
import Meteors from './components/galaxy/Meteors';
import Preloader from './components/Preloader';
import Nav from './sections/Nav';
import Hero from './sections/Hero';
import PlanetSection from './sections/PlanetSection';
import CapabilityCluster from './sections/CapabilityCluster';
import IndustriesBelt from './sections/IndustriesBelt';
import Arrival from './sections/Arrival';
import { planets } from './data/content';

function supportsWebGL() {
    try {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    } catch {
        return false;
    }
}

export default function GalaxySite() {
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

            {/* Scroll progress — thin violet flight-path line */}
            <motion.div
                style={{ scaleX: scrollYProgress }}
                className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-linear-to-r from-accent-deep to-cyan-planet"
                aria-hidden="true"
            />

            <Nav />

            <main className="relative z-10">
                <Hero />
                {planets.map((planet, i) => (
                    <PlanetSection key={planet.id} planet={planet} index={i} />
                ))}
                <CapabilityCluster />
                <IndustriesBelt />
                <Arrival />
            </main>

            <AnimatePresence>
                {!ready && <Preloader key="preloader" onReady={handleReady} />}
            </AnimatePresence>
        </div>
    );
}
