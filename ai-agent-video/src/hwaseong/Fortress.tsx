import {hw} from './theme';

const ROWS = 5;
const BW = 90;
const BH = 46;
const TOP = 330;

const rnd = (i: number) => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Hwaseong-style gate: stone wall with crenels, arched gate and a two-tier pavilion.
 * ruin: 0 = intact, 1 = collapsed. blueprint: 0..1 draws a line plan, color: 0..1 fades the finished building in.
 */
export const Fortress = ({
  width,
  ruin = 0,
  blueprint = 1,
  color = 1,
  night = false,
}: {
  readonly width: number;
  readonly ruin?: number;
  readonly blueprint?: number;
  readonly color?: number;
  readonly night?: boolean;
}) => {
  const blocks: {x: number; y: number; r: number; i: number}[] = [];
  let i = 0;
  for (let r = 0; r < ROWS; r++) {
    const offset = r % 2 ? -BW / 2 : 0;
    for (let x = offset; x < 900; x += BW) {
      blocks.push({x, y: TOP + r * BH, r, i: i++});
    }
  }
  const crenels = Array.from({length: 15}, (_, k) => k * 62 + 8);

  const pavilion = (stroke?: string) => {
    const fill = (c: string) => (stroke ? 'none' : c);
    const s = stroke ? {stroke, strokeWidth: 4, pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - blueprint} : {};
    return (
      <g>
        {/* lower roof */}
        <path d="M200 252 C260 246 285 226 320 218 L580 218 C615 226 640 246 700 252 L670 262 L230 262 Z" fill={fill(hw.roof)} {...s} />
        {/* pillars */}
        {[270, 340, 410, 490, 560, 630].map((x) => (
          <rect key={x} x={x - 7} y={262} width={14} height={68} fill={fill(hw.red)} {...s} />
        ))}
        {/* upper body */}
        <rect x={330} y={170} width={240} height={48} fill={fill('#5B3A2E')} {...s} />
        {[350, 410, 490, 550].map((x) => (
          <rect key={x} x={x - 6} y={170} width={12} height={48} fill={fill(hw.red)} {...s} />
        ))}
        {/* upper roof */}
        <path d="M265 175 C320 168 345 142 375 132 L525 132 C555 142 580 168 635 175 L610 184 L290 184 Z" fill={fill(hw.roof)} {...s} />
        <rect x={375} y={124} width={150} height={10} rx={5} fill={fill(hw.roof)} {...s} />
      </g>
    );
  };

  const wall = (stroke?: string) => {
    const s = stroke ? {stroke, strokeWidth: 3, pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - blueprint} : {};
    return (
      <g>
        {crenels.map((x, k) => {
          const fall = ruin * (120 + rnd(k + 99) * 260);
          return (
            <rect
              key={x}
              x={x}
              y={300}
              width={46}
              height={30}
              rx={3}
              fill={stroke ? 'none' : hw.stone}
              stroke={stroke ?? hw.stoneEdge}
              strokeWidth={stroke ? 3 : 2}
              {...s}
              transform={stroke ? undefined : `translate(${ruin * (rnd(k) - 0.5) * 80} ${fall}) rotate(${ruin * (rnd(k + 7) - 0.5) * 70} ${x + 23} 315)`}
              opacity={stroke ? 1 : 1 - ruin * 0.5}
            />
          );
        })}
        {blocks.map((b) => {
          const weak = (ROWS - b.r) / ROWS;
          const falls = rnd(b.i) < 0.75;
          const dy = falls ? ruin * weak * (60 + rnd(b.i + 3) * 200) : 0;
          return (
            <rect
              key={b.i}
              x={b.x + 2}
              y={b.y + 2}
              width={BW - 4}
              height={BH - 4}
              rx={4}
              fill={stroke ? 'none' : rnd(b.i + 11) > 0.5 ? hw.stone : '#B3A78F'}
              stroke={stroke ?? hw.stoneEdge}
              strokeWidth={stroke ? 3 : 2}
              {...s}
              transform={
                stroke
                  ? undefined
                  : `translate(${falls ? ruin * weak * (rnd(b.i + 5) - 0.5) * 90 : 0} ${dy}) rotate(${falls ? ruin * weak * (rnd(b.i + 1) - 0.5) * 50 : 0} ${b.x + BW / 2} ${b.y + BH / 2})`
              }
              opacity={stroke ? 1 : falls ? 1 - ruin * weak * 0.6 : 1}
            />
          );
        })}
        {/* gate arch */}
        <path d="M385 560 L385 455 Q450 385 515 455 L515 560 Z" fill={stroke ? 'none' : night ? '#E8B04B55' : '#1A1D26'} stroke={stroke} strokeWidth={stroke ? 4 : 0} {...s} />
      </g>
    );
  };

  return (
    <svg width={width} height={(width * 600) / 900} viewBox="0 0 900 600" style={{overflow: 'visible'}}>
      {blueprint < 1 || color < 1 ? (
        <g opacity={1 - color * 0.7}>
          {wall(hw.blueprint)}
          {pavilion(hw.blueprint)}
        </g>
      ) : null}
      <g opacity={color} style={{filter: `grayscale(${Math.min(1, ruin * 1.4)})`}}>
        <g
          transform={`translate(${ruin * 40} ${ruin * 260}) rotate(${ruin * 14} 450 300)`}
          opacity={1 - ruin * 0.8}
        >
          {pavilion()}
        </g>
        {wall()}
      </g>
    </svg>
  );
};
