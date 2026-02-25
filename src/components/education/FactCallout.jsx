export default function FactCallout({ emoji, title, text, bgColor, borderColor, titleColor, textColor }) {
  return (
    <div className="g fact ai d3" style={{ background: bgColor, borderColor }}>
      <div className="fe">{emoji}</div>
      <div>
        <h3 style={{ color: titleColor }}>{title}</h3>
        <p style={{ color: textColor }}>{text}</p>
      </div>
    </div>
  );
}
