/*
 * Thin line social glyphs for the footer. Light strokes to match the rest of
 * the instrument chrome. Add a new key here plus a line in content.js
 * `socials` to add a network.
 */

const PATHS = {
    linkedin: (
        <>
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <path d="M7.5 10.5v6M7.5 7.6v.01M11.5 16.5v-6M11.5 13.2c0-1.5 1-2.7 2.5-2.7s2.5 1 2.5 2.7v3.3" />
        </>
    ),
    x: <path d="M4 4l7.6 9.6L4.4 20M20 4l-7.4 8.2M9.6 4H4l16 16h-5.6" />,
    instagram: (
        <>
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <path d="M17.2 6.8v.01" />
        </>
    ),
    github: (
        <path d="M9 19c-4 1.3-4-2.2-5.6-2.7M15 21v-3.4a3 3 0 00-.8-2.3c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 00-1.3-3.2 4.3 4.3 0 00-.1-3.2s-1-.3-3.4 1.3a11.7 11.7 0 00-6.2 0C6.3 2.6 5.3 2.9 5.3 2.9a4.3 4.3 0 00-.1 3.2A4.6 4.6 0 003.9 9.3c0 4.7 2.8 5.7 5.5 6a3 3 0 00-.8 2.3V21" />
    ),
    youtube: (
        <>
            <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
            <path d="M10.2 9.4l5 2.6-5 2.6z" />
        </>
    ),
    facebook: <path d="M14.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6A22 22 0 0015.3 3.5c-2.4 0-4 1.45-4 4.12V9.9H8.6V13h2.7v8z" />,
};

export default function SocialIcon({ name, className = 'h-5 w-5' }) {
    const path = PATHS[name];
    if (!path) return null;
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={className}
        >
            {path}
        </svg>
    );
}
