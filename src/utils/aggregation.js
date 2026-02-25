export function genDemo(hours = 24) {
  const now = Date.now(), data = [], pts = Math.min(hours * 4, 500), iv = (hours * 60) / pts;
  for (let i = pts; i >= 0; i--) {
    const date = new Date(now - i * iv * 60000), h = date.getHours();
    const rush = (h >= 7 && h <= 9) || (h >= 16 && h <= 18) ? 1.6 : 1;
    const night = h >= 23 || h <= 5 ? 0.5 : 1;
    data.push({
      date: date.toISOString(),
      pm10: Math.max(1, (18 + Math.sin(i / 20) * 8) * rush * night + (Math.random() - .5) * 10),
      no2: Math.max(1, (12 + Math.cos(i / 15) * 6) * rush * night + (Math.random() - .5) * 8),
    });
  }
  return data;
}

export function aggData(data, hours) {
  if (hours <= 24) return data;
  const sz = hours <= 168 ? 12 : 48, out = [];
  for (let i = 0; i < data.length; i += sz) {
    const s = data.slice(i, i + sz);
    if (s.length) out.push({
      date: s[0].date,
      pm10: s.reduce((a, d) => a + (d.pm10 || 0), 0) / s.length,
      no2: s.reduce((a, d) => a + (d.no2 || 0), 0) / s.length,
    });
  }
  return out;
}

export function calcHourlyAvg(data) {
  const b = {};
  data.forEach(d => {
    const h = new Date(d.date).getHours();
    if (!b[h]) b[h] = { pm10: [], no2: [] };
    if (d.pm10 != null) b[h].pm10.push(d.pm10);
    if (d.no2 != null) b[h].no2.push(d.no2);
  });
  return Array.from({ length: 24 }, (_, h) => ({
    hour: `${String(h).padStart(2, "0")}`,
    pm10: b[h]?.pm10.length ? b[h].pm10.reduce((a, c) => a + c, 0) / b[h].pm10.length : 0,
    no2: b[h]?.no2.length ? b[h].no2.reduce((a, c) => a + c, 0) / b[h].no2.length : 0,
  }));
}

export function getLatest(data) {
  let pm = null, no = null;
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].pm10 != null && pm == null) pm = data[i].pm10;
    if (data[i].no2 != null && no == null) no = data[i].no2;
    if (pm != null && no != null) break;
  }
  return { pm10: pm, no2: no };
}

export function calcTrends(data) {
  const now = data.length ? new Date(data[data.length - 1].date).getTime() : Date.now();
  const recent = data.filter(d => {
    const t = new Date(d.date).getTime();
    return t > now - 3600_000; // last 1 hour
  });
  const older = data.filter(d => {
    const t = new Date(d.date).getTime();
    return t > now - 4 * 3600_000 && t <= now - 3600_000; // 1–4 hours ago
  });

  function trend(key) {
    const rVals = recent.filter(d => d[key] != null).map(d => d[key]);
    const oVals = older.filter(d => d[key] != null).map(d => d[key]);
    if (!rVals.length || !oVals.length) return null;
    const rAvg = rVals.reduce((a, b) => a + b, 0) / rVals.length;
    const oAvg = oVals.reduce((a, b) => a + b, 0) / oVals.length;
    if (oAvg === 0) return null;
    const pct = ((rAvg - oAvg) / oAvg) * 100;
    if (Math.abs(pct) < 5) return { direction: "stable", percent: 0 };
    return { direction: pct > 0 ? "up" : "down", percent: Math.round(Math.abs(pct)) };
  }

  return { pm10: trend("pm10"), no2: trend("no2") };
}

export function calcHeatmapData(data) {
  // 24 hours × 7 weekdays matrix, buckets[hour][weekday] = [values]
  const buckets = { pm10: {}, no2: {} };
  for (const key of ["pm10", "no2"]) {
    for (let h = 0; h < 24; h++) {
      buckets[key][h] = {};
      for (let d = 0; d < 7; d++) buckets[key][h][d] = [];
    }
  }

  data.forEach(d => {
    const dt = new Date(d.date);
    const h = dt.getHours();
    const dow = (dt.getDay() + 6) % 7; // Monday = 0
    if (d.pm10 != null) buckets.pm10[h][dow].push(d.pm10);
    if (d.no2 != null) buckets.no2[h][dow].push(d.no2);
  });

  function toMatrix(key) {
    return Array.from({ length: 24 }, (_, h) =>
      Array.from({ length: 7 }, (_, d) => {
        const vals = buckets[key][h][d];
        return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
      })
    );
  }

  return { pm10: toMatrix("pm10"), no2: toMatrix("no2") };
}

export const TIME_RANGES = [
  { key: "24h", label: "24 tim", hours: 24 },
  { key: "4d", label: "4 dagar", hours: 96 },
  { key: "7d", label: "7 dagar", hours: 168 },
  { key: "30d", label: "30 dagar", hours: 720 },
];
