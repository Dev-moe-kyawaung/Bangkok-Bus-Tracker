import { useColorScheme } from 'react-native';

export type Lang = 'th' | 'my' | 'en';

const light = {
  bg: '#F3EDE3',
  bgDeep: '#E6D9C6',
  surface: '#FFFBF6',
  surfaceAlt: '#FAF3E8',
  primary: '#C4491D',
  primaryDark: '#8E2F12',
  primarySoft: '#F7D9C8',
  teal: '#1B5E56',
  tealMid: '#2A7A70',
  tealSoft: '#D4EBE6',
  gold: '#C9A227',
  goldSoft: '#F4E7B6',
  ink: '#1C1916',
  inkMuted: '#6B6258',
  inkFaint: '#9A9084',
  line: '#E6D9C8',
  success: '#2E7D4F',
  warning: '#C47A12',
  danger: '#B42318',
  white: '#FFFFFF',
  overlay: 'rgba(28,25,22,0.55)',
  tabBar: '#FFFBF6',
  cardShadow: '#8A6A4A',
  bubbleUser: '#C4491D',
  bubbleAi: '#FFFBF6',
  mapRoad: '#D9C7A8',
  mapWater: '#9EC9C4',
  mapPark: '#B7CFA8',
};

const dark = {
  bg: '#161310',
  bgDeep: '#100E0C',
  surface: '#231E1A',
  surfaceAlt: '#2C2621',
  primary: '#E06A3C',
  primaryDark: '#C4491D',
  primarySoft: '#3A241C',
  teal: '#4AB5A8',
  tealMid: '#3D9A90',
  tealSoft: '#1C3330',
  gold: '#E0C15A',
  goldSoft: '#3A341C',
  ink: '#F4EDE3',
  inkMuted: '#B7AFA4',
  inkFaint: '#8A8278',
  line: '#3A332C',
  success: '#5DCA86',
  warning: '#E0A84A',
  danger: '#F07167',
  white: '#231E1A',
  overlay: 'rgba(0,0,0,0.65)',
  tabBar: '#1C1815',
  cardShadow: '#000000',
  bubbleUser: '#C4491D',
  bubbleAi: '#2C2621',
  mapRoad: '#3A332C',
  mapWater: '#1A3A3A',
  mapPark: '#24341F',
};

export type Colors = typeof light;

export function useColors(): Colors {
  const scheme = useColorScheme();
  return scheme === 'dark' ? dark : light;
}

export function fontFamily(lang: Lang, weight: 'regular' | 'semibold' | 'bold' = 'regular') {
  if (lang === 'my') {
    if (weight === 'bold') return 'NotoMyanmar-Bold';
    if (weight === 'semibold') return 'NotoMyanmar-SemiBold';
    return 'NotoMyanmar';
  }
  if (lang === 'th') {
    if (weight === 'bold') return 'NotoThai-Bold';
    if (weight === 'semibold') return 'NotoThai-SemiBold';
    return 'NotoThai';
  }
  if (weight === 'bold') return 'Prompt-Bold';
  if (weight === 'semibold') return 'Prompt-SemiBold';
  return 'Prompt';
}

export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
  full: 999,
};

export const shadow = {
  card: {
    shadowColor: '#6B4A2A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
  },
  soft: {
    shadowColor: '#6B4A2A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
};
