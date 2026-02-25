const API_URL = "https://air-quality-api.open-meteo.com/v1/air-quality";

const LATS = [62.460, 62.425, 62.390, 62.355, 62.320];
const LONS = [17.150, 17.225, 17.300, 17.375, 17.450];

const LABELS = [
  ["Matfors", "Sidsjön N", "Nacksta", "Skönsmon", "Alnö N"],
  ["Granlo", "Sidsjön", "Norr", "Haga", "Alnö"],
  ["Bergsåker", "Väster", "Centrum", "Södermalm", "Kusten"],
  ["Bosvedjan", "Skönsberg", "Söder", "Kvissleby N", "Vindhem"],
  ["Stockvik", "Tunadal", "Njurunda", "Kvissleby", "Björkön"],
];

export const GRID_POINTS = [];
for (let r = 0; r < 5; r++) {
  for (let c = 0; c < 5; c++) {
    GRID_POINTS.push({ row: r, col: c, lat: LATS[r], lon: LONS[c], label: LABELS[r][c] });
  }
}

export const STATION_CELLS = [
  { id: "888100", name: "Sundsvall Centrum", row: 2, col: 2 },
  { id: "1098100", name: "Bergsgatan", row: 2, col: 1 },
];

function findCurrentIndex(times) {
  const now = Date.now();
  let bestIdx = 0;
  let bestDiff = Infinity;
  for (let i = 0; i < times.length; i++) {
    const diff = now - new Date(times[i]).getTime();
    if (diff >= 0 && diff < bestDiff) {
      bestDiff = diff;
      bestIdx = i;
    }
  }
  return bestIdx;
}

export function normalizeOpenMeteo(responses) {
  const grid = Array.from({ length: 5 }, () => Array(5).fill(null));

  responses.forEach((loc, i) => {
    const { row, col, label } = GRID_POINTS[i];
    const hourly = loc.hourly;
    if (!hourly?.time?.length) return;

    const idx = findCurrentIndex(hourly.time);
    grid[row][col] = {
      pm10: hourly.pm10?.[idx] ?? null,
      pm25: hourly.pm2_5?.[idx] ?? null,
      no2: hourly.nitrogen_dioxide?.[idx] ?? null,
      aqi: hourly.european_aqi?.[idx] ?? null,
      label,
    };
  });

  const centerIdx = GRID_POINTS.findIndex(p => p.row === 2 && p.col === 2);
  const centerHourly = responses[centerIdx]?.hourly;

  let forecast = [];
  if (centerHourly?.time?.length) {
    forecast = centerHourly.time.map((t, i) => ({
      time: t,
      pm10: centerHourly.pm10?.[i] ?? null,
      pm25: centerHourly.pm2_5?.[i] ?? null,
      no2: centerHourly.nitrogen_dioxide?.[i] ?? null,
      aqi: centerHourly.european_aqi?.[i] ?? null,
    }));
  }

  const centerCurrent = grid[2][2] || {};

  return { grid, forecast, centerCurrent };
}

export async function fetchOpenMeteo() {
  const latStr = GRID_POINTS.map(p => p.lat).join(",");
  const lonStr = GRID_POINTS.map(p => p.lon).join(",");

  const params = new URLSearchParams({
    latitude: latStr,
    longitude: lonStr,
    hourly: "pm10,pm2_5,nitrogen_dioxide,european_aqi",
    domains: "cams_europe",
    timezone: "Europe/Stockholm",
    forecast_days: "5",
    past_days: "1",
  });

  const res = await fetch(`${API_URL}?${params}`);
  if (!res.ok) throw new Error(`Open-Meteo error: ${res.status}`);
  const json = await res.json();

  const responses = Array.isArray(json) ? json : [json];
  return normalizeOpenMeteo(responses);
}
