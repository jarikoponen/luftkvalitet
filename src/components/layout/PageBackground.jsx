function Cyclist({ x, color = "#c4b5fd", dir = 1 }) {
  const s = dir === -1 ? `translate(${x}, 0) scale(-1,1) translate(${-x}, 0)` : undefined;
  return (
    <g transform={s} opacity="0.7">
      <circle cx={x} cy="16" r="7" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx={x + 22} cy="16" r="7" fill="none" stroke={color} strokeWidth="1.5" />
      <line x1={x} y1="16" x2={x + 8} y2="4" stroke={color} strokeWidth="1.5" />
      <line x1={x + 8} y1="4" x2={x + 16} y2="16" stroke={color} strokeWidth="1.5" />
      <line x1={x + 16} y1="16" x2={x + 22} y2="16" stroke={color} strokeWidth="1.5" />
      <line x1={x + 8} y1="4" x2={x + 18} y2="4" stroke={color} strokeWidth="1.5" />
      <line x1={x + 18} y1="4" x2={x + 22} y2="16" stroke={color} strokeWidth="1.5" />
      <line x1={x + 18} y1="4" x2={x + 20} y2="0" stroke={color} strokeWidth="1.5" />
      <line x1={x + 18} y1="0" x2={x + 22} y2="0" stroke={color} strokeWidth="1.2" />
      <line x1={x + 6} y1="4" x2={x + 11} y2="4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx={x + 10} cy="-5" r="3.5" fill={color} />
      <line x1={x + 10} y1="-1.5" x2={x + 10} y2="4" stroke={color} strokeWidth="1.5" />
      <line x1={x + 10} y1="0" x2={x + 18} y2="1" stroke={color} strokeWidth="1.3" />
      <line x1={x + 10} y1="4" x2={x + 6} y2="12" stroke={color} strokeWidth="1.3" />
      <line x1={x + 10} y1="4" x2={x + 16} y2="12" stroke={color} strokeWidth="1.3" />
    </g>
  );
}

