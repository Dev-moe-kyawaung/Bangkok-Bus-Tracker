import React, { useState } from 'react';
import { View, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AppText, Card, Chip } from '../components/Ui';
import { CityOverviewMap } from '../components/IllustratedMaps';
import { useColors } from '../lib/theme';
import { useI18n } from '../lib/LanguageContext';
import { maps, stations } from '../lib/data';
import { RootStackParamList } from '../lib/navigation';

const KINDS = ['all', 'terminal', 'road', 'city', 'airport'] as const;

export default function MapsScreen() {
  const c = useColors();
  const { t, tx } = useI18n();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [kind, setKind] = useState<(typeof KINDS)[number]>('all');
  const data = maps.filter((m) => kind === 'all' || m.kind === kind);

  const kindLabel = (k: string) => {
    if (k === 'all') return t('allStations');
    if (k === 'terminal') return t('viewMap');
    if (k === 'road') return t('viewRoads');
    if (k === 'city') return t('cityOverview');
    return t('airport');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <FlatList
        data={data}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ paddingBottom: 28 }}
        ListHeaderComponent={
          <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
            <AppText weight="bold" style={{ fontSize: 26 }}>
              {t('mapsTitle')}
            </AppText>
            <AppText style={{ color: c.inkMuted, marginTop: 6, lineHeight: 20 }}>{t('mapsHint')}</AppText>
            <Pressable onPress={() => nav.navigate('MapDetail', { id: 'city' })} style={{ marginTop: 16 }}>
              <CityOverviewMap
                onSelect={(id) => {
                  const m = maps.find((x) => x.stationId === id && x.kind === 'terminal');
                  if (m) nav.navigate('MapDetail', { id: m.id });
                }}
              />
            </Pressable>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 16 }}>
              {KINDS.map((k) => (
                <Chip key={k} label={kindLabel(k)} active={kind === k} onPress={() => setKind(k)} />
              ))}
            </View>
          </View>
        }
        renderItem={({ item }) => {
          const st = stations.find((s) => s.id === item.stationId);
          const color = st?.color || c.primary;
          const icon =
            item.kind === 'road' ? 'navigate' : item.kind === 'airport' ? 'airplane' : item.kind === 'city' ? 'map' : 'business';
          return (
            <View style={{ paddingHorizontal: 16 }}>
              <Card style={{ marginBottom: 12 }} onPress={() => nav.navigate('MapDetail', { id: item.id })}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 14,
                      backgroundColor: color,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Ionicons name={icon as any} size={20} color="#fff" />
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <AppText weight="bold">{tx(item.title)}</AppText>
                    <AppText style={{ color: c.inkMuted, fontSize: 12, marginTop: 3 }} numberOfLines={2}>
                      {tx(item.subtitle)}
                    </AppText>
                    <AppText style={{ color: c.inkFaint, fontSize: 11, marginTop: 4 }}>
                      {t('lastUpdated')} {item.updated}
                    </AppText>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={c.inkFaint} />
                </View>
              </Card>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
