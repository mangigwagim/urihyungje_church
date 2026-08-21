import { ThemePalette, FontFamily } from '../types';

export interface ThemeColors {
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primaryBadge: string;
  accent: string;
  accentLight: string;
  accentBorder: string;
  heroGradient: string;
  navActive: string;
  bannerBg: string;
  darkBg: string;
}

export const THEME_PALETTES: Record<ThemePalette, { name: string; desc: string; colors: ThemeColors }> = {
  'navy-gold': {
    name: '은혜의 로얄 네이비 & 골드',
    desc: '깊고 신뢰감 있는 딥 네이비와 고귀한 골드 액센트',
    colors: {
      primary: 'bg-indigo-950 text-white',
      primaryHover: 'hover:bg-indigo-900',
      primaryLight: 'bg-indigo-50 text-indigo-900',
      primaryBadge: 'bg-indigo-900 text-amber-200 border-indigo-700',
      accent: 'text-amber-600',
      accentLight: 'bg-amber-50 text-amber-900 border-amber-200',
      accentBorder: 'border-amber-500/30',
      heroGradient: 'from-slate-950/90 via-indigo-950/80 to-slate-900/90',
      navActive: 'text-amber-600 font-semibold border-b-2 border-amber-600',
      bannerBg: 'bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-amber-100',
      darkBg: 'bg-slate-950 text-slate-100',
    },
  },
  'sage-green': {
    name: '평안의 세이지 & 올리브',
    desc: '따뜻하고 온유한 자연의 숲과 평안함을 주는 올리브 톤',
    colors: {
      primary: 'bg-emerald-900 text-white',
      primaryHover: 'hover:bg-emerald-800',
      primaryLight: 'bg-emerald-50 text-emerald-900',
      primaryBadge: 'bg-emerald-900 text-emerald-200 border-emerald-700',
      accent: 'text-emerald-600',
      accentLight: 'bg-emerald-50 text-emerald-900 border-emerald-200',
      accentBorder: 'border-emerald-500/30',
      heroGradient: 'from-slate-950/90 via-emerald-950/80 to-slate-900/90',
      navActive: 'text-emerald-700 font-semibold border-b-2 border-emerald-700',
      bannerBg: 'bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-emerald-100',
      darkBg: 'bg-slate-950 text-slate-100',
    },
  },
  'classic-burgundy': {
    name: '보혈의 클래식 버건디 & 웜베이지',
    desc: '경건하고 성스러운 전통 버건디와 차분한 베이지 톤',
    colors: {
      primary: 'bg-rose-950 text-white',
      primaryHover: 'hover:bg-rose-900',
      primaryLight: 'bg-rose-50 text-rose-950',
      primaryBadge: 'bg-rose-900 text-amber-200 border-rose-700',
      accent: 'text-rose-700',
      accentLight: 'bg-rose-50 text-rose-900 border-rose-200',
      accentBorder: 'border-rose-500/30',
      heroGradient: 'from-slate-950/90 via-rose-950/80 to-slate-900/90',
      navActive: 'text-rose-700 font-semibold border-b-2 border-rose-700',
      bannerBg: 'bg-gradient-to-r from-rose-950 via-stone-900 to-rose-950 text-rose-100',
      darkBg: 'bg-stone-950 text-stone-100',
    },
  },
  'slate-warm': {
    name: '현대적인 웜 슬레이트 & 엠버',
    desc: '절제된 모던 감각과 부드러운 웜 그레이의 조화',
    colors: {
      primary: 'bg-slate-900 text-white',
      primaryHover: 'hover:bg-slate-800',
      primaryLight: 'bg-slate-100 text-slate-900',
      primaryBadge: 'bg-slate-800 text-amber-300 border-slate-700',
      accent: 'text-amber-600',
      accentLight: 'bg-amber-50 text-amber-900 border-amber-200',
      accentBorder: 'border-amber-500/30',
      heroGradient: 'from-slate-950/90 via-slate-900/80 to-slate-950/90',
      navActive: 'text-slate-900 font-semibold border-b-2 border-slate-900',
      bannerBg: 'bg-gradient-to-r from-slate-900 via-neutral-900 to-slate-900 text-amber-100',
      darkBg: 'bg-slate-950 text-slate-100',
    },
  },
  'deep-forest': {
    name: '생명나무 딥 포레스트 & 브라운',
    desc: '깊은 숲의 영성과 묵직한 안정감을 주는 우드 톤',
    colors: {
      primary: 'bg-teal-950 text-white',
      primaryHover: 'hover:bg-teal-900',
      primaryLight: 'bg-teal-50 text-teal-950',
      primaryBadge: 'bg-teal-900 text-teal-200 border-teal-700',
      accent: 'text-teal-700',
      accentLight: 'bg-teal-50 text-teal-900 border-teal-200',
      accentBorder: 'border-teal-500/30',
      heroGradient: 'from-slate-950/90 via-teal-950/80 to-slate-900/90',
      navActive: 'text-teal-700 font-semibold border-b-2 border-teal-700',
      bannerBg: 'bg-gradient-to-r from-teal-950 via-slate-900 to-teal-950 text-teal-100',
      darkBg: 'bg-slate-950 text-slate-100',
    },
  },
};

export const getFontFamilyClass = (font: FontFamily) => {
  switch (font) {
    case 'serif':
      return 'font-serif';
    case 'modern':
      return 'font-sans tracking-tight';
    case 'pretendard':
    default:
      return 'font-sans';
  }
};
