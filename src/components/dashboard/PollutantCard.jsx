import { getQuality } from "../../utils/quality";

const ARROWS = { up: "↗", down: "↘", stable: "→" };
const ARROW_COLORS = { up: "#f87171", down: "#34d399", stable: "#9ca3af" };

export default function PollutantCard({ type, value, label, description, color, pillBg, trend }) {
  const q = getQuality(value);
  const barMax = type === "no2" ? 200 : 100;

  return (
    <div className="g pc">
      <div className="pill" style={{ background: pillBg, color }}>{label}</div>
      <div className="pdesc">{description}</div>
      <div className="pval-row">
        <div className="pval" style={{ color }}>{value != null ? value.toFixed(1) : "—"}</div>
        {trend && (
          <span className="trend" style={{ color: ARROW_COLORS[trend.direction] }}>
            <span className="trend-arrow">{ARROWS[trend.direction]}</span>
            {trend.percent > 0 && <span className="trend-pct">{trend.percent}%</span>}
          </span>
        )}
      </div>
      <div className="punit">µg/m³ just nu</div>
      <div className="pq" style={{ background: q.bg, color: q.color }}>{q.face} {q.label}</div>
      <div className="btrack">
        <div className="bfill" style={{
          width: `${Math.min((value || 0) / barMax * 100, 100)}%`,
          background: `linear-gradient(90deg, ${color}, ${q.color})`,
        }} />
      </div>
    </div>
  );
}
