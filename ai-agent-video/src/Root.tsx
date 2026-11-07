import {Composition} from 'remotion';
import {AiAgentVideo} from './AiAgentVideo';
import {EsgVideo} from './esg/EsgVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="AiAgentExplainer" component={AiAgentVideo} durationInFrames={900} fps={30} width={1080} height={1920} />
      <Composition id="EsgExplainer" component={EsgVideo} durationInFrames={900} fps={30} width={1080} height={1920} />
    </>
  );
};
