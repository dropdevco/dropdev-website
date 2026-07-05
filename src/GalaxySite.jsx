/*
 * Drop Dev — the home page: the galaxy scrollytelling journey.
 * (The shared galaxy background, nav, cursor, meteors, preloader, and footer
 * live in components/Layout.jsx and persist across routes.)
 */
import Hero from './sections/Hero';
import PlanetSection from './sections/PlanetSection';
import CapabilityCluster from './sections/CapabilityCluster';
import IndustriesBelt from './sections/IndustriesBelt';
import Arrival from './sections/Arrival';
import { planets } from './data/content';

export default function GalaxySite() {
    return (
        <>
            <Hero />
            {planets.map((planet, i) => (
                <PlanetSection key={planet.id} planet={planet} index={i} />
            ))}
            <CapabilityCluster />
            <IndustriesBelt />
            <Arrival />
        </>
    );
}
