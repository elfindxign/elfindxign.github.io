import {hw} from './theme';

// Geojunggi (pulley crane). lift: 0..1 raises the stone.
export const Crane = ({size, lift}: {readonly size: number; readonly lift: number}) => {
  const stoneY = 410 - lift * 190;
  return (
    <svg width={size} height={size * 0.95} viewBox="0 0 600 570">
      <line x1={140} y1={540} x2={300} y2={90} stroke="#A0754A" strokeWidth={22} strokeLinecap="round" />
      <line x1={460} y1={540} x2={300} y2={90} stroke="#A0754A" strokeWidth={22} strokeLinecap="round" />
      <line x1={200} y1={370} x2={400} y2={370} stroke="#8A6340" strokeWidth={14} strokeLinecap="round" />
      <circle cx={300} cy={120} r={30} fill="none" stroke={hw.gold} strokeWidth={10} />
      <line x1={300} y1={150} x2={300} y2={stoneY} stroke={hw.paper} strokeWidth={5} />
      <line x1={330} y1={120} x2={490} y2={470} stroke={hw.paper} strokeWidth={5} />
      <g transform={`rotate(${lift * 720} 500 480)`}>
        <circle cx={500} cy={480} r={46} fill="none" stroke={hw.gold} strokeWidth={10} />
        {[0, 45, 90, 135].map((a) => (
          <line
            key={a}
            x1={500 - 46 * Math.cos((a * Math.PI) / 180)}
            y1={480 - 46 * Math.sin((a * Math.PI) / 180)}
            x2={500 + 46 * Math.cos((a * Math.PI) / 180)}
            y2={480 + 46 * Math.sin((a * Math.PI) / 180)}
            stroke={hw.gold}
            strokeWidth={6}
          />
        ))}
      </g>
      <rect x={235} y={stoneY} width={130} height={90} rx={10} fill={hw.stone} stroke={hw.stoneEdge} strokeWidth={4} />
      <line x1={60} y1={548} x2={560} y2={548} stroke="rgba(255,255,255,0.2)" strokeWidth={6} />
    </svg>
  );
};

// Korean brass coin (yeopjeon).
export const Coin = ({size}: {readonly size: number}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx={50} cy={50} r={46} fill={hw.gold} stroke="#B07F25" strokeWidth={5} />
    <rect x={36} y={36} width={28} height={28} fill={hw.ink} />
  </svg>
);

// Uigwe book with a vertical title strip.
export const Book = ({width}: {readonly width: number}) => (
  <div
    style={{
      width,
      height: width * 1.35,
      borderRadius: 14,
      backgroundColor: '#22345E',
      border: '6px solid #31477A',
      boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      paddingTop: width * 0.12,
      position: 'relative',
    }}
  >
    {[0.15, 0.38, 0.62, 0.85].map((p) => (
      <div key={p} style={{position: 'absolute', left: 14, top: `${p * 100}%`, width: 18, height: 6, backgroundColor: hw.gold}} />
    ))}
    <div
      style={{
        writingMode: 'vertical-rl',
        backgroundColor: hw.paper,
        color: hw.ink,
        fontWeight: 900,
        fontSize: width * 0.13,
        padding: `${width * 0.06}px ${width * 0.04}px`,
        height: 'fit-content',
        letterSpacing: 6,
      }}
    >
      화성성역의궤
    </div>
  </div>
);
