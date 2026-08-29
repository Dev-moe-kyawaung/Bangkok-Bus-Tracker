import React, { useEffect, useState } from 'react';
import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AppText, Card, Pill, typeTone } from '../components/Ui';
import { useColors, radius } from '../lib/theme';
import { useI18n } from '../lib/LanguageContext';
import { routes, stations, formatDuration, minsUntil } from '../lib/data';
import { loadFavs, saveFavs } from '../lib/storage';
import { RootStackParamList } from '../lib/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Route'>;

export default function RouteScreen({ route, navigation }: Props) {
  const c = useColors();
  const { t, tx, lang } = useI18n();
  const r = routes.find((x) => x.id === route.params.id);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    if (!r) return;
    loadFavs().then((ids) => setFav(ids.includes(r.id)));
  }, [r]);

  if (!r) return null;
  const st = stations.find((s) => s.id === r.stationId)!;

  const toggle = async () => {
    const ids = await loadFavs();
    const next = fav ? ids.filter((x) => x !== r.id) : [...ids, r.id];
    await saveFavs(next);
    setFav(!fav);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: c.bg }} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Pressable onPress={() => navigation.goBack()} style={[styles.iconBtn, { backgroundColor: c.surface }]}>
          <Ionicons name="chevron-back" size={22} color={c.ink} />
        </Pressable>
        <Pressable onPress={toggle} style={[styles.iconBtn, { backgroundColor: c.surface }]}>
          <Ionicons name={fav ? 'bookmark' : 'bookmark-outline'} size={20} color={c.primary} />
        </Pressable>
      </View>

      <AppText style={{ color: c.inkMuted, marginTop: 16 }}>{t('from')}</AppText>
      <Pressable onPress={() => navigation.navigate('Station', { id: st.id })}>
        <AppText weight="semibold" style={{ color: st.color, fontSize: 16 }}>
          {tx(st.name)}
        </AppText>
      </Pressable>
      <Ionicons name="arrow-down" size={18} color={c.inkFaint} style={{ marginVertical: 6 }} />
      <AppText style={{ color: c.inkMuted }}>{t('to')}</AppText>
      <AppText weight="bold" style={{ fontSize: 28, marginTop: 2 }}>
        {tx(r.destination)}
      </AppText>
      <AppText style={{ color: c.inkMuted, marginTop: 4 }}>{tx(r.province)}</AppText>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
        <Pill text={t(`type.${r.type}`)} tone={typeTone(r.type)} />
        <Pill text={tx(r.days)} tone="teal" />
        <Pill text={`${t('platform')} ${r.platform}`} tone="red" />
      </View>

      <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
        <Card style={{ flex: 1 }}>
          <AppText style={{ color: c.inkMuted, fontSize: 12 }}>{t('duration')}</AppText>
          <AppText weight="bold" style={{ fontSize: 18, marginTop: 4 }}>
            {formatDuration(r.durationMin, lang)}
          </AppText>
        </Card>
        <Card style={{ flex: 1 }}>
          <AppText style={{ color: c.inkMuted, fontSize: 12 }}>{t('price')}</AppText>
          <AppText weight="bold" style={{ fontSize: 18, marginTop: 4 }}>
            {r.priceMin}–{r.priceMax}
          </AppText>
          <AppText style={{ color: c.inkFaint, fontSize: 11 }}>{t('baht')}</AppText>
        </Card>
      </View>

      <Card style={{ marginTop: 12 }}>
        <Row icon="business" label={t('company')} value={tx(r.company)} c={c} />
        <Row icon="git-branch" label={t('via')} value={tx(r.via)} c={c} />
        <Row icon="calendar" label={t('days')} value={tx(r.days)} c={c} />
      </Card>

      <AppText weight="bold" style={{ fontSize: 18, marginTop: 20, marginBottom: 10 }}>
        {t('departures')}
      </AppText>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {r.times.map((tm) => {
          const mins = minsUntil(tm);
          const gone = mins < -5;
          const soon = mins >= -5 && mins <= 20;
          return (
            <View
              key={tm}
              style={[
                styles.slot,
                {
                  backgroundColor: soon ? st.color : c.surface,
                  borderColor: soon ? st.color : c.line,
                  opacity: gone ? 0.45 : 1,
                },
              ]}
            >
              <AppText weight="bold" style={{ color: soon ? '#fff' : c.ink, fontSize: 16 }}>
                {tm}
              </AppText>
              <AppText style={{ color: soon ? 'rgba(255,255,255,0.85)' : c.inkMuted, fontSize: 11, marginTop: 2 }}>
                {gone ? t('departed') : soon ? t('boardingSoon') : `${mins} ${t('min')}`}
              </AppText>
            </View>
          );
        })}
      </View>

      <Card style={{ marginTop: 16 }}>
        <AppText weight="bold">{t('notes')}</AppText>
        <AppText style={{ color: c.inkMuted, marginTop: 8, lineHeight: 22 }}>{tx(r.notes)}</AppText>
      </Card>
    </ScrollView>
  );
}

function Row({ icon, label, value, c }: { icon: string; label: string; value: string; c: any }) {
  return (
    <View style={{ flexDirection: 'row', paddingVertical: 8, alignItems: 'flex-start' }}>
      <Ionicons name={icon as any} size={16} color={c.inkFaint} style={{ marginTop: 2 }} />
      <View style={{ marginLeft: 10, flex: 1 }}>
        <AppText style={{ color: c.inkFaint, fontSize: 11 }}>{label}</AppText>
        <AppText style={{ marginTop: 2 }}>{value}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slot: {
    width: '31%',
    marginRight: '2.3%',
    marginBottom: 10,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
});
