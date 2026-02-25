import { getQuality } from "../../utils/quality";

export default function HeroStatus({ latest }) {
  const oQ = getQuality(Math.max(latest.pm10 || 0, latest.no2 || 0));
  const pQ = getQuality(latest.pm10);
  const nQ = getQuality(latest.no2);

  return (
    <div className="g hero" style={{ background: oQ.gradient }}>
      <div className="hero-top">
        <div className="hface">{oQ.face}</div>
        <div className="hero-status">
          <div className="hlabel" style={{ color: oQ.color }}>{oQ.label}</div>
          <div className="htip">{oQ.tip}</div>
        </div>
      </div>
      <div className="hvals">
        <div className="hv">
          <div className="hvt">PM10</div>
          <div className="hvn" style={{ color: pQ.color }}>{latest.pm10 != null ? latest.pm10.toFixed(0) : "—"}</div>
          <div className="hvu">µg/m³</div>
        </div>
        <div className="sep" />
        <div className="hv">
          <div className="hvt">NO₂</div>
          <div className="hvn" style={{ color: nQ.color }}>{latest.no2 != null ? latest.no2.toFixed(0) : "—"}</div>
          <div className="hvu">µg/m³</div>
        </div>
      </div>
    </div>
  );
}
