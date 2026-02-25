import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from "recharts";
import { TIME_RANGES } from "../../utils/aggregation";
import { fmtTime, fmtDate } from "../../utils/formatters";
import ChartTooltip from "./ChartTooltip";

export default function TimeSeriesChart({ chartData, selType, setSelType, timeRange, setTimeRange }) {
  const hours = TIME_RANGES.find(t => t.key === timeRange)?.hours || 24;
  const xF = d => hours <= 24 ? fmtTime(d) : fmtDate(d);

  return (
    <div className="gs cbox ai d3">
      <div className="ctop">
        <h2>📈 Utveckling</h2>
        <div className="cbs">
          {["both", "pm10", "no2"].map(t => (
            <button key={t} className={`cb ${selType === t ? "on" : ""}`} onClick={() => setSelType(t)}>
              {t === "both" ? "Båda" : t === "pm10" ? "PM10" : "NO₂"}
            </button>
          ))}
          <span style={{ width: 1, background: "rgba(0,0,0,0.08)", margin: "0 3px" }} />
          {TIME_RANGES.map(t => (
            <button key={t.key} className={`cb ${timeRange === t.key ? "on" : ""}`} onClick={() => setTimeRange(t.key)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="ca">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="gP" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0891b2" stopOpacity={.3} />
                <stop offset="100%" stopColor="#0891b2" stopOpacity={.03} />
              </linearGradient>
              <linearGradient id="gN" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity={.3} />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity={.03} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
            <XAxis dataKey="date" tickFormatter={xF} tick={{ fill: "#78716c", fontSize: 11 }} axisLine={{ stroke: "rgba(0,0,0,0.06)" }} tickLine={false} interval="preserveStartEnd" minTickGap={50} />
            <YAxis tick={{ fill: "#78716c", fontSize: 11 }} axisLine={false} tickLine={false} width={36} />
            <Tooltip content={<ChartTooltip />} />
            {(selType === "both" || selType === "pm10") && <>
              <ReferenceLine y={50} stroke="#ef4444" strokeDasharray="6 4" strokeOpacity={.35} label={{ value: "PM10 norm", fill: "#ef4444", fontSize: 10, position: "insideTopRight" }} />
              <Area type="monotone" dataKey="pm10" name="PM10" stroke="#0891b2" strokeWidth={2.5} fill="url(#gP)" dot={false} connectNulls />
            </>}
            {(selType === "both" || selType === "no2") && <>
              <ReferenceLine y={90} stroke="#f97316" strokeDasharray="6 4" strokeOpacity={.35} label={{ value: "NO₂ norm", fill: "#f97316", fontSize: 10, position: "insideTopRight" }} />
              <Area type="monotone" dataKey="no2" name="NO₂" stroke="#7c3aed" strokeWidth={2.5} fill="url(#gN)" dot={false} connectNulls />
            </>}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