export default function PageBackground() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", width: "100%", height: "100%", minHeight: "100vh" }}>
        <defs>
          <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="12%" stopColor="#0ea5e9" />
            <stop offset="28%" stopColor="#38bdf8" />
            <stop offset="42%" stopColor="#7dd3fc" />
            <stop offset="54%" stopColor="#bae6fd" />
            <stop offset="63%" stopColor="#d5f5e3" />
            <stop offset="72%" stopColor="#15803d" />
            <stop offset="100%" stopColor="#052e16" />
          </linearGradient>
          <radialGradient id="sunG" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef9c3" stopOpacity="1" />
            <stop offset="20%" stopColor="#fde047" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#166534" /><stop offset="100%" stopColor="#14532d" />
          </linearGradient>
          <linearGradient id="hMid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#14532d" /><stop offset="100%" stopColor="#052e16" />
          </linearGradient>
          <linearGradient id="hNear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#052e16" /><stop offset="100%" stopColor="#022c22" />
          </linearGradient>
          <linearGradient id="waterG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0c4a6e" />
            <stop offset="30%" stopColor="#0e7490" />
            <stop offset="60%" stopColor="#155e75" />
            <stop offset="100%" stopColor="#052e16" />
          </linearGradient>
        </defs>

        <rect width="1440" height="900" fill="url(#skyG)" />
        <ellipse cx="720" cy="520" rx="900" ry="120" fill="white" opacity="0.06" />
        <ellipse cx="1180" cy="100" rx="400" ry="200" fill="#fef9c3" opacity="0.08" />

        {/* Sun */}
        <circle cx="1180" cy="100" r="280" fill="url(#sunG)" />
        <circle cx="1180" cy="100" r="75" fill="#fef08a" />
        <circle cx="1180" cy="100" r="65" fill="#fde047" />
        <circle cx="1180" cy="100" r="80" fill="none" stroke="#fef08a" strokeWidth="4" opacity="0.3" />
        <circle cx="1180" cy="100" r="110" fill="none" stroke="#fde047" strokeWidth="2" opacity="0.15" />
        <circle cx="1180" cy="100" r="145" fill="none" stroke="#fde047" strokeWidth="1" opacity="0.08" />
        <g stroke="#fde047" strokeWidth="4" opacity="0.25" strokeLinecap="round">
          {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => {
            const rad = angle * Math.PI / 180;
            return <line key={i} x1={1180 + Math.cos(rad) * 90} y1={100 + Math.sin(rad) * 90} x2={1180 + Math.cos(rad) * 130} y2={100 + Math.sin(rad) * 130} />;
          })}
        </g>

        {/* Clouds */}
        <g>
          <g opacity="1">
            <ellipse cx="250" cy="135" rx="100" ry="34" fill="#e0f2fe" opacity="0.5" />
            <ellipse cx="250" cy="130" rx="100" ry="34" fill="white" />
            <ellipse cx="300" cy="108" rx="78" ry="32" fill="white" />
            <ellipse cx="200" cy="114" rx="62" ry="26" fill="white" />
            <ellipse cx="250" cy="120" rx="85" ry="36" fill="#f8fafc" />
            <animateTransform attributeName="transform" type="translate" values="0,0;40,0;0,0" dur="45s" repeatCount="indefinite" />
          </g>
          <g opacity="0.95">
            <ellipse cx="750" cy="83" rx="85" ry="28" fill="#e0f2fe" opacity="0.4" />
            <ellipse cx="750" cy="78" rx="85" ry="28" fill="white" />
            <ellipse cx="800" cy="62" rx="64" ry="26" fill="white" />
            <ellipse cx="710" cy="68" rx="52" ry="22" fill="white" />
            <ellipse cx="755" cy="72" rx="72" ry="30" fill="#f8fafc" />
            <animateTransform attributeName="transform" type="translate" values="0,0;-30,0;0,0" dur="55s" repeatCount="indefinite" />
          </g>
          <g opacity="0.85">
            <ellipse cx="480" cy="62" rx="68" ry="23" fill="white" />
            <ellipse cx="520" cy="50" rx="50" ry="20" fill="white" />
            <ellipse cx="450" cy="55" rx="42" ry="18" fill="white" />
            <animateTransform attributeName="transform" type="translate" values="0,0;25,0;0,0" dur="38s" repeatCount="indefinite" />
          </g>
          <g opacity="0.7">
            <ellipse cx="1020" cy="180" rx="60" ry="20" fill="white" />
            <ellipse cx="1055" cy="168" rx="44" ry="17" fill="white" />
            <animateTransform attributeName="transform" type="translate" values="0,0;-20,0;0,0" dur="42s" repeatCount="indefinite" />
          </g>
        </g>

        {/* Birds */}
        <g stroke="#1e3a5f" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5">
          <g><path d="M0,-3 Q6,-9 12,-3 Q18,-9 24,-3" /><animateTransform attributeName="transform" type="translate" values="120,190;190,175;120,190" dur="13s" repeatCount="indefinite" /></g>
          <g><path d="M0,-2 Q4,-7 8,-2 Q12,-7 16,-2" /><animateTransform attributeName="transform" type="translate" values="170,210;220,200;170,210" dur="15s" repeatCount="indefinite" /></g>
          <g><path d="M0,-2.5 Q5,-8 10,-2.5 Q15,-8 20,-2.5" /><animateTransform attributeName="transform" type="translate" values="920,140;980,128;920,140" dur="11s" repeatCount="indefinite" /></g>
          <g><path d="M0,-2 Q4,-7 8,-2 Q12,-7 16,-2" /><animateTransform attributeName="transform" type="translate" values="600,160;650,148;600,160" dur="12s" repeatCount="indefinite" /></g>
        </g>

        {/* Far hills */}
        <path d="M0,560 Q150,460 300,510 Q450,430 600,490 Q750,420 900,480 Q1050,430 1200,470 Q1350,440 1440,500 L1440,900 L0,900Z" fill="url(#hFar)" opacity="0.7" />
        <g opacity="0.6">
          {[100,190,310,440,560,680,800,920,1060,1200,1330].map((x,i) => {
            const y = 480 + Math.sin(x/180)*40 + (i%2)*12, h = 20 + (i%3)*8;
            return (<g key={i}><rect x={x-2} y={y} width="4" height={h*.35} rx="2" fill="#1a3a1a" /><ellipse cx={x} cy={y-h*.08} rx={h*.4} ry={h*.48} fill="#15803d" opacity=".8" /><ellipse cx={x} cy={y-h*.22} rx={h*.28} ry={h*.35} fill="#16a34a" opacity=".6" /></g>);
          })}
        </g>

        {/* Mid hills */}
        <path d="M0,640 Q120,560 250,610 Q400,540 550,600 Q700,530 850,590 Q1000,540 1150,580 Q1300,550 1440,610 L1440,900 L0,900Z" fill="url(#hMid)" opacity="0.8" />
        <g opacity="0.7">
          {[80,200,330,470,600,730,870,1000,1140,1280,1380].map((x,i) => {
            const y = 580 + Math.sin(x/160)*30 + (i%2)*10, h = 28 + (i%3)*10;
            return (<g key={i}><rect x={x-2.5} y={y} width="5" height={h*.38} rx="2.5" fill="#14290f" /><ellipse cx={x} cy={y-h*.1} rx={h*.42} ry={h*.5} fill="#166534" opacity=".85" /><ellipse cx={x} cy={y-h*.25} rx={h*.3} ry={h*.36} fill="#15803d" opacity=".7" /><ellipse cx={x} cy={y-h*.36} rx={h*.18} ry={h*.22} fill="#22c55e" opacity=".4" /></g>);
          })}
        </g>

        {/* Near hills */}
        <path d="M0,720 Q100,660 200,700 Q350,640 500,690 Q650,630 800,680 Q950,640 1100,670 Q1250,650 1440,710 L1440,900 L0,900Z" fill="url(#hNear)" opacity="0.9" />

        {/* Moose (on the far hills) */}
        <g transform="translate(680, 520)" opacity="0.85">
          <ellipse cx="60" cy="50" rx="45" ry="30" fill="#5c3a1e" />
          <path d="M30,40 Q20,15 15,0 Q12,-10 10,-5" fill="#6b4226" stroke="#5c3a1e" strokeWidth="1" />
          <path d="M35,45 Q28,20 25,5 Q22,-5 18,-2" fill="#6b4226" />
          <ellipse cx="18" cy="-12" rx="16" ry="12" fill="#7a4f30" />
          <ellipse cx="6" cy="-6" rx="10" ry="8" fill="#8b6040" />
          <ellipse cx="3" cy="-4" rx="5" ry="4" fill="#6b4226" />
          <circle cx="1" cy="-5" r="1.5" fill="#1a1007" /><circle cx="5" cy="-3" r="1.2" fill="#1a1007" />
          <ellipse cx="12" cy="-18" rx="4.5" ry="5" fill="white" />
          <circle cx="10.5" cy="-17.5" r="3" fill="#2d1a0a" /><circle cx="9.5" cy="-18.5" r="1.2" fill="white" />
          <path d="M7,-23 Q12,-26 17,-23" fill="none" stroke="#5c3a1e" strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="8" cy="-26" rx="5" ry="8" fill="#7a4f30" transform="rotate(-20 8 -26)" />
          <ellipse cx="8" cy="-26" rx="3" ry="5" fill="#a07050" transform="rotate(-20 8 -26)" />
          <ellipse cx="28" cy="-24" rx="5" ry="7" fill="#7a4f30" transform="rotate(15 28 -24)" />
          <ellipse cx="28" cy="-24" rx="3" ry="4.5" fill="#a07050" transform="rotate(15 28 -24)" />
          <g fill="none" stroke="#a07050" strokeWidth="3" strokeLinecap="round">
            <path d="M5,-24 Q-5,-45 -15,-50" /><path d="M-8,-40 Q-18,-38 -22,-42" /><path d="M-12,-46 Q-20,-44 -26,-48" />
            <path d="M30,-22 Q40,-42 50,-46" /><path d="M42,-36 Q52,-34 56,-38" /><path d="M47,-42 Q55,-40 60,-44" />
          </g>
          <path d="M8,-2 Q5,6 8,10 Q10,6 8,-2" fill="#6b4226" />
        </g>

        {/* === City — left === */}
        <g>
          {/* Falu red house */}
          <rect x="15" y="655" width="36" height="110" rx="1" fill="#a83a2a" />
          <rect x="15" y="655" width="36" height="4" fill="#8b2f22" />
          {/* Yellow ochre */}
          <rect x="57" y="638" width="28" height="127" rx="1" fill="#d4a520" />
          <rect x="57" y="638" width="28" height="4" fill="#b8901a" />
          {/* White/cream wide */}
          <rect x="91" y="665" width="38" height="100" rx="1" fill="#f0e8d0" />
          {/* Falu red tall */}
          <rect x="135" y="645" width="24" height="120" rx="1" fill="#c4463a" />
          <rect x="135" y="645" width="24" height="4" fill="#a33a30" />
          {/* Cream */}
          <rect x="165" y="672" width="28" height="93" rx="1" fill="#ede6d3" />
          {/* Yellow */}
          <rect x="199" y="655" width="26" height="110" rx="1" fill="#d4a520" />
          <rect x="199" y="655" width="26" height="4" fill="#b8901a" />
          {/* Church tower — stone */}
          <rect x="231" y="625" width="18" height="140" rx="1" fill="#bfae90" />
          <polygon points="240,607 228,630 252,630" fill="#6b5540" />
          <line x1="240" y1="594" x2="240" y2="607" stroke="#6b5540" strokeWidth="2.5" />
          <line x1="234" y1="601" x2="246" y2="601" stroke="#6b5540" strokeWidth="2" />
          {/* White house */}
          <rect x="255" y="670" width="28" height="95" rx="1" fill="#f5f0e0" />
          {/* Falu red small */}
          <rect x="289" y="685" width="22" height="80" rx="1" fill="#a83a2a" />

          {/* Rooftops — dark gray/slate */}
          <polygon points="13,655 33,638 55,655" fill="#4a4a4a" />
          <polygon points="55,638 71,622 89,638" fill="#5a4a3a" />
          <polygon points="89,665 110,648 133,665" fill="#4a4a4a" />
          <polygon points="133,645 147,628 163,645" fill="#5a4a3a" />
          <polygon points="163,672 179,657 197,672" fill="#4a4a4a" />
          <polygon points="197,655 212,640 229,655" fill="#5a4a3a" />
          <polygon points="253,670 269,655 287,670" fill="#4a4a4a" />
          <polygon points="287,685 300,672 315,685" fill="#5a4a3a" />

          {/* Windows */}
          <g fill="#fef9c3" opacity="0.85">
            {/* Red house 1 */}
            <rect x="22" y="668" width="5" height="6" rx="0.5" /><rect x="34" y="668" width="5" height="6" rx="0.5" />
            <rect x="22" y="682" width="5" height="6" rx="0.5" /><rect x="34" y="682" width="5" height="6" rx="0.5" />
            <rect x="22" y="696" width="5" height="6" rx="0.5" /><rect x="34" y="696" width="5" height="6" rx="0.5" />
            <rect x="22" y="710" width="5" height="6" rx="0.5" /><rect x="34" y="710" width="5" height="6" rx="0.5" />
            {/* Yellow 1 */}
            <rect x="63" y="650" width="5" height="6" rx="0.5" /><rect x="74" y="650" width="5" height="6" rx="0.5" />
            <rect x="63" y="664" width="5" height="6" rx="0.5" /><rect x="74" y="664" width="5" height="6" rx="0.5" />
            <rect x="63" y="678" width="5" height="6" rx="0.5" /><rect x="74" y="678" width="5" height="6" rx="0.5" />
            <rect x="63" y="692" width="5" height="6" rx="0.5" /><rect x="74" y="692" width="5" height="6" rx="0.5" />
            <rect x="63" y="706" width="5" height="6" rx="0.5" /><rect x="74" y="706" width="5" height="6" rx="0.5" />
            {/* White wide */}
            <rect x="99" y="678" width="5" height="6" rx="0.5" /><rect x="110" y="678" width="5" height="6" rx="0.5" /><rect x="121" y="678" width="5" height="6" rx="0.5" />
            <rect x="99" y="692" width="5" height="6" rx="0.5" /><rect x="110" y="692" width="5" height="6" rx="0.5" /><rect x="121" y="692" width="5" height="6" rx="0.5" />
            <rect x="99" y="706" width="5" height="6" rx="0.5" /><rect x="110" y="706" width="5" height="6" rx="0.5" /><rect x="121" y="706" width="5" height="6" rx="0.5" />
            {/* Red tall */}
            <rect x="141" y="658" width="4" height="5" rx="0.5" /><rect x="151" y="658" width="4" height="5" rx="0.5" />
            <rect x="141" y="670" width="4" height="5" rx="0.5" /><rect x="151" y="670" width="4" height="5" rx="0.5" />
            <rect x="141" y="682" width="4" height="5" rx="0.5" /><rect x="151" y="682" width="4" height="5" rx="0.5" />
            <rect x="141" y="694" width="4" height="5" rx="0.5" /><rect x="151" y="694" width="4" height="5" rx="0.5" />
            {/* Cream */}
            <rect x="172" y="685" width="5" height="6" rx="0.5" /><rect x="183" y="685" width="5" height="6" rx="0.5" />
            <rect x="172" y="699" width="5" height="6" rx="0.5" /><rect x="183" y="699" width="5" height="6" rx="0.5" />
            <rect x="172" y="713" width="5" height="6" rx="0.5" /><rect x="183" y="713" width="5" height="6" rx="0.5" />
            {/* Yellow 2 */}
            <rect x="205" y="668" width="5" height="6" rx="0.5" /><rect x="215" y="668" width="5" height="6" rx="0.5" />
            <rect x="205" y="682" width="5" height="6" rx="0.5" /><rect x="215" y="682" width="5" height="6" rx="0.5" />
            <rect x="205" y="696" width="5" height="6" rx="0.5" /><rect x="215" y="696" width="5" height="6" rx="0.5" />
            {/* Church */}
            <rect x="236" y="638" width="4" height="5" rx="0.5" />
            <rect x="236" y="652" width="4" height="5" rx="0.5" />
            <rect x="236" y="666" width="4" height="5" rx="0.5" />
            <rect x="236" y="680" width="4" height="5" rx="0.5" />
            {/* White house */}
            <rect x="261" y="682" width="5" height="6" rx="0.5" /><rect x="272" y="682" width="5" height="6" rx="0.5" />
            <rect x="261" y="696" width="5" height="6" rx="0.5" /><rect x="272" y="696" width="5" height="6" rx="0.5" />
            {/* Red small */}
            <rect x="295" y="698" width="4" height="5" rx="0.5" /><rect x="304" y="698" width="4" height="5" rx="0.5" />
            <rect x="295" y="712" width="4" height="5" rx="0.5" /><rect x="304" y="712" width="4" height="5" rx="0.5" />
          </g>
        </g>

        {/* === City — right === */}
        <g>
          {/* Cream */}
          <rect x="1130" y="660" width="30" height="105" rx="1" fill="#ede6d3" />
          {/* Falu red */}
          <rect x="1166" y="642" width="34" height="123" rx="1" fill="#c4463a" />
          <rect x="1166" y="642" width="34" height="4" fill="#a33a30" />
          {/* Yellow */}
          <rect x="1206" y="665" width="24" height="100" rx="1" fill="#d4a520" />
          <rect x="1206" y="665" width="24" height="4" fill="#b8901a" />
          {/* Church tower */}
          <rect x="1236" y="620" width="20" height="145" rx="1" fill="#bfae90" />
          <polygon points="1246,603 1234,625 1258,625" fill="#6b5540" />
          <line x1="1246" y1="590" x2="1246" y2="603" stroke="#6b5540" strokeWidth="2.5" />
          <line x1="1240" y1="597" x2="1252" y2="597" stroke="#6b5540" strokeWidth="2" />
          {/* White */}
          <rect x="1262" y="652" width="30" height="113" rx="1" fill="#f0e8d0" />
          {/* Falu red */}
          <rect x="1298" y="670" width="28" height="95" rx="1" fill="#a83a2a" />
          {/* Yellow wide */}
          <rect x="1332" y="648" width="34" height="117" rx="1" fill="#d4a520" />
          <rect x="1332" y="648" width="34" height="4" fill="#b8901a" />
          {/* White */}
          <rect x="1372" y="665" width="28" height="100" rx="1" fill="#f5f0e0" />
          {/* Falu red */}
          <rect x="1406" y="678" width="34" height="87" rx="1" fill="#c4463a" />
          <rect x="1406" y="678" width="34" height="4" fill="#a33a30" />

          {/* Rooftops */}
          <polygon points="1128,660 1145,645 1162,660" fill="#4a4a4a" />
          <polygon points="1164,642 1183,624 1202,642" fill="#5a4a3a" />
          <polygon points="1204,665 1218,650 1234,665" fill="#4a4a4a" />
          <polygon points="1260,652 1277,636 1294,652" fill="#5a4a3a" />
          <polygon points="1296,670 1312,656 1330,670" fill="#4a4a4a" />
          <polygon points="1330,648 1349,630 1370,648" fill="#5a4a3a" />
          <polygon points="1370,665 1386,650 1404,665" fill="#4a4a4a" />
          <polygon points="1404,678 1421,662 1442,678" fill="#5a4a3a" />

          {/* Windows */}
          <g fill="#fef9c3" opacity="0.85">
            {/* Cream */}
            <rect x="1137" y="673" width="5" height="6" rx="0.5" /><rect x="1148" y="673" width="5" height="6" rx="0.5" />
            <rect x="1137" y="687" width="5" height="6" rx="0.5" /><rect x="1148" y="687" width="5" height="6" rx="0.5" />
            <rect x="1137" y="701" width="5" height="6" rx="0.5" /><rect x="1148" y="701" width="5" height="6" rx="0.5" />
            {/* Red 1 */}
            <rect x="1174" y="655" width="5" height="6" rx="0.5" /><rect x="1188" y="655" width="5" height="6" rx="0.5" />
            <rect x="1174" y="669" width="5" height="6" rx="0.5" /><rect x="1188" y="669" width="5" height="6" rx="0.5" />
            <rect x="1174" y="683" width="5" height="6" rx="0.5" /><rect x="1188" y="683" width="5" height="6" rx="0.5" />
            <rect x="1174" y="697" width="5" height="6" rx="0.5" /><rect x="1188" y="697" width="5" height="6" rx="0.5" />
            {/* Yellow 1 */}
            <rect x="1212" y="678" width="4" height="5" rx="0.5" /><rect x="1222" y="678" width="4" height="5" rx="0.5" />
            <rect x="1212" y="692" width="4" height="5" rx="0.5" /><rect x="1222" y="692" width="4" height="5" rx="0.5" />
            <rect x="1212" y="706" width="4" height="5" rx="0.5" /><rect x="1222" y="706" width="4" height="5" rx="0.5" />
            {/* Church */}
            <rect x="1242" y="634" width="4" height="5" rx="0.5" />
            <rect x="1242" y="648" width="4" height="5" rx="0.5" />
            <rect x="1242" y="662" width="4" height="5" rx="0.5" />
            <rect x="1242" y="676" width="4" height="5" rx="0.5" />
            <rect x="1242" y="690" width="4" height="5" rx="0.5" />
            {/* White */}
            <rect x="1269" y="665" width="5" height="6" rx="0.5" /><rect x="1281" y="665" width="5" height="6" rx="0.5" />
            <rect x="1269" y="679" width="5" height="6" rx="0.5" /><rect x="1281" y="679" width="5" height="6" rx="0.5" />
            <rect x="1269" y="693" width="5" height="6" rx="0.5" /><rect x="1281" y="693" width="5" height="6" rx="0.5" />
            {/* Red 2 */}
            <rect x="1305" y="683" width="5" height="6" rx="0.5" /><rect x="1316" y="683" width="5" height="6" rx="0.5" />
            <rect x="1305" y="697" width="5" height="6" rx="0.5" /><rect x="1316" y="697" width="5" height="6" rx="0.5" />
            <rect x="1305" y="711" width="5" height="6" rx="0.5" /><rect x="1316" y="711" width="5" height="6" rx="0.5" />
            {/* Yellow wide */}
            <rect x="1340" y="662" width="5" height="6" rx="0.5" /><rect x="1354" y="662" width="5" height="6" rx="0.5" />
            <rect x="1340" y="676" width="5" height="6" rx="0.5" /><rect x="1354" y="676" width="5" height="6" rx="0.5" />
            <rect x="1340" y="690" width="5" height="6" rx="0.5" /><rect x="1354" y="690" width="5" height="6" rx="0.5" />
            <rect x="1340" y="704" width="5" height="6" rx="0.5" /><rect x="1354" y="704" width="5" height="6" rx="0.5" />
            {/* White 2 */}
            <rect x="1379" y="678" width="5" height="6" rx="0.5" /><rect x="1390" y="678" width="5" height="6" rx="0.5" />
            <rect x="1379" y="692" width="5" height="6" rx="0.5" /><rect x="1390" y="692" width="5" height="6" rx="0.5" />
            {/* Red 3 */}
            <rect x="1413" y="692" width="5" height="6" rx="0.5" /><rect x="1426" y="692" width="5" height="6" rx="0.5" />
            <rect x="1413" y="706" width="5" height="6" rx="0.5" /><rect x="1426" y="706" width="5" height="6" rx="0.5" />
          </g>
        </g>

        {/* Trees between cities */}
        <g>
          {[{x:340,y:730,s:1.5},{x:440,y:738,s:1.2},{x:560,y:725,s:1.4},{x:680,y:735,s:1.1},{x:800,y:728,s:1.5},{x:920,y:734,s:1.2},{x:1040,y:730,s:1.4}].map((t, i) => (
            <g key={i} transform={`translate(${t.x}, ${t.y}) scale(${t.s})`} opacity="0.85">
              <rect x="-3" y="0" width="6" height="24" rx="3" fill="#1a2e0a" />
              <ellipse cx="0" cy="-6" rx="22" ry="26" fill="#14532d" />
              <ellipse cx="0" cy="-14" rx="16" ry="19" fill="#166534" />
              <ellipse cx="0" cy="-21" rx="10" ry="12" fill="#15803d" />
              <ellipse cx="3" cy="-18" rx="4" ry="5" fill="#22c55e" opacity=".35" />
            </g>
          ))}
        </g>

        {/* Quay / shore line */}
        <rect x="0" y="762" width="1440" height="5" fill="#8b7355" opacity="0.7" />
        <rect x="0" y="767" width="1440" height="2" fill="#6b5540" opacity="0.5" />

        {/* === Water === */}
        <rect x="0" y="769" width="1440" height="131" fill="url(#waterG)" />
        {/* Reflections from buildings */}
        <g opacity="0.15">
          <rect x="20" y="770" width="290" height="60" rx="2" fill="#c4463a" />
          <rect x="1130" y="770" width="310" height="60" rx="2" fill="#c4463a" />
        </g>
        {/* Sun reflection on water */}
        <ellipse cx="720" cy="810" rx="280" ry="18" fill="#fde047" opacity="0.08" />
        <ellipse cx="720" cy="810" rx="120" ry="8" fill="#fef9c3" opacity="0.1" />
        {/* Waves */}
        <g stroke="white" strokeWidth="1" fill="none" opacity="0.12" strokeLinecap="round">
          <path d="M0,785 Q60,780 120,785 Q180,790 240,785 Q300,780 360,785 Q420,790 480,785 Q540,780 600,785 Q660,790 720,785 Q780,780 840,785 Q900,790 960,785 Q1020,780 1080,785 Q1140,790 1200,785 Q1260,780 1320,785 Q1380,790 1440,785">
            <animateTransform attributeName="transform" type="translate" values="0,0;30,0;0,0" dur="6s" repeatCount="indefinite" />
          </path>
          <path d="M0,805 Q50,800 100,805 Q150,810 200,805 Q250,800 300,805 Q350,810 400,805 Q450,800 500,805 Q550,810 600,805 Q650,800 700,805 Q750,810 800,805 Q850,800 900,805 Q950,810 1000,805 Q1050,800 1100,805 Q1150,810 1200,805 Q1250,800 1300,805 Q1350,810 1400,805 Q1430,800 1440,802">
            <animateTransform attributeName="transform" type="translate" values="0,0;-25,0;0,0" dur="8s" repeatCount="indefinite" />
          </path>
          <path d="M0,830 Q70,825 140,830 Q210,835 280,830 Q350,825 420,830 Q490,835 560,830 Q630,825 700,830 Q770,835 840,830 Q910,825 980,830 Q1050,835 1120,830 Q1190,825 1260,830 Q1330,835 1400,830 L1440,828">
            <animateTransform attributeName="transform" type="translate" values="0,0;20,0;0,0" dur="10s" repeatCount="indefinite" />
          </path>
        </g>

        {/* Cyclists on quay */}
        <g transform="translate(380, 752)"><Cyclist x={0} color="#a78bfa" /><animateTransform attributeName="transform" type="translate" values="350,752;600,750;900,752;600,750;350,752" dur="20s" repeatCount="indefinite" /></g>
        <g transform="translate(700, 752)"><Cyclist x={0} color="#67e8f9" dir={-1} /><animateTransform attributeName="transform" type="translate" values="800,750;550,752;300,750;550,752;800,750" dur="24s" repeatCount="indefinite" /></g>

        {/* Butterflies */}
        <g>
          <g opacity="0.5">
            <ellipse cx="-5" cy="0" rx="5" ry="3.5" fill="#f472b6" /><ellipse cx="5" cy="0" rx="5" ry="3.5" fill="#f472b6" />
            <ellipse cx="-3.5" cy="2" rx="3.5" ry="2.5" fill="#f9a8d4" /><ellipse cx="3.5" cy="2" rx="3.5" ry="2.5" fill="#f9a8d4" />
            <circle cx="0" cy="0" r="1" fill="#fce7f3" />
            <animateTransform attributeName="transform" type="translate" values="350,620;390,600;370,630;340,610;350,620" dur="9s" repeatCount="indefinite" />
          </g>
          <g opacity="0.45">
            <ellipse cx="-4" cy="0" rx="4.5" ry="3" fill="#c084fc" /><ellipse cx="4" cy="0" rx="4.5" ry="3" fill="#c084fc" />
            <ellipse cx="-3" cy="1.5" rx="3" ry="2" fill="#e9d5ff" /><ellipse cx="3" cy="1.5" rx="3" ry="2" fill="#e9d5ff" />
            <circle cx="0" cy="0" r=".8" fill="#faf5ff" />
            <animateTransform attributeName="transform" type="translate" values="800,570;830,550;810,580;790,560;800,570" dur="11s" repeatCount="indefinite" />
          </g>
          <g opacity="0.4">
            <ellipse cx="-4" cy="0" rx="4" ry="2.8" fill="#fbbf24" /><ellipse cx="4" cy="0" rx="4" ry="2.8" fill="#fbbf24" />
            <circle cx="0" cy="0" r=".8" fill="#fef3c7" />
            <animateTransform attributeName="transform" type="translate" values="600,520;630,500;610,530;590,510;600,520" dur="10s" repeatCount="indefinite" />
          </g>
        </g>

        {/* Wind */}
        <g stroke="white" strokeWidth="1.5" opacity="0.15" strokeLinecap="round" fill="none">
          <path d="M100,300 Q150,294 200,300 Q230,294 260,300"><animateTransform attributeName="transform" type="translate" values="0,0;70,0;0,0" dur="7s" repeatCount="indefinite" /></path>
          <path d="M650,270 Q690,264 730,270"><animateTransform attributeName="transform" type="translate" values="0,0;50,0;0,0" dur="6s" repeatCount="indefinite" /></path>
          <path d="M1000,330 Q1040,324 1080,330 Q1100,324 1120,330"><animateTransform attributeName="transform" type="translate" values="0,0;40,0;0,0" dur="8s" repeatCount="indefinite" /></path>
        </g>
      </svg>

      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, height: "12vh",
        background: "linear-gradient(to bottom, rgba(5,46,22,0) 0%, rgba(5,46,22,0.7) 100%)",
        pointerEvents: "none",
      }} />
    </div>
  );
}
