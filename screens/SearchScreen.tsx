import React, { useMemo, useState } from 'react';
import { View, FlatList, TextInput, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AppText, Card, EmptyState, Pill, typeTone } from '../components/Ui';
import { useColors, radius, fontFamily } from '../lib/theme';
import { useI18n } from '../lib/LanguageContext';
import { routes, stations, guides } from '../lib/data';
import { RootStackParamList } from '../lib/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

type Hit =
  | { kind: 'station'; id: string }
  | { kind: 'route'; id: string }
  | { kind: 'guide'; id: string };

export default function SearchScreen({ route, navigation }: Props) {
  const c = useColors();
  const { t, tx, lang } = useI18n();
  const [q, setQ] = useState(route.params?.q || '');

  const hits = useMemo<Hit[]>(() => {
    const s = q.trim().toLowerCase();
    if (s.length < 1) return [];
    const out: Hit[] = [];
    stations.forEach((x) => {
      const blob = `${x.name.th}${x.name.my}${x.name.en}${x.fullName.th}${x.fullName.en}${x.region.th}${x.address.en}`.toLowerCase();
      if (blob.includes(s)) out.push({ kind: 'station', id: x.id });
    });
    routes.forEach((x) => {
      const blob = `${x.destination.th}${x.destination.my}${x.destination.en}${x.province.en}${x.company.th}${x.via.en}`.toLowerCase();
      if (blob.includes(s)) out.push({ kind: 'route', id: x.id });
    });
    guides.forEach((x) => {
      const blob = `${x.title.th}${x.title.my}${x.title.en}${x.subtitle.en}`.toLowerCase();
      if (blob.includes(s)) out.push({ kind: 'guide', id: x.id });
    });
    return out;
  }, [q]);

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <View style={{ paddingTop: 52, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center' }}>
        <Pressable onPress={() => navigation.goBack()} style={{ marginRight: 8 }}>
          <Ionicons name="chevron-back" size={24} color={c.ink} />
        </Pressable>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: c.surface,
            borderRadius: radius.full,
            borderWidth: 1,
            borderColor: c.line,
            paddingHorizontal: 12,
            height: 44,
          }}
        >
          <Ionicons name="search" size={18} color={c.inkFaint} />
          <TextInput
            autoFocus
            value={q}
            onChangeText={setQ}
            placeholder={t('searchPlaceholder')}
            placeholderTextColor={c.inkFaint}
            style={{ flex: 1, marginLeft: 8, color: c.ink, fontSize: 15, fontFamily: fontFamily(lang) }}
            returnKeyType="search"
          />
        </View>
      </View>
      <FlatList
        data={hits}
        keyExtractor={(h) => h.kind + h.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          q.trim() ? <EmptyState icon="search" title={t('noResults')} hint={t('noResultsHint')} /> : (
            <AppText style={{ color: c.inkMuted, textAlign: 'center', marginTop: 40 }}>{t('searchPlaceholder')}</AppText>
          )
        }
        renderItem={({ item }) => {
          if (item.kind === 'station') {
            const s = stations.find((x) => x.id === item.id)!;
            return (
              <Card style={{ marginBottom: 10 }} onPress={() => navigation.replace('Station', { id: s.id })}>
                <AppText weight="semibold">{tx(s.name)}</AppText>
                <AppText style={{ color: c.inkMuted, fontSize: 12 }}>{tx(s.region)}</AppText>
              </Card>
            );
          }
          if (item.kind === 'guide') {
            const g = guides.find((x) => x.id === item.id)!;
            return (
              <Card style={{ marginBottom: 10 }} onPress={() => navigation.replace('Guide', { id: g.id })}>
                <AppText weight="semibold">{tx(g.title)}</AppText>
                <AppText style={{ color: c.inkMuted, fontSize: 12 }}>{tx(g.subtitle)}</AppText>
              </Card>
            );
          }
          const r = routes.find((x) => x.id === item.id)!;
          return (
            <Card style={{ marginBottom: 10 }} onPress={() => navigation.replace('Route', { id: r.id })}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <AppText weight="semibold">{tx(r.destination)}</AppText>
                <Pill text={t(`type.${r.type}`)} tone={typeTone(r.type)} />
              </View>
              <AppText style={{ color: c.inkMuted, fontSize: 12, marginTop: 4 }}>
                {tx(stations.find((s) => s.id === r.stationId)!.name)}
              </AppText>
            </Card>
          );
        }}
      />
    </View>
  );
}
