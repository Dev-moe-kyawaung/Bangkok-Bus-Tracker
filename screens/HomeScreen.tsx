import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  TextInput,
  RefreshControl,
  StatusBar,
  useColorScheme,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { AppText, Card, IconBadge, LangSwitcher, Pill, SectionHeader, typeTone } from '../components/Ui';
import { useColors, radius, fontFamily } from '../lib/theme';
import { useI18n } from '../lib/LanguageContext';
import { stations, routes, guides, minsUntil } from '../lib/data';
import { RootStackParamList } from '../lib/navigation';
import { BusRoute } from '../lib/types';

function greetingKey() {
  const h = new Date().getHours();
  if (h < 12) return 'greetMorning';
  if (h < 18) return 'greetAfternoon';
  return 'greetEvening';
}

function nextDepartures(limit = 6): { route: BusRoute; time: string; mins: number }[] {
  const now = new Date();
  const items: { route: BusRoute; time: string; mins: number }[] = [];
  for (const r of routes) {
    for (const time of r.times) {
      const mins = minsUntil(time, now);
      if (mins >= -5 && mins <= 240) items.push({ route: r, time, mins });
    }
  }
  return items.sort((a, b) => a.mins - b.mins).slice(0, limit);
}

export default function HomeScreen() {
  const c = useColors();
  const { t, tx, lang } = useI18n();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const scheme = useColorScheme();
  const [q, setQ] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [tick, setTick] = useState(0);

  const upcoming = useMemo(() => nextDepartures(6), [tick]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setTick((x) => x + 1);
      setRefreshing(false);
    }, 600);
  }, []);

  const searchHits = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (s.length < 1) return { st: [] as typeof stations, rt: [] as typeof routes };
    const st = stations.filter((x) =>
      `${x.name.th}${x.name.my}${x.name.en}${x.fullName.en}${x.region.th}`.toLowerCase().includes(s)
    );
    const rt = routes.filter((x) =>
      `${x.destination.th}${x.destination.my}${x.destination.en}${x.province.en}${x.company.th}`.toLowerCase().includes(s)
    );
    return { st, rt };
  }, [q]);

  const header = (
    <View>
      <LinearGradient
        colors={scheme === 'dark' ? ['#3A241C', '#161310'] : ['#C4491D', '#8E2F12']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View style={styles.heroTop}>
          <View>
            <AppText style={{ color: 'rgba(255,248,243,0.8)', fontSize: 13 }}>{t(greetingKey())}</AppText>
            <AppText weight="bold" style={{ color: '#FFF8F3', fontSize: 26, marginTop: 2 }}>
              {t('appName')}
            </AppText>
            <AppText style={{ color: 'rgba(255,248,243,0.85)', fontSize: 13, marginTop: 2 }}>
              {t('tagline')}
            </AppText>
          </View>
          <LangSwitcher />
        </View>
        <Pressable
          onPress={() => nav.navigate('Search')}
          style={[styles.search, { backgroundColor: 'rgba(255,248,243,0.16)' }]}
        >
          <Ionicons name="search" size={18} color="#FFF8F3" />
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder={t('searchPlaceholder')}
            placeholderTextColor="rgba(255,248,243,0.7)"
            style={{ flex: 1, marginLeft: 8, color: '#FFF8F3', fontSize: 15, fontFamily: fontFamily(lang) }}
            returnKeyType="search"
            onSubmitEditing={() => nav.navigate('Search', { q })}
          />
          {q.length > 0 ? (
            <Pressable onPress={() => setQ('')}>
              <Ionicons name="close-circle" size={18} color="#FFF8F3" />
            </Pressable>
          ) : null}
        </Pressable>
      </LinearGradient>

      {q.trim().length > 0 && searchHits ? (
        <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
          <AppText weight="bold" style={{ marginBottom: 8 }}>
            {t('searchResults')}
          </AppText>
          {searchHits.st.map((s) => (
            <Card key={s.id} style={{ marginBottom: 8 }} onPress={() => nav.navigate('Station', { id: s.id })}>
              <AppText weight="semibold">{tx(s.name)}</AppText>
              <AppText style={{ color: c.inkMuted, fontSize: 12 }}>{tx(s.region)}</AppText>
            </Card>
          ))}
          {searchHits.rt.slice(0, 6).map((r) => (
            <Card key={r.id} style={{ marginBottom: 8 }} onPress={() => nav.navigate('Route', { id: r.id })}>
              <AppText weight="semibold">{tx(r.destination)}</AppText>
              <AppText style={{ color: c.inkMuted, fontSize: 12 }}>
                {tx(stations.find((s) => s.id === r.stationId)!.name)} · {r.times[0]}
              </AppText>
            </Card>
          ))}
          {searchHits.st.length + searchHits.rt.length === 0 ? (
            <AppText style={{ color: c.inkMuted, marginBottom: 12 }}>{t('noResults')}</AppText>
          ) : null}
        </View>
      ) : null}

      <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
        <Card style={{ backgroundColor: c.goldSoft, borderColor: c.gold + '55' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="megaphone" size={20} color={c.gold} />
            <AppText weight="bold" style={{ marginLeft: 8, color: c.ink }}>
              {t('noticeTitle')}
            </AppText>
          </View>
          <AppText style={{ marginTop: 8, color: c.inkMuted, lineHeight: 20 }}>{t('noticeBody')}</AppText>
        </Card>
      </View>

      <View style={{ paddingHorizontal: 16, marginTop: 22 }}>
        <SectionHeader title={t('terminals')} />
        {stations.map((s) => (
          <Card key={s.id} style={{ marginBottom: 12 }} onPress={() => nav.navigate('Station', { id: s.id })}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.stationMark, { backgroundColor: s.color }]}>
                <Ionicons name="bus" size={22} color="#fff" />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <AppText weight="bold" style={{ fontSize: 17 }}>
                  {tx(s.name)}
                </AppText>
                <AppText style={{ color: c.inkMuted, fontSize: 12, marginTop: 2 }}>{tx(s.region)}</AppText>
                <AppText style={{ color: c.inkFaint, fontSize: 11, marginTop: 4 }}>
                  {t('hours')} {s.hours}
                </AppText>
              </View>
              <Ionicons name="chevron-forward" size={18} color={c.inkFaint} />
            </View>
          </Card>
        ))}
      </View>

      <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
        <SectionHeader title={t('liveDepartures')} action={t('seeAll')} onAction={() => nav.navigate('Main', { screen: 'TimesTab' })} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'light-content'} />
      <FlatList
        data={upcoming}
        keyExtractor={(item) => item.route.id + item.time}
        ListHeaderComponent={header}
        contentContainerStyle={{ paddingBottom: 32 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={c.primary} />}
        renderItem={({ item }) => {
          const st = stations.find((s) => s.id === item.route.stationId)!;
          const soon = item.mins <= 25;
          return (
            <Pressable
              onPress={() => nav.navigate('Route', { id: item.route.id })}
              style={{ paddingHorizontal: 16, marginBottom: 10 }}
            >
              <Card>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 58, alignItems: 'center' }}>
                    <AppText weight="bold" style={{ fontSize: 18, color: soon ? c.primary : c.ink }}>
                      {item.time}
                    </AppText>
                    <AppText style={{ fontSize: 11, color: soon ? c.primary : c.inkMuted, marginTop: 2 }}>
                      {item.mins <= 0 ? t('boardingSoon') : `${t('leftIn')} ${item.mins}${t('min')}`}
                    </AppText>
                  </View>
                  <View style={{ width: 1, height: 36, backgroundColor: c.line, marginHorizontal: 12 }} />
                  <View style={{ flex: 1 }}>
                    <AppText weight="semibold">{tx(item.route.destination)}</AppText>
                    <AppText style={{ color: c.inkMuted, fontSize: 12, marginTop: 2 }}>
                      {tx(st.name)} · {t('platform')} {item.route.platform}
                    </AppText>
                  </View>
                  <Pill text={t(`type.${item.route.type}`)} tone={typeTone(item.route.type)} />
                </View>
              </Card>
            </Pressable>
          );
        }}
        ListFooterComponent={
          <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
            <SectionHeader title={t('quickGuides')} action={t('seeAll')} onAction={() => nav.navigate('Main', { screen: 'GuidesTab' })} />
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={guides}
              keyExtractor={(g) => g.id}
              renderItem={({ item: g }) => (
                <Pressable onPress={() => nav.navigate('Guide', { id: g.id })}>
                  <Card style={{ width: 200, marginRight: 10, minHeight: 140 }}>
                    <IconBadge name={g.icon} color={g.color} />
                    <AppText weight="bold" style={{ marginTop: 10, fontSize: 15 }}>
                      {tx(g.title)}
                    </AppText>
                    <AppText style={{ color: c.inkMuted, fontSize: 12, marginTop: 4 }} numberOfLines={2}>
                      {tx(g.subtitle)}
                    </AppText>
                  </Card>
                </Pressable>
              )}
            />
            <Pressable onPress={() => nav.navigate('Main', { screen: 'AiTab' })} style={{ marginTop: 18 }}>
              <LinearGradient
                colors={['#1B5E56', '#2A7A70']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.aiCta}
              >
                <View style={{ flex: 1 }}>
                  <AppText weight="bold" style={{ color: '#fff', fontSize: 17 }}>
                    {t('askAi')}
                  </AppText>
                  <AppText style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, marginTop: 4 }}>
                    {t('askAiHint')}
                  </AppText>
                </View>
                <Ionicons name="chatbubbles" size={28} color="#F4E7B6" />
              </LinearGradient>
            </Pressable>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 22,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  search: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.full,
    paddingHorizontal: 14,
    height: 46,
  },
  stationMark: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiCta: {
    borderRadius: 22,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
