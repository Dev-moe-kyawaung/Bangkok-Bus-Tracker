import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { AppText } from './Ui';
import { useColors } from '../lib/theme';
import { useI18n } from '../lib/LanguageContext';
import Ionicons from '@expo/vector-icons/Ionicons';

function Road({ x, y, w, h, color, rotate }: { x: number; y: number; w: number; h: number; color: string; rotate?: string }) {
  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: h,
        backgroundColor: color,
        borderRadius: 4,
        transform: rotate ? [{ rotate }] : undefined,
      }}
    />
  );
}

function Pin({
  x,
  y,
  color,
  label,
  onPress,
}: {
  x: number;
  y: number;
  color: string;
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={{ position: 'absolute', left: x, top: y, alignItems: 'center', width: 90 }}>
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: color,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 3,
          borderColor: '#fff',
        }}
      >
        <Ionicons name="bus" size={12} color="#fff" />
      </View>
      <View
        style={{
          marginTop: 4,
          backgroundColor: 'rgba(28,25,22,0.82)',
          paddingHorizontal: 6,
          paddingVertical: 3,
          borderRadius: 8,
        }}
      >
        <AppText style={{ color: '#fff', fontSize: 10 }} weight="semibold">
          {label}
        </AppText>
      </View>
    </Pressable>
  );
}

export function CityOverviewMap({ onSelect }: { onSelect?: (id: string) => void }) {
  const c = useColors();
  const { t } = useI18n();
  return (
    <View style={[styles.canvas, { backgroundColor: c.bgDeep }]}>
      <View style={[styles.water, { left: 118, top: 20, width: 36, height: 240, backgroundColor: c.mapWater }]} />
      <View style={[styles.park, { left: 160, top: 40, width: 70, height: 50, backgroundColor: c.mapPark }]} />
      <View style={[styles.park, { left: 28, top: 150, width: 60, height: 40, backgroundColor: c.mapPark }]} />
      <Road x={20} y={70} w={280} h={10} color={c.mapRoad} />
      <Road x={20} y={175} w={280} h={10} color={c.mapRoad} />
      <Road x={70} y={30} w={10} h={230} color={c.mapRoad} />
      <Road x={210} y={30} w={10} h={230} color={c.mapRoad} />
      <Road x={20} y={118} w={280} h={6} color={c.gold + '99'} />
      <AppText style={[styles.roadLabel, { left: 86, top: 52, color: c.inkFaint }]}>Phahonyothin</AppText>
      <AppText style={[styles.roadLabel, { left: 150, top: 156, color: c.inkFaint }]}>Sukhumvit</AppText>
      <AppText style={[styles.roadLabel, { left: 24, top: 188, color: c.inkFaint }]}>Borommaratcha</AppText>
      <View style={[styles.riverTag, { backgroundColor: c.teal }]}>
        <AppText style={{ color: '#fff', fontSize: 9 }} weight="semibold">
          Chao Phraya
        </AppText>
      </View>
      <Pin x={78} y={48} color="#C4491D" label={t('north')} onPress={() => onSelect?.('mo-chit')} />
      <Pin x={28} y={198} color="#1B5E56" label={t('south')} onPress={() => onSelect?.('sai-tai')} />
      <Pin x={198} y={188} color="#2B4C7E" label={t('east')} onPress={() => onSelect?.('ekkamai')} />
      <View style={[styles.airport, { left: 230, top: 118 }]}>
        <Ionicons name="airplane" size={12} color="#fff" />
      </View>
      <AppText style={[styles.roadLabel, { left: 214, top: 138, color: c.inkFaint }]}>BKK</AppText>
      <View style={[styles.airport, { left: 96, top: 18, backgroundColor: '#8E2F12' }]}>
        <Ionicons name="airplane" size={12} color="#fff" />
      </View>
      <AppText style={[styles.roadLabel, { left: 88, top: 8, color: c.inkFaint }]}>DMK</AppText>
    </View>
  );
}

