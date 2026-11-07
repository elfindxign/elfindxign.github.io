import type React from 'react';
import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {clamp, colors, fontFamily} from '../theme';

// Shared layout for the E / S / G scenes: big letter, name, icon, three examples.
export const Pillar = ({
  letter,
  english,
  korean,
  color,
  icon,
  items,
}: {
  readonly letter: string;
  readonly english: string;
  readonly korean: string;
  readonly color: string;
  readonly icon: React.ReactNode;
  readonly items: readonly string[];
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const out = Easing.bezier(0.16, 1, 0.3, 1);

  return (
    <>
      <div style={{display: 'flex', alignItems: 'center', gap: 50, marginBottom: 30}}>
        <div
          style={{
            width: 260,
            height: 260,
            borderRadius: 70,
            backgroundColor: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily,
            fontWeight: 900,
            fontSize: 190,
            color: colors.bg,
            boxShadow: `0 0 110px ${color}88`,
            scale: interpolate(frame, [0, 0.5 * fps], [0.4, 1], {
              ...clamp,
              easing: Easing.spring({damping: 12}),
              output: 'perceptual-scale',
            }),
          }}
        >
          {letter}
        </div>
        <div
          style={{
            opacity: interpolate(frame, [0.2 * fps, 0.6 * fps], [0, 1], clamp),
            translate: interpolate(frame, [0.2 * fps, 0.6 * fps], ['60px 0px', '0px 0px'], {...clamp, easing: out}),
          }}
        >
          <div style={{fontFamily, fontWeight: 700, fontSize: 52, color}}>{english}</div>
          <div style={{fontFamily, fontWeight: 900, fontSize: 120, color: colors.text, lineHeight: 1.1}}>{korean}</div>
        </div>
      </div>

      <div
        style={{
          margin: '40px 0 60px',
          opacity: interpolate(frame, [0.4 * fps, 0.8 * fps], [0, 1], clamp),
        }}
      >
        {icon}
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: 30, width: 900}}>
        {items.map((item, i) => {
          const t0 = (0.9 + i * 0.45) * fps;
          return (
            <div
              key={item}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 32,
                padding: '34px 48px',
                borderRadius: 36,
                backgroundColor: colors.card,
                border: `3px solid ${color}55`,
                fontFamily,
                fontWeight: 700,
                fontSize: 58,
                color: colors.text,
                opacity: interpolate(frame, [t0, t0 + 0.3 * fps], [0, 1], clamp),
                translate: interpolate(frame, [t0, t0 + 0.4 * fps], ['0px 50px', '0px 0px'], {...clamp, easing: out}),
              }}
            >
              <div style={{width: 22, height: 22, borderRadius: 11, backgroundColor: color, flexShrink: 0}} />
              {item}
            </div>
          );
        })}
      </div>
    </>
  );
};
