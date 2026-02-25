import { useState, useEffect, useCallback } from "react";
import { fetchWeather } from "../api/weather";

const POLL_INTERVAL = 600_000; // 10 minutes

export default function useWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      const data = await fetchWeather();
      setWeather(data);
      setError(null);
    } catch (err) {
      console.warn("Weather fetch failed:", err.message);
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

  return { weather, loading, error };
}
