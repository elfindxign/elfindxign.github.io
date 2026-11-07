export const esg = {
  e: '#34D399',
  s: '#38BDF8',
  g: '#A78BFA',
};

export const esgGradientText: React.CSSProperties = {
  backgroundImage: `linear-gradient(90deg, ${esg.e}, ${esg.s})`,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
};
