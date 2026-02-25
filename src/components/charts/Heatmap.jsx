import { useState } from "react";
import { getQuality } from "../../utils/quality";

const DAYS = ["Mån", "Tis", "Ons", "Tor", "Fre", "Lör", "Sön"];

function HeatmapGrid({ matrix, label, color }) {
  const [tooltip, setTooltip] = useState(null);

  return (
    <div className="hm-panel g">
      <div className="hm-title" style={{ color }}>{label}</div>
      <div className="hm-grid-wrap">
        {/* Day headers */}
        <div className="hm-corner" />
        {DAYS.map(d => <div key={d} className="hm-day">{d}</div>)}

        {/* Hour rows */}
        {matrix.map((row, h) => (
          <div key={h} className="hm-row" role="row">
            <div className="hm-hour">{String(h).padStart(2, "0")}</div>
            {row.map((val, d) => {
              const q = val != null ? getQuality(val) : null;
              return (
                <div
                  key={d}
                  className="hm-cell"
                  style={{ background: q ? q.color : "rgba(0,0,0,0.04)" }}
                  onMouseEnter={() => setTooltip({ h, d, val })}
                  onMouseLeave={() => setTooltip(null)}
                >
                  {tooltip && tooltip.h === h && tooltip.d === d && val != null && (
                    <div className="hm-tooltip">
                      {DAYS[d]} kl {String(h).padStart(2, "0")}:00 — {val.toFixed(1)} µg/m³
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Heatmap({ heatmapData, timeRange }) {
  const hours = { "24h": 24, "4d": 96, "7d": 168, "30d": 720 }[timeRange] || 24;

  if (hours < 168) {
    return (
      <div className="hm-section ai d5">
        <h2 className="st">Veckomönster</h2>
        <p className="ss">Välj minst 7 dagars data för att se veckomönstret som heatmap.</p>
      </div>
    );
  }

  return (
    <div className="hm-section ai d5">
      <h2 className="st">Veckomönster</h2>
      <p className="ss">Genomsnittlig luftkvalitet per timme och veckodag</p>
      <div className="hm-duo">
        <HeatmapGrid matrix={heatmapData.pm10} label="PM10" color="#0891b2" />
        <HeatmapGrid matrix={heatmapData.no2} label="NO₂" color="#7c3aed" />
      </div>
    </div>
  );
}
