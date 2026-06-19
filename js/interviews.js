/* Mock Interview Questions Database & Grading Engine */

const COMPANY_INTERVIEW_QUESTIONS = {
  google: {
    behavioral: [
      "Google values Googliness. Tell me about a time you had to deal with ambiguity in a project. How did you structure your approach?",
      "Describe a time you saw a process that wasn't working and you took action to fix it. What was the impact?",
      "Tell me about a time you had a disagreement with a colleague. How did you build consensus and maintain inclusive collaboration?"
    ],
    technical: [
      "Write a function to find the length of the longest substring without repeating characters. Explain its time and space complexity.",
      "Explain how a B-Tree index speeds up lookups under the hood, and how it differs from hash indexes.",
      "Explain React's virtual DOM mechanism and how the reconciliation algorithm determines when to trigger UI repaints."
    ],
    "system-design": [
      "Design Google Maps. How do you store coordinates, calculate shortest routes (Dijkstra/A*), and scale the service to millions of daily requests?",
      "Design a global distributed cache like Memcached. How do you handle cache eviction policies and consistency?",
      "Design Google Search autocomplete. How do you construct a trie, handle massive QPS, and serve real-time suggestions?"
    ]
  },
  amazon: {
    behavioral: [
      "Describe a time you took ownership of a task that was outside your direct job description. What did you achieve? (Ownership Principle)",
      "Tell me about a time you had to make a fast, critical decision with limited data. How did you balance speed against risk? (Bias for Action)",
      "Tell me about a time you disagreed with a manager or lead but ultimate complied. How did you disagree and commit?"
    ],
    technical: [
      "Write a function to merge overlapping intervals. Explain your algorithm and data structure choice.",
      "Explain database transactions (ACID properties) and how database isolation levels prevent concurrent data anomalies.",
      "Explain the event loop in Node.js. What is the difference between microtasks (process.nextTick) and macrotasks (setTimeout)?"
    ],
    "system-design": [
      "Design Amazon Prime Day checkout service. How do you handle massive write bursts, prevent duplicate orders, and manage inventory consistency?",
      "Design a notification system (email, sms, push) that scales to 100M active daily users and handles provider failures.",
      "Design a distributed key-value database. How do you handle replication, partition tolerance, and consistent hashing?"
    ]
  },
  meta: {
    behavioral: [
      "Meta moves fast. Tell me about a time you shipped an MVP quickly and iterated based on user metrics. What trade-offs did you make?",
      "Tell me about a time you had a technical disagreement with a team member. How did you resolve it quickly to keep moving fast?",
      "Describe a project you worked on where you took a bold risk. What was the risk and what was the outcome?"
    ],
    technical: [
      "Write an algorithm to perform a level-order traversal of a binary tree. What is the runtime complexity?",
      "Explain how WebSockets manage state and why they are preferred over HTTP polling for real-time notifications.",
      "How does CORS (Cross-Origin Resource Sharing) work, and how would you configure a server to secure resources from unauthorized origins?"
    ],
    "system-design": [
      "Design Meta News Feed. How do you feed content to users, rank posts, and scale feeds for 2 billion active profiles?",
      "Design a real-time messaging application like WhatsApp. How do you handle delivery receipts, offline queues, and group chats?",
      "Design Facebook Photo upload and storage pipeline. How do you optimize image delivery across global CDNs?"
    ]
  },
  netflix: {
    behavioral: [
      "Netflix values extreme candor. Tell me about a time you gave critical feedback directly to a peer or manager. How did they receive it?",
      "Describe how you managed a project when you were given high strategic context but zero directive control. How did you organize execution?",
      "Tell me about a 'stunning colleague' you worked with in the past. What qualities did they possess, and how did you learn from them?"
    ],
    technical: [
      "Explain the difference between TCP and UDP, and why Netflix might use a custom protocol over UDP for video streaming streams.",
      "Write a function to detect cycles in a directed graph. Explain its space complexity.",
      "What is the difference between client-side rendering (CSR) and server-side rendering (SSR) for page load optimization?"
    ],
    "system-design": [
      "Design the Netflix Video Content Delivery Network (CDN) cache layer. How do you distribute video chunks globally and choose cache evictions?",
      "Design a recommendation algorithm pipeline. How do you digest viewing history to output personalized recommend lists?",
      "Design a video transcoding pipeline that scales to process thousands of uploads daily."
    ]
  },
  stripe: {
    behavioral: [
      "Stripe values first-principles thinking. Tell me about a time you investigated a highly complex technical bug down to its core mechanism.",
      "Explain a time you wrote extensive documentation for a technical API or system to help developer onboarding. Why did you write it?",
      "Tell me about a time you had to balance building a quick temporary hack against engineering a robust, perfect system. What did you decide?"
    ],
    technical: [
      "Write a parser that parses custom config files and structures them into nested JSON blocks. Include test validations.",
      "Write an API client wrapper that handles rate limits, request retries, and exponential backoff.",
      "How would you explain the difference between a REST API and WebSockets to a non-technical manager?"
    ],
    "system-design": [
      "Design Stripe's multi-region financial ledger database. How do you guarantee exact double-entry accounting consistency across different regions?",
      "Design an API gateway rate limiter. What algorithms (token bucket, sliding window) and caching would you choose?",
      "Design a dashboard layout for showing financial analytics to business merchants. What details take visual priority?"
    ]
  }
};

