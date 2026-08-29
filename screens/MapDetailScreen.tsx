import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AppText, Card } from '../components/Ui';
import {
  AirportLinksMap,
  CityOverviewMap,
  EkkamaiTerminalMap,
  MoChitRoadMap,
  MoChitTerminalMap,
  SaiTaiRoadMap,
  SaiTaiTerminalMap,
} from '../components/IllustratedMaps';
import { useColors } from '../lib/theme';
import { useI18n } from '../lib/LanguageContext';
import { maps, stationById } from '../lib/data';
import { RootStackParamList } from '../lib/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'MapDetail'>;

function MapBody({ id, onSelect }: { id: string; onSelect?: (s: string) => void }) {
  if (id === 'city') return <CityOverviewMap onSelect={onSelect} />;
  if (id === 'mo-chit-term') return <MoChitTerminalMap />;
  if (id === 'mo-chit-road') return <MoChitRoadMap />;
  if (id === 'sai-tai-term') return <SaiTaiTerminalMap />;
  if (id === 'sai-tai-road') return <SaiTaiRoadMap />;
  if (id === 'ekkamai-term') return <EkkamaiTerminalMap />;
  if (id === 'airport-links') return <AirportLinksMap />;
  return <CityOverviewMap onSelect={onSelect} />;
}

export default function MapDetailScreen({ route, navigation }: Props) {
  const c = useColors();
  const { t, tx } = useI18n();
  const m = maps.find((x) => x.id === route.params.id);
  if (!m) return null;
  const st = m.stationId !== 'all' ? stationById(m.stationId) : undefined;

  const how =
    m.kind === 'road'
      ? {
          th: 'สีทองคือทางเข้าหลัก สีกรมท่าคือทางด่วน จุดสีสถานีคืออาคารขนส่ง ใช้ป้าย บขส. ตามถนนจริง',
          my: 'ရွှေရောင်သည် အဓိကဝင်ပေါက်၊ နက်ပြာသည် အမြန်လမ်း၊ ဂိတ်အရောင်အစက်သည် အဆောက်အအုံ။ လမ်းပေါ်ရှိ ဘတ်စ်ဂိတ်ဆိုင်းဘုတ်ကိုလိုက်ပါ။',
          en: 'Gold marks the main entrance, navy is expressway, the coloured pin is the terminal. Follow บขส. signs on the real road.',
        }
      : m.kind === 'terminal'
      ? {
          th: 'แตะไม่ได้บนผังจริง — ใช้โซนสีจับคู่กับหมายเลขชานชาลาบนตั๋ว เดินไปก่อนเวลา 15 นาที',
          my: 'အရောင်ဇုန်ကို လက်မှတ်ပေါ်ရှိ ပလက်ဖောင်းနံပါတ်နှင့် တိုက်ဆိုင်ပါ။ ၁၅ မိနစ်ကြို၍ လျှောက်ပါ။',
          en: 'Match coloured zones to the platform number on your ticket. Walk over 15 minutes early.',
        }
      : {
          th: 'แตะหมุดสถานีเพื่อเปิดผังอาคาร แม่น้ำคือเจ้าพระยา สนามบิน BKK อยู่ฝั่งตะวันออก DMK อยู่เหนือหมอชิต',
          my: 'ဂိတ်ပုံစံဖွင့်ရန် ပင်ကိုနှိပ်ပါ။ မြစ်သည် ချောင်းဖရာယာ။ BKK အရှေ့၊ DMK မော်ချစ်အထက်။',
          en: 'Tap a pin to open a terminal layout. The river is the Chao Phraya. BKK is east, DMK sits north of Mo Chit.',
        };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: c.bg }} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: c.surface,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 12,
        }}
      >
        <Ionicons name="chevron-back" size={22} color={c.ink} />
      </Pressable>
      <AppText weight="bold" style={{ fontSize: 24 }}>
        {tx(m.title)}
      </AppText>
      <AppText style={{ color: c.inkMuted, marginTop: 6, lineHeight: 20 }}>{tx(m.subtitle)}</AppText>
      <AppText style={{ color: c.inkFaint, fontSize: 12, marginTop: 6 }}>
        {t('lastUpdated')} {m.updated}
      </AppText>

      <View style={{ marginTop: 16 }}>
        <MapBody
          id={m.id}
          onSelect={(sid) => {
            const next = maps.find((x) => x.stationId === sid && x.kind === 'terminal');
            if (next) navigation.push('MapDetail', { id: next.id });
          }}
        />
      </View>

      <AppText weight="bold" style={{ marginTop: 18, marginBottom: 8 }}>
        {t('legend')}
      </AppText>
      {m.legend.map((l, i) => (
        <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: l.color, marginRight: 10 }} />
          <AppText>{tx(l.label)}</AppText>
        </View>
      ))}

      <Card style={{ marginTop: 8 }}>
        <AppText weight="bold">{t('howToRead')}</AppText>
        <AppText style={{ color: c.inkMuted, marginTop: 8, lineHeight: 22 }}>{tx(how)}</AppText>
      </Card>

      {st ? (
        <Pressable
          onPress={() => navigation.navigate('Station', { id: st.id })}
          style={{
            marginTop: 16,
            backgroundColor: st.color,
            height: 48,
            borderRadius: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="bus" size={16} color="#fff" />
          <AppText weight="semibold" style={{ color: '#fff', marginLeft: 8 }}>
            {tx(st.name)}
          </AppText>
        </Pressable>
      ) : null}
    </ScrollView>
  );
}
