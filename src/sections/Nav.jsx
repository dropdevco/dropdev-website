/*
 * Top banner: logo mark + DropDev wordmark, three anchor jumps, About, and a
 * Get in Touch button that scrolls to the contact block (a mailto: link is
 * silently dead on any machine without a mail client configured, which is why
 * the old one appeared broken).
 *
 * The band always paints its own lifted surface (--color-banner) rather than
 * sitting transparent over the black galaxy, so the logo has something to
 * stand on. Anchors route through "/#section" so they work from any page
 * (ScrollToAnchor handles the scroll after navigation).
 */
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

const LINKS = [
    { to: '/#specialties', label: 'Specialties' },
    { to: '/#industries', label: 'Industries' },
    { to: '/about', label: 'About' },
];

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
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
                'fixed inset-x-0 top-0 z-40 border-b transition-colors duration-500',
                'bg-banner/85 backdrop-blur-xl',
                scrolled ? 'border-hairline bg-banner/95' : 'border-white/8'
            )}
        >
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:py-6">
                {/* Logo mark + wordmark. The mark sits on a soft violet plate so
                    its dark blue lower half does not disappear into the band. */}
                <Link to="/" className="group flex items-center gap-3" aria-label="Drop Dev, home">
                    <span className="relative flex items-center justify-center">
                        <span
                            aria-hidden="true"
                            className="absolute -inset-2 rounded-full bg-accent/20 blur-lg transition-opacity duration-300 group-hover:bg-accent/30"
                        />
                        <img
                            src="/DropDev gradient (1).png"
                            alt=""
                            className="relative h-11 w-auto sm:h-12"
                        />
                    </span>
                    <span className="text-xl font-medium tracking-tight text-white sm:text-2xl">
                        DropDev
                    </span>
                </Link>

                <div className="flex items-center gap-3 sm:gap-6">
                    <ul className="hidden items-center gap-8 md:flex">
                        {LINKS.map((l) => (
                            <li key={l.to}>
                                <Link
                                    to={l.to}
                                    className={cn(
                                        'font-mono text-sm tracking-[0.12em] uppercase transition-colors hover:text-white',
                                        l.to === pathname ? 'text-accent' : 'text-white/75'
                                    )}
                                >
                                    {l.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <Link
                        to="/#contact"
                        onClick={() => setOpen(false)}
                        className="rounded-full border border-hairline-accent bg-accent/10 px-5 py-2.5 font-mono text-sm tracking-[0.12em] text-accent uppercase transition-colors hover:bg-accent/20 hover:text-white"
                    >
                        Get in Touch
                    </Link>

                    {/* Mobile menu toggle */}
                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        aria-expanded={open}
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-white/80 md:hidden"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            aria-hidden="true"
                            className="h-5 w-5"
                        >
                            {open ? (
                                <path d="M6 6l12 12M18 6L6 18" />
                            ) : (
                                <path d="M4 8h16M4 16h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>

            {open && (
                <ul className="border-t border-hairline bg-banner/95 px-6 pb-6 md:hidden">
                    {LINKS.map((l) => (
                        <li key={l.to}>
                            <Link
                                to={l.to}
                                onClick={() => setOpen(false)}
                                className="block border-b border-hairline py-4 font-mono text-base tracking-[0.12em] text-white/85 uppercase last:border-b-0"
                            >
                                {l.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </header>
    );
}
