/* PrepAURA Main App Controller and UI Coordinator */

// State
let userProfile = {
  name: "",
  role: "software-engineer",
  level: "junior",
  company: "google",
  completedSkills: [],
  goals: []
};

let activeInterviewSession = null;
let activeRoadmapNode = null;

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadData();
  initRouter();
  initOnboarding();
  initDashboard();
  initInsightsView();
  initAnalyzerView();
  initRoadmapView();
  initInterviewView();
  initSettings();
  
  // Trigger onboarding if brand new
  if (!userProfile.name) {
    showOnboarding(true);
  } else {
    updateUIFromProfile();
  }
});

// Router
function initRouter() {
  const navItems = document.querySelectorAll(".nav-item");
  const views = document.querySelectorAll(".content-view");
  
  function navigate(viewId) {
    views.forEach(v => v.classList.remove("active"));
    navItems.forEach(n => n.classList.remove("active"));
    
    const activeView = document.getElementById(`view-${viewId}`);
    if (activeView) {
      activeView.classList.add("active");
    }
    
    const activeNav = document.querySelector(`.nav-item[data-view="${viewId}"]`);
    if (activeNav) {
      activeNav.classList.add("active");
    }
    
    if (window.location.hash !== `#${viewId}`) {
      window.location.hash = viewId;
    }
    
    // View-specific onload triggers
    if (viewId === "insights") {
      syncInsightsSelect();
    } else if (viewId === "roadmap") {
      syncRoadmapSelect();
    }
  }

  navItems.forEach(item => {
    item.addEventListener("click", (e) => {
      const viewId = item.getAttribute("data-view");
      if (viewId) {
        e.preventDefault();
        navigate(viewId);
      }
    });
  });

  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.substring(1) || "dashboard";
    navigate(hash);
  });

  const initialHash = window.location.hash.substring(1) || "dashboard";
  navigate(initialHash);
}

// Onboarding Modal
function initOnboarding() {
  const btnSave = document.getElementById("btn-save-profile");
  
  btnSave.addEventListener("click", () => {
    const nameInput = document.getElementById("profile-name").value.trim();
    const companyInput = document.getElementById("profile-company").value;
    const roleInput = document.getElementById("profile-role").value;
    const levelInput = document.getElementById("profile-level").value;
    
    if (!nameInput) {
      showToast("Please enter your name to initialize.", "error");
      return;
    }
    
    userProfile.name = nameInput;
    userProfile.company = companyInput;
    userProfile.role = roleInput;
    userProfile.level = levelInput;
    
    saveData();
    updateUIFromProfile();
    showOnboarding(false);
    showToast(`Welcome to PrepAURA, ${nameInput}! Target dashboard loaded.`, "success");
  });
  
  document.getElementById("trigger-onboarding").addEventListener("click", () => {
    showOnboarding(true);
  });
}

function showOnboarding(show) {
  const modal = document.getElementById("onboarding-modal");
  if (show) {
    document.getElementById("profile-name").value = userProfile.name || "";
    document.getElementById("profile-company").value = userProfile.company;
    document.getElementById("profile-role").value = userProfile.role;
    document.getElementById("profile-level").value = userProfile.level;
    modal.style.display = "flex";
  } else {
    modal.style.display = "none";
  }
}

