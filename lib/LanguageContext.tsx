import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Lang } from './types';
import { loadLang, saveLang } from './storage';
import { t as tRaw, tx as txRaw } from './i18n';
import { I18nText } from './types';

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  ready: boolean;
  t: (key: string) => string;
  tx: (text: I18nText) => string;
};

const LanguageContext = createContext<Ctx>({
  lang: 'th',
  setLang: () => {},
  ready: false,
  t: (k) => k,
  tx: (x) => x.th,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('th');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadLang().then((v) => {
      if (v) setLangState(v);
      setReady(true);
    });
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    saveLang(l);
  }, []);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      ready,
      t: (key: string) => tRaw(lang, key),
      tx: (text: I18nText) => txRaw(lang, text),
    }),
    [lang, setLang, ready]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  return useContext(LanguageContext);
}
