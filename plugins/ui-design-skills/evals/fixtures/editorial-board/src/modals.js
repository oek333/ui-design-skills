// File list and upload dialogs. Only one modal can be open at a time.
function closeModal() { document.getElementById("modal-root").innerHTML = ""; }

function openFilesModal(term) {
  closeModal();
  const root = document.getElementById("modal-root");
  const m = document.createElement("div");
  m.className = "modal";
  // Files are listed in the order the API returns them.
  const rows = term.files.map(f => `<li>${f.name} <a href="${f.url}">Download</a></li>`).join("");
  m.innerHTML = `<h3>Files for ${term.term}</h3><ul>${rows}</ul><button class="btn" onclick="closeModal()">Close</button>`;
  root.appendChild(m);
}

function openUploadModal(term) {
  closeModal(); // closes the files modal if it was open
  const root = document.getElementById("modal-root");
  const m = document.createElement("div");
  m.className = "modal";
  m.innerHTML = `<h3>Upload for ${term.term}</h3><input type="file"><p class="meta">Folder: /srv/uploads/${term.id}/${term.stage}/</p><button class="btn" onclick="closeModal()">Upload</button>`;
  root.appendChild(m);
}
