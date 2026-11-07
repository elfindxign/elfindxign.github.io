import {interpolate, useCurrentFrame} from 'remotion';
import {colors} from './theme';

// Friendly robot face with blinking eyes, drawn in SVG (no emoji fonts needed).
export const AgentIcon = ({size}: {readonly size: number}) => {
  const frame = useCurrentFrame();
  const blink = frame % 75;
  const eyeScale = interpolate(blink, [60, 64, 68], [1, 0.1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <svg width={size} height={size} viewBox="0 0 200 200">
      <defs>
        <linearGradient id="agentGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={colors.violet} />
          <stop offset="1" stopColor={colors.cyan} />
        </linearGradient>
      </defs>
      <line x1="100" y1="22" x2="100" y2="48" stroke="url(#agentGrad)" strokeWidth="8" strokeLinecap="round" />
      <circle cx="100" cy="18" r="10" fill={colors.cyan} />
      <rect x="28" y="48" width="144" height="124" rx="40" fill="url(#agentGrad)" />
      <rect x="46" y="70" width="108" height="78" rx="28" fill={colors.bg} />
      <g transform={`translate(0 109) scale(1 ${eyeScale}) translate(0 -109)`}>
        <circle cx="78" cy="109" r="13" fill={colors.cyan} />
        <circle cx="122" cy="109" r="13" fill={colors.cyan} />
      </g>
    </svg>
  );
};
