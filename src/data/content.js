// All Drop Dev site copy lives here.
//
// Writing rules for this file (client feedback, 2026-08):
//   - Plain words. If a normal person would not say it out loud, rewrite it.
//   - No em dashes. Use a comma, a period, or "and".
//   - Short. One idea per sentence.

// The two things we build. Each gets a "planet" stop on the scroll journey.
export const planets = [
    {
        id: 'vertical-ai',
        kicker: 'What we build',
        title: 'AI Built For Your Industry',
        hue: 0, // violet base palette of the orb shader
        accent: '#c4b5fd',
        description:
            'AI that already knows how your business works, instead of a generic chatbot bolted on the side.',
        moons: [
            {
                label: 'Trained on your field',
                meaning: 'We train on your real documents and your real terms, not the open internet.',
            },
            {
                label: 'Works with your tools',
                meaning: 'It fits the software your team already uses. Nothing gets ripped out.',
            },
            {
                label: 'Built to your rules',
                meaning: 'HIPAA, SOC 2, and your own policies are handled from day one.',
            },
        ],
    },
    {
        id: 'marketplace',
        kicker: 'What we build',
        title: 'Community Marketplaces',
        hue: 60, // rotates the orb palette to blue-cyan/teal (YIQ rotation, computed)
        accent: '#7dd3fc',
        description:
            'A platform that gets more useful every time someone new joins, and keeps a whole community in one place.',
        moons: [
            {
                label: 'More people, more value',
                meaning: 'Every new member makes the platform better for everyone already there.',
            },
            {
                label: 'Trust built in',
                meaning: 'Reviews, ratings, and verification, so strangers feel safe doing business.',
            },
            {
                label: 'Smarter over time',
                meaning: 'Every match and every sale teaches the platform to do the next one better.',
            },
        ],
    },
];

// The four things we are best at. Shown in the "Specialties" section.
export const specialties = [
    {
        id: 'ocr',
        title: 'Reading Your Documents',
        description:
            'We pull clean, usable data out of your paperwork. Records, contracts, invoices, forms. Thousands at a time.',
        color: '#c4b5fd',
    },
    {
        id: 'rag',
        title: 'AI That Knows Your Business',
        description:
            'AI that answers from your own files and records, so you get real answers instead of made up ones.',
        color: '#7dd3fc',
    },
    {
        id: 'local-rag',
        title: 'Private AI On Your Servers',
        description:
            'The same AI search, running inside your own network. Your data never leaves the building.',
        color: '#6ee7b7',
    },
    {
        id: 'local-ai',
        title: 'AI You Actually Own',
        description:
            'We set up open AI models on your own hardware. No monthly usage bills, and no getting locked in.',
        color: '#f5b8ff',
    },
];

// The industries we work in. One short line each, nothing more.
export const industries = [
    {
        id: 1,
        name: 'Healthcare',
        howWeHelp:
            'We handle the paperwork clinicians hate, and keep patient data inside your own network.',
    },
    {
        id: 2,
        name: 'Legal',
        howWeHelp:
            'We read contracts and case files for you, and show you the exact page every answer came from.',
    },
    {
        id: 3,
        name: 'Real Estate',
        howWeHelp:
            'We price properties, speed up due diligence, and connect buyers and sellers in one place.',
    },
    {
        id: 4,
        name: 'Finance',
        howWeHelp:
            'We spot risk and fraud, and keep the compliance work running on your own servers.',
    },
    {
        id: 5,
        name: 'Education',
        howWeHelp:
            'We build lessons that adapt to each student, and connect what they learn to real jobs.',
    },
    {
        id: 6,
        name: 'Logistics',
        howWeHelp:
            'We forecast demand and plan better routes, using the data you already collect every day.',
    },
];

export const contact = {
    email: 'info@dropdev.co',
    phone: '+1 (915) 234-1444',
    location: 'El Paso, TX',
};

// Social profiles shown in the footer. Add a line here to add an icon.
// `icon` maps to a key in components/SocialIcon.jsx.
export const socials = [
    {
        id: 'linkedin',
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/company/dropdev/',
        icon: 'linkedin',
    },
];
