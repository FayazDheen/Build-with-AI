/* Resume & Job Description Analyzer Logic */

const TECH_KEYWORD_GLOSSARY = [
  "TypeScript", "React", "Node.js", "Express", "SQL", "PostgreSQL", "NoSQL", "Redis", 
  "Docker", "REST API", "WebSockets", "CI/CD", "Git", "System Design", "AWS", "Jest", 
  "Microservices", "PRD", "Agile", "Scrum", "Product Roadmap", "RICE Prioritization", 
  "User Interviews", "Product Analytics", "A/B Testing", "Amplitude", "Mixpanel", 
  "KPIs", "User Stories", "MVP", "Figma", "Design System", "Auto Layout", "Components", 
  "Prototyping", "User Research", "Wireframes", "Usability Testing", "WCAG Accessibility", 
  "Developer Handoff", "Information Architecture", "Visual Hierarchy", "Excel", 
  "Tableau", "PowerBI", "Python", "Pandas", "NumPy", "Data Visualization", "ETL Pipelines", 
  "Data Cleaning", "Pivot Tables", "Window Functions", "Jupyter", "Kubernetes", "GraphQL", 
  "HTML", "CSS", "C++", "Java", "Go", "GCP", "MongoDB", "Redux", "Data Structures"
];

const COMPANY_CULTURE_KEYWORDS = {
  google: ["ambiguity", "Googliness", "collaboration", "user focus", "algorithms", "Big O", "scale"],
  amazon: ["ownership", "customer obsession", "bias for action", "deliver results", "metrics", "frugality"],
  meta: ["move fast", "be bold", "ship", "MVP", "scale", "concurrency", "impact"],
  netflix: ["candor", "context", "freedom", "responsibility", "keeper test", "performance"],
  stripe: ["pragmatism", "first principles", "API design", "documentation", "integration", "developer experience"]
};

// Common rephrase suggestions for weak bullets, customized by role
const WEAK_REWRITES = {
  "software-engineer": [
    {
      trigger: ["checkout", "payment", "buy"],
      original: "Helped with setting up checkout page.",
      improved: "Co-led the performance optimization of the checkout funnel, utilizing Redis caching to reduce API latency by 28% and boost page conversions by 4.2%."
    },
    {
      trigger: ["bug", "fix", "legacy"],
      original: "Fixed bugs in legacy dashboard page.",
      improved: "Refactored legacy dashboard panels, resolving 15+ high-priority rendering bugs and improving overall client load speed by 1.2 seconds."
    },
    {
      trigger: ["api", "backend", "express"],
      original: "Wrote backend APIs for users.",
      improved: "Designed and implemented 8 secure RESTful API endpoints using Node.js/Express, managing token-based JWT authentication and database indexing."
    }
  ],
  "product-manager": [
    {
      trigger: ["prd", "requirement", "spec"],
      original: "Responsible for writing PRDs for features.",
      improved: "Authored 6+ comprehensive Product Requirement Documents (PRDs) for core search features, aligning 12 developers and 2 UI designers to launch ahead of schedule."
    },
    {
      trigger: ["priorit", "backlog", "jira"],
      original: "Managed the team backlog and prioritized tasks.",
      improved: "Spearheaded quarterly backlog grooming, utilizing the RICE framework to filter 40+ feature tickets and prioritize 3 high-impact customer retention items."
    },
    {
      trigger: ["user", "interview", "survey"],
      original: "Talked to users about what they wanted in the app.",
      improved: "Orchestrated 15 qualitative user discovery interviews, extracting 4 core usability pain points that drove the redesign of the onboarding flow."
    }
  ],
  "ui-ux-designer": [
    {
      trigger: ["figma", "design", "wireframe"],
      original: "Made mockups and wireframes in Figma.",
      improved: "Created a library of 35 high-fidelity responsive wireframes and prototypes in Figma, reducing layout iteration cycles with stakeholders by 30%."
    },
    {
      trigger: ["test", "usability", "user"],
      original: "Did user testing on prototype app.",
      improved: "Facilitated 8 remote usability testing sessions, mapping interaction heatmaps that led to a redesign of the sign-up form, increasing conversion by 18%."
    },
    {
      trigger: ["system", "library", "token"],
      original: "Helped maintain the design system.",
      improved: "Built and documented 20+ responsive UI component variants with tokens, establishing consistency across 3 separate mobile product platforms."
    }
  ],
  "data-analyst": [
    {
      trigger: ["excel", "sheet", "chart"],
      original: "Created Excel sheets and charts for sales.",
      improved: "Developed dynamic executive-level sales dashboards in Excel, automating weekly data feeds and identifying $45k in annual cost-saving opportunities."
    },
    {
      trigger: ["sql", "query", "database"],
      original: "Wrote SQL queries to get user data.",
      improved: "Optimized complex SQL subqueries and CTEs, decreasing query execution times by 40% and accelerating weekly growth funnel analytics reporting."
    },
    {
      trigger: ["dashboard", "tableau", "powerbi"],
      original: "Made Tableau dashboards for business tracking.",
      improved: "Designed and deployed 3 central Tableau dashboards tracking customer lifecycle funnels, utilized by executive leads to steer quarterly resource allocations."
    }
  ]
};

/* Extacts relevant keywords from pasted Job Description text */
function extractKeywordsFromJD(jdText) {
  if (!jdText) return [];
  const lower = jdText.toLowerCase();
  
  const matches = TECH_KEYWORD_GLOSSARY.filter(kw => {
    // Escape keywords
    const cleanKw = kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`\\b${cleanKw}\\b`, 'i');
    return regex.test(lower);
  });
  
  return matches;
}

