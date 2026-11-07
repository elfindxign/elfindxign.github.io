import {linearTiming, TransitionSeries} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {Background, ProgressBar} from '../Background';
import {esg} from './esgTheme';
import {EsgDefinition, EsgHook, EsgOutro, EsgWhy, Environment, Governance, Social} from './EsgScenes';

const center = {
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  wordBreak: 'keep-all',
} as const;

// 135 + 165 + 120 + 120 + 120 + 165 + 147 - 6 * 12 = 900 frames (30s @ 30fps)
export const EsgVideo = () => (
  <>
    <Background a={esg.e} b={esg.s} />
    <TransitionSeries>
      <TransitionSeries.Sequence name="Hook" durationInFrames={135}>
        <EsgHook name="Hook" style={center} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-bottom'})} timing={linearTiming({durationInFrames: 12})} />
      <TransitionSeries.Sequence name="Definition" durationInFrames={165}>
        <EsgDefinition name="Definition" style={center} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={linearTiming({durationInFrames: 12})} />
      <TransitionSeries.Sequence name="Environment" durationInFrames={120}>
        <Environment name="Environment" style={center} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={linearTiming({durationInFrames: 12})} />
      <TransitionSeries.Sequence name="Social" durationInFrames={120}>
        <Social name="Social" style={center} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={linearTiming({durationInFrames: 12})} />
      <TransitionSeries.Sequence name="Governance" durationInFrames={120}>
        <Governance name="Governance" style={center} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames: 12})} />
      <TransitionSeries.Sequence name="Why" durationInFrames={165}>
        <EsgWhy name="Why it matters" style={center} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames: 12})} />
      <TransitionSeries.Sequence name="Outro" durationInFrames={147}>
        <EsgOutro name="Outro" style={center} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    <ProgressBar a={esg.e} b={esg.s} />
  </>
);
