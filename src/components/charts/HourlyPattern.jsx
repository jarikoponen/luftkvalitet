import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartTooltip from "./ChartTooltip";

export default function HourlyPattern({ hourlyAvg }) {
  return (
    <div className="hg ai d4">
      <div className="gs hc">
        <h3>🕐 PM10 under dygnet</h3>
        <div className="hs">Ser du topparna under rusningstid?</div>
        <div className="hch">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyAvg} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
              <XAxis dataKey="hour" tick={{ fill: "#78716c", fontSize: 10 }} axisLine={false} tickLine={false} interval={3} />
              <YAxis tick={{ fill: "#78716c", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="pm10" name="PM10" fill="#0891b2" radius={[4, 4, 0, 0]} opacity={.8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="gs hc">
        <h3>🕐 NO₂ under dygnet</h3>
        <div className="hs">Morgon- och kvällstrafik syns tydligt</div>
        <div className="hch">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyAvg} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
              <XAxis dataKey="hour" tick={{ fill: "#78716c", fontSize: 10 }} axisLine={false} tickLine={false} interval={3} />
              <YAxis tick={{ fill: "#78716c", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="no2" name="NO₂" fill="#7c3aed" radius={[4, 4, 0, 0]} opacity={.8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
