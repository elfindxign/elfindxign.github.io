import type React from 'react';
import {Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {AgentIcon} from '../AgentIcon';
import {clamp, colors, fontFamily, gradientText} from '../theme';

const Card = ({
  label,
  line,
  accent,
  icon,
  style,
}: {
  readonly label: string;
  readonly line: React.ReactNode;
  readonly accent: boolean;
  readonly icon: React.ReactNode;
  readonly style: React.CSSProperties;
}) => (
  <div
    style={{
      width: 920,
      padding: '60px 64px',
      borderRadius: 48,
      backgroundColor: accent ? 'rgba(139,92,246,0.14)' : colors.card,
      border: `3px solid ${accent ? colors.violet : colors.cardBorder}`,
      boxShadow: accent ? `0 0 90px ${colors.violet}55` : 'none',
      display: 'flex',
      alignItems: 'center',
      gap: 48,
      fontFamily,
      ...style,
    }}
  >
    {icon}
    <div>
      <div style={{fontSize: 48, fontWeight: 700, color: accent ? colors.cyan : colors.muted, marginBottom: 12}}>
        {label}
      </div>
      <div style={{fontSize: 70, fontWeight: 900, color: colors.text, lineHeight: 1.25}}>{line}</div>
    </div>
  </div>
);

const ChatIcon = () => (
  <svg width={150} height={150} viewBox="0 0 100 100">
    <path
      d="M15 20 h70 a10 10 0 0 1 10 10 v34 a10 10 0 0 1 -10 10 h-40 l-18 16 v-16 h-12 a10 10 0 0 1 -10 -10 v-34 a10 10 0 0 1 10 -10z"
      fill="none"
      stroke={colors.muted}
      strokeWidth="6"
      strokeLinejoin="round"
    />
    <circle cx="33" cy="47" r="5" fill={colors.muted} />
    <circle cx="50" cy="47" r="5" fill={colors.muted} />
    <circle cx="67" cy="47" r="5" fill={colors.muted} />
  </svg>
);

const CompareInner = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const out = Easing.bezier(0.16, 1, 0.3, 1);

  return (
    <>
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 96,
          color: colors.text,
          marginBottom: 90,
          textAlign: 'center',
          opacity: interpolate(frame, [0, 0.4 * fps], [0, 1], clamp),
        }}
      >
        챗봇이랑 뭐가 달라?
      </div>
      <Card
        label="챗봇"
        line="질문에 대답만 해요"
        accent={false}
        icon={<ChatIcon />}
        style={{
          opacity: interpolate(frame, [0.5 * fps, 1 * fps], [0, 1], clamp),
          translate: interpolate(frame, [0.5 * fps, 1 * fps], ['-120px 0px', '0px 0px'], {...clamp, easing: out}),
        }}
      />
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 90,
          color: colors.muted,
          margin: '40px 0',
          opacity: interpolate(frame, [1.8 * fps, 2.2 * fps], [0, 1], clamp),
        }}
      >
        VS
      </div>
      <Card
        label="AI 에이전트"
        line={
          <>
            목표를 받으면
            <br />
            <span style={gradientText}>직접 행동</span>해요
          </>
        }
        accent
        icon={<AgentIcon size={150} />}
        style={{
          opacity: interpolate(frame, [2.4 * fps, 2.9 * fps], [0, 1], clamp),
          translate: interpolate(frame, [2.4 * fps, 2.9 * fps], ['120px 0px', '0px 0px'], {...clamp, easing: out}),
          scale: interpolate(frame, [2.4 * fps, 3.1 * fps], [0.9, 1], {
            ...clamp,
            easing: Easing.spring({damping: 14}),
            output: 'perceptual-scale',
          }),
        }}
      />
    </>
  );
};

export const Compare = Interactive.create({
  Component: CompareInner,
  layout: 'absolute-fill',
  schema: {...Interactive.backgroundSchema},
});
