import React, { useRef, useState } from 'react';
import {
  View,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AppText, LangSwitcher } from '../components/Ui';
import { useColors, radius, fontFamily } from '../lib/theme';
import { useI18n } from '../lib/LanguageContext';
import { answerQuestion, detectLangHint } from '../lib/ai';
import { popularAiQuestions } from '../lib/data';
import { ChatMessage } from '../lib/types';

function uid() {
  return Math.random().toString(36).slice(2);
}

export default function AiScreen() {
  const c = useColors();
  const { t, lang, setLang } = useI18n();
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const listRef = useRef<FlatList<ChatMessage>>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'hello',
      role: 'ai',
      text: t('aiHello'),
      suggestions: popularAiQuestions[lang],
    },
  ]);

  const send = (raw?: string) => {
    const q = (raw ?? text).trim();
    if (!q || busy) return;
    const hint = detectLangHint(q);
    if (hint && hint !== lang) setLang(hint);
    const useLang = hint || lang;
    const user: ChatMessage = { id: uid(), role: 'user', text: q };
    setMessages((m) => [...m, user]);
    setText('');
    setBusy(true);
    setTimeout(() => {
      const a = answerQuestion(q, useLang);
      setMessages((m) => [...m, { id: uid(), role: 'ai', text: a.text, suggestions: a.suggestions }]);
      setBusy(false);
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);
    }, 480);
  };

  const reset = () => {
    setMessages([
      {
        id: uid(),
        role: 'ai',
        text: t('aiHello'),
        suggestions: popularAiQuestions[lang],
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.head}>
          <View style={{ flex: 1 }}>
            <AppText weight="bold" style={{ fontSize: 22 }}>
              {t('aiTitle')}
            </AppText>
            <AppText style={{ color: c.inkMuted, fontSize: 12, marginTop: 2 }}>{t('aiPowered')}</AppText>
          </View>
          <Pressable onPress={reset} style={{ marginRight: 8 }}>
            <Ionicons name="refresh" size={20} color={c.inkMuted} />
          </Pressable>
          <LangSwitcher />
        </View>

        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(m) => m.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 12 }}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
          renderItem={({ item }) => {
            const mine = item.role === 'user';
            return (
              <View style={{ marginBottom: 14, alignItems: mine ? 'flex-end' : 'flex-start' }}>
                {!mine ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                    <View style={[styles.avatar, { backgroundColor: c.teal }]}>
                      <Ionicons name="sparkles" size={14} color="#fff" />
                    </View>
                    <AppText style={{ marginLeft: 6, fontSize: 12, color: c.inkMuted }} weight="semibold">
                      BKK AI
                    </AppText>
                  </View>
                ) : null}
                <View
                  style={[
                    styles.bubble,
                    {
                      backgroundColor: mine ? c.bubbleUser : c.surface,
                      borderColor: mine ? c.bubbleUser : c.line,
                      borderTopLeftRadius: mine ? 18 : 6,
                      borderTopRightRadius: mine ? 6 : 18,
                    },
                  ]}
                >
                  <AppText style={{ color: mine ? '#FFF8F3' : c.ink, lineHeight: 22 }}>{item.text}</AppText>
                </View>
                {item.suggestions?.length ? (
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8, maxWidth: '92%' }}>
                    {item.suggestions.map((s) => (
                      <Pressable
                        key={s}
                        onPress={() => send(s)}
                        style={[styles.sug, { borderColor: c.teal, backgroundColor: c.tealSoft }]}
                      >
                        <AppText style={{ color: c.teal, fontSize: 12 }} weight="semibold">
                          {s}
                        </AppText>
                      </Pressable>
                    ))}
                  </View>
                ) : null}
              </View>
            );
          }}
          ListFooterComponent={
            busy ? (
              <AppText style={{ color: c.inkMuted, fontSize: 13, marginLeft: 8 }}>{t('thinking')}</AppText>
            ) : null
          }
        />

        <View style={[styles.composer, { backgroundColor: c.surface, borderTopColor: c.line }]}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder={t('aiPlaceholder')}
            placeholderTextColor={c.inkFaint}
            style={[styles.input, { color: c.ink, backgroundColor: c.surfaceAlt, borderColor: c.line, fontFamily: fontFamily(lang) }]}
            multiline
            returnKeyType="send"
            onSubmitEditing={() => send()}
          />
          <Pressable
            onPress={() => send()}
            style={[styles.send, { backgroundColor: text.trim() ? c.primary : c.inkFaint }]}
          >
            <Ionicons name="send" size={16} color="#fff" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  head: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    maxWidth: '88%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    borderWidth: 1,
  },
  sug: {
    borderWidth: 1,
    borderRadius: radius.full,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 6,
    marginBottom: 6,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    minHeight: 42,
    maxHeight: 110,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    fontSize: 15,
  },
  send: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
