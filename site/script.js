// ============================================
// UTILITY FUNCTIONS
// ============================================

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

// ============================================
// LOCALSTORAGE MANAGEMENT
// ============================================

const storage = {
  get: (key, defaultValue = null) => {
    try {
      return JSON.parse(localStorage.getItem(key)) || defaultValue;
    } catch {
      return defaultValue;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Storage error:", e);
    }
  },
  toggle: (key, itemId) => {
    const items = storage.get(key, []);
    const index = items.indexOf(itemId);
    if (index > -1) {
      items.splice(index, 1);
    } else {
      items.push(itemId);
    }
    storage.set(key, items);
    return items.includes(itemId);
  }
};

// ============================================
// DARK MODE
// ============================================

const syncThemeToggle = () => {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  const dark = document.body.classList.contains("dark-mode");
  btn.textContent = dark ? "☀️" : "🌙";
  btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  btn.setAttribute("title", dark ? "Light mode" : "Dark mode");
};

const initDarkMode = () => {
  const isDark = storage.get("darkMode", false);
  if (isDark) {
    document.body.classList.add("dark-mode");
  }
  syncThemeToggle();
};

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
  storage.set("darkMode", document.body.classList.contains("dark-mode"));
  syncThemeToggle();
};

// ============================================
// SEARCH AND FILTER
// ============================================

const notesList = document.getElementById("notes-list");
const bookmarksList = document.getElementById("bookmarks-list");
const searchInput = document.getElementById("note-search");
const filterButtons = document.getElementById("filter-buttons");
const bookmarksSection = document.getElementById("bookmarks");
let currentCategory = "All";

const createFilterButtons = () => {
  if (!filterButtons) return;
  
  const categories = ["All", ...new Set((window.DATA_STRUCTURE_NOTES || []).map(n => n.category))];
  
  filterButtons.innerHTML = categories
    .map(cat => `<button class="filter-btn ${cat === "All" ? "active" : ""}" data-category="${cat}">${cat}</button>`)
    .join("");

  filterButtons.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.dataset.category;
      applyFilters();
    });
  });
};

const searchInCode = (code, query) => {
  return code.toLowerCase().includes(query);
};

const applyFilters = () => {
  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const notes = window.DATA_STRUCTURE_NOTES || [];
  
  const filtered = notes.filter(note => {
    const matchesCategory = currentCategory === "All" || note.category === currentCategory;
    const matchesSearch = !query || 
      note.title.toLowerCase().includes(query) ||
      note.category.toLowerCase().includes(query) ||
      note.summary.toLowerCase().includes(query) ||
      note.path.toLowerCase().includes(query) ||
      searchInCode(note.code, query);
    
    return matchesCategory && matchesSearch;
  });

  renderNotes(filtered, notesList);
};

// ============================================
// NOTE RENDERING
// ============================================

const renderNotes = (notes, container) => {
  if (!container) return;

  const bookmarkedIds = storage.get("bookmarkedNotes", []);
  const importantIds = storage.get("importantNotes", {});
  const progressData = storage.get("noteProgress", {});

  const noteHtml = notes
    .map((note, idx) => {
      const isBookmarked = bookmarkedIds.includes(note.title);
      const metadata = importantIds[note.title] || {};
      const progress = progressData[note.title] || {};

      const statusBadges = [
        metadata.important ? '<span class="badge important">Important</span>' : '',
        metadata.interview ? '<span class="badge interview">Interview Q</span>' : '',
        metadata.needsRevision ? '<span class="badge revision">Needs Revision</span>' : '',
        progress.revised ? '<span class="badge revised">✓ Revised</span>' : ''
      ].filter(Boolean).join('');

      return `
        <article class="note-card" data-title="${escapeHtml(note.title)}" data-index="${idx}">
          <div class="note-card-toolbar">
            <div class="note-status-badges">
              ${statusBadges}
            </div>
            <div class="note-card-actions">
              <button class="card-action-btn bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" title="Bookmark" aria-label="Bookmark note">🔖</button>
              <button class="card-action-btn expand-btn" title="Expand" aria-label="Expand note">⤢</button>
              <button class="card-action-btn menu-btn" title="Mark" aria-label="Mark note">⋯</button>
            </div>
          </div>

          <div class="note-card__header">
            <div>
              <p class="note-category">${escapeHtml(note.category)}</p>
              <h3>${escapeHtml(note.title)}</h3>
            </div>
            <a class="note-source" href="${escapeHtml(note.githubUrl)}" target="_blank" rel="noreferrer">GitHub</a>
          </div>
          <p class="note-summary">${escapeHtml(note.summary)}</p>
          <p class="note-path">${escapeHtml(note.path)}</p>
          <details class="code-panel">
            <summary>Show code</summary>
            <pre><code>${escapeHtml(note.code)}</code><button class="copy-code-btn">Copy Code</button></pre>
          </details>
        </article>
      `;
    })
    .join("");

  container.innerHTML = noteHtml;

  // Attach event listeners
  container.querySelectorAll(".note-card").forEach((card) => {
    const title = card.dataset.title;
    const bookmarkBtn = card.querySelector(".bookmark-btn");
    const expandBtn = card.querySelector(".expand-btn");
    const menuBtn = card.querySelector(".menu-btn");
    const copyBtn = card.querySelector(".copy-code-btn");

    // Bookmark
    if (bookmarkBtn) {
      bookmarkBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isBookmarked = storage.toggle("bookmarkedNotes", title);
        bookmarkBtn.classList.toggle("bookmarked", isBookmarked);
        updateBookmarksSection();
      });
    }

    // Expand
    if (expandBtn) {
      expandBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openNoteModal(notes[parseInt(card.dataset.index)]);
      });
    }

    // Menu
    if (menuBtn) {
      menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        showMarkMenu(card, title);
      });
    }

    // Copy code
    if (copyBtn) {
      copyBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const code = card.querySelector("code").textContent;
        navigator.clipboard.writeText(code).then(() => {
          showCopyFeedback("Code copied!");
        });
      });
    }
  });
};

