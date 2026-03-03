import { fmtUpdated } from "../../utils/formatters";

export default function UpdatedAt({ date, light }) {
  const text = fmtUpdated(date);
  if (!text) return null;
  return (
    <div className={`card-updated${light ? " card-updated-light" : ""}`}>
      <span className="card-updated-tag">{text}</span>
    </div>
  );
}