function updateUIFromProfile() {
  const companyData = COMPANIES[userProfile.company] || COMPANIES.google;
  
  const roleNameMap = {
    "software-engineer": "SWE",
    "product-manager": "PM",
    "ui-ux-designer": "UX Designer",
    "data-analyst": "Data Analyst"
  };
  const roleLabel = roleNameMap[userProfile.role] || "Professional";
  
  // Update sidebar profile card
  document.getElementById("user-display-name").textContent = userProfile.name;
  document.getElementById("user-display-role").textContent = `${roleLabel} @ ${companyData.name}`;
  document.getElementById("avatar-placeholder").textContent = userProfile.name.charAt(0).toUpperCase();

  // Dashboard Target metrics
  document.getElementById("dashboard-welcome").textContent = `Welcome back, ${userProfile.name}! Track your preparation for ${companyData.name}.`;
  document.getElementById("focus-role").textContent = roleLabel;
  document.getElementById("focus-company").textContent = companyData.name;
  
  const levelNameMap = {
    "entry": "Entry-Level",
    "junior": "Junior / Associate",
    "mid": "Mid-Level",
    "senior": "Senior / Lead"
  };
  document.getElementById("badge-level").textContent = levelNameMap[userProfile.level] || "Junior";

  // Calculate Roadmap Progress
  updateRoadmapProgress();
  
  // Render Summary lists
  renderDashboardRoadmapSummary();
  renderGoalsList();
}

// Local Storage Handlers
function loadData() {
  const stored = localStorage.getItem("prepaura_user_profile");
  if (stored) {
    try {
      userProfile = JSON.parse(stored);
      if (!userProfile.completedSkills) userProfile.completedSkills = [];
      if (!userProfile.goals) userProfile.goals = [];
    } catch (e) {
      console.error("Failed to parse user profile history", e);
    }
  }
}

function saveData() {
  localStorage.setItem("prepaura_user_profile", JSON.stringify(userProfile));
}

// Dashboard Page Handlers
function initDashboard() {
  document.getElementById("btn-quick-insights").addEventListener("click", () => {
    window.location.hash = "insights";
  });
  
  document.getElementById("btn-go-roadmap").addEventListener("click", () => {
    window.location.hash = "roadmap";
  });
  
  document.querySelector('[data-action="run-mock-interview"]').addEventListener("click", () => {
    window.location.hash = "interview";
  });
  
  document.querySelector('[data-action="optimize-resume"]').addEventListener("click", () => {
    window.location.hash = "analyzer";
  });

  // Goals List Handlers
  const btnAddGoal = document.getElementById("btn-add-goal");
  const btnCancelGoal = document.getElementById("btn-cancel-goal");
  const btnSaveGoal = document.getElementById("btn-save-goal");
  const goalForm = document.getElementById("goal-form");
  
  btnAddGoal.addEventListener("click", () => {
    goalForm.style.display = "flex";
    document.getElementById("new-goal-input").focus();
  });
  
  btnCancelGoal.addEventListener("click", () => {
    goalForm.style.display = "none";
    document.getElementById("new-goal-input").value = "";
  });
  
  btnSaveGoal.addEventListener("click", () => {
    const text = document.getElementById("new-goal-input").value.trim();
    if (!text) return;
    
    userProfile.goals.push({
      id: "goal-" + Date.now(),
      text: text,
      completed: false
    });
    
    saveData();
    renderGoalsList();
    
    goalForm.style.display = "none";
    document.getElementById("new-goal-input").value = "";
    showToast("Preparation goal added!", "success");
  });
}

function updateRoadmapProgress() {
  const currentRoadmap = ROADMAPS[userProfile.role] || [];
  const total = currentRoadmap.length;
  
  if (total === 0) {
    document.getElementById("roadmap-progress-bar").style.width = "0%";
    document.getElementById("roadmap-progress-text").textContent = "0% (0 of 0 skills)";
    return;
  }
  
  const currentRoleCompleted = currentRoadmap.filter(node => userProfile.completedSkills.includes(node.id));
  const completedCount = currentRoleCompleted.length;
  const percentage = Math.round((completedCount / total) * 100);
  
  document.getElementById("roadmap-progress-bar").style.width = `${percentage}%`;
  document.getElementById("roadmap-progress-text").textContent = `${percentage}% (${completedCount} of ${total} skills mastered)`;
}