// ============================================
// BOOKMARKS SECTION
// ============================================

const updateBookmarksSection = () => {
  const bookmarkedIds = storage.get("bookmarkedNotes", []);
  const notes = window.DATA_STRUCTURE_NOTES || [];
  const bookmarkedNotes = notes.filter(n => bookmarkedIds.includes(n.title));

  if (bookmarksSection) {
    bookmarksSection.style.display = bookmarkedNotes.length > 0 ? "block" : "none";
    if (bookmarksList) {
      if (bookmarkedNotes.length > 0) {
        renderNotes(bookmarkedNotes, bookmarksList);
      } else {
        bookmarksList.innerHTML = '<p style="text-align: center; color: var(--muted);">No bookmarked notes yet</p>';
      }
    }
  }
};

// ============================================
// NOTE MODAL
// ============================================

const modal = document.getElementById("note-modal");
const modalBody = document.getElementById("modal-body");
const modalClose = document.querySelector(".modal-close");

const openNoteModal = (note) => {
  const progress = storage.get("noteProgress", {})[note.title] || {};
  const metadata = storage.get("importantNotes", {})[note.title] || {};

  const modalHtml = `
    <div class="modal-note">
      <div class="modal-header">
        <h2 class="modal-title">${escapeHtml(note.title)}</h2>
        <div class="modal-meta">
          <span class="badge" style="background: rgba(239,71,111,0.1); color: var(--accent);">${escapeHtml(note.category)}</span>
          <a href="${escapeHtml(note.githubUrl)}" target="_blank" rel="noreferrer" style="color: var(--accent); text-decoration: none; font-size: 0.9rem;">📄 View Source</a>
        </div>
      </div>

      <div class="modal-section">
        <h3>Summary</h3>
        <p>${escapeHtml(note.summary)}</p>
      </div>

      <div class="modal-section">
        <h3>Code</h3>
        <pre style="background: #0f172a; color: #e2e8f0; padding: 1rem; border-radius: 8px; overflow-x: auto;"><code>${escapeHtml(note.code)}</code></pre>
      </div>

      <div class="modal-section">
        <h3>Progress</h3>
        <div class="progress-checkbox">
          <input type="checkbox" id="revised-today" ${progress.revised ? 'checked' : ''} />
          <label for="revised-today">Revised today</label>
        </div>
      </div>

      <div class="modal-section">
        <h3>Marking</h3>
        <div class="progress-checkbox">
          <input type="checkbox" id="important-mark" ${metadata.important ? 'checked' : ''} />
          <label for="important-mark">Important</label>
        </div>
        <div class="progress-checkbox">
          <input type="checkbox" id="interview-mark" ${metadata.interview ? 'checked' : ''} />
          <label for="interview-mark">Interview Question</label>
        </div>
        <div class="progress-checkbox">
          <input type="checkbox" id="revision-mark" ${metadata.needsRevision ? 'checked' : ''} />
          <label for="revision-mark">Needs Revision</label>
        </div>
      </div>
    </div>
  `;

  modalBody.innerHTML = modalHtml;
  modal.classList.add("active");

  // Attach modal event listeners
  document.getElementById("revised-today")?.addEventListener("change", (e) => {
    const progress = storage.get("noteProgress", {});
    if (e.target.checked) {
      progress[note.title] = { revised: true, date: new Date().toISOString() };
      storage.set("lastRevised", new Date().toISOString());
    } else {
      if (progress[note.title]) delete progress[note.title];
    }
    storage.set("noteProgress", progress);
    updateDashboard();
    applyFilters();
  });

  document.getElementById("important-mark")?.addEventListener("change", (e) => {
    const metadata = storage.get("importantNotes", {});
    if (!metadata[note.title]) metadata[note.title] = {};
    metadata[note.title].important = e.target.checked;
    storage.set("importantNotes", metadata);
    applyFilters();
  });

  document.getElementById("interview-mark")?.addEventListener("change", (e) => {
    const metadata = storage.get("importantNotes", {});
    if (!metadata[note.title]) metadata[note.title] = {};
    metadata[note.title].interview = e.target.checked;
    storage.set("importantNotes", metadata);
    applyFilters();
  });

  document.getElementById("revision-mark")?.addEventListener("change", (e) => {
    const metadata = storage.get("importantNotes", {});
    if (!metadata[note.title]) metadata[note.title] = {};
    metadata[note.title].needsRevision = e.target.checked;
    storage.set("importantNotes", metadata);
    applyFilters();
  });
};

