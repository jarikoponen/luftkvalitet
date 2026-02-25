import { getQuality } from "../../utils/quality";

function accuracy(diff) {
  if (diff == null) return { label: "Saknas", color: "#9ca3af" };
  const abs = Math.abs(diff);
  if (abs <= 5) return { label: "Mycket bra", color: "#34d399" };
  if (abs <= 15) return { label: "Bra", color: "#a3e635" };
  if (abs <= 30) return { label: "Måttlig", color: "#facc15" };
  return { label: "Stor avvikelse", color: "#fb923c" };
}

const PAIRS = [
  { key: "pm10", label: "PM10" },
  { key: "no2", label: "NO₂" },
];

export default function ModelComparison({ comparisonPoint, sensorLatest }) {
  if (!comparisonPoint || !sensorLatest) return null;

  return (
    <div className="comparison-section ai d5">
      <h2 className="st">Modell vs verklighet</h2>
      <p className="ss">J&auml;mf&ouml;relse mellan CAMS-satellitmodellen och sensorns faktiska m&auml;tning i Centrum</p>
      <div className="comparison-pairs">
        {PAIRS.map(({ key, label }) => {
          const sVal = sensorLatest[key];
          const mVal = comparisonPoint[key];
          const sQ = getQuality(sVal);
          const mQ = getQuality(mVal);
          const diff = sVal != null && mVal != null ? mVal - sVal : null;
          const acc = accuracy(diff);

          return (
            <div key={key} className="g comparison-pair">
              <div className="comparison-label">{label}</div>
              <div className="comparison-values">
                <div className="comparison-side">
                  <div className="comparison-source">Sensor</div>
                  <div className="comparison-val" style={{ color: sQ.color }}>
                    {sVal != null ? sVal.toFixed(1) : "—"}
                  </div>
                  <div className="comparison-unit">&micro;g/m&sup3;</div>
                  <div className="comparison-q">{sQ.face} {sQ.label}</div>
                </div>
                <div className="comparison-diff">
                  <div className="comparison-diff-val" style={{ color: acc.color }}>
                    {diff != null ? `${diff > 0 ? "+" : ""}${diff.toFixed(1)}` : "—"}
                  </div>
                  <div className="comparison-diff-label" style={{ color: acc.color }}>
                    {acc.label}
                  </div>
                </div>
                <div className="comparison-side">
                  <div className="comparison-source">Modell</div>
                  <div className="comparison-val" style={{ color: mQ.color }}>
                    {mVal != null ? mVal.toFixed(1) : "—"}
                  </div>
                  <div className="comparison-unit">&micro;g/m&sup3;</div>
                  <div className="comparison-q">{mQ.face} {mQ.label}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="comparison-note">
        &#8505;&#65039; CAMS-modellen har 11 km uppl&ouml;sning &mdash; lokala variationer (trafik, byggnader) f&aring;ngas inte. Sensordata &auml;r alltid mest tillf&ouml;rlitlig f&ouml;r den exakta platsen.
      </div>
    </div>
  );
}
