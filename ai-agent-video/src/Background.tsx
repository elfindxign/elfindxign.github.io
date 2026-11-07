import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from './theme';

// Slowly drifting glow blobs that stay behind every scene.
type Tint = {readonly a?: string; readonly b?: string};

export const Background = ({a = colors.violet, b = colors.cyan}: Tint) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = frame / durationInFrames;

  return (
    <AbsoluteFill style={{backgroundColor: colors.bg, overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          width: 1100,
          height: 1100,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${a}55, transparent 65%)`,
          left: interpolate(t, [0, 1], [-400, 200]),
          top: interpolate(t, [0, 1], [-200, 500]),
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 1000,
          height: 1000,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${b}40, transparent 65%)`,
          right: interpolate(t, [0, 1], [-450, 50]),
          bottom: interpolate(t, [0, 1], [-200, 300]),
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.035) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.035) 2px, transparent 2px)',
          backgroundSize: '90px 90px',
        }}
      />
    </AbsoluteFill>
  );
};

export const ProgressBar = ({a = colors.violet, b = colors.cyan}: Tint) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return (
    <div
      style={{
        position: 'absolute',
        left: 80,
        right: 80,
        bottom: 90,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.1)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${interpolate(frame, [0, durationInFrames - 1], [0, 100])}%`,
          backgroundImage: `linear-gradient(90deg, ${a}, ${b})`,
        }}
      />
    </div>
  );
};
