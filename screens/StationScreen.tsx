import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { AppText, Card, IconBadge, Pill } from '../components/Ui';
import { useColors, radius } from '../lib/theme';
import { useI18n } from '../lib/LanguageContext';
import { stationById, routesByStation, formatDuration } from '../lib/data';
import { loadFavs, saveFavs } from '../lib/storage';
import { RootStackParamList } from '../lib/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Station'>;

export default function StationScreen({ route, navigation }: Props) {
  const c = useColors();
  const { t, tx, lang } = useI18n();
  const st = stationById(route.params.id);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    loadFavs().then((ids) => setFav(ids.includes(route.params.id)));
  }, [route.params.id]);

  if (!st) return null;

  const toggleFav = async () => {
    const ids = await loadFavs();
    const next = fav ? ids.filter((x) => x !== st.id) : [...ids, st.id];
    await saveFavs(next);
    setFav(!fav);
  };

  const rts = routesByStation(st.id);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: c.bg }} contentContainerStyle={{ paddingBottom: 40 }}>
      <LinearGradient colors={[st.color, st.color + 'CC']} style={styles.hero}>
        <Pressable onPress={() => navigation.goBack()} style={styles.back}>
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </Pressable>
        <Pressable onPress={toggleFav} style={styles.back}>
          <Ionicons name={fav ? 'heart' : 'heart-outline'} size={22} color="#fff" />
        </Pressable>
      </LinearGradient>
      <View style={{ marginTop: -28, paddingHorizontal: 16 }}>
        <Card>
          <AppText weight="bold" style={{ fontSize: 22 }}>
            {tx(st.name)}
          </AppText>
          <AppText style={{ color: c.inkMuted, marginTop: 4, lineHeight: 20 }}>{tx(st.fullName)}</AppText>
          <View style={{ flexDirection: 'row', marginTop: 10, flexWrap: 'wrap', gap: 8 }}>
            <Pill text={tx(st.region)} tone="red" />
            <Pill text={`${t('hours')} ${st.hours}`} tone="teal" />
          </View>
          <AppText style={{ color: c.inkFaint, fontSize: 12, marginTop: 10 }}>
            {t('lastUpdated')} {st.updated}
          </AppText>
        </Card>

        <Card style={{ marginTop: 12 }}>
          <AppText weight="bold" style={{ marginBottom: 8 }}>
            {t('address')}
          </AppText>
          <AppText style={{ color: c.inkMuted, lineHeight: 20 }}>{tx(st.address)}</AppText>
          <Pressable
            onPress={() => Linking.openURL(`tel:${st.phone.replace(/-/g, '')}`)}
            style={[styles.call, { backgroundColor: c.primarySoft }]}
          >
            <Ionicons name="call" size={16} color={c.primary} />
            <AppText weight="semibold" style={{ color: c.primary, marginLeft: 8 }}>
              {t('phone')} {st.phone}
            </AppText>
          </Pressable>
        </Card>

        <AppText weight="bold" style={{ fontSize: 18, marginTop: 22, marginBottom: 10 }}>
          {t('gettingThere')}
        </AppText>
        {st.transit.map((tr, i) => (
          <Card key={i} style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <IconBadge name={tr.icon} color={st.color} size={40} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <AppText weight="semibold">{tx(tr.label)}</AppText>
                <AppText style={{ color: c.inkMuted, marginTop: 4, lineHeight: 20 }}>{tx(tr.detail)}</AppText>
              </View>
            </View>
          </Card>
        ))}

        <AppText weight="bold" style={{ fontSize: 18, marginTop: 12, marginBottom: 10 }}>
          {t('platforms')}
        </AppText>
        {st.zones.map((z) => (
          <Card key={z.id} style={{ marginBottom: 10 }}>
            <AppText weight="semibold">{tx(z.name)}</AppText>
            <AppText style={{ color: c.inkMuted, marginTop: 4 }}>{tx(z.note)}</AppText>
          </Card>
        ))}

        <AppText weight="bold" style={{ fontSize: 18, marginTop: 12, marginBottom: 10 }}>
          {t('facilities')}
        </AppText>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {st.facilities.map((f, i) => (
            <View
              key={i}
              style={[styles.fac, { backgroundColor: c.surface, borderColor: c.line }]}
            >
              <Ionicons name={f.icon as any} size={16} color={st.color} />
              <AppText style={{ fontSize: 12, marginLeft: 6 }}>{tx(f.label)}</AppText>
            </View>
          ))}
        </View>

        <AppText weight="bold" style={{ fontSize: 18, marginTop: 18, marginBottom: 10 }}>
          {t('nearbyRoads')}
        </AppText>
        {st.roads.map((r, i) => (
          <Card key={i} style={{ marginBottom: 10 }}>
            <AppText weight="semibold">{tx(r.name)}</AppText>
            <AppText style={{ color: c.inkMuted, marginTop: 4, lineHeight: 20 }}>{tx(r.how)}</AppText>
          </Card>
        ))}

        <AppText weight="bold" style={{ fontSize: 18, marginTop: 12, marginBottom: 10 }}>
          {t('tips')}
        </AppText>
        {st.tips.map((tip, i) => (
          <View key={i} style={{ flexDirection: 'row', marginBottom: 10, paddingHorizontal: 4 }}>
            <Ionicons name="sparkles" size={16} color={c.gold} style={{ marginTop: 3 }} />
            <AppText style={{ flex: 1, marginLeft: 8, color: c.inkMuted, lineHeight: 20 }}>{tx(tip)}</AppText>
          </View>
        ))}

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 8 }}>
          <Pressable
            style={[styles.mapBtn, { backgroundColor: st.color, flex: 1 }]}
            onPress={() => navigation.navigate('MapDetail', { id: `${st.id === 'mo-chit' ? 'mo-chit-term' : st.id === 'sai-tai' ? 'sai-tai-term' : 'ekkamai-term'}` })}
          >
            <Ionicons name="map" size={16} color="#fff" />
            <AppText weight="semibold" style={{ color: '#fff', marginLeft: 6, fontSize: 13 }}>
              {t('viewMap')}
            </AppText>
          </Pressable>
          <Pressable
            style={[styles.mapBtn, { backgroundColor: c.teal, flex: 1 }]}
            onPress={() =>
              navigation.navigate('MapDetail', {
                id: st.id === 'ekkamai' ? 'ekkamai-term' : st.id === 'sai-tai' ? 'sai-tai-road' : 'mo-chit-road',
              })
            }
          >
            <Ionicons name="navigate" size={16} color="#fff" />
            <AppText weight="semibold" style={{ color: '#fff', marginLeft: 6, fontSize: 13 }}>
              {t('viewRoads')}
            </AppText>
          </Pressable>
        </View>

        <AppText weight="bold" style={{ fontSize: 18, marginTop: 22, marginBottom: 10 }}>
          {t('routesFromHere')}
        </AppText>
        {rts.map((r) => (
          <Card key={r.id} style={{ marginBottom: 10 }} onPress={() => navigation.navigate('Route', { id: r.id })}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <AppText weight="semibold">{tx(r.destination)}</AppText>
                <AppText style={{ color: c.inkMuted, fontSize: 12, marginTop: 3 }}>
                  {formatDuration(r.durationMin, lang)} · {r.priceMin}–{r.priceMax} {t('baht')} · {t('platform')} {r.platform}
                </AppText>
              </View>
              <Ionicons name="chevron-forward" size={16} color={c.inkFaint} />
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 140,
    paddingTop: 52,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  call: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.full,
  },
  fac: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: radius.full,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  mapBtn: {
    height: 46,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
