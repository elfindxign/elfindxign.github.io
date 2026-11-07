import {linearTiming, TransitionSeries} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {Background, ProgressBar} from './Background';
import {Compare} from './scenes/Compare';
import {Example} from './scenes/Example';
import {Hook} from './scenes/Hook';
import {Loop} from './scenes/Loop';
import {Outro} from './scenes/Outro';

const center = {
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  wordBreak: 'keep-all',
} as const;

// 135 + 195 + 285 + 225 + 108 - 4 * 12 = 900 frames (30s @ 30fps)
export const AiAgentVideo = () => (
  <>
    <Background />
    <TransitionSeries>
      <TransitionSeries.Sequence name="Hook" durationInFrames={135}>
        <Hook name="Hook" style={center} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-bottom'})} timing={linearTiming({durationInFrames: 12})} />
      <TransitionSeries.Sequence name="Compare" durationInFrames={195}>
        <Compare name="Compare" style={center} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames: 12})} />
      <TransitionSeries.Sequence name="Loop" durationInFrames={285}>
        <Loop name="Loop" style={center} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={linearTiming({durationInFrames: 12})} />
      <TransitionSeries.Sequence name="Example" durationInFrames={225}>
        <Example name="Example" style={center} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames: 12})} />
      <TransitionSeries.Sequence name="Outro" durationInFrames={108}>
        <Outro name="Outro" style={center} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    <ProgressBar />
  </>
);
