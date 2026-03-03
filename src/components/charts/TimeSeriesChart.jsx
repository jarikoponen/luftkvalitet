import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from "recharts";
import { TIME_RANGES } from "../../utils/aggregation";
import { fmtTime, fmtDate } from "../../utils/formatters";
import ChartTooltip from "./ChartTooltip";
import UpdatedAt from "../ui/UpdatedAt";
import InfoTooltip from "../ui/InfoTooltip";

export default function TimeSeriesChart({ chartData, selType, setSelType, timeRange, setTimeRange, lastUpdated }) {
  const hours = TIME_RANGES.find(t => t.key === timeRange)?.hours || 24;
  const xF = d => hours <= 24 ? fmtTime(d) : fmtDate(d);

  const showPm = selType === "both" || selType === "pm10";
  const showNo2 = selType === "both" || selType === "no2";

  // Ensure Y-axis always covers the highest active reference line
  const minYMax = showPm && showNo2 ? 60 : showNo2 ? 60 : 50;
  const yDomain = [0, dataMax => Math.max(dataMax * 1.1, minYMax * 1.15)];

  return (
    <div className="gs cbox ai d3">
      <InfoTooltip
        title="Tidsserie"
        description="Historiska mätvärden för PM10 och NO₂ med gränsvärden markerade. Datan visar timmedelvärden från vald mätstation."
        source="Sundsvalls kommun — Öppna data (CC-0)"
      />
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
            <YAxis domain={yDomain} tick={{ fill: "#78716c", fontSize: 11 }} axisLine={false} tickLine={false} width={36} />
            <Tooltip content={<ChartTooltip />} />
            {showPm && <>
              <ReferenceLine y={50} stroke="#ef4444" strokeDasharray="6 4" strokeOpacity={.4} label={{ value: "PM Gränsvärde (50 µg/m³)", fill: "#ef4444", fontSize: 10, position: "insideTopRight" }} />
              <ReferenceLine y={30} stroke="#f59e0b" strokeDasharray="4 3" strokeOpacity={.4} label={{ value: "PM Miljömål (30 µg/m³)", fill: "#f59e0b", fontSize: 10, position: "insideTopRight" }} />
              <Area type="monotone" dataKey="pm10" name="PM10" stroke="#0891b2" strokeWidth={2.5} fill="url(#gP)" dot={false} connectNulls />
            </>}
            {showNo2 && <>
              <ReferenceLine y={60} stroke="#f97316" strokeDasharray="6 4" strokeOpacity={.4} label={{ value: "NO₂ Dygnsmedelvärde (60 µg/m³)", fill: "#f97316", fontSize: 10, position: "insideTopRight" }} />
              <Area type="monotone" dataKey="no2" name="NO₂" stroke="#7c3aed" strokeWidth={2.5} fill="url(#gN)" dot={false} connectNulls />
            </>}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <UpdatedAt date={lastUpdated} />
    </div>
  );
}
