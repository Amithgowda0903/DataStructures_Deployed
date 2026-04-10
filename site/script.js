const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = targetId ? document.querySelector(targetId) : null;
    if (!target) {
      return;
    }
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const notesList = document.getElementById("notes-list");
const searchInput = document.getElementById("note-search");

const renderNotes = (notes) => {
  if (!notesList) {
    return;
  }

  notesList.innerHTML = notes
    .map(
      (note) => `
        <article class="note-card" data-note="${escapeHtml(
          `${note.title} ${note.category} ${note.summary} ${note.path}`
        ).toLowerCase()}">
          <div class="note-card__header">
            <div>
              <p class="note-category">${escapeHtml(note.category)}</p>
              <h3>${escapeHtml(note.title)}</h3>
            </div>
            <a class="note-source" href="${escapeHtml(note.githubUrl)}" target="_blank" rel="noreferrer">Open source</a>
          </div>
          <p class="note-summary">${escapeHtml(note.summary)}</p>
          <p class="note-path">${escapeHtml(note.path)}</p>
          <details class="code-panel">
            <summary>Show code</summary>
            <pre><code>${escapeHtml(note.code)}</code></pre>
          </details>
        </article>
      `
    )
    .join("");
};

if (window.DATA_STRUCTURE_NOTES && notesList) {
  renderNotes(window.DATA_STRUCTURE_NOTES);
}

if (searchInput && notesList) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = (window.DATA_STRUCTURE_NOTES || []).filter((note) =>
      `${note.title} ${note.category} ${note.summary} ${note.path}`
        .toLowerCase()
        .includes(query)
    );
    renderNotes(filtered);
  });
}