if (modalClose) {
  modalClose.addEventListener("click", () => {
    modal.classList.remove("active");
  });
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal?.classList.contains("active")) {
    modal.classList.remove("active");
  }
});

// ============================================
// MARK MENU (Quick marking from card)
// ============================================

const showMarkMenu = (card, title) => {
  const metadata = storage.get("importantNotes", {})[title] || {};
  
  const menu = document.createElement("div");
  menu.style.cssText = `
    position: absolute;
    background: var(--card);
    border: 1px solid #efe6d3;
    border-radius: 8px;
    padding: 0.5rem;
    gap: 0.5rem;
    display: flex;
    flex-direction: column;
    z-index: 100;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;

  const options = [
    { id: "important", label: "🔴 Important", key: "important" },
    { id: "interview", label: "💼 Interview", key: "interview" },
    { id: "revision", label: "📝 Revision", key: "needsRevision" }
  ];

  menu.innerHTML = options.map(opt => `
    <button style="background: none; border: none; text-align: left; padding: 0.4rem 0.6rem; cursor: pointer; color: var(--ink); border-radius: 4px; font-size: 0.9rem;" 
            class="menu-option" data-key="${opt.key}">
      ${metadata[opt.key] ? "✓ " : ""}${opt.label}
    </button>
  `).join("");

  card.style.position = "relative";
  card.appendChild(menu);

  menu.querySelectorAll(".menu-option").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.key;
      const allMeta = storage.get("importantNotes", {});
      if (!allMeta[title]) allMeta[title] = {};
      allMeta[title][key] = !allMeta[title][key];
      storage.set("importantNotes", allMeta);
      menu.remove();
      applyFilters();
    });
  });

  setTimeout(() => {
    document.addEventListener("click", function removeMenu(e) {
      if (!menu.contains(e.target)) {
        menu.remove();
        document.removeEventListener("click", removeMenu);
      }
    });
  }, 0);
};

// ============================================
// COPY FEEDBACK
// ============================================

const showCopyFeedback = (message) => {
  const feedback = document.createElement("div");
  feedback.className = "copy-feedback";
  feedback.textContent = message;
  document.body.appendChild(feedback);
  setTimeout(() => feedback.remove(), 3000);
};

// ============================================
// DASHBOARD
// ============================================

const updateDashboard = () => {
  const notes = window.DATA_STRUCTURE_NOTES || [];
  const categories = new Set(notes.map(n => n.category));
  const progress = storage.get("noteProgress", {});
  const lastRevised = storage.get("lastRevised", null);

  const totalNotes = notes.length;
  const totalCategories = categories.size;
  const revisedCount = Object.keys(progress).length;
  const progressPercentage = totalNotes
    ? Math.round((revisedCount / totalNotes) * 100)
    : 0;

  const lastRevisedEl = document.getElementById("last-revised");
  if (lastRevisedEl) {
    if (lastRevised) {
      const date = new Date(lastRevised);
      const today = new Date();
      const isToday = date.toDateString() === today.toDateString();
      lastRevisedEl.textContent = isToday ? "Today" : date.toLocaleDateString();
    } else {
      lastRevisedEl.textContent = "Never";
    }
  }

  const el = (id, val) => {
    const element = document.getElementById(id);
    if (element) element.textContent = val;
  };

  el("total-notes", totalNotes);
  el("total-categories", totalCategories);
  el("progress-percentage", `${progressPercentage}%`);
};

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = targetId ? document.querySelector(targetId) : null;
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  // Dark mode
  initDarkMode();
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleDarkMode);
  }

  // Filters and rendering
  if (window.DATA_STRUCTURE_NOTES && notesList) {
    createFilterButtons();
    applyFilters();
    updateDashboard();
    updateBookmarksSection();
  }

  // Search
  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }
});