function renderDashboardRoadmapSummary() {
  const container = document.getElementById("dashboard-roadmap-summary-list");
  const currentRoadmap = ROADMAPS[userProfile.role] || [];
  
  if (currentRoadmap.length === 0) {
    container.innerHTML = `<p class="placeholder-text">Please set up your profile to view your customized roadmap milestones.</p>`;
    return;
  }
  
  container.innerHTML = "";
  
  currentRoadmap.forEach(skill => {
    const isCompleted = userProfile.completedSkills.includes(skill.id);
    
    const summaryItem = document.createElement("div");
    summaryItem.className = `roadmap-summary-item ${isCompleted ? 'completed' : ''}`;
    
    summaryItem.innerHTML = `
      <div class="summary-check-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <div class="summary-content">
        <span class="summary-title">${skill.title}</span>
        <span class="summary-tag">${skill.category}</span>
      </div>
    `;
    
    summaryItem.addEventListener("click", () => {
      window.location.hash = "roadmap";
      setTimeout(() => {
        const nodeEl = document.querySelector(`.roadmap-node[data-node-id="${skill.id}"]`);
        if (nodeEl) nodeEl.click();
      }, 150);
    });
    
    container.appendChild(summaryItem);
  });
}

function renderGoalsList() {
  const container = document.getElementById("dashboard-goals-list");
  
  if (userProfile.goals.length === 0) {
    container.innerHTML = `<li class="goal-item empty-state">No goals set yet. Click '+' to define one!</li>`;
    return;
  }
  
  container.innerHTML = "";
  
  userProfile.goals.forEach(goal => {
    const li = document.createElement("li");
    li.className = `goal-item ${goal.completed ? 'completed' : ''}`;
    
    li.innerHTML = `
      <div class="goal-checkbox-container">
        <div class="goal-checkbox">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span class="goal-text">${goal.text}</span>
      </div>
      <button class="btn-goal-delete" title="Delete goal">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    `;
    
    li.querySelector(".goal-checkbox-container").addEventListener("click", () => {
      goal.completed = !goal.completed;
      saveData();
      renderGoalsList();
    });
    
    li.querySelector(".btn-goal-delete").addEventListener("click", (e) => {
      e.stopPropagation();
      userProfile.goals = userProfile.goals.filter(g => g.id !== goal.id);
      saveData();
      renderGoalsList();
    });
    
    container.appendChild(li);
  });
}

// Company Insights View Page Handlers
function initInsightsView() {
  const select = document.getElementById("insights-company-select");
  
  select.addEventListener("change", () => {
    loadCompanyInsights(select.value);
  });
}

function syncInsightsSelect() {
  const select = document.getElementById("insights-company-select");
  select.value = userProfile.company;
  loadCompanyInsights(userProfile.company);
}

function loadCompanyInsights(companyId) {
  const company = COMPANIES[companyId] || COMPANIES.google;
  
  // Set headers
  document.getElementById("insights-company-name").textContent = company.name;
  document.getElementById("insights-company-tagline").textContent = company.tagline;
  document.getElementById("insights-culture-desc").textContent = company.culture.desc;
  
  // Logo setup
  const logo = document.getElementById("insights-logo-glow");
  logo.textContent = company.name.charAt(0);
  logo.style.background = company.color;
  logo.style.boxShadow = `0 0 15px rgba(255,255,255,0.1)`;

  // Principles Checklist
  const principlesContainer = document.getElementById("insights-principles-list");
  principlesContainer.innerHTML = "";
  
  company.culture.principles.forEach(pr => {
    const li = document.createElement("li");
    li.textContent = pr;
    principlesContainer.appendChild(li);
  });

  // Timeline of Rounds
  const timelineContainer = document.getElementById("insights-timeline-container");
  timelineContainer.innerHTML = "";
  
  const roleRounds = company.rounds[userProfile.role] || company.rounds["software-engineer"];
  
  const roleNameMap = {
    "software-engineer": "Software Engineer",
    "product-manager": "Product Manager",
    "ui-ux-designer": "UI/UX Designer",
    "data-analyst": "Data Analyst"
  };
  document.getElementById("insights-role-label").textContent = roleNameMap[userProfile.role] || "Software Engineer";

  roleRounds.forEach((round, index) => {
    const div = document.createElement("div");
    div.className = "timeline-item";
    
    // Convert round type to badge label
    const typeLabel = round.type.toUpperCase();
    
    div.innerHTML = `
      <div class="timeline-marker">${index + 1}</div>
      <div class="timeline-content">
        <div class="timeline-header-row">
          <span class="timeline-title">${round.title}</span>
          <span class="badge">${typeLabel}</span>
        </div>
        <p class="timeline-desc">${round.desc}</p>
      </div>
    `;
    
    timelineContainer.appendChild(div);
  });
}