/* Audio visualizer simulation variables */
let waveAnimId = null;
let waveContext = null;
let waveCanvas = null;
let waveActive = false;

function initWaveform(canvasId) {
  waveCanvas = document.getElementById(canvasId);
  if (!waveCanvas) return;
  
  waveContext = waveCanvas.getContext('2d');
  
  // Set dimensions
  const rect = waveCanvas.getBoundingClientRect();
  waveCanvas.width = rect.width * window.devicePixelRatio;
  waveCanvas.height = rect.height * window.devicePixelRatio;
  waveContext.scale(window.devicePixelRatio, window.devicePixelRatio);
  
  drawStaticWave();
}

function drawStaticWave() {
  if (!waveContext || !waveCanvas) return;
  const width = waveCanvas.width / window.devicePixelRatio;
  const height = waveCanvas.height / window.devicePixelRatio;
  
  waveContext.clearRect(0, 0, width, height);
  waveContext.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  waveContext.lineWidth = 2;
  
  waveContext.beginPath();
  waveContext.moveTo(0, height / 2);
  waveContext.lineTo(width, height / 2);
  waveContext.stroke();
}

function startWaveformAnimation() {
  if (!waveContext || !waveCanvas) return;
  waveActive = true;
  
  const width = waveCanvas.width / window.devicePixelRatio;
  const height = waveCanvas.height / window.devicePixelRatio;
  let phase = 0;
  
  function draw() {
    if (!waveActive) return;
    
    waveContext.clearRect(0, 0, width, height);
    
    // Draw 3 layers of waves with varying transparency and wavelengths
    drawWaveLayer(width, height, phase, 1.2, 'rgba(99, 102, 241, 0.6)', 18);
    drawWaveLayer(width, height, phase + 1.5, 0.8, 'rgba(168, 85, 247, 0.4)', 12);
    drawWaveLayer(width, height, phase + 3.0, 1.5, 'rgba(6, 182, 212, 0.3)', 8);
    
    phase += 0.15;
    waveAnimId = requestAnimationFrame(draw);
  }
  
  draw();
}

function drawWaveLayer(width, height, phase, frequency, strokeColor, amplitude) {
  waveContext.strokeStyle = strokeColor;
  waveContext.lineWidth = 2;
  waveContext.beginPath();
  
  for (let x = 0; x < width; x++) {
    const envelope = Math.sin((x / width) * Math.PI);
    const y = (height / 2) + Math.sin(x * 0.03 * frequency + phase) * amplitude * envelope;
    
    if (x === 0) {
      waveContext.moveTo(x, y);
    } else {
      waveContext.lineTo(x, y);
    }
  }
  waveContext.stroke();
}

function stopWaveformAnimation() {
  waveActive = false;
  if (waveAnimId) {
    cancelAnimationFrame(waveAnimId);
  }
  drawStaticWave();
}

