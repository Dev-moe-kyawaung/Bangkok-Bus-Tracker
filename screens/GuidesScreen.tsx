import React from 'react';
import { View, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AppText, Card, IconBadge } from '../components/Ui';
import { useColors } from '../lib/theme';
import { useI18n } from '../lib/LanguageContext';
import { guides } from '../lib/data';
import { RootStackParamList } from '../lib/navigation';

export default function GuidesScreen() {
  const c = useColors();
  const { t, tx } = useI18n();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <FlatList
        data={guides}
        keyExtractor={(g) => g.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        ListHeaderComponent={
          <View style={{ marginBottom: 12 }}>
            <AppText weight="bold" style={{ fontSize: 26 }}>
              {t('guidesTitle')}
            </AppText>
            <AppText style={{ color: c.inkMuted, marginTop: 6, lineHeight: 20 }}>{t('askAiHint')}</AppText>
            <Card style={{ marginTop: 14, backgroundColor: c.tealSoft, borderColor: c.teal + '44' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="call" size={18} color={c.teal} />
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <AppText weight="semibold">{t('emergency')}</AppText>
                  <AppText style={{ color: c.inkMuted, fontSize: 12, marginTop: 2 }}>
                    {t('police')} · {t('medical')}
                  </AppText>
                </View>
              </View>
            </Card>
          </View>
        }
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 12 }} onPress={() => nav.navigate('Guide', { id: item.id })}>
            <View style={{ flexDirection: 'row' }}>
              <IconBadge name={item.icon} color={item.color} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <AppText weight="bold" style={{ fontSize: 16 }}>
                  {tx(item.title)}
                </AppText>
                <AppText style={{ color: c.inkMuted, marginTop: 4, lineHeight: 20 }}>{tx(item.subtitle)}</AppText>
                <AppText style={{ color: c.inkFaint, fontSize: 12, marginTop: 6 }}>
                  {item.minutes} {t('readMins')}
                </AppText>
              </View>
              <Ionicons name="chevron-forward" size={16} color={c.inkFaint} />
            </View>
          </Card>
        )}
      />
    </SafeAreaView>
  );
}
