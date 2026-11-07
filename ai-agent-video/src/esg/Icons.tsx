import {colors} from '../theme';

export const LeafIcon = ({size, color}: {readonly size: number; readonly color: string}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d="M18 82 C18 42 46 16 86 14 C86 56 60 84 22 84 Z" fill={color} />
    <path d="M24 78 C40 60 54 46 72 30" stroke={colors.bg} strokeWidth="5" strokeLinecap="round" fill="none" />
  </svg>
);

export const PeopleIcon = ({size, color}: {readonly size: number; readonly color: string}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="34" cy="32" r="13" fill={color} />
    <circle cx="68" cy="32" r="13" fill={color} />
    <path d="M10 84 C10 60 22 52 34 52 C46 52 58 60 58 84 Z" fill={color} />
    <path d="M44 84 C44 60 56 52 68 52 C80 52 92 60 92 84 Z" fill={color} opacity="0.75" />
  </svg>
);

export const BuildingIcon = ({size, color}: {readonly size: number; readonly color: string}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d="M50 10 L90 32 L10 32 Z" fill={color} />
    <rect x="18" y="38" width="12" height="38" rx="3" fill={color} />
    <rect x="44" y="38" width="12" height="38" rx="3" fill={color} />
    <rect x="70" y="38" width="12" height="38" rx="3" fill={color} />
    <rect x="10" y="80" width="80" height="10" rx="3" fill={color} />
  </svg>
);

export const CommentIcon = ({size, color}: {readonly size: number; readonly color: string}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path
      d="M16 18 h68 a10 10 0 0 1 10 10 v36 a10 10 0 0 1 -10 10 h-38 l-20 16 v-16 h-10 a10 10 0 0 1 -10 -10 v-36 a10 10 0 0 1 10 -10z"
      fill={color}
    />
    <circle cx="32" cy="46" r="6" fill={colors.bg} />
    <circle cx="50" cy="46" r="6" fill={colors.bg} />
    <circle cx="68" cy="46" r="6" fill={colors.bg} />
  </svg>
);
