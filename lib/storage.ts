import AsyncStorage from '@react-native-async-storage/async-storage';
import { Lang } from './types';

const LANG_KEY = 'bkk.lang';
const FAV_KEY = 'bkk.favs';

export async function loadLang(): Promise<Lang | null> {
  try {
    const v = await AsyncStorage.getItem(LANG_KEY);
    if (v === 'th' || v === 'my' || v === 'en') return v;
    return null;
  } catch {
    return null;
  }
}

export async function saveLang(lang: Lang) {
  try {
    await AsyncStorage.setItem(LANG_KEY, lang);
  } catch {}
}

export async function loadFavs(): Promise<string[]> {
  try {
    const v = await AsyncStorage.getItem(FAV_KEY);
    return v ? JSON.parse(v) : [];
  } catch {
    return [];
  }
}

export async function saveFavs(ids: string[]) {
  try {
    await AsyncStorage.setItem(FAV_KEY, JSON.stringify(ids));
  } catch {}
}
