/* Career Roadmap Datasets and Renderer */

const ROADMAPS = {
  "software-engineer": [
    {
      id: "se-1",
      title: "JavaScript Mechanics & Frontend Basics",
      category: "Foundation",
      desc: "Master core web capabilities: semantic HTML, modern layout (CSS Grid/Flexbox), JavaScript closures, promises, asynchronous execution, and standard DOM manipulation.",
      checklist: [
        "Master CSS Flexbox and Grid layouts",
        "Understand closures, execution context, and event loops in JS",
        "Implement asynchronous operations with Promises and async/await",
        "Build a project utilizing fetch/axios and handling dynamic API responses"
      ],
      resources: [
        { title: "MDN Web Docs: JavaScript Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", type: "article" },
        { title: "JavaScript Info - Detailed Tutorial", url: "https://javascript.info/", type: "interactive" },
        { title: "JS Event Loop Visualized", url: "https://www.youtube.com/watch?v=8aGhZQkoFbQ", type: "video" }
      ]
    },
    {
      id: "se-2",
      title: "Frontend Frameworks (React/Next.js)",
      category: "Core Skills",
      desc: "Learn to build reactive single-page applications. Master component lifecycle, state management, routing, hooks, performance optimizations (useMemo/useCallback), and layout structures.",
      checklist: [
        "Learn React rendering phases and state vs props rules",
        "Implement custom hooks for reusable UI logic",
        "Learn Next.js page router/app router and Server-Side Rendering (SSR)",
        "Optimize component performance (memoization, lazy loading)"
      ],
      resources: [
        { title: "Official React Documentation", url: "https://react.dev/", type: "article" },
        { title: "Next.js Learning Course", url: "https://nextjs.org/learn", type: "interactive" },
        { title: "React State Management Deep Dive", url: "https://www.youtube.com/watch?v=-yIsQPp31L0", type: "video" }
      ]
    },
    {
      id: "se-3",
      title: "Backend API Design & Databases",
      category: "Core Skills",
      desc: "Understand sever-side engineering. Build scalable RESTful APIs, design relational (PostgreSQL) and non-relational (MongoDB) database schemas, and manage authentication.",
      checklist: [
        "Create structured Node.js/Express or Python/FastAPI servers",
        "Design SQL schemas with appropriate keys and joins",
        "Configure JWT authentication and secure session cookies",
        "Implement basic database indexing and query optimizations"
      ],
      resources: [
        { title: "PostgreSQL Tutorial for Beginners", url: "https://www.postgresqltutorial.com/", type: "article" },
        { title: "Designing Data-Intensive Applications", url: "https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/", type: "book" }
      ]
    },
    {
      id: "se-4",
      title: "System Design & Distributed Scaling",
      category: "Advanced",
      desc: "Master scaling architectures to millions of users. Study load balancers, caching layers (Redis), messaging queues, data replication, and rate limiters.",
      checklist: [
        "Understand vertical vs horizontal scaling and load balancing",
        "Implement server-side caching strategies with Redis",
        "Design message-queue asynchronous workflows (Kafka/RabbitMQ)",
        "Delineate microservices architectures and database replication"
      ],
      resources: [
        { title: "System Design Primer (GitHub)", url: "https://github.com/donnemartin/system-design-primer", type: "article" },
        { title: "ByteByteGo System Design Basics", url: "https://bytebytego.com/", type: "interactive" }
      ]
    },
    {
      id: "se-5",
      title: "CI/CD, Cloud Deployment & Security",
      category: "Specialized",
      desc: "Deploy applications securely to production. Set up automated continuous integration and delivery pipelines, cloud servers (AWS/GCP), and SSL/OAuth configurations.",
      checklist: [
        "Write Dockerfiles to containerize applications",
        "Configure automated pipelines using GitHub Actions or GitLab CI",
        "Deploy containerized apps onto AWS ECS or Kubernetes",
        "Implement HTTPS, secure CORS origins, and OWASP top-10 security patches"
      ],
      resources: [
        { title: "Docker Curriculum: Get Started", url: "https://docker-curriculum.com/", type: "interactive" },
        { title: "AWS Cloud Practitioner Essentials", url: "https://aws.amazon.com/training/course-descriptions/cloud-practitioner-essentials/", type: "video" }
      ]
    }
  ],
  "product-manager": [
    {
      id: "pm-1",
      title: "Product Fundamentals & Discovery",
      category: "Foundation",
      desc: "Learn to identify user needs. Conduct user interviews, research market segments, perform competitive analysis, and validate product hypotheses.",
      checklist: [
        "Conduct 5+ structured user interviews and map user journeys",
        "Perform a competitive landscape matrix analysis",
        "Define clear problem statements using job-to-be-done (JTBD) syntax",
        "Draft a simple MVP validation experiment sheet"
      ],
      resources: [
        { title: "Inspired: How to Create Tech Products (Marty Cagan)", url: "https://www.svpg.com/books/inspired-how-to-create-tech-products-customers-love-2nd-edition/", type: "book" },
        { title: "User Interviewing Guide by NN/g", url: "https://www.nngroup.com/articles/user-interviews/", type: "article" }
      ]
    },
    {
      id: "pm-2",
      title: "Writing PRDs & User Stories",
      category: "Core Skills",
      desc: "Define feature requirements. Write structured Product Requirement Documents (PRDs), construct user stories with acceptance criteria, and map out releases.",
      checklist: [
        "Write a complete PRD outlining goals, target metrics, and out-of-scope items",
        "Draft user stories with clear 'Given-When-Then' acceptance criteria",
        "Map a visual user story backlog from launch to secondary phases",
        "Perform estimation sizing calls with engineering and design leads"
      ],
      resources: [
        { title: "How to Write a PRD (Product School)", url: "https://productschool.com/blog/product-management-2/write-prd-templates", type: "article" },
        { title: "User Story Mapping Guide", url: "https://www.jpattonassociates.com/user-story-mapping/", type: "book" }
      ]
    },
    {
      id: "pm-3",
      title: "Agile Development & Stakeholder Alignment",
      category: "Core Skills",
      desc: "Lead cross-functional sprints. Understand Scrum frameworks, run planning sessions, manage roadmap trade-offs, and align executives.",
      checklist: [
        "Moderate scrum sprint planning, stand-ups, and retrospectives",
        "Perform backlog grooming and resolve task dependencies",
        "Draft a stakeholder communication matrix and roadmap deck",
        "Establish trade-off decisions using RICE prioritization scorecards"
      ],
      resources: [
        { title: "Scrum Guide Official", url: "https://scrumguides.org/scrum-guide.html", type: "article" },
        { title: "Product Backlog Prioritization (RICE)", url: "https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/", type: "article" }
      ]
    },
    {
      id: "pm-4",
      title: "Product Analytics, Metrics & A/B Testing",
      category: "Advanced",
      desc: "Become data-driven. Define North Star metrics, measure activation and retention funnels, and design A/B validation tests.",
      checklist: [
        "Map out AARRR (Pirate) metrics for an app activation funnel",
        "Set up an event tracking schema for product analytics (Amplitude/Mixpanel)",
        "Design a statistically sound A/B experiment outline",
        "Analyze cohort analysis charts to identify product friction areas"
      ],
      resources: [
        { title: "Amplitude: Product Analytics Playbook", url: "https://amplitude.com/mastering-retention", type: "book" },
        { title: "Optimizely: Guide to A/B Testing", url: "https://www.optimizely.com/optimization-glossary/ab-testing/", type: "article" }
      ]
    },
    {
      id: "pm-5",
      title: "Product Strategy & Go-To-Market (GTM)",
      category: "Specialized",
      desc: "Master long-term strategy and monetization. Define pricing models, position features, and design launch materials.",
      checklist: [
        "Formulate a 1-year product vision statement and strategic milestones",
        "Draft a Go-To-Market (GTM) launch plan with marketing partners",
        "Analyze monetization strategies (SaaS pricing tiers, ad structures)",
        "Present a quarterly business review (QBR) deck with business cases"
      ],
      resources: [
        { title: "Good Strategy/Bad Strategy (Richard Rumelt)", url: "https://www.goodstrategybadstrategy.com/", type: "book" },
        { title: "GTM Launch Template (Reforge)", url: "https://www.reforge.com/", type: "interactive" }
      ]
    }
  ],
  "ui-ux-designer": [
    {
      id: "ux-1",
      title: "Visual Design & Typography Basics",
      category: "Foundation",
      desc: "Master design fundamentals: typography, color theory, layout grids, spacing scales, and hierarchy.",
      checklist: [
        "Learn color theory, contrast ratios (WCAG accessibility), and theme palettes",
        "Apply 8pt grid sizing scales to layout templates",
        "Define typography hierarchies (font weights, line heights, scales)",
        "Create high-quality visual UI components (cards, buttons) from scratch"
      ],
      resources: [
        { title: "Refactoring UI (Adam Wathan & Steve Schoger)", url: "https://refactoringui.com/", type: "book" },
        { title: "Web Content Accessibility Guidelines (WCAG)", url: "https://www.w3.org/WAI/standards-guidelines/wcag/", type: "article" }
      ]
    },
    {
      id: "ux-2",
      title: "User Research & Interaction flows",
      category: "Core Skills",
      desc: "Map the user journey. Understand behavioral psychology, information architecture, user persona sheets, and structural wireframes.",
      checklist: [
        "Perform user surveys and map user persona profiles",
        "Draw user flow diagrams and screen progression trees",
        "Design wireframes (low-fidelity sketches) mapping interactions",
        "Create an Information Architecture (IA) sitemap for an app"
      ],
      resources: [
        { title: "Don't Make Me Think (Steve Krug)", url: "https://sensible.com/dont-make-me-think/", type: "book" },
        { title: "Laws of UX - Visual Guide", url: "https://lawsofux.com/", type: "interactive" }
      ]
    },
    {
      id: "ux-3",
      title: "Figma Prototyping & Layouts",
      category: "Core Skills",
      desc: "Master Figma. Learn Auto Layout, components, variants, properties, and smart transitions.",
      checklist: [
        "Construct highly responsive designs using Figma Auto Layout",
        "Build component variants with custom boolean and text properties",
        "Create high-fidelity interactive prototypes with smart animate transitions",
        "Utilize variables for light and dark theme mode controls"
      ],
      resources: [
        { title: "Figma Help: Auto Layout Tutorial", url: "https://help.figma.com/hc/en-us/articles/360040451373-Create-dynamic-designs-with-Auto-Layout", type: "article" },
        { title: "Figma Prototype Smart Animate Guide", url: "https://www.youtube.com/watch?v=n7z5cZ3h1qA", type: "video" }
      ]
    },
    {
      id: "ux-4",
      title: "Design Systems & Component Libraries",
      category: "Advanced",
      desc: "Build design systems. Structure UI tokens (colors, spacing), layout global component libraries, and documentation templates.",
      checklist: [
        "Define global design tokens for colors, spacing, shadows, and typography",
        "Build a nested atomic library (atoms, molecules, organisms)",
        "Document usage guidelines and state rules for UI patterns",
        "Audit existing screens against system alignment guidelines"
      ],
      resources: [
        { title: "Design Systems Handbook", url: "https://www.designsystems.com/", type: "article" },
        { title: "Material Design 3 Guidelines", url: "https://m3.material.io/", type: "interactive" }
      ]
    },
    {
      id: "ux-5",
      title: "Usability Testing & Developer Handoff",
      category: "Specialized",
      desc: "Validate and ship designs. Run user testing sessions, document redlines, write specifications, and collaborate with engineers.",
      checklist: [
        "Run 3 usability test sessions and write a findings brief",
        "Prepare Figma files with structured inspect specifications and redlines",
        "Translate UI assets into svg/png assets ready for export",
        "Review coded templates alongside engineers to run visual quality QA checks"
      ],
      resources: [
        { title: "NN/g Guide: How to Conduct Usability Testing", url: "https://www.nngroup.com/articles/usability-testing-101/", type: "article" },
        { title: "Figma Developer Mode Walkthrough", url: "https://www.figma.com/dev-mode/", type: "interactive" }
      ]
    }
  ],
  "data-analyst": [
    {
      id: "da-1",
      title: "Data Manipulation & Spreadsheets",
      category: "Foundation",
      desc: "Master spreadsheet data operations. Write complex formulas, analyze datasets, build Pivot tables, and clean raw data inputs.",
      checklist: [
        "Master VLOOKUP, INDEX/MATCH, and XLOOKUP formulas",
        "Build Pivot tables for multidimensional summary analysis",
        "Utilize power query or advanced filters to clean data outliers",
        "Design automated excel dashboard summaries using charts"
      ],
      resources: [
        { title: "Excel for Data Analysis Course", url: "https://www.chandoo.org/", type: "interactive" },
        { title: "Data Cleaning Checklist Basics", url: "https://towardsdatascience.com/data-cleaning-in-excel-step-by-step-guide-5e046cc69f8d", type: "article" }
      ]
    },
    {
      id: "da-2",
      title: "SQL Query Mastery",
      category: "Core Skills",
      desc: "Pull data like a pro. Master JOIN types, aggregating data, Common Table Expressions (CTEs), and complex window functions.",
      checklist: [
        "Write advanced SELECT queries combining inner, left, and full joins",
        "Utilize GROUP BY, HAVING, and aggregate formulas (SUM, AVG, COUNT)",
        "Write complex CTEs (WITH tables) for layered data queries",
        "Master Window Functions: ROW_NUMBER(), RANK(), LEAD(), LAG()"
      ],
      resources: [
        { title: "SQLZOO Interactive SQL Tutorial", url: "https://sqlzoo.net/", type: "interactive" },
        { title: "Mode Analytics SQL Tutorial", url: "https://mode.com/sql-tutorial/", type: "article" }
      ]
    },
    {
      id: "da-3",
      title: "Data Visualization & Dashboards",
      category: "Core Skills",
      desc: "Present insight data. Build dashboards in Tableau or PowerBI. Structure data schemas, optimize performance, and design reporting dashboards.",
      checklist: [
        "Design a 3-tab dashboard tracking core sales or product metrics",
        "Configure custom data fields and parameter calculations",
        "Establish relational schemas (Star schemas) in PowerBI",
        "Apply user experience layout design principles to visual charts"
      ],
      resources: [
        { title: "Tableau training videos", url: "https://www.tableau.com/learn/training", type: "video" },
        { title: "Power BI Desktop Beginner Guide", url: "https://learn.microsoft.com/en-us/power-bi/fundamentals/desktop-getting-started", type: "article" }
      ]
    },
    {
      id: "da-4",
      title: "Python Data Analysis (Pandas/NumPy)",
      category: "Advanced",
      desc: "Write code to clean and analyze data. Master Jupyter notebooks, pandas dataframes, loading CSVs, and plotting distributions.",
      checklist: [
        "Load, filter, and group dataframes using Pandas",
        "Clean null values, handle data types, and map categories",
        "Generate charts (bar, scatter, box plots) using Matplotlib/Seaborn",
        "Conduct basic statistical tests (mean comparisons, regressions) in Python"
      ],
      resources: [
        { title: "Kaggle: Pandas Course", url: "https://www.kaggle.com/learn/pandas", type: "interactive" },
        { title: "Python for Data Analysis (Wes McKinney)", url: "https://wesmckinney.com/book/", type: "book" }
      ]
    },
    {
      id: "da-5",
      title: "A/B Testing & Executive Storytelling",
      category: "Specialized",
      desc: "Analyze experiments and pitch findings. Apply confidence intervals, construct statistical significance tests, and write briefs.",
      checklist: [
        "Explain p-values, Type I/II errors, and power levels",
        "Calculate sample sizing requirements using statistical power tools",
        "Write a 1-page executive summary translating data into strategic action",
        "Deliver a slide presentation translating analytics into business growth recommendations"
      ],
      resources: [
        { title: "Udacity A/B Testing Course (Google)", url: "https://www.udacity.com/course/ab-testing--ud257", type: "video" },
        { title: "Storytelling with Data (Cole Nussbaumer Knaflic)", url: "https://www.storytellingwithdata.com/", type: "book" }
      ]
    }
  ]
};

