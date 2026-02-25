import { QUALITY_LEVELS } from "../../utils/quality";

export default function Legend() {
  return (
    <div className="leg ai d4">
      {QUALITY_LEVELS.map(l => (
        <div className="lc" key={l.label}>
          <div className="ld" style={{ background: l.color }} />
          <span>{l.face} {l.label}</span>
          <span className="lr">{l.min}–{l.max === 999 ? "∞" : l.max}</span>
        </div>
      ))}
    </div>
  );
}
