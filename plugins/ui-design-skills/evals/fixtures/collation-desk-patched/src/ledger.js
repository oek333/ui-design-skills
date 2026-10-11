// Renders the ledger: one row per segment, one column per visible witness.
function visibleWitnesses(s) { return DATA.witnesses.filter(w => !s.hidden.has(w.id)); }

function renderLedger(s) {
  const ws = visibleWitnesses(s);
  const head = ws.map(w => `<th class="${s.selectedWitness === w.id ? "selected" : ""}">${w.siglum}</th>`).join("");
  const body = DATA.rows.map(r => "<tr>" + ws.map(w => {
    const t = r.readings[w.id];
    const cls = [t ? "" : "gap", s.selectedWitness === w.id ? "selected" : ""].join(" ");
    return `<td class="${cls}">${t || "—"}</td>`;
  }).join("") + "</tr>").join("");
  document.getElementById("ledger").innerHTML = `<table class="ledger"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}
subscribe(renderLedger);
