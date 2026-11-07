import {Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {AgentIcon} from '../AgentIcon';
import {clamp, colors, fontFamily, gradientText} from '../theme';

const HookInner = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = Easing.spring({damping: 12});

  return (
    <>
      <div
        style={{
          scale: interpolate(frame, [0, 0.6 * fps], [0, 1], {...clamp, easing: pop, output: 'perceptual-scale'}),
          rotate: interpolate(frame, [0, 0.6 * fps], ['-20deg', '0deg'], {...clamp, easing: pop}),
          marginBottom: 70,
        }}
      >
        <AgentIcon size={360} />
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 150,
          lineHeight: 1.15,
          textAlign: 'center',
          color: colors.text,
          opacity: interpolate(frame, [0.4 * fps, 0.9 * fps], [0, 1], clamp),
          translate: interpolate(frame, [0.4 * fps, 0.9 * fps], ['0px 60px', '0px 0px'], {
            ...clamp,
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <span style={gradientText}>AI 에이전트</span>
        <br />
        대체 뭘까?
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 500,
          fontSize: 52,
          color: colors.muted,
          marginTop: 60,
          opacity: interpolate(frame, [1.6 * fps, 2.1 * fps], [0, 1], clamp),
        }}
      >
        30초 만에 알려드릴게요
      </div>
    </>
  );
};

export const Hook = Interactive.create({
  Component: HookInner,
  layout: 'absolute-fill',
  schema: {...Interactive.backgroundSchema},
});
