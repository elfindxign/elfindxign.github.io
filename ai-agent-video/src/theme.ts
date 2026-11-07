import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

// Pretendard (SIL OFL 1.1), bundled locally in public/ so renders don't depend on network fonts.
export const fontFamily = 'Pretendard';

for (const [file, weight] of [
  ['Pretendard-Medium.woff2', '500'],
  ['Pretendard-Bold.woff2', '700'],
  ['Pretendard-Black.woff2', '900'],
] as const) {
  loadFont({family: fontFamily, url: staticFile(file), weight});
}

export const colors = {
  bg: '#0A0E1F',
  text: '#F4F6FF',
  muted: '#8B93B8',
  card: 'rgba(255,255,255,0.06)',
  cardBorder: 'rgba(255,255,255,0.12)',
  violet: '#8B5CF6',
  cyan: '#22D3EE',
  green: '#34D399',
};

export const gradientText: React.CSSProperties = {
  backgroundImage: `linear-gradient(90deg, ${colors.violet}, ${colors.cyan})`,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
};

export const clamp = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
} as const;
