import {Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {clamp, colors, fontFamily, gradientText} from '../theme';

const STEPS = [
  {title: '계획', caption: '목표를 작은 단계로 나누고'},
  {title: '도구 사용', caption: '검색·앱·코드 같은 도구를 쓰고'},
  {title: '결과 확인', caption: '결과가 맞는지 스스로 확인하고'},
  {title: '다시 조정', caption: '부족하면 방법을 바꿔 다시 해요'},
];

const SIZE = 900;
const RADIUS = 320;
const NODE = 250;

const LoopInner = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const start = 1 * fps;
  const stepLen = 1.6 * fps;
  const active = Math.floor((frame - start) / stepLen);
  const done = frame >= start + STEPS.length * stepLen;
  const circumference = 2 * Math.PI * RADIUS;
  const arc = interpolate(frame, [start, start + STEPS.length * stepLen], [0, 1], clamp);

  return (
    <>
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 96,
          color: colors.text,
          textAlign: 'center',
          lineHeight: 1.2,
          marginBottom: 70,
          opacity: interpolate(frame, [0, 0.4 * fps], [0, 1], clamp),
        }}
      >
        에이전트는
        <br />
        <span style={gradientText}>이렇게 일해요</span>
      </div>

      <div
        style={{
          position: 'relative',
          width: SIZE,
          height: SIZE,
          opacity: interpolate(frame, [0.3 * fps, 0.8 * fps], [0, 1], clamp),
          scale: interpolate(frame, [0.3 * fps, 0.9 * fps], [0.85, 1], {
            ...clamp,
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: 'perceptual-scale',
          }),
        }}
      >
        <svg width={SIZE} height={SIZE} style={{position: 'absolute', inset: 0}}>
          <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={10} />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="url(#loopGrad)"
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - arc)}
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          />
          <defs>
            <linearGradient id="loopGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={colors.violet} />
              <stop offset="1" stopColor={colors.cyan} />
            </linearGradient>
          </defs>
        </svg>

        {/* Center: the goal */}
        <div
          style={{
            position: 'absolute',
            left: SIZE / 2 - 130,
            top: SIZE / 2 - 130,
            width: 260,
            height: 260,
            borderRadius: '50%',
            backgroundImage: `linear-gradient(135deg, ${colors.violet}, ${colors.cyan})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily,
            fontWeight: 900,
            fontSize: 72,
            color: colors.bg,
            boxShadow: `0 0 100px ${colors.violet}88`,
            scale: done
              ? interpolate(frame, [start + STEPS.length * stepLen, start + STEPS.length * stepLen + 0.5 * fps], [1.25, 1], {
                  ...clamp,
                  easing: Easing.spring({damping: 10}),
                  output: 'perceptual-scale',
                })
              : 1,
          }}
        >
          목표
        </div>

        {STEPS.map((step, i) => {
          const angle = -Math.PI / 2 + (i * Math.PI) / 2;
          const x = SIZE / 2 + RADIUS * Math.cos(angle) - NODE / 2;
          const y = SIZE / 2 + RADIUS * Math.sin(angle) - NODE / 2;
          const isActive = active === i && !done;
          const reached = active >= i || done;
          return (
            <div
              key={step.title}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: NODE,
                height: NODE,
                borderRadius: 60,
                backgroundColor: isActive ? colors.violet : reached ? '#1C2140' : '#12162B',
                border: `4px solid ${reached ? colors.cyan : colors.cardBorder}`,
                boxShadow: isActive ? `0 0 80px ${colors.violet}` : 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily,
                color: colors.text,
                scale: isActive
                  ? interpolate(frame - (start + i * stepLen), [0, 0.4 * fps], [0.8, 1.12], {
                      ...clamp,
                      easing: Easing.spring({damping: 12}),
                      output: 'perceptual-scale',
                    })
                  : 1,
              }}
            >
              <div style={{fontSize: 52, fontWeight: 900, color: reached ? colors.cyan : colors.muted}}>{i + 1}</div>
              <div style={{fontSize: 50, fontWeight: 700, textAlign: 'center', lineHeight: 1.2, padding: '0 16px'}}>
                {step.title}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          height: 160,
          marginTop: 70,
          display: 'flex',
          alignItems: 'center',
          fontFamily,
          fontWeight: 700,
          fontSize: 60,
          color: colors.text,
          textAlign: 'center',
        }}
      >
        {done ? (
          <span style={{...gradientText, fontWeight: 900, fontSize: 72}}>목표를 이룰 때까지 반복!</span>
        ) : active >= 0 ? (
          <span
            key={active}
            style={{
              opacity: interpolate(frame - (start + active * stepLen), [0, 0.3 * fps], [0, 1], clamp),
            }}
          >
            {STEPS[active].caption}
          </span>
        ) : null}
      </div>
    </>
  );
};

export const Loop = Interactive.create({
  Component: LoopInner,
  layout: 'absolute-fill',
  schema: {...Interactive.backgroundSchema},
});
