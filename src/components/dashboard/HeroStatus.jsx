import { getQuality } from "../../utils/quality";
import UpdatedAt from "../ui/UpdatedAt";
import InfoTooltip from "../ui/InfoTooltip";

export default function HeroStatus({ latest }) {
  const oQ = getQuality(Math.max(latest.pm10 || 0, latest.no2 || 0));

  return (
    <div className="g hero" style={{ background: oQ.gradient }}>
      <InfoTooltip
        title="Luftkvalitetsdata"
        description="Realtidsmätningar av partiklar (PM10) och kvävedioxid (NO₂) från Sundsvalls kommuns mätstationer. Uppdateras varje timme."
        source="Sundsvalls kommun — Öppna data (CC-0)"
      />
      <div className="hero-title">Luftkvalitet just nu</div>
      <div className="hero-pollutants">
        <div className="hero-pol">
          <div className="hero-pol-top">
            <div className="hero-pol-val">
              {latest.pm10 != null ? latest.pm10.toFixed(0) : "—"}
              <span className="hero-pol-unit">µg/m³</span>
            </div>
            <div className="hero-pol-label">PM10</div>
          </div>
          <div className="hero-pol-desc">Mikroskopiska partiklar från vägtrafik, bromsbelägg och dubbdäcksslitage. De tränger ner i lungorna.</div>
        </div>
        <div className="hero-pol-sep" />
        <div className="hero-pol">
          <div className="hero-pol-top">
            <div className="hero-pol-val">
              {latest.no2 != null ? latest.no2.toFixed(0) : "—"}
              <span className="hero-pol-unit">µg/m³</span>
            </div>
            <div className="hero-pol-label">NO₂</div>
          </div>
          <div className="hero-pol-desc">Kvävedioxid från fordonsavgaser och förbränning. Irriterar luftvägarna och förvärrar astma.</div>
        </div>
      </div>
      <UpdatedAt date={latest.lastUpdated} />
    </div>
  );
}
