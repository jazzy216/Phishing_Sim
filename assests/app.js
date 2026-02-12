(function () {
  const STORAGE_KEY = "phish_sim_v1";

  const els = {
    emailList: document.getElementById("emailList"),
    pillCount: document.getElementById("pillCount"),
    emptyState: document.getElementById("emptyState"),
    emailView: document.getElementById("emailView"),

    viewSubject: document.getElementById("viewSubject"),
    viewFrom: document.getElementById("viewFrom"),
    viewTo: document.getElementById("viewTo"),
    viewDate: document.getElementById("viewDate"),
    viewBody: document.getElementById("viewBody"),
    viewSignals: document.getElementById("viewSignals"),

    btnSafe: document.getElementById("btnSafe"),
    btnPhish: document.getElementById("btnPhish"),
    resultBox: document.getElementById("resultBox"),

    accuracyValue: document.getElementById("accuracyValue"),
    reviewedValue: document.getElementById("reviewedValue"),
    streakValue: document.getElementById("streakValue"),

    btnReset: document.getElementById("btnReset"),
    btnShuffle: document.getElementById("btnShuffle"),

    searchInput: document.getElementById("searchInput"),
    tabs: Array.from(document.querySelectorAll(".tab"))
  };

  const state = {
    emails: (window.TRAINING_EMAILS || []).map(e => ({ ...e })),
    selectedId: null,
    filter: "all",
    search: "",
    progress: loadProgress()
  };

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { decisions: {}, streak: 0 };
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return { decisions: {}, streak: 0 };
      return {
        decisions: parsed.decisions || {},
        streak: Number.isFinite(parsed.streak) ? parsed.streak : 0
      };
    } catch {
      return { decisions: {}, streak: 0 };
    }
  }

  function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
  }

  function shuffleEmails() {
    // Fisher-Yates
    for (let i = state.emails.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [state.emails[i], state.emails[j]] = [state.emails[j], state.emails[i]];
    }
  }

  function decisionBadge(decision) {
    if (!decision) return `<span class="badge unreviewed">Unreviewed</span>`;
    if (decision === "safe") return `<span class="badge safe">Marked Safe</span>`;
    if (decision === "phish") return `<span class="badge phish">Reported Phishing</span>`;
    return `<span class="badge unreviewed">Unreviewed</span>`;
  }

  function emailMatchesFilters(email) {
    const decision = state.progress.decisions[email.id]?.decision || null;

    if (state.filter === "unreviewed" && decision) return false;
    if (state.filter === "reviewed" && !decision) return false;

    const q = state.search.trim().toLowerCase();
    if (!q) return true;

    const hay = `${email.fromName} ${email.fromEmail} ${email.subject}`.toLowerCase();
    return hay.includes(q);
  }

  function renderList() {
    const visible = state.emails.filter(emailMatchesFilters);
    els.pillCount.textContent = `${visible.length}`;

    els.emailList.innerHTML = visible.map(e => {
      const decision = state.progress.decisions[e.id]?.decision || null;
      const active = e.id === state.selectedId ? "is-active" : "";
      return `
        <li class="email-item ${active}" data-id="${escapeHtml(e.id)}" tabindex="0" role="button" aria-label="Open email: ${escapeHtml(e.subject)}">
          <div class="email-top">
            <div class="sender">${escapeHtml(e.fromName)}</div>
            <div class="date">${escapeHtml(e.date)}</div>
          </div>
          <div class="subject-line">
            ${decisionBadge(decision)}
            <div>${escapeHtml(e.subject)}</div>
          </div>
          <div class="preview">${escapeHtml(e.preview)}</div>
        </li>
      `;
    }).join("");

    // click handlers
    els.emailList.querySelectorAll(".email-item").forEach(li => {
      li.addEventListener("click", () => selectEmail(li.getAttribute("data-id")));
      li.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          selectEmail(li.getAttribute("data-id"));
        }
      });
    });

    updateScore();
  }

  function selectEmail(id) {
    const email = state.emails.find(e => e.id === id);
    if (!email) return;

    state.selectedId = id;

    els.emptyState.style.display = "none";
    els.emailView.classList.remove("is-hidden");

    els.viewSubject.textContent = email.subject;
    els.viewFrom.textContent = `${email.fromName} <${email.fromEmail}>`;
    els.viewTo.textContent = email.to || "you@training.local";
    els.viewDate.textContent = email.date;

    els.viewBody.innerHTML = email.bodyHtml;

    els.viewSignals.innerHTML = "";
    email.signals.forEach(s => {
      const li = document.createElement("li");
      li.textContent = s;
      els.viewSignals.appendChild(li);
    });

    // reset result panel
    els.resultBox.classList.add("is-hidden");
    els.resultBox.innerHTML = "";

    // enable/disable buttons if already decided
    const prior = state.progress.decisions[id]?.decision || null;
    els.btnSafe.disabled = !!prior;
    els.btnPhish.disabled = !!prior;

    renderList();
  }

  function gradeDecision(userDecision) {
    const email = state.emails.find(e => e.id === state.selectedId);
    if (!email) return;

    const truth = email.groundTruth; // "safe" | "phish"
    const correct = userDecision === truth;

    // update streak
    state.progress.streak = correct ? (state.progress.streak + 1) : 0;

    // store decision
    state.progress.decisions[email.id] = {
      decision: userDecision,
      correct,
      at: new Date().toISOString()
    };
    saveProgress();

    // show feedback
    const title = correct ? "Correct" : "Incorrect";
    const explain = correct
      ? `Nice. This email is classified as ${truth.toUpperCase()} in training because of the signals listed below.`
      : `This email is classified as ${truth.toUpperCase()} in training. Review the signals below and try to spot them earlier next time.`;

    els.resultBox.classList.remove("is-hidden");
    els.resultBox.innerHTML = `
      <div class="title">${title}</div>
      <div class="text">${escapeHtml(explain)}</div>
      <div class="text" style="margin-top:8px;">
        Your choice: <strong>${escapeHtml(userDecision.toUpperCase())}</strong> ·
        Ground truth: <strong>${escapeHtml(truth.toUpperCase())}</strong>
      </div>
    `;

    // lock buttons for this message
    els.btnSafe.disabled = true;
    els.btnPhish.disabled = true;

    renderList();
  }

  function updateScore() {
    const decisions = Object.values(state.progress.decisions || {});
    const reviewed = decisions.length;
    const correct = decisions.filter(d => d.correct).length;
    const accuracy = reviewed === 0 ? "—" : `${Math.round((correct / reviewed) * 100)}%`;

    els.accuracyValue.textContent = accuracy;
    els.reviewedValue.textContent = `${reviewed}/${state.emails.length}`;
    els.streakValue.textContent = `${state.progress.streak || 0}`;
  }

  function setFilter(next) {
    state.filter = next;
    els.tabs.forEach(t => {
      const active = t.getAttribute("data-filter") === next;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", active ? "true" : "false");
    });
    renderList();
  }

  function resetAll() {
    state.progress = { decisions: {}, streak: 0 };
    saveProgress();
    state.selectedId = null;
    els.emailView.classList.add("is-hidden");
    els.emptyState.style.display = "block";
    renderList();
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // wire up
  els.btnSafe.addEventListener("click", () => gradeDecision("safe"));
  els.btnPhish.addEventListener("click", () => gradeDecision("phish"));

  els.btnReset.addEventListener("click", resetAll);
  els.btnShuffle.addEventListener("click", () => {
    shuffleEmails();
    state.selectedId = null;
    els.emailView.classList.add("is-hidden");
    els.emptyState.style.display = "block";
    renderList();
  });

  els.searchInput.addEventListener("input", (ev) => {
    state.search = ev.target.value || "";
    renderList();
  });

  els.tabs.forEach(tab => {
    tab.addEventListener("click", () => setFilter(tab.getAttribute("data-filter")));
  });

  // init
  if (!Array.isArray(state.emails) || state.emails.length === 0) {
    els.pillCount.textContent = "0";
  } else {
    renderList();
  }
})();
