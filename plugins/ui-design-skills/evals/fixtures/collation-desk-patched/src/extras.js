// Added for the March demo: quick toggle to hide undated witnesses.
document.getElementById("dated-only").addEventListener("change", e => {
  const undated = DATA.witnesses.filter(w => w.date === null).map(w => w.siglum);
  document.querySelectorAll("table.ledger th").forEach((th, i) => {
    if (undated.includes(th.textContent)) {
      document.querySelectorAll(`table.ledger tr > :nth-child(${i + 1})`)
        .forEach(cell => cell.style.display = e.target.checked ? "none" : "");
    }
  });
});
