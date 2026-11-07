import {Audio} from '@remotion/media';
import {linearTiming, TransitionSeries} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {staticFile} from 'remotion';
import {Background, ProgressBar} from '../Background';
import {fontFamily} from '../theme';
import {CraneScene, Collapse, Hook, Outro, Record, Restore, Start, Wages} from './Scenes';
import {hw} from './theme';

const center = {
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  wordBreak: 'keep-all',
  fontFamily,
} as const;

const t = linearTiming({durationInFrames: 12});

// 132 + 252 + 312 + 252 + 252 + 252 + 252 + 180 - 7 * 12 = 1800 frames (60s @ 30fps)
export const HwaseongVideo = () => (
  <>
    <Background a={hw.red} b={hw.gold} />
    <TransitionSeries>
      <TransitionSeries.Sequence name="Hook" durationInFrames={132}>
        <Hook name="Hook" style={center} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-bottom'})} timing={t} />
      <TransitionSeries.Sequence name="1794" durationInFrames={252}>
        <Start name="1794 start" style={center} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={t} />
      <TransitionSeries.Sequence name="Geojunggi" durationInFrames={312}>
        <CraneScene name="Geojunggi" style={center} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={t} />
      <TransitionSeries.Sequence name="Wages" durationInFrames={252}>
        <Wages name="Wages" style={center} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={t} />
      <TransitionSeries.Sequence name="Uigwe" durationInFrames={252}>
        <Record name="Uigwe" style={center} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence name="Collapse" durationInFrames={252}>
        <Collapse name="Collapse" style={center} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence name="Restore" durationInFrames={252}>
        <Restore name="Restore" style={center} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={t} />
      <TransitionSeries.Sequence name="Outro" durationInFrames={180}>
        <Outro name="Outro" style={center} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    <ProgressBar a={hw.red} b={hw.gold} />
    {/* Original synthesized track, see scripts/make_bgm_hwaseong.py */}
    <Audio name="Background music" src={staticFile('hwaseong-bgm.mp3')} volume={0.6} />
  </>
);
