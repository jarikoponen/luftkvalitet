const TIPS = [
  { icon: "🚲", title: "Cykla eller gå", desc: "Varje bilresa du ersätter med cykel eller promenad minskar utsläppen direkt." },
  { icon: "🚌", title: "Åk kollektivt", desc: "En full buss ersätter 40 bilar. Kolla Dintur.se för tidtabeller i Sundsvall." },
  { icon: "🌳", title: "Plantera grönt", desc: "Träd och växter filtrerar partiklar ur luften. Varje litet grönt bidrag hjälper." },
  { icon: "🔌", title: "Kör elbil", desc: "Elbilar har inga avgasutsläpp. Dessutom — inga dubbdäck minskar PM10 rejält!" },
  { icon: "🏠", title: "Elda smartare", desc: "Använd torr ved och ge elden ordentligt med luft. Rökfri förbränning = ren luft." },
  { icon: "📢", title: "Sprid ordet", desc: "Berätta för kompisar! Ju fler som bryr sig, desto snabbare förändras luften." },
];

export default function TipsSection() {
  return (
    <div className="tips ai d6">
      <div className="st">🌱 Vad kan du göra?</div>
      <div className="ss">Varje liten insats räknas! Här är konkreta saker du kan göra för att förbättra luften i Sundsvall.</div>
      <div className="tg">
        {TIPS.map(t => (
          <div className="g tc" key={t.title}>
            <span className="tci">{t.icon}</span>
            <h3>{t.title}</h3>
            <p>{t.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
