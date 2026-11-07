import {Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {AgentIcon} from '../AgentIcon';
import {clamp, colors, fontFamily, gradientText} from '../theme';

const OutroInner = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const out = Easing.bezier(0.16, 1, 0.3, 1);

  return (
    <>
      <div
        style={{
          marginBottom: 60,
          scale: interpolate(frame, [0, 0.5 * fps], [0.5, 1], {
            ...clamp,
            easing: Easing.spring({damping: 12}),
            output: 'perceptual-scale',
          }),
        }}
      >
        <AgentIcon size={260} />
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 76,
          color: colors.text,
          textAlign: 'center',
          lineHeight: 1.35,
          opacity: interpolate(frame, [0.2 * fps, 0.6 * fps], [0, 1], clamp),
          translate: interpolate(frame, [0.2 * fps, 0.6 * fps], ['0px 40px', '0px 0px'], {...clamp, easing: out}),
        }}
      >
        말만 하면
        <br />
        알아서 해내는 AI
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: 900,
          fontSize: 150,
          marginTop: 40,
          opacity: interpolate(frame, [0.9 * fps, 1.3 * fps], [0, 1], clamp),
          scale: interpolate(frame, [0.9 * fps, 1.5 * fps], [0.7, 1], {
            ...clamp,
            easing: Easing.spring({damping: 12}),
            output: 'perceptual-scale',
          }),
        }}
      >
        <span style={gradientText}>AI 에이전트</span>
      </div>
    </>
  );
};

export const Outro = Interactive.create({
  Component: OutroInner,
  layout: 'absolute-fill',
  schema: {...Interactive.backgroundSchema},
});