// Job & Resume Analyzer View Page Handlers
function initAnalyzerView() {
  const btnJd = document.getElementById("btn-analyze-jd");
  const jdInput = document.getElementById("analyzer-jd-input");
  const jdPanel = document.getElementById("jd-cheat-sheet-panel");
  
  const btnResume = document.getElementById("btn-analyze-resume");
  const resumeInput = document.getElementById("analyzer-resume-input");
  const resumePanel = document.getElementById("resume-feedback-panel");

  // JD Analyzer Trigger
  btnJd.addEventListener("click", () => {
    const text = jdInput.value.trim();
    if (!text) {
      showToast("Please paste a Job Description first.", "error");
      return;
    }
    
    jdPanel.style.display = "block";
    
    // Extract keywords
    const keywords = extractKeywordsFromJD(text);
    const cloud = document.getElementById("jd-extracted-keywords");
    cloud.innerHTML = "";
    
    if (keywords.length === 0) {
      cloud.innerHTML = `<span class="placeholder-text">No technical keywords extracted. Focus on general interview loops.</span>`;
    } else {
      keywords.slice(0, 10).forEach(kw => {
        const pill = document.createElement("span");
        pill.className = "keyword-pill matched";
        pill.textContent = kw;
        cloud.appendChild(pill);
      });
    }

    // Set metrics based on word count
    const words = text.split(/\s+/).length;
    const lenText = words < 150 ? "Short" : words < 400 ? "Medium" : "Comprehensive";
    document.getElementById("jd-length-text").textContent = lenText;

    // Technical depth estimation
    const hasCoreTech = keywords.some(k => ["System Design", "SQL", "Algorithms", "Python", "Data Structures"].includes(k));
    document.getElementById("jd-depth-text").textContent = hasCoreTech ? "High Depth" : "Standard Depth";

    // Set core focus tips
    const tipsContainer = document.getElementById("jd-focus-areas");
    tipsContainer.innerHTML = "";
    
    const companyName = COMPANIES[userProfile.company]?.name || "target company";
    
    const focusItems = [
      `Align preparation to ${companyName}'s core values.`,
      `Review technical skills matching: ${keywords.slice(0, 4).join(', ') || 'core standards'}.`,
      `Prepare 2 behavioral STAR stories demonstrating ownership and technical execution.`
    ];

    focusItems.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      tipsContainer.appendChild(li);
    });

    showToast("Job description analyzed. Cheat sheet generated!", "success");
  });

  // Resume Analyzer Trigger
  btnResume.addEventListener("click", () => {
    const resumeText = resumeInput.value.trim();
    const jdText = jdInput.value.trim();
    
    if (!resumeText) {
      showToast("Please paste your resume bullets first.", "error");
      return;
    }

    const analysis = analyzeResumeData(userProfile.company, userProfile.role, resumeText, jdText);
    
    if (!analysis) {
      showToast("Could not parse resume text.", "error");
      return;
    }

    resumePanel.style.display = "block";
    
    // Populate Score Rings
    document.getElementById("resume-score-impact").textContent = `${analysis.impactScore}/100`;
    document.getElementById("resume-score-keywords").textContent = `${analysis.keywordScore}/100`;

    // Populate Keywords cloud
    const cloud = document.getElementById("resume-keywords-cloud");
    cloud.innerHTML = "";
    
    analysis.matchedKeywords.forEach(kw => {
      const pill = document.createElement("span");
      pill.className = "keyword-pill matched";
      pill.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        ${kw}
      `;
      cloud.appendChild(pill);
    });

    analysis.missingKeywords.forEach(kw => {
      const pill = document.createElement("span");
      pill.className = "keyword-pill missing";
      pill.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        ${kw}
      `;
      cloud.appendChild(pill);
    });

    // Suggested Rewrites
    const rewritesContainer = document.getElementById("resume-rewrites-list");
    rewritesContainer.innerHTML = "";
    
    analysis.rewrites.forEach(rw => {
      const div = document.createElement("div");
      div.className = "rewrite-item";
      div.innerHTML = `
        <div class="rewrite-original">"${rw.original}"</div>
        <div class="rewrite-improved">${rw.improved}</div>
      `;
      rewritesContainer.appendChild(div);
    });

    // Structure Tips
    const tipsContainer = document.getElementById("resume-structure-tips");
    tipsContainer.innerHTML = "";
    
    analysis.structureTips.forEach(tip => {
      const li = document.createElement("li");
      li.textContent = tip;
      tipsContainer.appendChild(li);
    });

    showToast("Resume optimized for target job!", "success");
  });
}

