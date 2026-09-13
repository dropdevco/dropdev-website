/*
 * Drop Dev, the home page: the galaxy scrollytelling journey.
 * (The shared galaxy background, nav, cursor, meteors, preloader, and footer
 * live in components/Layout.jsx and persist across routes.)
 *
 * Order note: the industries solar system leads, immediately after the hero,
 * so the first thing a visitor scrolls into is the diagram.
 */
import Hero from './sections/Hero';
import IndustriesBelt from './sections/IndustriesBelt';
import PlanetSection from './sections/PlanetSection';
import Specialties from './sections/Specialties';
import Arrival from './sections/Arrival';
import { planets } from './data/content';

export default function GalaxySite() {
    return (
        <>
            <Hero />
            <IndustriesBelt />
            {planets.map((planet, i) => (
                <PlanetSection key={planet.id} planet={planet} index={i} />
            ))}
            <Specialties />
            <Arrival />
        </>
    );
}
