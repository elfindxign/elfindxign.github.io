import {Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {clamp, colors, fontFamily, gradientText} from '../theme';

const TASKS = ['캘린더에서 빈 날짜 확인', 'KTX 시간표 검색·예매', '역 근처 호텔 비교·예약', '일정표 정리해서 전송'];

const Check = ({progress}: {readonly progress: number}) => (
  <svg width={84} height={84} viewBox="0 0 84 84">
    <circle cx="42" cy="42" r="38" fill={progress > 0 ? colors.green : 'none'} stroke={progress > 0 ? colors.green : colors.cardBorder} strokeWidth="5" />
    <path
      d="M24 43 l12 12 l24 -26"
      fill="none"
      stroke={colors.bg}
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={60}
      strokeDashoffset={60 * (1 - progress)}
    />
  </svg>
);

const ExampleInner = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const out = Easing.bezier(0.16, 1, 0.3, 1);
  const taskStart = 1.6 * fps;
  const taskGap = 0.9 * fps;
  const doneAt = taskStart + TASKS.length * taskGap + 0.2 * fps;

  return (
    <>
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 96,
          color: colors.text,
          marginBottom: 70,
          opacity: interpolate(frame, [0, 0.4 * fps], [0, 1], clamp),
        }}
      >
        예를 들어볼게요
      </div>

      {/* User request bubble */}
      <div
        style={{
          alignSelf: 'flex-end',
          marginRight: 80,
          maxWidth: 820,
          padding: '40px 56px',
          borderRadius: '48px 48px 12px 48px',
          backgroundImage: `linear-gradient(135deg, ${colors.violet}, #6D28D9)`,
          fontFamily,
          fontWeight: 700,
          fontSize: 64,
          lineHeight: 1.3,
          color: 'white',
          opacity: interpolate(frame, [0.4 * fps, 0.8 * fps], [0, 1], clamp),
          translate: interpolate(frame, [0.4 * fps, 0.8 * fps], ['0px 60px', '0px 0px'], {...clamp, easing: out}),
        }}
      >
        “다음 주 부산 출장
        <br />
        준비해줘”
      </div>

      <div
        style={{
          width: 920,
          marginTop: 70,
          padding: '50px 56px',
          borderRadius: 48,
          backgroundColor: colors.card,
          border: `3px solid ${colors.cardBorder}`,
          display: 'flex',
          flexDirection: 'column',
          gap: 38,
          opacity: interpolate(frame, [1.1 * fps, 1.5 * fps], [0, 1], clamp),
        }}
      >
        {TASKS.map((task, i) => {
          const t0 = taskStart + i * taskGap;
          return (
            <div
              key={task}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 36,
                opacity: interpolate(frame, [t0 - 0.3 * fps, t0], [0.35, 1], clamp),
              }}
            >
              <Check progress={interpolate(frame, [t0, t0 + 0.35 * fps], [0, 1], {...clamp, easing: out})} />
              <div style={{fontFamily, fontWeight: 700, fontSize: 54, color: colors.text}}>{task}</div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 70,
          fontFamily,
          fontWeight: 900,
          fontSize: 84,
          opacity: interpolate(frame, [doneAt, doneAt + 0.3 * fps], [0, 1], clamp),
          scale: interpolate(frame, [doneAt, doneAt + 0.5 * fps], [0.6, 1], {
            ...clamp,
            easing: Easing.spring({damping: 10}),
            output: 'perceptual-scale',
          }),
        }}
      >
        <span style={gradientText}>알아서 끝!</span>
      </div>
    </>
  );
};

export const Example = Interactive.create({
  Component: ExampleInner,
  layout: 'absolute-fill',
  schema: {...Interactive.backgroundSchema},
});
