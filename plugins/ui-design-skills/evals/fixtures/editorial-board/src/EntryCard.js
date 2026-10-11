// Renders one term card on the board.
function EntryCard(term, stage) {
  const el = document.createElement("div");
  el.className = "card";
  el.innerHTML = `
    <div class="term">${term.term}</div>
    <div class="meta">Status: ${term.status_code}</div>
    <div class="meta">Assigned: ${term.assignee_role}</div>
    <div class="meta">${term.statusLabel}</div>
    <div class="divider"></div>
    <div class="meta">Current file: <span class="filename">${term.latestFileName || "—"}</span></div>
    <div class="footer"></div>
  `;
  const footer = el.querySelector(".footer");
  const view = document.createElement("button");
  view.className = "btn";
  view.textContent = "View files";
  view.onclick = () => openFilesModal(term);
  footer.appendChild(view);
  if (stage.uploadEnabled) {
    const up = document.createElement("button");
    up.className = "btn";
    up.textContent = "Upload";
    up.onclick = () => openUploadModal(term);
    footer.appendChild(up);
  }
  if (term.stage === "revision") {
    const send = document.createElement("button");
    send.className = "btn danger";
    send.textContent = "Send to copyedit";
    send.onclick = () => advance(term);
    footer.appendChild(send);
  }
  return el;
}
