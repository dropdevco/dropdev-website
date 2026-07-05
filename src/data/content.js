// Real Drop Dev copy — carried over from the previous site (src/pages/Home.jsx)
// and reused verbatim per the redesign brief.

// The two focus-area "planets". Moons carry a plain-language label plus a
// one-sentence meaning surfaced on hover/tap.
export const planets = [
    {
        id: 'vertical-ai',
        kicker: 'A world we build',
        title: 'Vertical AI SaaS',
        hue: 0, // violet base palette of the orb shader
        accent: '#a78bfa',
        description:
            'Purpose-built AI that speaks your industry — its workflows, its language, its rules — instead of a generic model bolted on.',
        moons: [
            {
                label: 'Domain-trained',
                meaning: 'Models tuned on your field’s real documents and terminology, not the open web.',
            },
            {
                label: 'Fits your workflow',
                meaning: 'Drops into the tools your team already uses — no rip-and-replace.',
            },
            {
                label: 'Compliant by design',
                meaning: 'Built to meet HIPAA, SOC 2, and industry rules from day one, not patched in later.',
            },
        ],
    },
    {
        id: 'marketplace',
        kicker: 'A world we build',
        title: 'Community Marketplaces',
        hue: 60, // rotates the orb palette to blue-cyan/teal (YIQ rotation, computed)
        accent: '#4cc2e9',
        description:
            'Platforms that get more valuable as more people join — connecting a community and compounding on its own data.',
        moons: [
            {
                label: 'Network effects',
                meaning: 'Every new participant makes the platform more useful for everyone already on it.',
            },
            {
                label: 'Earned trust',
                meaning: 'Reputation, reviews, and verification that make strangers comfortable transacting.',
            },
            {
                label: 'Compounding data',
                meaning: 'Each interaction sharpens matching and pricing — an advantage rivals can’t buy.',
            },
        ],
    },
];

// The four core AI capabilities — the "engine room" constellation
export const capabilities = [
    {
        id: 'ocr',
        icon: '🔍',
        title: 'OCR & Document Intelligence',
        description:
            'Extract structured data from any document—medical records, contracts, invoices—with near-human accuracy at scale.',
        color: '#a78bfa',
    },
    {
        id: 'rag',
        icon: '🧠',
        title: 'RAG Systems',
        description:
            'Retrieval-Augmented Generation that grounds AI answers in your proprietary data, eliminating hallucinations and increasing trust.',
        color: '#4cc2e9',
    },
    {
        id: 'local-rag',
        icon: '🔒',
        title: 'Local RAG (On-Premise)',
        description:
            'Full RAG pipelines that run inside your network—zero data leaves your infrastructure. Ideal for healthcare, legal, and finance.',
        color: '#34d399',
    },
    {
        id: 'local-ai',
        icon: '⚡',
        title: 'Local AI Inference',
        description:
            'Deploy open-source LLMs (Llama, Mistral, Gemma) on your own hardware. Complete data sovereignty, no API costs, no lock-in.',
        color: '#f0abfc',
    },
];

// The industries orbit — Healthcare listed first per strategy
export const industries = [
    {
        id: 1,
        name: 'Healthcare',
        icon: '🏥',
        problemSpace:
            'Fragmented patient data, inefficient administrative workflows, and lack of personalized care coordination across provider networks.',
        aiOpportunity:
            'AI-driven diagnostics, predictive patient outcomes, automated clinical documentation, and intelligent care pathway optimization.',
        whyItWins:
            'Regulatory moats, high switching costs, and network effects from aggregated health data create defensible positions.',
        howWeHelp:
            'We build HIPAA-ready document pipelines and on-prem RAG so clinical data never leaves your network — and automate the paperwork clinicians dread.',
    },
    {
        id: 2,
        name: 'Legal',
        icon: '⚖️',
        problemSpace:
            'Time-intensive document review, inconsistent contract analysis, and limited access to legal services for SMBs and individuals.',
        aiOpportunity:
            'Automated contract analysis, legal research acceleration, compliance monitoring, and predictive case outcome modeling.',
        whyItWins:
            'Trust-based relationships, regulatory requirements, and accumulated case knowledge create sustainable competitive advantages.',
        howWeHelp:
            'We deploy contract-analysis and legal-research assistants grounded in your own case files, with full citation traceability.',
    },
    {
        id: 3,
        name: 'Real Estate',
        icon: '🏢',
        problemSpace:
            'Opaque transaction processes, fragmented property data, and inefficient matching between buyers, sellers, and properties.',
        aiOpportunity:
            'Intelligent property valuation, predictive market analytics, automated due diligence, and personalized investment recommendations.',
        whyItWins:
            'Transaction data network effects, established trust, and integration with financial systems create strong barriers to entry.',
        howWeHelp:
            'We build valuation and due-diligence models, plus marketplace platforms that connect every party in a transaction.',
    },
    {
        id: 4,
        name: 'Finance',
        icon: '💰',
        problemSpace:
            'Complex compliance requirements, manual underwriting processes, and limited access to sophisticated financial tools for small businesses.',
        aiOpportunity:
            'AI-powered risk assessment, automated compliance monitoring, intelligent fraud detection, and personalized financial planning.',
        whyItWins:
            'Regulatory moats, trust requirements, and financial data aggregation create winner-take-most dynamics.',
        howWeHelp:
            'We build risk, fraud, and compliance systems that run locally, so sensitive financial data stays inside your walls.',
    },
    {
        id: 5,
        name: 'Education',
        icon: '📚',
        problemSpace:
            'One-size-fits-all curriculum, limited personalization, and disconnect between education outcomes and workforce needs.',
        aiOpportunity:
            'Adaptive learning paths, intelligent tutoring systems, automated assessment, and skills gap analysis with career mapping.',
        whyItWins:
            'Learning data network effects, credentialing moats, and employer integration create defensible ecosystem value.',
        howWeHelp:
            'We build adaptive-learning engines and skills-mapping platforms that link learners, educators, and employers.',
    },
    {
        id: 6,
        name: 'Logistics',
        icon: '🚚',
        problemSpace:
            'Fragmented supply chains, unpredictable demand patterns, and inefficient last-mile delivery operations.',
        aiOpportunity:
            'Demand forecasting, route optimization, predictive maintenance, and autonomous operations coordination.',
        whyItWins:
            'Operational data advantages, geographic network effects, and integration complexity create sustainable moats.',
        howWeHelp:
            'We build demand-forecasting and route-optimization systems that turn your operational data into a durable advantage.',
    },
];

export const contact = {
    email: 'info@dropdev.co',
    phone: '+1 (915) 234-1444',
    linkedin: 'https://www.linkedin.com/company/dropdev/',
    location: 'El Paso, TX',
};
