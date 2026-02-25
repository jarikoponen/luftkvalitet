export function fmtTime(d) {
  return new Date(d).toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });
}

export function fmtDate(d) {
  return new Date(d).toLocaleDateString("sv-SE", { day: "numeric", month: "short" });
}

export function fmtDT(d) {
  return new Date(d).toLocaleString("sv-SE", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}
