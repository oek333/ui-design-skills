// Witnesses of one chapter and its aligned rows. `date` is the copy date (CE); null when undated.
window.DATA = {
  chapter: "The Lion and the Ox",
  witnesses: [
    { id: "P3465", siglum: "P1", library: "Paris, BnF arabe 3465", date: 1220 },
    { id: "R3655", siglum: "R",  library: "Rabat, BnF 3655",        date: 1265 },
    { id: "A4095", siglum: "A",  library: "Istanbul, Ayasofya 4095", date: 1352 },
    { id: "C112",  siglum: "C",  library: "Cairo, Dār al-Kutub adab 112", date: 1433 },
    { id: "P3475", siglum: "P2", library: "Paris, BnF arabe 3475", date: 1761 },
    { id: "L800",  siglum: "L",  library: "Leiden, Or. 800",        date: null }
  ],
  rows: [
    { id: "r1", readings: { P3465: "قال دبشليم الملك", R3655: "قال دبشليم الملك", A4095: "قال الملك دبشليم", C112: "قال دبشليم", P3475: "قال دبشليم الملك", L800: "قال دبشليم الملك" } },
    { id: "r2", readings: { P3465: "لبيدبا الفيلسوف", R3655: "لبيدبا الفيلسوف", A4095: null, C112: "لبيدبا", P3475: "لبيدبا الفيلسوف", L800: null } },
    { id: "r3", readings: { P3465: "اضرب لي مثلا", R3655: "اضرب لي مثلا", A4095: "اضرب لي مثل", C112: "اضرب مثلا", P3475: "اضرب لي مثلا", L800: "اضرب لي مثلا" } },
    { id: "r4", readings: { P3465: "للمتحابين", R3655: "للمتحابين", A4095: "للمتحابين", C112: null, P3475: "للمتحابين", L800: "للمتحابين" } }
  ]
};
