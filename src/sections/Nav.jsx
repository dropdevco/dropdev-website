/*
 * Minimal instrument-panel nav: logo, a few anchor jumps, one understated
 * contact action. Hairline bottom border + blur once scrolled.
 */
import { useState, useEffect } from 'react';
import { contact } from '../data/content';
import { cn } from '../lib/utils';

const ANCHORS = [
    { href: '#vertical-ai', label: 'Focus Areas' },
    { href: '#capabilities', label: 'Capabilities' },
    { href: '#industries', label: 'Industries' },
];

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed inset-x-0 top-0 z-40 transition-all duration-500',
                scrolled
                    ? 'border-b border-hairline bg-space/60 backdrop-blur-md'
                    : 'border-b border-transparent bg-transparent'
            )}
        >
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <a href="#top" className="flex items-center gap-2.5">
                    <img src="/DropDev gradient (1).png" alt="Drop Dev — home" className="h-7 w-auto" />
                </a>

                <ul className="hidden items-center gap-8 md:flex">
                    {ANCHORS.map((a) => (
                        <li key={a.href}>
                            <a
                                href={a.href}
                                className="font-mono text-[11px] tracking-[0.2em] text-white/55 uppercase transition-colors hover:text-white"
                            >
                                {a.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <a
                    href={`mailto:${contact.email}`}
                    className="rounded-full border border-hairline px-4 py-2 font-mono text-[11px] tracking-[0.2em] text-white/70 uppercase transition-colors hover:border-hairline-accent hover:text-accent"
                >
                    Get in touch
                </a>
            </nav>
        </header>
    );
}
