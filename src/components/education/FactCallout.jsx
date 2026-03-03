export default function FactCallout({ emoji, title, text, bgColor, borderColor, titleColor, textColor, action }) {
  return (
    <div className="g fact ai d3" style={{ background: bgColor, borderColor }}>
      <div className="fe">{emoji}</div>
      <div className="fact-body">
        <h3 style={{ color: titleColor }}>{title}</h3>
        <p style={{ color: textColor }}>{text}</p>
      </div>
      {action && <div className="fact-action">{action}</div>}
    </div>
  );
}
