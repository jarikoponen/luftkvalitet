import { getQuality } from "../../utils/quality";
import { fmtDT } from "../../utils/formatters";

export default function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload?.date;
  return (
    <div className="tt">
      <div className="ttd">{d ? fmtDT(d) : ""}</div>
      {payload.map((p, i) => {
        const q = getQuality(p.value);
        return (
          <div className="ttr" key={i}>
            <div className="ttc" style={{ background: p.name === "PM10" ? "#0891b2" : "#7c3aed" }} />
            <span className="ttl">{p.name}</span>
            <span className="ttv" style={{ color: q.color }}>{p.value?.toFixed(1)} µg/m³</span>
          </div>
        );
      })}
    </div>
  );
}
