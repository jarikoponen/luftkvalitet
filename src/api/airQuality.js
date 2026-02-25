const API_BASE = "/api/airquality";

export const STATIONS = [
  { id: "888100", name: "Sundsvall Centrum", coordinates: [17.308968, 62.388618], pollutants: ["PM10", "PM25", "NO2"] },
  { id: "1098100", name: "Bergsgatan", coordinates: [17.303442, 62.386485], pollutants: ["PM10", "PM25"] },
];

export const DEFAULT_STATION = "888100";

const FILTER_MAP = {
  "1h": "day",
  "24h": "day",
  "4d": "fourdays",
  "7d": "week",
  "30d": "month",
  "1y": "year",
};

function normalizeData(apiData) {
  const pollutants = apiData.pollutants || [];
  const pm10 = pollutants.find(p => p.name === "PM10")?.values || [];
  const pm25 = pollutants.find(p => p.name === "PM25")?.values || [];
  const no2 = pollutants.find(p => p.name === "NO2")?.values || [];

  const byDate = {};
  for (const v of pm10) {
    if (!byDate[v.observedAt]) byDate[v.observedAt] = {};
    byDate[v.observedAt].pm10 = v.value;
  }
  for (const v of pm25) {
    if (!byDate[v.observedAt]) byDate[v.observedAt] = {};
    byDate[v.observedAt].pm25 = v.value;
  }
  for (const v of no2) {
    if (!byDate[v.observedAt]) byDate[v.observedAt] = {};
    byDate[v.observedAt].no2 = v.value;
  }

  return Object.entries(byDate)
    .map(([date, vals]) => ({ date, pm10: vals.pm10 ?? null, pm25: vals.pm25 ?? null, no2: vals.no2 ?? null }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export async function fetchTimeSeries(timeRangeKey, station = DEFAULT_STATION) {
  const filter = FILTER_MAP[timeRangeKey] || "day";
  const res = await fetch(`${API_BASE}/${filter}?station=${station}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const json = await res.json();
  const apiData = json?.data?.data;
  if (!apiData?.pollutants) throw new Error("Invalid response format");
  return {
    data: normalizeData(apiData),
    station: {
      id: apiData.id,
      coordinates: apiData.location?.coordinates,
    },
  };
}

export async function fetchLatest(station = DEFAULT_STATION) {
  const { data } = await fetchTimeSeries("24h", station);
  if (data.length === 0) throw new Error("No data");
  const last = data[data.length - 1];
  return { pm10: last.pm10, pm25: last.pm25, no2: last.no2, date: last.date };
}
