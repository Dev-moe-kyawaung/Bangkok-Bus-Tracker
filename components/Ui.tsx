import React from 'react';
import {
  View,
  Text as RNText,
  StyleSheet,
  Pressable,
  ViewStyle,
  TextProps,
  StyleProp,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { fontFamily, radius, shadow, useColors } from '../lib/theme';
import { useI18n } from '../lib/LanguageContext';
import { Lang } from '../lib/types';

export function AppText({
  children,
  style,
  weight = 'regular',
  forceLang,
  ...rest
}: TextProps & { weight?: 'regular' | 'semibold' | 'bold'; forceLang?: Lang }) {
  const { lang } = useI18n();
  const c = useColors();
  const l = forceLang || lang;
  return (
    <RNText
      {...rest}
      style={[
        { color: c.ink, fontFamily: fontFamily(l, weight), fontSize: 15 },
        style,
      ]}
    >
      {children}
    </RNText>
  );
}

export function Card({
  children,
  style,
  onPress,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}) {
  const c = useColors();
  const inner = (
    <View
      style={[
        styles.card,
        shadow.card,
        { backgroundColor: c.surface, borderColor: c.line },
        style,
      ]}
    >
      {children}
    </View>
  );
  if (!onPress) return inner;
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.86 : 1 }]}>
      {inner}
    </Pressable>
  );
}

export function Chip({
  label,
  active,
  onPress,
  color,
}: {
  label: string;
  active?: boolean;
  onPress?: () => void;
  color?: string;
}) {
  const c = useColors();
  const bg = active ? color || c.primary : c.surfaceAlt;
  const fg = active ? '#FFF8F3' : c.ink;
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        { backgroundColor: bg, borderColor: active ? bg : c.line },
      ]}
    >
      <AppText style={{ color: fg, fontSize: 13 }} weight="semibold">
        {label}
      </AppText>
    </Pressable>
  );
}

export function SectionHeader({
  title,
  action,
  onAction,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  const c = useColors();
  return (
    <View style={styles.sectionRow}>
      <AppText weight="bold" style={{ fontSize: 18, color: c.ink }}>
        {title}
      </AppText>
      {action ? (
        <Pressable onPress={onAction} hitSlop={8}>
          <AppText style={{ color: c.primary, fontSize: 13 }} weight="semibold">
            {action}
          </AppText>
        </Pressable>
      ) : null}
    </View>
  );
}

export function IconBadge({
  name,
  color,
  size = 42,
}: {
  name: string;
  color: string;
  size?: number;
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color + '22',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Ionicons name={name as any} size={size * 0.5} color={color} />
    </View>
  );
}

export function Pill({ text, tone }: { text: string; tone?: 'gold' | 'teal' | 'red' | 'ink' }) {
  const c = useColors();
  const map: Record<string, { bg: string; fg: string }> = {
    gold: { bg: c.goldSoft, fg: c.gold },
    teal: { bg: c.tealSoft, fg: c.teal },
    red: { bg: c.primarySoft, fg: c.primary },
    ink: { bg: c.surfaceAlt, fg: c.inkMuted },
  };
  const t = map[tone || 'ink'];
  return (
    <View style={[styles.pill, { backgroundColor: t.bg }]}>
      <AppText style={{ color: t.fg, fontSize: 11 }} weight="semibold">
        {text}
      </AppText>
    </View>
  );
}

export function LangSwitcher() {
  const { lang, setLang, t } = useI18n();
  const c = useColors();
  const opts: { id: Lang; label: string }[] = [
    { id: 'th', label: 'ไทย' },
    { id: 'my', label: 'မြန်မာ' },
    { id: 'en', label: 'EN' },
  ];
  return (
    <View style={[styles.langWrap, { backgroundColor: c.surfaceAlt, borderColor: c.line }]}>
      {opts.map((o) => {
        const on = lang === o.id;
        return (
          <Pressable
            key={o.id}
            onPress={() => setLang(o.id)}
            style={[
              styles.langBtn,
              on && { backgroundColor: c.primary },
            ]}
          >
            <AppText
              forceLang={o.id}
              weight="semibold"
              style={{ color: on ? '#FFF8F3' : c.inkMuted, fontSize: 12 }}
            >
              {o.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

export function EmptyState({
  icon,
  title,
  hint,
}: {
  icon: string;
  title: string;
  hint: string;
}) {
  const c = useColors();
  return (
    <View style={{ alignItems: 'center', padding: 36 }}>
      <Ionicons name={icon as any} size={48} color={c.inkFaint} />
      <AppText weight="bold" style={{ marginTop: 12, fontSize: 17 }}>
        {title}
      </AppText>
      <AppText style={{ color: c.inkMuted, marginTop: 6, textAlign: 'center' }}>{hint}</AppText>
    </View>
  );
}

export function typeTone(type: string): 'gold' | 'teal' | 'red' | 'ink' {
  if (type === 'vip') return 'gold';
  if (type === 'first') return 'teal';
  if (type === 'express') return 'red';
  return 'ink';
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    padding: 16,
    borderWidth: 1,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.full,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  pill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
    alignSelf: 'flex-start',
  },
  langWrap: {
    flexDirection: 'row',
    borderRadius: radius.full,
    padding: 3,
    borderWidth: 1,
  },
  langBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
});
