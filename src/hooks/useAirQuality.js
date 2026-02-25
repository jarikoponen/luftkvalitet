import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { fetchTimeSeries, DEFAULT_STATION } from "../api/airQuality";
import { genDemo, aggData, calcHourlyAvg, getLatest, calcTrends, calcHeatmapData, TIME_RANGES } from "../utils/aggregation";

const POLL_INTERVAL = 300_000; // 5 minutes

export default function useAirQuality(timeRange = "24h", station = DEFAULT_STATION) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const [error, setError] = useState(null);
  const cache = useRef({});

  const fetchData = useCallback(async () => {
    const cacheKey = `${station}:${timeRange}`;

    // Use cache if available (still refresh in background)
    if (cache.current[cacheKey]) {
      setData(cache.current[cacheKey]);
      setIsDemo(false);
      setLoading(false);
    }

    try {
      const result = await fetchTimeSeries(timeRange, station);
      if (result.data.length > 0) {
        cache.current[cacheKey] = result.data;
        setData(result.data);
        setIsDemo(false);
        setError(null);
      } else {
        throw new Error("No data returned");
      }
    } catch (err) {
      console.warn("API fetch failed, using demo data:", err.message);
      // Only fall back to demo if we don't have cached data
      if (!cache.current[cacheKey]) {
        const hours = TIME_RANGES.find(t => t.key === timeRange)?.hours || 24;
        setData(genDemo(hours));
        setIsDemo(true);
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [timeRange, station]);

  useEffect(() => {
    setLoading(true);
    fetchData();
    const iv = setInterval(fetchData, POLL_INTERVAL);
    return () => clearInterval(iv);
  }, [fetchData]);

  const hours = TIME_RANGES.find(t => t.key === timeRange)?.hours || 24;
  const chartData = useMemo(() => aggData(data, hours), [data, hours]);
  const latest = useMemo(() => getLatest(data), [data]);
  const hourlyAvg = useMemo(() => calcHourlyAvg(data), [data]);
  const trends = useMemo(() => calcTrends(data), [data]);
  const heatmapData = useMemo(() => calcHeatmapData(data), [data]);

  return { data, chartData, latest, hourlyAvg, trends, heatmapData, loading, isDemo, error };
}