// Roadmap View Page Handlers
function initRoadmapView() {
  const select = document.getElementById("roadmap-role-select");
  
  const roleOptions = {
    "software-engineer": "Software Engineer",
    "product-manager": "Product Manager",
    "ui-ux-designer": "UI/UX Designer",
    "data-analyst": "Data Analyst"
  };
  
  select.innerHTML = "";
  Object.entries(roleOptions).forEach(([val, label]) => {
    const opt = document.createElement("option");
    opt.value = val;
    opt.textContent = label;
    select.appendChild(opt);
  });
  
  select.addEventListener("change", () => {
    renderRoadmapTree(select.value);
  });

  document.getElementById("btn-toggle-skill-complete").addEventListener("click", () => {
    if (!activeRoadmapNode) return;
    
    const index = userProfile.completedSkills.indexOf(activeRoadmapNode.id);
    if (index > -1) {
      userProfile.completedSkills = userProfile.completedSkills.filter(id => id !== activeRoadmapNode.id);
      showToast("Milestone stage marked incomplete.", "info");
    } else {
      userProfile.completedSkills.push(activeRoadmapNode.id);
      showToast("Milestone stage mastered!", "success");
    }
    
    saveData();
    updateRoadmapProgress();
    renderDashboardRoadmapSummary();
    renderRoadmapTree(select.value);
    loadRoadmapSkillDetails(activeRoadmapNode);
  });
}

function syncRoadmapSelect() {
  const select = document.getElementById("roadmap-role-select");
  select.value = userProfile.role;
  renderRoadmapTree(userProfile.role);
}

function renderRoadmapTree(role) {
  renderRoadmap(
    "roadmap-tree-container", 
    role, 
    userProfile.completedSkills, 
    activeRoadmapNode ? activeRoadmapNode.id : null,
    (node) => {
      loadRoadmapSkillDetails(node);
    }
  );
}

function loadRoadmapSkillDetails(node) {
  activeRoadmapNode = node;
  
  document.getElementById("roadmap-pane-placeholder").style.display = "none";
  const content = document.getElementById("roadmap-pane-content");
  content.style.display = "flex";
  content.style.flexDirection = "column";
  content.style.height = "100%";
  
  document.getElementById("skill-category").textContent = node.category;
  document.getElementById("skill-title").textContent = node.title;
  document.getElementById("skill-desc").textContent = node.desc;
  
  const checklistContainer = document.getElementById("skill-checklist");
  checklistContainer.innerHTML = "";
  
  node.checklist.forEach(item => {
    const label = document.createElement("label");
    label.className = "checklist-item";
    const isMastered = userProfile.completedSkills.includes(node.id);
    
    label.innerHTML = `
      <input type="checkbox" ${isMastered ? 'checked' : ''} disabled>
      <span>${item}</span>
    `;
    checklistContainer.appendChild(label);
  });

  const resourcesContainer = document.getElementById("skill-resources");
  resourcesContainer.innerHTML = "";
  
  node.resources.forEach(res => {
    const li = document.createElement("li");
    li.className = "resource-link-item";
    li.innerHTML = `
      <a href="${res.url}" target="_blank" rel="noopener">
        <span>${res.title}</span>
        <span class="resource-type">${res.type}</span>
      </a>
    `;
    resourcesContainer.appendChild(li);
  });

  const btn = document.getElementById("btn-toggle-skill-complete");
  const isMastered = userProfile.completedSkills.includes(node.id);
  if (isMastered) {
    btn.textContent = "Mark as Incomplete";
    btn.className = "btn btn-secondary w-full";
  } else {
    btn.textContent = "Mark as Mastered";
    btn.className = "btn btn-primary w-full";
  }
}

