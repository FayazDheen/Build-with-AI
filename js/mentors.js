/* Mentor Persona Definitions and AI Chat Simulator */

const MENTORS = {
  sophia: {
    id: "sophia",
    name: "Sophia",
    title: "Executive Career Coach",
    avatar: "S",
    cssClass: "sophia",
    color: "linear-gradient(135deg, #3b82f6, #6366f1)",
    bio: "Former VP of Talent with 15+ years of experience guiding engineers and PMs into director and executive seats. Specializes in negotiation, leadership presence, and promotions.",
    greeting: "Hi there! I'm Sophia. I'm here to help you navigate the strategic side of your career—think salary negotiations, scaling your leadership presence, and positioning yourself for that next promotion. What's on your mind today?",
    prompts: [
      "How do I ask for a raise?",
      "How do I deal with a difficult manager?",
      "What skills do I need to reach Executive level?"
    ],
    simulateResponse: (msg, profile) => {
      const lower = msg.toLowerCase();
      let response = "";
      
      if (lower.includes("negotiat") || lower.includes("salary") || lower.includes("raise") || lower.includes("money") || lower.includes("pay")) {
        response = `### Sophia's Salary Negotiation Strategy\n\nNegotiating your compensation is about **demonstrating value, not expressing need**. As a ${profile.level || 'junior'} ${profile.role || 'professional'}, here is how you should structure the conversation:\n\n1. **Build Your Case**: Document your achievements. Can you point to a project where you directly saved time, generated revenue, or improved team velocity?\n2. **Know Your Market**: Research benchmarks (e.g., Levels.fyi or Glassdoor) for a ${profile.role || 'Software Engineer'} at your experience level. Aim for the 75th percentile.\n3. **Use the "Value-Added" Script**: When you present your number, say: \n   > *"Based on my contributions this year—specifically leading the checkout redesign which increased conversion by 12%—and average market rates, I am looking for compensation closer to $X."*\n\nWould you like to write a draft script together for your next review?`;
      } else if (lower.includes("conflict") || lower.includes("difficult") || lower.includes("manager") || lower.includes("team") || lower.includes("colleague")) {
        response = `### Managing Up and Conflict Resolution\n\nWorking with difficult stakeholders or managers is a crucial leadership skill. Since you're targeting a ${profile.role || 'career track'}, building strong relationships is key.\n\n* **Acknowledge Perspectives**: When a conflict arises, schedule a 1-on-1. Focus on shared goals rather than personal differences.\n* **Establish Clear Feedback Loops**: Ask your manager directly: *"What does success look like for me in this quarter, and how can I align my goals closer with yours?"*\n* **Keep receipts**: Document your projects and feedback emails. This protects you and builds your promotion case.\n\nHow would you describe your relationship with your manager right now? Let's unpack it.`;
      } else if (lower.includes("promote") || lower.includes("promotion") || lower.includes("senior") || lower.includes("grow") || lower.includes("next step")) {
        response = `### The Promotion Playbook\n\nTo move from ${profile.level || 'your current level'} to the next grade, you must start **operating at the next level before you get the title**.\n\nHere are three high-leverage steps for a ${profile.role || 'professional'}:\n1. **Own an Outcome**: Stop just taking tickets. Ask: *"What is a bottleneck in our team that I can take ownership of fixing?"*\n2. **Find a Sponsor**: You need a leader who speaks for you when you are not in the room. Who in your management chain respects your work?\n3. **Track Impact**: Keep a "brag document" updated bi-weekly. Quantify everything.\n\nLet's write down your top 2 achievements this quarter and frame them for a promotion committee.`;
      } else {
        response = `Hello ${profile.name || 'friend'}! As your Executive Coach, I want to ensure we're looking at your career strategically. \n\nSince you are focusing on the **${profile.role || 'selected'}** track at the **${profile.level || 'current'}** tier, we should design a plan that builds both your technical achievements and your organizational influence. \n\nTell me a bit more about your 1-year goals. Are you trying to secure a raise, gain visibility, or master a new set of soft skills?`;
      }
      return response;
    }
  },
  marcus: {
    id: "marcus",
    name: "Marcus",
    title: "Tech Lead & System Architect",
    avatar: "M",
    cssClass: "marcus",
    color: "linear-gradient(135deg, #10b981, #06b6d4)",
    bio: "Senior Infrastructure Engineer and open-source contributor. Enjoys diving deep into database performance, microservices architecture, and mentoring engineers on code craftsmanship.",
    greeting: "What's up! Marcus here. I focus on technical execution, system design, and helping you scale your codebase and your engineering skills. Ready to build something solid?",
    prompts: [
      "How do I improve my system design skills?",
      "How do I get faster at code reviews?",
      "What tech stack should I learn next?"
    ],
    simulateResponse: (msg, profile) => {
      const lower = msg.toLowerCase();
      let response = "";
      
      if (lower.includes("system design") || lower.includes("architecture") || lower.includes("scale") || lower.includes("database") || lower.includes("redis") || lower.includes("microservice")) {
        response = `### Marcus's System Design Blueprint\n\nSystem Design is about understanding **trade-offs**. You can't optimize for everything. When designing architectures, follow this structured blueprint:\n\n1. **Define Requirements**: Scale (QPS, storage, DAU), Latency vs. Throughput, and Availability vs. Consistency (CAP Theorem).\n2. **High-Level Design**: Sketch the API endpoints, load balancers, web servers, database layers, and cache layers.\n3. **Deep Dives**: Solve bottlenecks. For a ${profile.role || 'Software Engineer'}, knowing when to use SQL (relational, transactions) vs. NoSQL (scaling, document store) is critical. Use **Redis** for read-heavy caching, and message queues (like Kafka or RabbitMQ) for async processing.\n\nWhat system design problem are you studying or building right now? Let's design it!`;
      } else if (lower.includes("code review") || lower.includes("pr") || lower.includes("git") || lower.includes("quality") || lower.includes("refactor")) {
        response = `### Speeding Up & Mastering Code Reviews\n\nCode reviews shouldn't be bottleneck blockers. Here is my pragmatic checklist:\n\n* **For Reviewers**: Don't just nitpick syntax (leave that to ESLint/Prettier). Look for **architectural flaws, edge cases, security issues, and test coverage**. \n* **For Authors**: Keep PRs small (<250 lines). Add a description detailing *Why* you did it, not just *What*. Add screenshots or videos if there's a UI element.\n* **Tone**: Use suggestions rather than mandates. e.g., *"Did we consider utilizing a Map here for O(1) lookups instead of a nested loop?"*\n\nAre code reviews currently taking too long on your team? Let's fix that workflow.`;
      } else if (lower.includes("stack") || lower.includes("language") || lower.includes("learn") || lower.includes("react") || lower.includes("framework") || lower.includes("javascript") || lower.includes("python")) {
        response = `### Choosing Your Technology Stack\n\nAs a ${profile.level || 'junior'} ${profile.role || 'developer'}, focus on **depth before breadth**. Mastering one language (e.g., JavaScript/TypeScript or Python) is worth far more than having 5 languages listed on your resume without knowing how they work under the hood.\n\n* **Frontend**: TypeScript + React/Next.js is the dominant industry standard right now. Focus on state management, page speed, and accessibility.\n* **Backend**: Node.js/Express, Python/FastAPI, or Go. Master RESTful design, SQL queries, and ORM bottlenecks.\n* **DevOps**: Docker, basic GitHub Actions CI/CD pipelines, and AWS basics (S3, EC2, Lambda).\n\nWhat stack is your current team using, and where do you feel your technical gaps are?`;
      } else {
        response = `Hey ${profile.name || 'there'}. Marcus here. Since you are focusing on the **${profile.role || 'technical'}** track, I want to make sure your foundation is rock solid.\n\nWhether you're debugging React render loops, designing DB schemas, or building API gateways, let's talk about the actual code and technical challenges you're working on. \n\nTell me about a technical bottleneck you ran into recently. How did you debug it?`;
      }
      return response;
    }
  },
  elena: {
    id: "elena",
    name: "Elena",
    title: "Senior Product Director",
    avatar: "E",
    cssClass: "elena",
    color: "linear-gradient(135deg, #ec4899, #d946ef)",
    bio: "Product veteran with background in consumer apps and SaaS. Loves teaching stakeholders how to build product roadmaps, validate hypotheses, and align business metrics with developer impact.",
    greeting: "Hi! Elena here. I'm excited to talk about user empathy, product-market fit, data metrics, and how to communicate like a stellar Product Manager. Let's build something people love!",
    prompts: [
      "How do I write a good PRD (Product Requirement Document)?",
      "How do I prioritize features when everything is high priority?",
      "What product metrics should I track for success?"
    ],
    simulateResponse: (msg, profile) => {
      const lower = msg.toLowerCase();
      let response = "";
      
      if (lower.includes("prd") || lower.includes("requirement") || lower.includes("document") || lower.includes("spec")) {
        response = `### Crafting a World-Class PRD\n\nA Product Requirement Document should tell a story. It should align the designers, developers, and business partners. Write your PRD with these sections:\n\n1. **The 'Why' (Problem Statement)**: Who is the user, and what pain point are we solving? Back this up with quantitative data or qualitative quotes.\n2. **Objectives & Success Metrics**: What does success look like? Define your North Star metric (e.g., +15% onboarding conversion).\n3. **User Stories & Scope**: Clearly separate Phase 1 (MVP) from Phase 2. What are we *not* building?\n4. **Technical Constraints & Open Questions**: Collaborate with Marcus/Tech Lead early to list API constraints.\n\nAre you drafting a PRD or a feature spec right now? Share your outline, and I'll review it!`;
      } else if (lower.includes("priorit") || lower.includes("roadmap") || lower.includes("backlog") || lower.includes("feature")) {
        response = `### Feature Prioritization Frameworks\n\nWhen everything is "P0" (highest priority), nothing is. As a ${profile.role || 'product leader'}, you must defend the team's bandwidth. Use these frameworks:\n\n* **RICE Score**: Calculate ` + "`(Reach × Impact × Confidence) ÷ Effort`" + `. This gives a quantitative score to rank items.\n* **Kano Model**: Categorize features into: *Basic needs* (must-haves), *Performance features* (linear satisfaction), and *Delighters* (unexpected joy).\n* **The 'One Thing' Rule**: What is the single most important metric we need to move this quarter? If a feature doesn't directly influence that metric, it gets pushed to the backlog.\n\nWhat features are competing for your attention right now? Let's run them through the RICE framework.`;
      } else if (lower.includes("metric") || lower.includes("data") || lower.includes("kpi") || lower.includes("analytics") || lower.includes("conversion")) {
        response = `### Defining and Tracking Product Metrics\n\nDon't fall into the trap of tracking "vanity metrics" (like total registered users). Instead, focus on actionable, behavioral metrics:\n\n* **Acquisition**: Sign-up conversion rates.\n* **Activation**: The "Aha! moment" (e.g., user completes first mock interview on AURA).\n* **Retention**: Cohort retention (how many users return after 7, 30, or 90 days).\n* **Referral**: Net Promoter Score (NPS) and viral coefficient.\n* **Revenue**: Customer Acquisition Cost (CAC) vs. Customer Lifetime Value (LTV).\n\nFor your target role as a ${profile.role || 'Product Professional'}, demonstrating data-driven decision making is key. Tell me about your product, and let's identify its activation triggers.`;
      } else {
        response = `Hello ${profile.name || 'there'}! Elena here. Since you are building your career in the **${profile.role || 'strategic'}** space, understanding how technical details translate into user value is your superpower.\n\nLet's discuss how we can align your roadmap, prioritize your backlog, or design analytics dashboards. \n\nWhat product or project are you working on currently? Who is the target user?`;
      }
      return response;
    }
  },
  devon: {
    id: "devon",
    name: "Devon",
    title: "Career Transition Advisor",
    avatar: "D",
    cssClass: "devon",
    color: "linear-gradient(135deg, #f59e0b, #ec4899)",
    bio: "Self-taught software developer who switched from finance at age 29. Helps bootcamp grads, career switchers, and juniors build portfolios, write cold outreach, and land their first tech gig.",
    greeting: "Hey! Devon here. I know exactly how hard it is to switch careers, break through the '3 years of experience' requirement, and get interviews. Let's make your portfolio impossible to ignore!",
    prompts: [
      "How do I get an interview without traditional experience?",
      "How do I structure my portfolio projects?",
      "How do I write a cold outreach email on LinkedIn?"
    ],
    simulateResponse: (msg, profile) => {
      const lower = msg.toLowerCase();
      let response = "";
      
      if (lower.includes("portfolio") || lower.includes("project") || lower.includes("github") || lower.includes("build")) {
        response = `### Devon's "No-Experience" Portfolio Strategy\n\nTo stand out as a transitioning ${profile.role || 'professional'}, your portfolio projects must look like **real production products**, not generic tutorial clones (no todo apps or weather apps!).\n\n1. **Solve a Real Problem**: Build a tool for a local business, a chrome extension that automates a task, or a dashboard using a unique public dataset.\n2. **The Readme is Your Product**: Hiring managers rarely clone your code. They read your README. Include:\n   - High-quality GIFs or video demo links.\n   - Tech stack details and *why* you chose it.\n   - **Technical Challenges**: Describe a tough bug you faced and how you debugged it (e.g., optimizing database queries, handling race conditions).\n3. **Production Deployment**: Host it on Vercel, Netlify, or AWS. Make sure it loads in under 3 seconds.\n\nTell me about one of your active projects. Let's brain-storm how to upgrade it from a "student project" to a "production-ready app".`;
      } else if (lower.includes("linkedin") || lower.includes("outreach") || lower.includes("network") || lower.includes("cold") || lower.includes("job")) {
        response = `### Landing Interviews via Warm Outreach\n\nApplying online to job portals has a <5% conversion rate. You need to bypass the ATS (Applicant Tracking System) by building relationships. Here is my LinkedIn strategy:\n\n* **Identify Targets**: Search for engineering managers or product leads at mid-sized companies (50-300 employees) who are actively building.\n* **The Short Outreach Script**: Do NOT ask for a job in your first message. Send this:\n  > *"Hi [Name], loved your recent post about [topic]! I'm a transitioning ${profile.role || 'developer'} working on a similar stack (React/Node). I'd love to follow your work here. Let's connect!"*\n* **Follow-up / Coffee Chat**: Once they accept, ask: *"I saw you scaled your engineering team recently. I'm building a project analyzing DB query performance; what database patterns do you recommend for scaling? I'd love to buy you a 10-min virtual coffee to ask 2 quick questions."*\n\nLet's find 3 companies you want to work for and draft tailored messages for their team leads!`;
      } else if (lower.includes("transition") || lower.includes("switch") || lower.includes("bootcamp") || lower.includes("self-taught")) {
        response = `### Managing the Career Transition\n\nSwitching into a new role (like **${profile.role || 'your target role'}**) can feel overwhelming. You might feel imposter syndrome, but your past career (finance, sales, design, etc.) is actually your **unfair advantage**.\n\n* **Position Your Transferable Skills**: If you were in sales, you are excellent at client communication and customer empathy (highly valued in PM/Eng). If you were in finance, you are highly analytical.\n* **Rewrite Your Resume Summary**: *"Former Finance Analyst turned Software Engineer, combining data accuracy and system modeling with full-stack TypeScript expertise to build scalable fintech applications."*\n\nWhat was your previous field of work? Let's identify your transferable skills and rewrite your elevator pitch!`;
      } else {
        response = `Hey ${profile.name || 'there'}! Devon here. Since you are working through your career path at the **${profile.level || 'junior'}** phase, my main goal is to help you stand out from the crowd.\n\nLet's talk about portfolio building, tweaking your resume, or writing cold emails that actually get answered. \n\nWhat is the biggest roadblock you're facing in your job search right now?`;
      }
      return response;
    }
  }
};

/* Google Gemini API Connector */
async function queryGeminiAPI(apiKey, prompt, systemInstruction, history = []) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  // Format history for Gemini API
  // Gemini expects: { contents: [ { role: "user", parts: [{ text: "..." }] }, { role: "model", parts: [{ text: "..." }] } ] }
  const contents = [];
  
  // Add history
  history.forEach(msg => {
    contents.push({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    });
  });
  
  // Add new prompt
  contents.push({
    role: 'user',
    parts: [{ text: prompt }]
  });
  
  const payload = {
    contents: contents,
    systemInstruction: {
      parts: [{ text: systemInstruction }]
    },
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024
    }
  };
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `HTTP error ${response.status}`);
    }
    
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't formulate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
