/*
 * Arrival — the camera settles. One confident closing line and one
 * understated contact action (StarBorder comet-trail CTA inside a Magnetic
 * gravity well). The shared footer is rendered by Layout.
 */
import { contact } from '../data/content';
import StarBorder from '../components/ui/StarBorder';
import Magnetic from '../components/ui/Magnetic';
import ScrollRevealText from '../components/ui/ScrollRevealText';
import Reveal from '../components/ui/Reveal';

export default function Arrival() {
    return (
        <section id="contact" className="relative">
            <div className="mx-auto flex min-h-[90vh] max-w-4xl flex-col items-center justify-center px-6 py-32 text-center">
                <ScrollRevealText
                    as="h2"
                    className="mb-10 text-4xl leading-tight font-medium tracking-tight text-balance sm:text-6xl"
                >
                    You've reached the edge of the map. The rest, we build together.
                </ScrollRevealText>
                <Reveal delay={0.15}>
                    <Magnetic>
                        <StarBorder as="a" href={`mailto:${contact.email}`} speed="5s">
                            Get in touch
                        </StarBorder>
                    </Magnetic>
                </Reveal>
            </div>
        </section>
    );
}
