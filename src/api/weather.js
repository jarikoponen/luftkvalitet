const SMHI_BASE = "/smhi/api/version/1.0/parameter";
const STATION = "127310"; // Sundsvall-Timrå Flygplats
const PERIOD = "latest-day";

const PARAMS = {
  temperature: 1,
  wind: 4,
  humidity: 6,
};

function parseLatest(json) {
  const values = json?.value;
  if (!values?.length) return null;
  const last = values[values.length - 1];
  return parseFloat(last.value);
}

export async function fetchWeather() {
  const results = await Promise.allSettled(
    Object.entries(PARAMS).map(async ([key, param]) => {
      const res = await fetch(`${SMHI_BASE}/${param}/station/${STATION}/period/${PERIOD}/data.json`);
      if (!res.ok) throw new Error(`SMHI ${key}: ${res.status}`);
      const json = await res.json();
      return { key, value: parseLatest(json) };
    })
  );

  const weather = {};
  for (const r of results) {
    if (r.status === "fulfilled" && r.value.value != null) {
      weather[r.value.key] = r.value.value;
    }
  }

  weather.inversionRisk =
    weather.temperature != null &&
    weather.wind != null &&
    weather.temperature < 0 &&
    weather.wind < 2;

  return weather;
}
