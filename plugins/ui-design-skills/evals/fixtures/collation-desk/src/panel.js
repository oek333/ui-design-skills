// Renders the right-hand witness panel.
function coverage(w) { return DATA.rows.filter(r => r.readings[w.id]).length; }

function renderPanel(s) {
  const rows = DATA.witnesses.map(w => `
    <div class="witness-row ${s.selectedWitness === w.id ? "selected" : ""}" data-id="${w.id}">
      <span><span class="siglum">${w.siglum}</span> ${w.library}</span>
      <span>
        <span class="badge present">${coverage(w)}/${DATA.rows.length}</span>
        <input type="checkbox" class="hide" data-id="${w.id}" ${s.hidden.has(w.id) ? "" : "checked"} title="Show in ledger">
      </span>
    </div>`).join("");
  document.getElementById("panel").innerHTML = `
    <section class="panel-section"><h3>Witnesses · ${DATA.witnesses.length}</h3>${rows}</section>`;
  document.querySelectorAll(".witness-row").forEach(el => el.onclick = e => {
    if (e.target.classList.contains("hide")) return;
    setState({ selectedWitness: el.dataset.id === s.selectedWitness ? null : el.dataset.id });
  });
  document.querySelectorAll(".hide").forEach(el => el.onchange = () => {
    const hidden = new Set(state.hidden);
    el.checked ? hidden.delete(el.dataset.id) : hidden.add(el.dataset.id);
    setState({ hidden });
  });
}
subscribe(renderPanel);
