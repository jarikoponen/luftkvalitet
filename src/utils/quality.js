export const QUALITY_LEVELS = [
  { label: "Fantastiskt", min: 0, max: 20, color: "#34d399", bg: "#ecfdf5", gradient: "linear-gradient(135deg, #d1fae5, #a7f3d0)", face: "😊", tip: "Perfekt för utomhusaktiviteter!" },
  { label: "Bra", min: 21, max: 40, color: "#a3e635", bg: "#f7fee7", gradient: "linear-gradient(135deg, #ecfccb, #d9f99d)", face: "🙂", tip: "Fint väder att vara ute i." },
  { label: "Okej", min: 41, max: 50, color: "#facc15", bg: "#fefce8", gradient: "linear-gradient(135deg, #fef9c3, #fde68a)", face: "😐", tip: "Känsliga personer bör vara försiktiga." },
  { label: "Dåligt", min: 51, max: 100, color: "#fb923c", bg: "#fff7ed", gradient: "linear-gradient(135deg, #ffedd5, #fed7aa)", face: "😷", tip: "Undvik tung fysisk aktivitet utomhus." },
  { label: "Riktigt dåligt", min: 101, max: 999, color: "#f87171", bg: "#fef2f2", gradient: "linear-gradient(135deg, #fecaca, #fca5a5)", face: "🤢", tip: "Stanna inomhus om möjligt." },
];

export function getQuality(v) {
  if (v == null || isNaN(v)) return QUALITY_LEVELS[0];
  for (const l of QUALITY_LEVELS) {
    if (v <= l.max) return l;
  }
  return QUALITY_LEVELS[4];
}