// Mock Interview View Page Handlers
function initInterviewView() {
  const setupPanel = document.getElementById("interview-setup-panel");
  const simPanel = document.getElementById("interview-simulation-panel");
  const evalPanel = document.getElementById("interview-evaluation-panel");
  
  const btnStart = document.getElementById("btn-start-interview");
  const btnEnd = document.getElementById("btn-end-interview");
  const btnSubmit = document.getElementById("btn-submit-answer");
  const btnMic = document.getElementById("btn-toggle-mic");

  // Sync default options
  document.getElementById("interview-company").value = userProfile.company;
  document.getElementById("interview-role").value = userProfile.role;

  btnStart.addEventListener("click", () => {
    const company = document.getElementById("interview-company").value;
    const role = document.getElementById("interview-role").value;
    const type = document.getElementById("interview-type").value;
    const level = document.getElementById("interview-level").value;
    
    // Fetch question from company specific pool
    const pool = COMPANY_INTERVIEW_QUESTIONS[company]?.[type] || COMPANY_INTERVIEW_QUESTIONS.google.behavioral;
    const randomizedQ = pool[Math.floor(Math.random() * pool.length)];

    activeInterviewSession = {
      company: company,
      role: role,
      type: type,
      level: level,
      question: randomizedQ
    };

    setupPanel.style.display = "none";
    evalPanel.style.display = "none";
    simPanel.style.display = "flex";

    document.getElementById("sim-badge-type").textContent = `${company.toUpperCase()} // ${type.toUpperCase()}`;
    document.getElementById("sim-progress-indicator").textContent = "Question 1 of 1";
    document.getElementById("interview-question-bubble").textContent = `"${randomizedQ}"`;
    document.getElementById("interview-user-response").value = "";

    // Set interviewer avatar background color based on company
    const avatar = document.getElementById("interview-avatar-glow");
    const compColorMap = {
      google: "linear-gradient(135deg, #4285F4, #34A853)",
      amazon: "linear-gradient(135deg, #FF9900, #146B93)",
      meta: "linear-gradient(135deg, #0081FB, #0466C8)",
      netflix: "linear-gradient(135deg, #E50914, #801015)",
      stripe: "linear-gradient(135deg, #635BFF, #00D4B2)"
    };
    avatar.style.background = compColorMap[company] || "linear-gradient(135deg, var(--cyan), var(--primary))";

    initWaveform("waveform-canvas");
  });

  btnEnd.addEventListener("click", () => {
    if (confirm("End mock session? Progress will not be saved.")) {
      simPanel.style.display = "none";
      setupPanel.style.display = "block";
      stopWaveformAnimation();
    }
  });

  btnMic.addEventListener("click", () => {
    const isRecording = btnMic.classList.toggle("recording");
    
    if (isRecording) {
      startWaveformAnimation();
      document.getElementById("waveform-status-text").textContent = "Voice input simulation active. Speak now...";
      
      setTimeout(() => {
        if (btnMic.classList.contains("recording")) {
          const textarea = document.getElementById("interview-user-response");
          
          let transcript = "";
          if (activeInterviewSession.company === "amazon") {
            transcript = "In my last role, I took complete ownership of a bug that was delaying the monthly release. Situation: checkout screens failed. Action: I stayed late, reviewed codebase logs, and wrote a clean patch. Result: we shipped on time.";
          } else {
            transcript = "In our dashboard migration, situation was ambiguous because requirements weren't fully defined. Action: I built an MVP prototype to test parameters with user research, then optimized loading. Result: speed metrics improved by 35%.";
          }
          
          textarea.value = transcript;
          showToast("Simulated voice transcription loaded.", "info");
          btnMic.click();
        }
      }, 3000);
    } else {
      stopWaveformAnimation();
      document.getElementById("waveform-status-text").textContent = "Transcription complete. You can edit text before submitting.";
    }
  });

  btnSubmit.addEventListener("click", () => {
    const answer = document.getElementById("interview-user-response").value.trim();
    if (!answer) {
      showToast("Please enter or dictate an answer first.", "error");
      return;
    }

    stopWaveformAnimation();

    const report = gradeInterviewAnswer(
      activeInterviewSession.company,
      activeInterviewSession.role,
      activeInterviewSession.type,
      activeInterviewSession.question,
      answer
    );

    simPanel.style.display = "none";
    evalPanel.style.display = "block";

    const circle = document.getElementById("eval-score-circle");
    const scoreText = document.getElementById("eval-score-text");
    circle.setAttribute("stroke-dasharray", `${report.score}, 100`);

    let currentScore = 0;
    const interval = setInterval(() => {
      if (currentScore >= report.score) {
        clearInterval(interval);
      } else {
        currentScore++;
        scoreText.textContent = currentScore;
      }
    }, 10);

    document.getElementById("eval-summary").textContent = report.summary;
    
    const strengthsUl = document.getElementById("eval-strengths");
    strengthsUl.innerHTML = "";
    report.strengths.forEach(s => {
      const li = document.createElement("li");
      li.textContent = s;
      strengthsUl.appendChild(li);
    });

    const improvementsUl = document.getElementById("eval-improvements");
    improvementsUl.innerHTML = "";
    report.improvements.forEach(imp => {
      const li = document.createElement("li");
      li.textContent = imp;
      improvementsUl.appendChild(li);
    });

    document.getElementById("eval-coach-tip").textContent = report.coachTip;
  });

  document.getElementById("btn-restart-interview-setup").addEventListener("click", () => {
    evalPanel.style.display = "none";
    setupPanel.style.display = "block";
  });
}

