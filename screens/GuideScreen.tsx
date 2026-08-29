import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AppText, Card, IconBadge } from '../components/Ui';
import { useColors } from '../lib/theme';
import { useI18n } from '../lib/LanguageContext';
import { guides } from '../lib/data';
import { RootStackParamList } from '../lib/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Guide'>;

export default function GuideScreen({ route, navigation }: Props) {
  const c = useColors();
  const { t, tx } = useI18n();
  const g = guides.find((x) => x.id === route.params.id);
  if (!g) return null;

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
        }}
      >
        <Ionicons name="chevron-back" size={22} color={c.ink} />
      </Pressable>
      <View style={{ marginTop: 16 }}>
        <IconBadge name={g.icon} color={g.color} size={56} />
        <AppText weight="bold" style={{ fontSize: 26, marginTop: 14 }}>
          {tx(g.title)}
        </AppText>
        <AppText style={{ color: c.inkMuted, marginTop: 6, lineHeight: 22 }}>{tx(g.subtitle)}</AppText>
        <AppText style={{ color: c.inkFaint, fontSize: 12, marginTop: 8 }}>
          {g.minutes} {t('readMins')}
        </AppText>
      </View>
      {g.sections.map((s, i) => (
        <Card key={i} style={{ marginTop: 14 }}>
          <AppText weight="bold" style={{ fontSize: 16 }}>
            {tx(s.heading)}
          </AppText>
          <AppText style={{ color: c.inkMuted, marginTop: 8, lineHeight: 22 }}>{tx(s.body)}</AppText>
        </Card>
      ))}
      <Pressable
        onPress={() => navigation.navigate('Main', { screen: 'AiTab' })}
        style={{
          marginTop: 18,
          backgroundColor: c.teal,
          height: 50,
          borderRadius: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons name="chatbubbles" size={18} color="#fff" />
        <AppText weight="semibold" style={{ color: '#fff', marginLeft: 8 }}>
          {t('askAi')}
        </AppText>
      </Pressable>
    </ScrollView>
  );
}
