/*
 * Minimal instrument-panel nav: logo, a few anchor jumps, the About page, and
 * one understated contact action. Hairline bottom border + blur once
 * scrolled. Anchors route through "/#section" so they work from any page
 * (ScrollToAnchor handles the scroll after navigation).
 */
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { contact } from '../data/content';
import { cn } from '../lib/utils';

const LINKS = [
    { to: '/#vertical-ai', label: 'Focus Areas' },
    { to: '/#capabilities', label: 'Capabilities' },
    { to: '/#industries', label: 'Industries' },
    { to: '/about', label: 'About' },
];

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const { pathname } = useLocation();

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
                <Link to="/" className="flex items-center gap-2.5">
                    <img src="/DropDev gradient (1).png" alt="Drop Dev — home" className="h-7 w-auto" />
                </Link>

                <ul className="hidden items-center gap-8 md:flex">
                    {LINKS.map((l) => (
                        <li key={l.to}>
                            <Link
                                to={l.to}
                                className={cn(
                                    'font-mono text-[11px] tracking-[0.2em] uppercase transition-colors hover:text-white',
                                    l.to === pathname ? 'text-accent' : 'text-white/55'
                                )}
                            >
                                {l.label}
                            </Link>
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
