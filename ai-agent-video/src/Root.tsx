import {Composition} from 'remotion';
import {AiAgentVideo} from './AiAgentVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition id="AiAgentExplainer" component={AiAgentVideo} durationInFrames={900} fps={30} width={1080} height={1920} />
  );
};
