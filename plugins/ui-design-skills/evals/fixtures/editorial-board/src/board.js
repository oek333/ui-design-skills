// Builds the columns and places cards.
function advance(term) {
  const order = BOARD.stages.map(s => s.id);
  term.stage = order[order.indexOf(term.stage) + 1];
  render();
}

function render() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  for (const stage of BOARD.stages) {
    const col = document.createElement("section");
    col.className = "column";
    col.innerHTML = `<h2>${stage.label}</h2>`;
    for (const term of BOARD.terms.filter(t => t.stage === stage.id)) {
      col.appendChild(EntryCard(term, stage));
    }
    board.appendChild(col);
  }
}
render();
