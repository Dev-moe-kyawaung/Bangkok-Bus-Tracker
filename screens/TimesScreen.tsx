import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppText, Card, Chip, EmptyState, Pill, typeTone } from '../components/Ui';
import { useColors, radius, fontFamily } from '../lib/theme';
import { useI18n } from '../lib/LanguageContext';
import { routes, stations, formatDuration, minsUntil } from '../lib/data';
import { RootStackParamList } from '../lib/navigation';
import { BusRoute } from '../lib/types';

const TYPES = ['all', 'vip', 'first', 'second', 'express'] as const;

export default function TimesScreen() {
  const c = useColors();
  const { t, tx, lang } = useI18n();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [station, setStation] = useState<'all' | string>('all');
  const [type, setType] = useState<(typeof TYPES)[number]>('all');
  const [q, setQ] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [now, setNow] = useState(Date.now());

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setNow(Date.now());
      setRefreshing(false);
    }, 500);
  }, []);

  const data = useMemo(() => {
    const s = q.trim().toLowerCase();
    return routes.filter((r) => {
      if (station !== 'all' && r.stationId !== station) return false;
      if (type !== 'all' && r.type !== type) return false;
      if (!s) return true;
      const blob = `${r.destination.th} ${r.destination.my} ${r.destination.en} ${r.province.th} ${r.province.en} ${r.company.th}`.toLowerCase();
      return blob.includes(s);
    });
  }, [station, type, q]);

  const nextTime = (r: BusRoute) => {
    const pairs = r.times.map((time) => ({ time, mins: minsUntil(time, new Date(now)) }));
    return pairs.sort((a, b) => a.mins - b.mins)[0];
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4 }}>
        <AppText weight="bold" style={{ fontSize: 26 }}>
          {t('tabs.times')}
        </AppText>
        <AppText style={{ color: c.inkMuted, marginTop: 4 }}>{t('soldHint')}</AppText>
        <View style={[styles.search, { backgroundColor: c.surface, borderColor: c.line }]}>
          <Ionicons name="search" size={18} color={c.inkFaint} />
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder={t('searchPlaceholder')}
            placeholderTextColor={c.inkFaint}
            style={{ flex: 1, marginLeft: 8, color: c.ink, fontSize: 15, fontFamily: fontFamily(lang) }}
            returnKeyType="search"
          />
        </View>
      </View>
      <View style={{ paddingLeft: 16, marginTop: 6 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[{ id: 'all', name: { th: t('allStations'), my: t('allStations'), en: t('allStations') } }, ...stations]}
          keyExtractor={(s) => s.id}
          renderItem={({ item }) => (
            <Chip
              label={item.id === 'all' ? t('allStations') : tx((item as any).name)}
              active={station === item.id}
              color={(item as any).color || c.primary}
              onPress={() => setStation(item.id)}
            />
          )}
        />
      </View>
      <View style={{ paddingLeft: 16, marginBottom: 4 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={TYPES}
          keyExtractor={(x) => x}
          renderItem={({ item }) => (
            <Chip
              label={item === 'all' ? t('filter') : t(`type.${item}`)}
              active={type === item}
              onPress={() => setType(item)}
            />
          )}
        />
      </View>
      <FlatList
        data={data}
        keyExtractor={(r) => r.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 28 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={c.primary} />}
        ListEmptyComponent={<EmptyState icon="bus-outline" title={t('noTrips')} hint={t('noResultsHint')} />}
        renderItem={({ item }) => {
          const st = stations.find((s) => s.id === item.stationId)!;
          const n = nextTime(item);
          return (
            <Card style={{ marginBottom: 12 }} onPress={() => nav.navigate('Route', { id: item.id })}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 1, paddingRight: 8 }}>
                  <AppText weight="bold" style={{ fontSize: 17 }}>
                    {tx(item.destination)}
                  </AppText>
                  <AppText style={{ color: c.inkMuted, fontSize: 12, marginTop: 3 }}>
                    {t('from')} {tx(st.name)} · {tx(item.company)}
                  </AppText>
                </View>
                <Pill text={t(`type.${item.type}`)} tone={typeTone(item.type)} />
              </View>
              <View style={styles.meta}>
                <Meta icon="time-outline" text={formatDuration(item.durationMin, lang)} c={c} />
                <Meta icon="cash-outline" text={`${item.priceMin}–${item.priceMax}`} c={c} />
                <Meta icon="flag-outline" text={item.platform} c={c} />
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
                {item.times.slice(0, 8).map((tm) => {
                  const active = n.time === tm;
                  return (
                    <View
                      key={tm}
                      style={[
                        styles.time,
                        { backgroundColor: active ? st.color : c.surfaceAlt, borderColor: active ? st.color : c.line },
                      ]}
                    >
                      <AppText style={{ color: active ? '#fff' : c.ink, fontSize: 12 }} weight={active ? 'bold' : 'regular'}>
                        {tm}
                      </AppText>
                    </View>
                  );
                })}
                {item.times.length > 8 ? (
                  <AppText style={{ color: c.inkFaint, fontSize: 12, alignSelf: 'center' }}>+{item.times.length - 8}</AppText>
                ) : null}
              </View>
              {n ? (
                <AppText style={{ color: n.mins <= 25 ? c.primary : c.inkMuted, fontSize: 12, marginTop: 8 }}>
                  {n.mins <= 0 ? t('boardingSoon') : `${t('nextIn')} ${n.mins} ${t('min')}`}
                </AppText>
              ) : null}
            </Card>
          );
        }}
      />
    </SafeAreaView>
  );
}

function Meta({ icon, text, c }: { icon: string; text: string; c: any }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 14 }}>
      <Ionicons name={icon as any} size={14} color={c.inkFaint} />
      <AppText style={{ fontSize: 12, color: c.inkMuted, marginLeft: 4 }}>{text}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.full,
    paddingHorizontal: 14,
    height: 46,
    borderWidth: 1,
  },
  meta: { flexDirection: 'row', marginTop: 10 },
  time: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 6,
    marginBottom: 6,
  },
});
