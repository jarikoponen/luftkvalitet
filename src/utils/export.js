import { STATIONS } from "../api/airQuality";

export function exportCSV(data, station, timeRange) {
  if (!data.length) return;

  const stationInfo = STATIONS.find(s => s.id === station);
  const hasPM25 = data.some(d => d.pm25 != null);
  const hasNO2 = data.some(d => d.no2 != null);

  const headers = ["Datum", "PM10 (µg/m³)"];
  if (hasPM25) headers.push("PM2.5 (µg/m³)");
  if (hasNO2) headers.push("NO2 (µg/m³)");

  const rows = data.map(d => {
    const row = [d.date, d.pm10 ?? ""];
    if (hasPM25) row.push(d.pm25 ?? "");
    if (hasNO2) row.push(d.no2 ?? "");
    return row.join(",");
  });

  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const name = (stationInfo?.name || station).replace(/\s+/g, "-").toLowerCase();
  const a = document.createElement("a");
  a.href = url;
  a.download = `luftkvalitet-${name}-${timeRange}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