export function MoChitTerminalMap({ highlight }: { highlight?: string }) {
  const c = useColors();
  const { lang } = useI18n();
  const label = (th: string, my: string, en: string) => (lang === 'my' ? my : lang === 'en' ? en : th);
  return (
    <View style={[styles.canvas, { backgroundColor: c.bgDeep, height: 340 }]}>
      <View style={[styles.building, { backgroundColor: c.surface, borderColor: c.line }]}>
        <View style={[styles.hall, { backgroundColor: c.goldSoft, top: 16, left: 16, width: 268, height: 70 }]}>
          <AppText weight="semibold" style={{ fontSize: 12, color: c.gold }}>
            {label('เคาน์เตอร์ตั๋ว C', 'လက်မှတ်ကောင်တာ C', 'Ticket counters C')}
          </AppText>
          <AppText style={{ fontSize: 10, color: c.inkMuted, marginTop: 4 }}>
            {label('24 บริษัท · PromptPay', 'ကုမ္ပဏီ ၂၄ · PromptPay', '24 companies · PromptPay')}
          </AppText>
        </View>
        <View style={{ position: 'absolute', top: 96, left: 16, right: 16, flexDirection: 'row', gap: 8 }}>
          <View style={[styles.zoneBox, { backgroundColor: '#C4491D22', borderColor: '#C4491D', flex: 1 }]}>
            <AppText weight="bold" style={{ color: '#C4491D', fontSize: 13 }}>
              A 1–12
            </AppText>
            <AppText style={{ fontSize: 10, color: c.inkMuted, marginTop: 4 }}>
              {label('อีสาน', 'အီစန်', 'Isaan')}
            </AppText>
          </View>
          <View style={[styles.zoneBox, { backgroundColor: '#1B5E5622', borderColor: '#1B5E56', flex: 1 }]}>
            <AppText weight="bold" style={{ color: '#1B5E56', fontSize: 13 }}>
              B 13–22
            </AppText>
            <AppText style={{ fontSize: 10, color: c.inkMuted, marginTop: 4 }}>
              {label('เหนือ · แม่สอด B-20', 'မြောက် · မဲဆောက် B-20', 'North · Mae Sot B-20')}
            </AppText>
          </View>
        </View>
        <View style={[styles.hall, { backgroundColor: c.tealSoft, bottom: 16, left: 16, width: 170, height: 54, top: undefined }]}>
          <AppText weight="semibold" style={{ fontSize: 11, color: c.teal }}>
            {label('ห้องรอ · อาหาร ชั้น 2', 'စောင့်ခန်း · ၂ထပ် စားသောက်', 'Waiting · 2F food')}
          </AppText>
        </View>
        <View style={[styles.hall, { backgroundColor: c.primarySoft, bottom: 16, right: 16, width: 90, height: 54, top: undefined, left: undefined }]}>
          <AppText weight="semibold" style={{ fontSize: 11, color: c.primary, textAlign: 'center' }}>
            {label('ทางเข้า\nกำแพงเพชร 2', 'ဝင်ပေါက်\nကမ်ဖန်ဖက် ၂', 'Entry\nKP 2 Rd')}
          </AppText>
        </View>
      </View>
    </View>
  );
}

export function MoChitRoadMap() {
  const c = useColors();
  const { lang } = useI18n();
  const L = (th: string, my: string, en: string) => (lang === 'my' ? my : lang === 'en' ? en : th);
  return (
    <View style={[styles.canvas, { backgroundColor: c.bgDeep, height: 340 }]}>
      <Road x={40} y={40} w={12} h={260} color={c.mapRoad} />
      <AppText style={[styles.roadLabel, { left: 8, top: 150, color: c.inkFaint, width: 28 }]}>{L('พหลฯ', 'ဖဟို', 'Phaho')}</AppText>
      <Road x={40} y={160} w={250} h={14} color="#C9A227" />
      <AppText style={[styles.roadLabel, { left: 110, top: 142, color: c.ink }]} weight="semibold">
        Kamphaeng Phet 2
      </AppText>
      <Road x={40} y={70} w={180} h={8} color={c.mapRoad} />
      <View style={[styles.park, { left: 70, top: 86, width: 90, height: 54, backgroundColor: c.mapPark }]} />
      <AppText style={[styles.roadLabel, { left: 78, top: 102, color: c.teal }]}>{L('สวนจตุจักร', 'ချာတူချက်ဥယျာဉ်', 'Chatuchak')}</AppText>
      <View style={[styles.buildingSmall, { left: 175, top: 196, backgroundColor: '#C4491D' }]}>
        <Ionicons name="bus" size={16} color="#fff" />
        <AppText style={{ color: '#fff', fontSize: 10, marginTop: 4 }} weight="bold">
          Mo Chit 2
        </AppText>
      </View>
      <View style={[styles.rail, { left: 86, top: 48, backgroundColor: '#1B5E56' }]}>
        <AppText style={{ color: '#fff', fontSize: 9 }} weight="semibold">
          BTS Mo Chit
        </AppText>
      </View>
      <View style={[styles.rail, { left: 86, top: 248, backgroundColor: '#2B4C7E' }]}>
        <AppText style={{ color: '#fff', fontSize: 9 }} weight="semibold">
          MRT Chatuchak
        </AppText>
      </View>
      <View style={[styles.arrow, { left: 200, top: 168 }]}>
        <Ionicons name="arrow-forward" size={16} color="#C4491D" />
      </View>
    </View>
  );
}

