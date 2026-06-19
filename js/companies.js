/* Companies Database and Interview Structures */

const COMPANIES = {
  google: {
    id: "google",
    name: "Google",
    tagline: "Organize the world's information and make it universally accessible.",
    color: "linear-gradient(135deg, #4285F4, #34A853)",
    culture: {
      title: "Googliness & Algorithmic Excellence",
      desc: "Google values deep analytical capabilities, intellectual humility, and 'Googliness'—a mix of collaborative spirit, passion for learning, and doing the right thing.",
      principles: [
        "Thrive in Ambiguity: Navigating unclear situations and structuring solutions.",
        "Bias for User: Focus on user experience first; business metrics will follow.",
        "Intellectual Humility: Openness to feedback and admitting when you are wrong.",
        "Collaboration: Fostering inclusive and respectful team discussions."
      ]
    },
    reviews: [
      {
        source: "Glassdoor 2026",
        type: "Googliness & Leadership",
        review: "The G&L round is just as critical as coding. They asked a lot about handling ambiguity (e.g. what do you do when a project requirements change daily) and collaborative consensus building. Prepare versatile STAR stories!"
      },
      {
        source: "Reddit r/leetcode 2026",
        type: "Coding Loops",
        review: "Expect heavy focus on graph algorithms (DFS/BFS), binary trees, and Big-O complexity optimizations. You must write clean, dry code and talk through your memory trade-offs out loud."
      }
    ],
    rounds: {
      "software-engineer": [
        { title: "Online Assessment", type: "technical", desc: "60-minute coding challenges covering basic data structures, arrays, and string operations." },
        { title: "Technical Screen", type: "technical", desc: "1-on-1 coding interview focusing on algorithm design, runtime complexity (Big O), and edge cases." },
        { title: "Coding Loop 1", type: "technical", desc: "Deep dive into advanced algorithms, graphs, dynamic programming, or trees." },
        { title: "Coding Loop 2", type: "technical", desc: "Focuses on clean code writing, data structure selection, and unit testing." },
        { title: "System Design", type: "system-design", desc: "Design a large-scale system (e.g., Google Search indexer). Focuses on scaling, caching, and sharding." },
        { title: "Googliness & Leadership", type: "behavioral", desc: "Behavioral interview checking cultural alignment, diversity values, and handling conflict." }
      ],
      "product-manager": [
        { title: "Phone Screen", type: "behavioral", desc: "High-level screen of product sense, past achievements, and general alignment." },
        { title: "Product Design", type: "system-design", desc: "Design an innovative product from scratch. Evaluates user empathy, goal setting, and MVP prioritizing." },
        { title: "Analytical & Metrics", type: "technical", desc: "Define metrics for Google apps, troubleshoot metric drops, and design A/B tests." },
        { title: "Product Strategy", type: "system-design", desc: "Long-term product directions, competitive landscape planning, and market monetization." },
        { title: "Googliness & Leadership", type: "behavioral", desc: "Behavioral assessment focusing on leading without formal authority." }
      ],
      "ui-ux-designer": [
        { title: "Portfolio Review", type: "behavioral", desc: "Walkthrough of your best 2-3 case studies, focusing on user journeys and problem-solving." },
        { title: "Design Challenge", type: "system-design", desc: "Take-home or live design whiteboard challenge to solve a user flow problem." },
        { title: "Interaction Design", type: "technical", desc: "Deep dive into layout hierarchies, micro-interactions, and accessibility standards." },
        { title: "Googliness & Leadership", type: "behavioral", desc: "Assesses cross-functional collaboration and how you handle design critiques." }
      ],
      "data-analyst": [
        { title: "Technical Screen", type: "technical", desc: "Live SQL aggregation questions, CTEs, and basic data extraction." },
        { title: "Analytical Case Study", type: "system-design", desc: "Evaluate a product drop scenario, outline metrics, and draft recommendations." },
        { title: "Python/Stat Round", type: "technical", desc: "Coding in Pandas, plotting charts, and explaining A/B test significance." },
        { title: "Googliness & Leadership", type: "behavioral", desc: "Examines communication clarity and presenting findings to executive leads." }
      ]
    }
  },
  amazon: {
    id: "amazon",
    name: "Amazon",
    tagline: "Earth's most customer-centric company.",
    color: "linear-gradient(135deg, #FF9900, #146B93)",
    culture: {
      title: "16 Leadership Principles (LP)",
      desc: "Amazon uses its Leadership Principles every day, whether they're discussing ideas for new projects or deciding on the best approach to solve a problem.",
      principles: [
        "Customer Obsession: Leaders start with the customer and work backwards.",
        "Ownership: Act on behalf of the entire company, never say 'not my job'.",
        "Bias for Action: Speed matters in business. Many decisions are reversible.",
        "Deliver Results: Focus on key inputs and deliver them on time.",
        "Invent and Simplify: Look for new ideas from everywhere and simplify."
      ]
    },
    reviews: [
      {
        source: "Reddit r/ProductManager 2026",
        type: "Writing Assessment",
        review: "The 2-page writing assessment is a pass/fail screen. Treat it like a PRD narrative: state the problem clearly, outline option trade-offs, and show metric results. AI-generated text is easily spotted, write it yourself."
      },
      {
        source: "Glassdoor 2026",
        type: "Bar Raiser Loop",
        review: "The Bar Raiser round is intense. They will ask deep behavioral questions about Amazon's Leadership Principles. Always use the STAR framework and specify *your* direct actions rather than saying 'our team did X'."
      }
    ],
    rounds: {
      "software-engineer": [
        { title: "Online Assessment", type: "technical", desc: "Coding questions + work simulation survey focusing on Leadership Principles." },
        { title: "Technical Screen", type: "technical", desc: "Coding design question + 15 mins of behavioral Leadership Principle questions." },
        { title: "Coding & LP Loop", type: "technical", desc: "Coding round focusing on data structures and algorithms, heavily audited with LP stories." },
        { title: "System Design & LP", type: "system-design", desc: "Architecting scalable systems (e.g. Amazon Prime checkout) + LP assessment." },
        { title: "Bar Raiser Loop", type: "behavioral", desc: "Rigorous interview checking long-term potential, led by an independent Bar Raiser." }
      ],
      "product-manager": [
        { title: "Writing Assessment", type: "technical", desc: "Draft a 2-page Press Release or product narrative standard at Amazon." },
        { title: "Product Execution", type: "system-design", desc: "Prioritizing backlog items, dealing with delivery delays, and RICE scoring." },
        { title: "Customer Obsession", type: "behavioral", desc: "Deep behavioral questions focusing on how you advocate for the user." },
        { title: "Product Strategy & LP", type: "system-design", desc: "Pricing, launching new features, and scaling product lines." },
        { title: "Bar Raiser PM Loop", type: "behavioral", desc: "High-level review of strategic capability and Leadership Principles." }
      ],
      "ui-ux-designer": [
        { title: "Portfolio Presentation", type: "behavioral", desc: "Presenting user research and high-fidelity Figma components to a team." },
        { title: "Whiteboard Design", type: "system-design", desc: "Live wireframing of a logistics dashboard or customer app flow." },
        { title: "Interaction & LP", type: "technical", desc: "CSS grids, responsive components, and explaining LP alignment in your design process." },
        { title: "Bar Raiser UX Loop", type: "behavioral", desc: "Assesses design leadership and customer obsession values." }
      ],
      "data-analyst": [
        { title: "SQL & Analytics Screen", type: "technical", desc: "Live query writing, nested joins, and database troubleshooting." },
        { title: "Business Case Study", type: "system-design", desc: "Translate complex sales drop data into actionable recommendations." },
        { title: "Leadership Principles Loop", type: "behavioral", desc: "Providing STAR examples mapping to Ownership and Deliver Results." },
        { title: "Bar Raiser Data Loop", type: "behavioral", desc: "Reviews statistical rigor and data integrity presentation methods." }
      ]
    }
  },
  meta: {
    id: "meta",
    name: "Meta",
    tagline: "Give people the power to build community and bring the world closer together.",
    color: "linear-gradient(135deg, #0081FB, #0466C8)",
    culture: {
      title: "Move Fast & Build Social Value",
      desc: "Meta focuses on shipping code quickly, taking bold risks, and designing systems that connect billions of users globally.",
      principles: [
        "Move Fast: Eliminate friction, ship early, and iterate continuously.",
        "Be Bold: Take calculated risks; failing is okay if you learn quickly.",
        "Build Awesome Things: Aim for massive user satisfaction and scale.",
        "Live in the Future: Think about where the tech industry will be in 5 years."
      ]
    },
    reviews: [
      {
        source: "Glassdoor 2026",
        type: "Technical Screen",
        review: "You must solve two Leetcode medium questions in 45 minutes. Speed and optimal complexity are key. Discuss the Big-O time and space complexity immediately before coding."
      },
      {
        source: "Reddit r/cscareerquestions 2026",
        type: "System Design",
        review: "Meta system design focus is heavily on web scale. Be ready to discuss sharding, load balancers, caching, and rate limiters for apps like Messenger or Instagram Feed."
      }
    ],
    rounds: {
      "software-engineer": [
        { title: "Technical Screen", type: "technical", desc: "45 minutes, two medium-difficulty coding questions with strict speed expectations." },
        { title: "Coding Round 1", type: "technical", desc: "Highly focused on array/string algorithms and optimal Big-O complexity." },
        { title: "Coding Round 2", type: "technical", desc: "Focuses on tree/graph traversals and clean recursive execution." },
        { title: "System Design", type: "system-design", desc: "Design systems for massive concurrency (e.g., Messenger chat, News Feed)." },
        { title: "Behavioral Loop", type: "behavioral", desc: "Conflict resolution, self-direction, and interest in social technologies." }
      ],
      "product-manager": [
        { title: "Product Sense Screen", type: "system-design", desc: "Design consumer-facing apps or social features. Focus on execution speed." },
        { title: "Execution Round", type: "technical", desc: "Solving metric trade-offs, debugging user drop-offs, and running A/B tests." },
        { title: "Product Strategy", type: "system-design", desc: "Long-term vision for Meta's ecosystem (AR/VR, advertising, creator economy)." },
        { title: "Behavioral Loop", type: "behavioral", desc: "Managing stakeholder alignment and shipping products under pressure." }
      ],
      "ui-ux-designer": [
        { title: "Portfolio Presentation", type: "behavioral", desc: "Reviewing case studies, product value, and interaction structures." },
        { title: "Live Design App Walkthrough", type: "system-design", desc: "Critiquing existing popular application flows and proposing UI optimizations." },
        { title: "Whiteboard Challenge", type: "system-design", desc: "Collaboratively designing a new social community interface live." },
        { title: "Behavioral Fit", type: "behavioral", desc: "Reviewing cross-functional workflows and handling speed challenges." }
      ],
      "data-analyst": [
        { title: "Technical SQL Screen", type: "technical", desc: "SQL window functions, aggregation, and performance optimization." },
        { title: "Product Analytics Loop", type: "system-design", desc: "Determining tracking events for a new Meta feature and defining KPIs." },
        { title: "Statistical Modeling", type: "technical", desc: "Python coding for data analysis, regressions, and user segmentation." },
        { title: "Behavioral Loop", type: "behavioral", desc: "Handling data ambiguity and delivering reports under tight deadlines." }
      ]
    }
  },
  netflix: {
    id: "netflix",
    name: "Netflix",
    tagline: "Entertain the world.",
    color: "linear-gradient(135deg, #E50914, #801015)",
    culture: {
      title: "Freedom & Responsibility",
      desc: "Netflix operates with a high-performance culture, hiring 'stunning colleagues' and prioritizing context over control.",
      principles: [
        "Context, Not Control: Leaders provide the strategic context; team decides execution.",
        "Keeper Test: Managers ask: 'If this person was leaving, would I fight to keep them?'",
        "Highly Aligned, Loosely Coupled: Work with trust and shared vision.",
        "Absolute Candor: Give respectful, direct feedback immediately."
      ]
    },
    reviews: [
      {
        source: "Glassdoor 2026",
        type: "Culture Loops",
        review: "They take the Freedom & Responsibility memo very seriously. Be prepared for behavioral prompts asking how you handle constructive candor, or how you operate independently under strategic context."
      },
      {
        source: "Reddit r/leetcode 2026",
        type: "Backend / Infra Loop",
        review: "Infra interviews ask a lot about TCP/UDP protocols, CDN caching, and scaling global distributed microservices. High expectation of network-level understanding."
      }
    ],
    rounds: {
      "software-engineer": [
        { title: "Technical Screening", type: "technical", desc: "Coding and system discussion focusing on backend infrastructure or frontend layouts." },
        { title: "Coding & Complexity", type: "technical", desc: "Algorithmic loops focusing on concurrency and memory management." },
        { title: "Pragmatic System Design", type: "system-design", desc: "Design streaming protocols, global video caches, or CDN distributions." },
        { title: "Culture Fit Part 1", type: "behavioral", desc: "Deep dive into Netflix's Freedom & Responsibility culture memo." },
        { title: "Culture Fit Part 2", type: "behavioral", desc: "Assesses feedback styles, self-management, and high-performance alignment." }
      ],
      "product-manager": [
        { title: "Product Strategy Screen", type: "system-design", desc: "Evaluate subscription economics, streaming strategies, and international growth." },
        { title: "Data & Personalization", type: "technical", desc: "Managing recommendation algorithms, catalog tags, and A/B test funnels." },
        { title: "Cross-Functional Round", type: "behavioral", desc: "Aligning creative directors, actors, and engineers on product timelines." },
        { title: "Culture Loop", type: "behavioral", desc: "Audits candor values and handling the 'Keeper Test' environment." }
      ],
      "ui-ux-designer": [
        { title: "Portfolio Presentation", type: "behavioral", desc: "Walkthrough of streaming dashboard mockups and visual layouts." },
        { title: "Visual Design Challenge", type: "system-design", desc: "Designing responsive interfaces for smart TVs, mobile apps, and laptops." },
        { title: "Interactive Design Loop", type: "technical", desc: "Figma tokens, design library scaling, and video player micro-interactions." },
        { title: "Culture Fit Loop", type: "behavioral", desc: "Assesses collaborative transparency and candor traits." }
      ],
      "data-analyst": [
        { title: "Technical Screen", type: "technical", desc: "SQL queries, window partitions, and optimizing cloud data access." },
        { title: "Content/User Analytics Case", type: "system-design", desc: "Evaluate user drops during onboarding or suggest TV show licensing bid values." },
        { title: "Python & Machine Learning", type: "technical", desc: "Predictive models, cleaning mess data, and automating pipelines." },
        { title: "Culture Fit Loop", type: "behavioral", desc: "Handling context-not-control scenarios and high independence." }
      ]
    }
  },
  stripe: {
    id: "stripe",
    name: "Stripe",
    tagline: "Increase the GDP of the internet.",
    color: "linear-gradient(135deg, #635BFF, #00D4B2)",
    culture: {
      title: "Pragmatism & Developer Experience",
      desc: "Stripe builds infrastructure for global commerce. They value clean documentation, robust API design, and highly pragmatic coding skills.",
      principles: [
        "First Principles Thinking: Dig deep to understand the fundamental laws of a problem.",
        "Pragmatic Engineering: Build working code with tests, avoiding over-engineering.",
        "Obsess Over Integration: APIs must be beautiful, readable, and highly secure.",
        "Write It Down: Stripe has a massive writing and documentation culture."
      ]
    },
    reviews: [
      {
        source: "Glassdoor 2026",
        type: "Bug Squash Round",
        review: "Extremely practical. You clone a codebase, find failing tests, and write clean code to fix it. Focus on stack traces and reading relevant files rather than guessing solutions."
      },
      {
        source: "Reddit r/leetcode 2026",
        type: "Integration Round",
        review: "This is all about parsing files, calling APIs, and handling edge cases (like rate limits and network errors). Emphasize code readability and modular correctness over speed hacks."
      }
    ],
    rounds: {
      "software-engineer": [
        { title: "Technical Screen", type: "technical", desc: "Write a utility function (e.g. JSON parser or rate limiter) with test cases." },
        { title: "Bug Squash Round", type: "technical", desc: "Fix bugs and add features to a real open-source style repository in your IDE." },
        { title: "Integration Round", type: "technical", desc: "Consume an HTTP API, map payloads, and write a working server script." },
        { title: "System Design", type: "system-design", desc: "Design a ledger system or payment processor, focusing on atomicity and database transactions." },
        { title: "Culture & Collaboration", type: "behavioral", desc: "Discussing coding trade-offs, developer empathy, and writing clarity." }
      ],
      "product-manager": [
        { title: "API Design & Strategy", type: "technical", desc: "Draft API endpoints for a new financial product and write developer specifications." },
        { title: "Product Execution", type: "system-design", desc: "Prioritizing financial features, resolving regulatory bottlenecks, and setting roadmap dates." },
        { title: "Developer Empathy", type: "behavioral", desc: "Deep behavioral questions focusing on how you support developer ecosystems." },
        { title: "GTM & Finance Strategy", type: "system-design", desc: "Monetization schemes, card transaction costs, and global expansion strategy." },
        { title: "Culture Fit", type: "behavioral", desc: "Evaluating written clarity, collaboration, and first-principles thinking." }
      ],
      "ui-ux-designer": [
        { title: "Portfolio Presentation", type: "behavioral", desc: "Reviewing payment checkout designs and merchant admin dashboards." },
        { title: "App Whiteboard Design", type: "system-design", desc: "Designing user billing management tables or developer dashboard flows." },
        { title: "Developer Handoff Loop", type: "technical", desc: "Translating design tokens, visual spacing grids, and CSS flex rules." },
        { title: "Culture Fit Loop", type: "behavioral", desc: "Assesses collaboration values and merchant-facing design empathy." }
      ],
      "ui-ux-designer": [
        { title: "Portfolio Presentation", type: "behavioral", desc: "Reviewing payment checkout designs and merchant admin dashboards." },
        { title: "App Whiteboard Design", type: "system-design", desc: "Designing user billing management tables or developer dashboard flows." },
        { title: "Developer Handoff Loop", type: "technical", desc: "Translating design tokens, visual spacing grids, and CSS flex rules." },
        { title: "Culture Fit Loop", type: "behavioral", desc: "Assesses collaboration values and merchant-facing design empathy." }
      ],
      "data-analyst": [
        { title: "SQL Screen", type: "technical", desc: "Complex financial aggregations, transaction tracking, and subqueries." },
        { title: "Risk & Fraud Case Study", type: "system-design", desc: "Analyze transaction chargeback data, isolate risk anomalies, and report findings." },
        { title: "Data Pipelines Loop", type: "technical", desc: "Python coding for parsing API logs and importing data warehouse pipelines." },
        { title: "Culture Fit Loop", type: "behavioral", desc: "Evaluates writing clarity and communication of complex risk trends." }
      ]
    }
  }
};
