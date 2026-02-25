const CAUSES = [
  { icon: "🚗", title: "Biltrafik", desc: "Avgaser, bromspartiklar och vägslitage — speciellt med dubbdäck — är den största orsaken till dålig luft i Sundsvall.", bgColor: "rgba(255,251,235,0.92)" },
  { icon: "🏭", title: "Industri & energi", desc: "Förbränning av fossila bränslen i fabriker och kraftverk släpper ut kvävedioxid och partiklar.", bgColor: "rgba(255,247,237,0.92)" },
  { icon: "🪵", title: "Vedeldning", desc: "Att elda med ved hemma är mysigt men släpper ut mycket partiklar — särskilt vid kall, vindstilla väderlek.", bgColor: "rgba(254,242,242,0.92)" },
  { icon: "🌡️", title: "Väderinversion", desc: "Ibland lägger sig kall luft som ett lock över stan och föroreningarna kan inte spridas uppåt. Vanligt vintertid.", bgColor: "rgba(245,243,255,0.92)" },
];

export default function CausesSection() {
  return (
    <div className="causes ai d5">
      <div className="st">🔍 Varför blir luften dålig?</div>
      <div className="ss">Sundsvalls luft påverkas av flera faktorer — vissa kan vi påverka, andra handlar om väder och geografi.</div>
      <div className="cgrid">
        {CAUSES.map(c => (
          <div className="g cc" key={c.title} style={{ background: c.bgColor }}>
            <div className="ci">{c.icon}</div>
            <div><h3>{c.title}</h3><p>{c.desc}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}
