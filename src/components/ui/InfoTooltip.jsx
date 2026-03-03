import { useState, useRef, useEffect } from "react";

export default function InfoTooltip({ title, description, source, light }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className={`info-tip${light ? " info-tip-light" : ""}`} ref={ref}>
      <button className="info-tip-btn" onClick={() => setOpen(o => !o)} aria-label="Information om datakälla">?</button>
      {open && (
        <div className="info-tip-pop">
          <div className="info-tip-title">{title}</div>
          <div className="info-tip-desc">{description}</div>
          <div className="info-tip-source">Källa: {source}</div>
        </div>
      )}
    </div>
  );
}