export function SaiTaiTerminalMap() {
  const c = useColors();
  const { lang } = useI18n();
  const L = (th: string, my: string, en: string) => (lang === 'my' ? my : lang === 'en' ? en : th);
  return (
    <View style={[styles.canvas, { backgroundColor: c.bgDeep, height: 340 }]}>
      <View style={[styles.building, { backgroundColor: c.surface, borderColor: c.line }]}>
        <View style={{ flexDirection: 'row', padding: 14, gap: 8, flex: 1 }}>
          <View style={{ flex: 2 }}>
            <View style={[styles.zoneBox, { backgroundColor: '#1B5E5622', borderColor: '#1B5E56', height: 120 }]}>
              <AppText weight="bold" style={{ color: '#1B5E56' }}>
                1–8
              </AppText>
              <AppText style={{ fontSize: 11, color: c.inkMuted, marginTop: 4 }}>
                {L('หัวหิน ชุมพร สุราษฎร์', 'ဟွာဟင် ချွန်ဖွန် စူရတ်', 'Hua Hin · Chumphon · Surat')}
              </AppText>
            </View>
            <View style={[styles.zoneBox, { backgroundColor: '#2B4C7E22', borderColor: '#2B4C7E', height: 100, marginTop: 8 }]}>
              <AppText weight="bold" style={{ color: '#2B4C7E' }}>
                9–16
              </AppText>
              <AppText style={{ fontSize: 11, color: c.inkMuted, marginTop: 4 }}>
                {L('ภูเก็ต กระบี่ หาดใหญ่', 'ဖူးခက် ခရာဘီ ဟတ်ယိုင်', 'Phuket · Krabi · Hat Yai')}
              </AppText>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={[styles.zoneBox, { backgroundColor: '#C4491D22', borderColor: '#C4491D', height: 150 }]}>
              <AppText weight="bold" style={{ color: '#C4491D' }}>
                17–20
              </AppText>
              <AppText style={{ fontSize: 11, color: c.inkMuted, marginTop: 4 }}>
                {L('กาญจนบุรี ระนอง', 'ကန်ချန ရနောင်း', 'Kanchanaburi · Ranong')}
              </AppText>
            </View>
            <View style={[styles.zoneBox, { backgroundColor: c.goldSoft, borderColor: c.gold, height: 70, marginTop: 8 }]}>
              <AppText weight="bold" style={{ color: c.gold, fontSize: 12 }}>
                {L('ตั๋ว', 'လက်မှတ်', 'Tickets')}
              </AppText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export function SaiTaiRoadMap() {
  const c = useColors();
  return (
    <View style={[styles.canvas, { backgroundColor: c.bgDeep, height: 320 }]}>
      <Road x={20} y={140} w={280} h={16} color="#C4491D" />
      <AppText style={[styles.roadLabel, { left: 70, top: 118, color: c.ink }]} weight="semibold">
        Borommaratchachonnani
      </AppText>
      <Road x={150} y={40} w={12} h={240} color={c.mapRoad} />
      <AppText style={[styles.roadLabel, { left: 168, top: 70, color: c.inkFaint }]}>Ratchaphruek</AppText>
      <View style={[styles.buildingSmall, { left: 188, top: 168, backgroundColor: '#1B5E56', width: 90 }]}>
        <Ionicons name="bus" size={16} color="#fff" />
        <AppText style={{ color: '#fff', fontSize: 10, marginTop: 4 }} weight="bold">
          Sai Tai Mai
        </AppText>
      </View>
      <View style={[styles.jam, { left: 40, top: 136 }]}>
        <AppText style={{ color: '#fff', fontSize: 9 }} weight="semibold">
          16:00–19:30
        </AppText>
      </View>
    </View>
  );
}

export function EkkamaiTerminalMap() {
  const c = useColors();
  const { lang } = useI18n();
  const L = (th: string, my: string, en: string) => (lang === 'my' ? my : lang === 'en' ? en : th);
  return (
    <View style={[styles.canvas, { backgroundColor: c.bgDeep, height: 300 }]}>
      <View style={[styles.rail, { left: 20, top: 24, width: 280, backgroundColor: '#1B5E56' }]}>
        <Ionicons name="train" size={12} color="#fff" />
        <AppText style={{ color: '#fff', fontSize: 11, marginLeft: 6 }} weight="semibold">
          BTS Ekkamai  ·  {L('ทางออก 2', 'ထွက်ပေါက် ၂', 'Exit 2')}
        </AppText>
      </View>
      <View style={[styles.building, { top: 64, height: 200, backgroundColor: c.surface }]}>
        <View style={{ flexDirection: 'row', padding: 14, gap: 8, flex: 1 }}>
          <View style={[styles.zoneBox, { flex: 1, backgroundColor: c.goldSoft, borderColor: c.gold }]}>
            <AppText weight="bold" style={{ color: c.gold, fontSize: 12 }}>
              {L('ตั๋ว', 'လက်မှတ်', 'Tickets')}
            </AppText>
          </View>
          <View style={[styles.zoneBox, { flex: 2, backgroundColor: '#2B4C7E22', borderColor: '#2B4C7E' }]}>
            <AppText weight="bold" style={{ color: '#2B4C7E' }}>
              {L('ชานชาลา 1–8', 'ပလက်ဖောင်း ၁–၈', 'Platforms 1–8')}
            </AppText>
            <AppText style={{ fontSize: 11, color: c.inkMuted, marginTop: 6 }}>
              {L('พัทยา · ระยอง · ตราด', 'ပတ္တားယား · ရယောင်း · ထရာ့ဒ်', 'Pattaya · Rayong · Trat')}
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
}

export function AirportLinksMap() {
  const c = useColors();
  const { lang } = useI18n();
  const L = (th: string, my: string, en: string) => (lang === 'my' ? my : lang === 'en' ? en : th);
  const Node = ({ x, y, color, title, sub }: { x: number; y: number; color: string; title: string; sub: string }) => (
    <View style={{ position: 'absolute', left: x, top: y, width: 100, alignItems: 'center' }}>
      <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: color, borderWidth: 3, borderColor: '#fff' }} />
      <AppText weight="bold" style={{ fontSize: 11, marginTop: 4, textAlign: 'center' }}>
        {title}
      </AppText>
      <AppText style={{ fontSize: 9, color: c.inkMuted, textAlign: 'center' }}>{sub}</AppText>
    </View>
  );
  return (
    <View style={[styles.canvas, { backgroundColor: c.bgDeep, height: 340 }]}>
      <View style={{ position: 'absolute', left: 70, top: 80, width: 180, height: 2, backgroundColor: '#C9A227' }} />
      <View style={{ position: 'absolute', left: 158, top: 80, width: 2, height: 140, backgroundColor: '#1B5E56' }} />
      <View style={{ position: 'absolute', left: 40, top: 218, width: 240, height: 2, backgroundColor: '#C4491D' }} />
      <Node x={20} y={48} color="#C9A227" title="BKK" sub={L('สุวรรณภูมิ', 'သုဝဏ္ဏဘူမိ', 'Suvarnabhumi')} />
      <Node x={200} y={48} color="#C9A227" title={L('พญาไท', 'ပယာထိုင်း', 'Phaya Thai')} sub="ARL" />
      <Node x={110} y={150} color="#1B5E56" title="BTS" sub={L('สายสุขุมวิท', 'သုခွမ်ဝစ်', 'Sukhumvit')} />
      <Node x={18} y={230} color="#C4491D" title="Mo Chit 2" sub="DMK 25–40m" />
      <Node x={118} y={250} color="#1B5E56" title="Sai Tai" sub="Grab 90m+" />
      <Node x={210} y={230} color="#2B4C7E" title="Ekkamai" sub="ARL + BTS" />
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    height: 300,
    borderRadius: 22,
    overflow: 'hidden',
    position: 'relative',
  },
  water: { position: 'absolute', borderRadius: 18, opacity: 0.85 },
  park: { position: 'absolute', borderRadius: 14, opacity: 0.9 },
  roadLabel: { position: 'absolute', fontSize: 10 },
  riverTag: {
    position: 'absolute',
    left: 108,
    top: 250,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    transform: [{ rotate: '-90deg' }],
  },
  airport: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#C9A227',
    alignItems: 'center',
    justifyContent: 'center',
  },
  building: {
    position: 'absolute',
    left: 12,
    right: 12,
    top: 12,
    bottom: 12,
    borderRadius: 18,
    borderWidth: 1,
  },
  hall: { position: 'absolute', borderRadius: 14, padding: 12, justifyContent: 'center' },
  zoneBox: { borderRadius: 14, borderWidth: 1.5, padding: 12, justifyContent: 'center' },
  buildingSmall: {
    position: 'absolute',
    width: 86,
    height: 70,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rail: {
    position: 'absolute',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: { position: 'absolute' },
  jam: {
    position: 'absolute',
    backgroundColor: '#C4491D',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
});