/* Compares resume against role, company culture, and extracted JD keywords */
function analyzeResumeData(companyId, role, resumeText, jdText = "") {
  const text = resumeText.trim();
  const lower = text.toLowerCase();
  
  if (text.length < 15) {
    return null;
  }
  
  // 1. Gather all target keywords
  const roleKeywords = KEYWORD_BANK[role] || [];
  const cultureKeywords = COMPANY_CULTURE_KEYWORDS[companyId] || [];
  const jdKeywords = extractKeywordsFromJD(jdText);
  
  // Combine unique keywords into target list (limit to 12 max for visual layout clarity)
  const combinedSet = new Set([...roleKeywords, ...cultureKeywords, ...jdKeywords]);
  const targetKeywords = Array.from(combinedSet).slice(0, 15);
  
  const matched = [];
  const missing = [];
  
  targetKeywords.forEach(kw => {
    const cleanKw = kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`\\b${cleanKw}\\b`, 'i');
    if (regex.test(lower)) {
      matched.push(kw);
    } else {
      missing.push(kw);
    }
  });
  
  const keywordScore = targetKeywords.length > 0 
    ? Math.round((matched.length / targetKeywords.length) * 100) 
    : 0;
  
  // 2. Read bullet points and search for triggers
  const lines = text.split('\n');
  const rewrites = [];
  const genericRewrites = [];
  
  const defaultSuggestions = WEAK_REWRITES[role] || [];
  
  lines.forEach(line => {
    const cleanLine = line.trim().replace(/^[-*+\d\.\s]+/, ''); // remove bullet markers
    if (cleanLine.length < 8) return;
    
    let lineMatched = false;
    
    // Check specific triggers
    defaultSuggestions.forEach(sug => {
      sug.trigger.forEach(trig => {
        if (cleanLine.toLowerCase().includes(trig) && !lineMatched) {
          rewrites.push({
            original: cleanLine,
            improved: sug.improved
          });
          lineMatched = true;
        }
      });
    });
    
    // If it starts with a weak action verb, suggest generic STAR rewrite
    const weakVerbs = ["helped", "assisted", "responsible", "worked on", "managed", "made", "created", "did", "wrote", "handled"];
    const words = cleanLine.split(' ');
    const firstWord = words[0]?.toLowerCase();
    
    if (!lineMatched && (weakVerbs.includes(firstWord) || cleanLine.toLowerCase().includes("responsible for"))) {
      let actionVerb = "Spearheaded";
      if (role === "software-engineer") actionVerb = "Engineered";
      if (role === "product-manager") actionVerb = "Formulated";
      if (role === "ui-ux-designer") actionVerb = "Designed";
      if (role === "data-analyst") actionVerb = "Synthesized";
      
      genericRewrites.push({
        original: cleanLine,
        improved: `**[${actionVerb}]** [core task] using **[specific technology/method]** resulting in **[quantifiable impact (e.g., +15% performance / saved 10 hours)]**.`
      });
    }
  });
  
  // Join specific rewrites and top generic suggestions
  const finalRewrites = [...rewrites, ...genericRewrites.slice(0, 2)];
  if (finalRewrites.length === 0) {
    // Add default examples
    defaultSuggestions.slice(0, 2).forEach(sug => {
      finalRewrites.push({
        original: sug.original,
        improved: sug.improved
      });
    });
  }
  
  // 3. Impact scoring (STAR structure rating)
  let impactScore = 55; // Base
  if (matched.length > 3) impactScore += 10;
  if (text.includes('%') || text.includes('million') || text.includes('boost') || text.includes('save') || text.includes('latency')) {
    impactScore += 15;
  }
  
  lines.forEach(line => {
    // Boost score if lines contain strong action verbs
    const strongVerbs = ["led", "architected", "spearheaded", "designed", "engineered", "optimized", "refactored", "authored", "automated", "negotiated", "accelerated"];
    strongVerbs.forEach(v => {
      if (line.toLowerCase().includes(v)) impactScore += 3;
    });
  });
  
  impactScore = Math.min(96, impactScore);
  
  // 4. Structure tips
  const tips = [];
  if (!lower.includes('%')) {
    tips.push("Add quantitative metrics. ATS and hiring managers scan for percentages, currency reductions, and speed milestones (e.g. 'reduced page latency by 40%').");
  }
  if (lower.includes("team player") || lower.includes("hard worker") || lower.includes("passionate")) {
    tips.push("Remove soft-skills buzzwords like 'team player' or 'passionate developer'. Instead, prove these qualities through concrete action items in your bullets.");
  }
  if (lines.length > 0 && lines.filter(l => l.trim().startsWith('-') || l.trim().startsWith('*')).length === 0) {
    tips.push("Structure your work experience with clean, bulleted lists using action verbs. Avoid blocky paragraph structures.");
  }
  
  // Add company specific recommendation tip
  if (companyId === "amazon") {
    tips.push("Amazon recruiters look for clear ownership evidence. Highlight project lead roles and customer metrics.");
  } else if (companyId === "google") {
    tips.push("Google values academic rigor and analytical depth. List algorithms, complex data pipelines, and systems scale metrics.");
  }
  
  if (tips.length === 0) {
    tips.push("Great structure! Focus on refining your technical skill tags to match specific job descriptions.");
  }
  
  return {
    keywordScore: keywordScore,
    impactScore: impactScore,
    matchedKeywords: matched,
    missingKeywords: missing,
    rewrites: finalRewrites,
    structureTips: tips
  };
}
