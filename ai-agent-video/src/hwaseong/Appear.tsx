import type React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {clamp} from '../theme';

// Fades + slides its children in at `at` seconds into the scene.
export const Appear = ({
  at,
  children,
  style,
  from = '0px 50px',
}: {
  readonly at: number;
  readonly children: React.ReactNode;
  readonly style?: React.CSSProperties;
  readonly from?: string;
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <div
      style={{
        opacity: interpolate(frame, [at * fps, (at + 0.35) * fps], [0, 1], clamp),
        translate: interpolate(frame, [at * fps, (at + 0.5) * fps], [from, '0px 0px'], {
          ...clamp,
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        ...style,
      }}
    >
      {children}
    </div>
  );
};