// Settings Page Handlers
function initSettings() {
  const btnSave = document.getElementById("btn-save-settings");
  const inputKey = document.getElementById("api-key-gemini");
  
  const savedKey = localStorage.getItem("prepaura_gemini_api_key");
  if (savedKey) {
    inputKey.value = savedKey;
  }
  
  btnSave.addEventListener("click", () => {
    const key = inputKey.value.trim();
    if (key) {
      localStorage.setItem("prepaura_gemini_api_key", key);
      showToast("Gemini API Key configured successfully.", "success");
    } else {
      localStorage.removeItem("prepaura_gemini_api_key");
      showToast("API Key cleared. Switching back to offline simulator mode.", "info");
    }
  });
  
  document.getElementById("btn-reset-onboarding").addEventListener("click", () => {
    showOnboarding(true);
  });
  
  document.getElementById("btn-clear-all-data").addEventListener("click", () => {
    if (confirm("CRITICAL WARNING: This will permanently delete all your progress data, targets, and goals databases. Proceed?")) {
      localStorage.clear();
      showToast("All databases cleared. Reloading application...", "warning");
      setTimeout(() => {
        window.location.hash = "dashboard";
        window.location.reload();
      }, 1500);
    }
  });
}

// Toast Notification Manager
function showToast(message, type = "info") {
  const container = document.getElementById("toast-box");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = "fadeIn 0.2s reverse forwards";
    setTimeout(() => {
      toast.remove();
    }, 200);
  }, 3500);
}
