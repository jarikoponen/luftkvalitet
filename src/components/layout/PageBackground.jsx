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
          <linearGradient id="meadow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#064e3b" /><stop offset="100%" stopColor="#022c22" />
          </linearGradient>
          <linearGradient id="pathG" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a3724e" stopOpacity="0" />
            <stop offset="30%" stopColor="#a3724e" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#a3724e" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#a3724e" stopOpacity="0" />
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

        {/* Hills */}
        <path d="M0,560 Q150,460 300,510 Q450,430 600,490 Q750,420 900,480 Q1050,430 1200,470 Q1350,440 1440,500 L1440,900 L0,900Z" fill="url(#hFar)" opacity="0.7" />
        <g opacity="0.6">
          {[100,190,310,440,560,680,800,920,1060,1200,1330].map((x,i) => {
            const y = 480 + Math.sin(x/180)*40 + (i%2)*12, h = 20 + (i%3)*8;
            return (<g key={i}><rect x={x-2} y={y} width="4" height={h*.35} rx="2" fill="#1a3a1a" /><ellipse cx={x} cy={y-h*.08} rx={h*.4} ry={h*.48} fill="#15803d" opacity=".8" /><ellipse cx={x} cy={y-h*.22} rx={h*.28} ry={h*.35} fill="#16a34a" opacity=".6" /></g>);
          })}
        </g>

        <path d="M0,640 Q120,560 250,610 Q400,540 550,600 Q700,530 850,590 Q1000,540 1150,580 Q1300,550 1440,610 L1440,900 L0,900Z" fill="url(#hMid)" opacity="0.8" />
        <g opacity="0.7">
          {[80,200,330,470,600,730,870,1000,1140,1280,1380].map((x,i) => {
            const y = 580 + Math.sin(x/160)*30 + (i%2)*10, h = 28 + (i%3)*10;
            return (<g key={i}><rect x={x-2.5} y={y} width="5" height={h*.38} rx="2.5" fill="#14290f" /><ellipse cx={x} cy={y-h*.1} rx={h*.42} ry={h*.5} fill="#166534" opacity=".85" /><ellipse cx={x} cy={y-h*.25} rx={h*.3} ry={h*.36} fill="#15803d" opacity=".7" /><ellipse cx={x} cy={y-h*.36} rx={h*.18} ry={h*.22} fill="#22c55e" opacity=".4" /></g>);
          })}
        </g>

        <path d="M0,720 Q100,660 200,700 Q350,640 500,690 Q650,630 800,680 Q950,640 1100,670 Q1250,650 1440,710 L1440,900 L0,900Z" fill="url(#hNear)" opacity="0.9" />
        <path d="M0,780 Q200,755 400,775 Q600,750 800,770 Q1000,750 1200,765 Q1350,755 1440,775 L1440,900 L0,900Z" fill="url(#meadow)" />

        {/* Cycling path */}
        <path d="M0,810 Q200,795 400,808 Q600,795 800,805 Q1000,792 1200,802 Q1350,795 1440,808" fill="none" stroke="url(#pathG)" strokeWidth="5" strokeLinecap="round" />
        <path d="M0,810 Q200,795 400,808 Q600,795 800,805 Q1000,792 1200,802 Q1350,795 1440,808" fill="none" stroke="#d4a574" strokeWidth="1" strokeDasharray="8 16" opacity="0.2" />

        {/* Near big trees */}
        <g>
          {[{x:50,y:740,s:1.5},{x:170,y:750,s:1.2},{x:300,y:735,s:1.6},{x:1130,y:740,s:1.3},{x:1260,y:730,s:1.7}].map((t, i) => (
            <g key={i} transform={`translate(${t.x}, ${t.y}) scale(${t.s})`} opacity="0.85">
              <rect x="-3" y="0" width="6" height="24" rx="3" fill="#1a2e0a" />
              <ellipse cx="0" cy="-6" rx="22" ry="26" fill="#14532d" />
              <ellipse cx="0" cy="-14" rx="16" ry="19" fill="#166534" />
              <ellipse cx="0" cy="-21" rx="10" ry="12" fill="#15803d" />
              <ellipse cx="3" cy="-18" rx="4" ry="5" fill="#22c55e" opacity=".35" />
            </g>
          ))}
        </g>

        {/* Flowers */}
        <g>
          {[[100,818,"#f472b6"],[180,828,"#fbbf24"],[280,815,"#c084fc"],[370,826,"#fb923c"],[470,820,"#f472b6"],[560,830,"#fbbf24"],[660,816,"#c084fc"],[750,825,"#fb923c"],[850,818,"#f472b6"],[950,828,"#fbbf24"],[1050,814,"#c084fc"],[1150,824,"#fb923c"],[1260,820,"#f472b6"],[1360,828,"#fbbf24"]].map(([x,y,c],i) => (
            <g key={i} opacity="0.55">
              <line x1={x} y1={y} x2={x} y2={y+9} stroke="#22c55e" strokeWidth="1.5" />
              <circle cx={x-2.5} cy={y-1} r="2.2" fill={c} /><circle cx={x+2.5} cy={y-1} r="2.2" fill={c} />
              <circle cx={x} cy={y-3} r="2.2" fill={c} /><circle cx={x} cy={y-1} r="1.5" fill="#fef08a" />
            </g>
          ))}
        </g>

        {/* Cyclists */}
        <g transform="translate(380, 790)"><Cyclist x={0} color="#a78bfa" /><animateTransform attributeName="transform" type="translate" values="200,793;500,787;800,793;500,787;200,793" dur="20s" repeatCount="indefinite" /></g>
        <g transform="translate(700, 790)"><Cyclist x={0} color="#67e8f9" dir={-1} /><animateTransform attributeName="transform" type="translate" values="900,790;600,796;300,790;600,796;900,790" dur="24s" repeatCount="indefinite" /></g>
        <g transform="translate(550, 792)"><Cyclist x={0} color="#fca5a5" /><animateTransform attributeName="transform" type="translate" values="100,795;450,788;800,795;450,788;100,795" dur="28s" repeatCount="indefinite" /></g>

        {/* Butterflies */}
        <g>
          <g opacity="0.5">
            <ellipse cx="-5" cy="0" rx="5" ry="3.5" fill="#f472b6" /><ellipse cx="5" cy="0" rx="5" ry="3.5" fill="#f472b6" />
            <ellipse cx="-3.5" cy="2" rx="3.5" ry="2.5" fill="#f9a8d4" /><ellipse cx="3.5" cy="2" rx="3.5" ry="2.5" fill="#f9a8d4" />
            <circle cx="0" cy="0" r="1" fill="#fce7f3" />
            <animateTransform attributeName="transform" type="translate" values="350,650;390,630;370,660;340,640;350,650" dur="9s" repeatCount="indefinite" />
          </g>
          <g opacity="0.45">
            <ellipse cx="-4" cy="0" rx="4.5" ry="3" fill="#c084fc" /><ellipse cx="4" cy="0" rx="4.5" ry="3" fill="#c084fc" />
            <ellipse cx="-3" cy="1.5" rx="3" ry="2" fill="#e9d5ff" /><ellipse cx="3" cy="1.5" rx="3" ry="2" fill="#e9d5ff" />
            <circle cx="0" cy="0" r=".8" fill="#faf5ff" />
            <animateTransform attributeName="transform" type="translate" values="800,600;830,580;810,610;790,590;800,600" dur="11s" repeatCount="indefinite" />
          </g>
          <g opacity="0.4">
            <ellipse cx="-4" cy="0" rx="4" ry="2.8" fill="#fbbf24" /><ellipse cx="4" cy="0" rx="4" ry="2.8" fill="#fbbf24" />
            <circle cx="0" cy="0" r=".8" fill="#fef3c7" />
            <animateTransform attributeName="transform" type="translate" values="600,550;630,530;610,560;590,540;600,550" dur="10s" repeatCount="indefinite" />
          </g>
        </g>

        {/* Wind */}
        <g stroke="white" strokeWidth="1.5" opacity="0.15" strokeLinecap="round" fill="none">
          <path d="M100,300 Q150,294 200,300 Q230,294 260,300"><animateTransform attributeName="transform" type="translate" values="0,0;70,0;0,0" dur="7s" repeatCount="indefinite" /></path>
          <path d="M650,270 Q690,264 730,270"><animateTransform attributeName="transform" type="translate" values="0,0;50,0;0,0" dur="6s" repeatCount="indefinite" /></path>
          <path d="M1000,330 Q1040,324 1080,330 Q1100,324 1120,330"><animateTransform attributeName="transform" type="translate" values="0,0;40,0;0,0" dur="8s" repeatCount="indefinite" /></path>
        </g>

        {/* Moose */}
        <g transform="translate(1390, 520)" opacity="0.85">
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
      </svg>

      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, height: "55vh",
        background: "linear-gradient(to bottom, rgba(5,46,22,0) 0%, rgba(5,46,22,0.6) 30%, rgba(5,46,22,0.88) 60%, rgba(5,46,22,0.96) 100%)",
        pointerEvents: "none",
      }} />
    </div>
  );
}
