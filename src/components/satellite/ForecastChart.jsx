import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { getQuality } from "../../utils/quality";
import { fmtTime } from "../../utils/formatters";
import ChartTooltip from "../charts/ChartTooltip";

export default function ForecastChart({ forecastData }) {
  const [pollutant, setPollutant] = useState("pm10");
  const [selectedDay, setSelectedDay] = useState(0);

  const dailySummary = useMemo(() => {
    if (!forecastData.length) return [];
    const days = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const d of forecastData) {
      const dt = new Date(d.time);
      if (dt < today) continue;
      const dayKey = d.time.slice(0, 10);
      if (!days[dayKey]) days[dayKey] = { key: dayKey, values: [] };
      days[dayKey].values.push(d);
    }

    return Object.values(days).slice(0, 5).map(day => {
      const vals = day.values;
      const pm10Vals = vals.filter(v => v.pm10 != null);
      const no2Vals = vals.filter(v => v.no2 != null);
      const pm10Avg = pm10Vals.length ? pm10Vals.reduce((s, v) => s + v.pm10, 0) / pm10Vals.length : null;
      const no2Avg = no2Vals.length ? no2Vals.reduce((s, v) => s + v.no2, 0) / no2Vals.length : null;
      const dt = new Date(day.key + "T12:00");
      return {
        key: day.key,
        weekday: dt.toLocaleDateString("sv-SE", { weekday: "short" }),
        dateLabel: dt.toLocaleDateString("sv-SE", { day: "numeric", month: "short" }),
        pm10Avg,
        no2Avg,
        hourly: vals,
      };
    });
  }, [forecastData]);

  const activeDay = dailySummary[selectedDay] || dailySummary[0];
  const chartData = activeDay?.hourly?.map(h => ({
    date: h.time,
    pm10: h.pm10,
    no2: h.no2,
  })) || [];

  if (!dailySummary.length) return null;

  return (
    <div className="forecast-section ai d5">
      <h2 className="st">5-dagars prognos</h2>
      <p className="ss">CAMS-modellens prognos f&ouml;r Sundsvall Centrum</p>
      <div className="spatial-toggle">
        {["pm10", "no2"].map(p => (
          <button
            key={p}
            className={`cb ${pollutant === p ? "on" : ""}`}
            onClick={() => setPollutant(p)}
          >
            {p === "pm10" ? "PM10" : "NO₂"}
          </button>
        ))}
      </div>
      <div className="forecast-days">
        {dailySummary.map((day, i) => {
          const avg = pollutant === "pm10" ? day.pm10Avg : day.no2Avg;
          const q = getQuality(avg);
          return (
            <button
              key={day.key}
              className={`g forecast-day-card${selectedDay === i ? " active" : ""}`}
              onClick={() => setSelectedDay(i)}
            >
              <div className="forecast-weekday">{i === 0 ? "Idag" : day.weekday}</div>
              <div className="forecast-face">{q.face}</div>
              <div className="forecast-avg" style={{ color: q.color }}>{avg != null ? avg.toFixed(0) : "—"}</div>
              <div className="forecast-date">{day.dateLabel}</div>
            </button>
          );
        })}
      </div>
      <div className="gs cbox">
        <div className="ca">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="gFP" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0891b2" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity={0.03} />
                </linearGradient>
                <linearGradient id="gFN" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
              <XAxis dataKey="date" tickFormatter={fmtTime} tick={{ fill: "#78716c", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#78716c", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              {pollutant === "pm10" && (
                <>
                  <ReferenceLine y={50} stroke="#ef4444" strokeDasharray="6 4" strokeOpacity={0.35} label={{ value: "PM10 norm", fill: "#ef4444", fontSize: 10, position: "insideTopRight" }} />
                  <Area type="monotone" dataKey="pm10" name="PM10" stroke="#0891b2" strokeWidth={2.5} fill="url(#gFP)" dot={false} connectNulls />
                </>
              )}
              {pollutant === "no2" && (
                <>
                  <ReferenceLine y={90} stroke="#f97316" strokeDasharray="6 4" strokeOpacity={0.35} label={{ value: "NO₂ norm", fill: "#f97316", fontSize: 10, position: "insideTopRight" }} />
                  <Area type="monotone" dataKey="no2" name="NO₂" stroke="#7c3aed" strokeWidth={2.5} fill="url(#gFN)" dot={false} connectNulls />
                </>
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
