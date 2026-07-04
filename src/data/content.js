// Real Drop Dev copy — carried over from the previous site (src/pages/Home.jsx)
// and reused verbatim per the redesign brief.

// The two focus-area "planets"
export const planets = [
    {
        id: 'vertical-ai',
        label: 'Focus Area 01',
        title: 'Vertical AI SaaS',
        hue: 0, // violet base palette of the orb shader
        accent: '#a78bfa',
        description:
            'Purpose-built AI solutions that understand industry-specific workflows, terminology, and compliance requirements.',
        moons: ['Domain Expertise', 'Workflow Integration', 'Compliance-Native'],
    },
    {
        id: 'marketplace',
        label: 'Focus Area 02',
        title: 'Community Marketplaces',
        hue: 60, // rotates the orb palette to blue-cyan/teal (YIQ rotation, computed)
        accent: '#4cc2e9',
        description:
            'Network-effect platforms that create value through community participation and data aggregation.',
        moons: ['Network Effects', 'Community Trust', 'Value Loops'],
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
    },
];

export const contact = {
    email: 'info@dropdev.co',
    phone: '+1 (915) 234-1444',
    linkedin: 'https://www.linkedin.com/company/dropdev/',
    location: 'El Paso, TX',
};
