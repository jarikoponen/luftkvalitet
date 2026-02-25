import { useState, useEffect, useCallback } from "react";
import { fetchOpenMeteo } from "../api/openMeteo";

const POLL_INTERVAL = 1_800_000; // 30 minutes

export default function useOpenMeteo() {
  const [rawData, setRawData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      const data = await fetchOpenMeteo();
      setRawData(data);
      setError(null);
    } catch (err) {
      console.warn("Open-Meteo fetch failed:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const iv = setInterval(load, POLL_INTERVAL);
    return () => clearInterval(iv);
  }, [load]);

  const gridSnapshot = rawData?.grid ?? null;
  const forecastData = rawData?.forecast ?? [];
  const comparisonPoint = rawData?.centerCurrent ?? null;

  return { gridSnapshot, forecastData, comparisonPoint, loading, error };
}
