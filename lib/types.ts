export type Lang = 'th' | 'my' | 'en';

export type I18nText = { th: string; my: string; en: string };

export type Station = {
  id: string;
  name: I18nText;
  fullName: I18nText;
  region: I18nText;
  address: I18nText;
  hours: string;
  phone: string;
  lat: number;
  lng: number;
  color: string;
  accent: string;
  icon: string;
  transit: { icon: string; label: I18nText; detail: I18nText }[];
  facilities: { icon: string; label: I18nText }[];
  zones: { id: string; name: I18nText; note: I18nText }[];
  roads: { name: I18nText; how: I18nText }[];
  tips: I18nText[];
  updated: string;
};

export type BusRoute = {
  id: string;
  stationId: string;
  destination: I18nText;
  province: I18nText;
  company: I18nText;
  type: 'vip' | 'first' | 'second' | 'express';
  durationMin: number;
  priceMin: number;
  priceMax: number;
  times: string[];
  platform: string;
  days: I18nText;
  via: I18nText;
  notes: I18nText;
};

export type Guide = {
  id: string;
  icon: string;
  color: string;
  title: I18nText;
  subtitle: I18nText;
  minutes: number;
  sections: { heading: I18nText; body: I18nText }[];
};

export type StationMap = {
  id: string;
  stationId: string | 'all';
  kind: 'terminal' | 'road' | 'city' | 'airport';
  title: I18nText;
  subtitle: I18nText;
  updated: string;
  legend: { color: string; label: I18nText }[];
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'ai';
  text: string;
  suggestions?: string[];
};