/* Grader and Evaluation Engine */
function gradeInterviewAnswer(companyId, role, sessionType, question, answerText) {
  const text = answerText.trim();
  const lower = text.toLowerCase();
  
  if (text.length < 20) {
    return {
      score: 45,
      summary: "Your response is too brief to evaluate. A comprehensive interview response should elaborate on the context, technical challenges, or structural outcomes.",
      strengths: ["None identified due to extremely short response length."],
      improvements: ["Elaborate on details using the STAR method.", "Explain the technical rationale behind your decisions."],
      coachTip: "Always aim to speak/write for at least 1.5 to 2 minutes. Provide details on what *you* did, not just the team."
    };
  }
  
  const words = text.split(/\s+/).length;
  let score = 65; // Base minimum
  
  if (words > 45) score += 5;
  if (words > 90) score += 8;
  if (words > 160) score += 7;
  
  const strengths = [];
  const improvements = [];
  
  // 1. Structure Audit: STAR Method check
  const starKeywords = ["situation", "task", "action", "result", "metric", "percent", "resolved", "solved", "goal", "because", "impact", "%", "million", "team"];
  let starHits = 0;
  starKeywords.forEach(kw => {
    if (lower.includes(kw)) starHits++;
  });
  
  if (starHits >= 4) {
    score += 8;
    strengths.push("Good application of framework structure (referencing clear context, actions, and results).");
  } else {
    score -= 4;
    improvements.push("Structure your response more clearly. Divide your answer into the Situation, your specific Task, the Action you took, and the ultimate Result (STAR framework).");
  }
  
  // 2. Metrics check (quantitative details)
  const numbersRegex = /\b\d+(%|k|m|d|x|s)?\b/g;
  const hasNumbers = numbersRegex.test(lower);
  if (hasNumbers) {
    score += 5;
    strengths.push("Included quantitative metrics (numbers/percentages) to back up your achievements.");
  } else {
    improvements.push("Incorporate specific impact metrics. Instead of saying 'performance improved', say 'response latency decreased by 30%'.");
  }

  // 3. Company specific culture grading
  let cultureHits = 0;
  let coachTip = "";

  if (companyId === "amazon") {
    const amazonLPs = ["customer", "obsess", "owner", "action", "results", "deliver", "simplify", "invent", "trust", "commit", "disagree"];
    amazonLPs.forEach(lp => { if (lower.includes(lp)) cultureHits++; });
    
    if (cultureHits >= 2) {
      score += 6;
      strengths.push("Demonstrated strong alignment with Amazon's Leadership Principles (LPs) like Customer Obsession and Ownership.");
    } else {
      improvements.push("Incorporate Amazon Leadership Principles. Refer explicitly to 'taking ownership' or focusing on 'customer inputs'.");
    }
    coachTip = "For Amazon loops, frame every behavioral answer around 1 or 2 Leadership Principles. Make sure you highlight your own contributions rather than just saying 'we did'.";
  } 
  
  else if (companyId === "google") {
    const googleTerms = ["ambiguity", "user", "collaborat", "humility", "consensus", "feedback", "respect", "inclusive"];
    googleTerms.forEach(g => { if (lower.includes(g)) cultureHits++; });
    
    if (cultureHits >= 2) {
      score += 6;
      strengths.push("Showcased good 'Googliness' by demonstrating collaborative problem solving, handling ambiguity, and user focus.");
    } else {
      improvements.push("Incorporate Googliness indicators. Discuss how you structured solutions in ambiguous contexts or gathered user feedback.");
    }
    coachTip = "Google interviewers love to see structured, analytical thinking. If it's system design, analyze trade-offs first; if it's behavioral, show how you thrive in unclear situations.";
  }
  
  else if (companyId === "meta") {
    const metaTerms = ["fast", "bold", "mvp", "iterate", "ship", "impact", "scale", "connect"];
    metaTerms.forEach(m => { if (lower.includes(m)) cultureHits++; });
    
    if (cultureHits >= 2) {
      score += 6;
      strengths.push("Aligned well with Meta's culture of moving fast, taking bold action, and focusing on product impact.");
    } else {
      improvements.push("Meta values velocity. Highlight how you shipped an MVP quickly, validated it with metrics, and made bold decisions.");
    }
    coachTip = "Meta expects high execution speed. In technical screens, write code fast and talk through the Big-O complexity immediately. In behavioral, show how you solve bottlenecks.";
  }
  
  else if (companyId === "netflix") {
    const netflixTerms = ["candor", "honest", "feedback", "context", "stunning", "freedom", "responsibility", "keeper"];
    netflixTerms.forEach(n => { if (lower.includes(n)) cultureHits++; });
    
    if (cultureHits >= 2) {
      score += 6;
      strengths.push("Reflected Netflix's core values of absolute candor, high performance, and operating under strategic context.");
    } else {
      improvements.push("Discuss candid feedback exchanges, or how you operated independently when given strategic context.");
    }
    coachTip = "Netflix looks for mature, self-governing professionals. Emphasize how you gave or received tough, constructive feedback candidly to move a project forward.";
  }
  
  else if (companyId === "stripe") {
    const stripeTerms = ["pragmatic", "document", "integration", "api", "simple", "first principles", "detail", "write"];
    stripeTerms.forEach(s => { if (lower.includes(s)) cultureHits++; });
    
    if (cultureHits >= 2) {
      score += 6;
      strengths.push("Aline with Stripe's emphasis on clean documentation, first-principles thinking, and building pragmatic APIs.");
    } else {
      improvements.push("Stripe values pragmatism. Focus on how you wrote tests, documented systems, and analyzed details from first principles.");
    }
    coachTip = "Stripe looks for developers who care deeply about API design, documentation, and clean integrations. Highlight how you debugged issues step-by-step.";
  }

  // Cap score between 50 and 98
  score = Math.max(50, Math.min(98, score));
  
  return {
    score: score,
    summary: `Your response was rated ${score}/100 based on ${companyId.toUpperCase()}'s interview standards. Your answer was well-structured but has opportunities for deeper alignment.`,
    strengths: strengths,
    improvements: improvements,
    coachTip: coachTip
  };
}