/* Roadmap Interactive Tree Renderer */
function renderRoadmap(containerId, role, completedSkills = [], activeFocusId = null, onNodeClick = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";
  
  const nodes = ROADMAPS[role];
  if (!nodes) {
    container.innerHTML = `<p class="placeholder-text">No roadmap data available for this role.</p>`;
    return;
  }

  nodes.forEach((node, index) => {
    const nodeEl = document.createElement("div");
    nodeEl.className = "roadmap-node";
    
    // Status classes
    const isCompleted = completedSkills.includes(node.id);
    const isActiveFocus = node.id === activeFocusId || (!activeFocusId && index === 0 && !isCompleted);
    
    if (isCompleted) nodeEl.classList.add("completed-mastered");
    if (isActiveFocus) nodeEl.classList.add("active-focus");
    
    nodeEl.setAttribute("data-node-id", node.id);
    
    nodeEl.innerHTML = `
      <div class="node-status-dot"></div>
      <div class="node-category">${node.category}</div>
      <div class="node-title">${node.title}</div>
    `;
    
    // Wire click listener
    nodeEl.addEventListener("click", () => {
      // Remove visual active class from others
      document.querySelectorAll(".roadmap-node").forEach(el => el.classList.remove("active-focus"));
      nodeEl.classList.add("active-focus");
      
      if (onNodeClick) {
        onNodeClick(node);
      }
    });

    container.appendChild(nodeEl);
  });
}
