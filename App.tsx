import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { LanguageProvider, useI18n } from './lib/LanguageContext';
import { useColors, fontFamily } from './lib/theme';
import { RootStackParamList, TabParamList } from './lib/navigation';
import HomeScreen from './screens/HomeScreen';
import MapsScreen from './screens/MapsScreen';
import TimesScreen from './screens/TimesScreen';
import GuidesScreen from './screens/GuidesScreen';
import AiScreen from './screens/AiScreen';
import StationScreen from './screens/StationScreen';
import RouteScreen from './screens/RouteScreen';
import MapDetailScreen from './screens/MapDetailScreen';
import GuideScreen from './screens/GuideScreen';
import SearchScreen from './screens/SearchScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function Tabs() {
  const c = useColors();
  const { t, lang } = useI18n();
  const family = fontFamily(lang, 'semibold');

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: c.primary,
        tabBarInactiveTintColor: c.inkFaint,
        tabBarStyle: {
          backgroundColor: c.tabBar,
          borderTopColor: c.line,
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontFamily: family, fontSize: 11 },
        tabBarIcon: ({ color, size, focused }) => {
          const map: Record<string, keyof typeof Ionicons.glyphMap> = {
            HomeTab: focused ? 'home' : 'home-outline',
            MapsTab: focused ? 'map' : 'map-outline',
            TimesTab: focused ? 'time' : 'time-outline',
            GuidesTab: focused ? 'book' : 'book-outline',
            AiTab: focused ? 'chatbubbles' : 'chatbubbles-outline',
          };
          return <Ionicons name={map[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ tabBarLabel: t('tabs.home') }} />
      <Tab.Screen name="MapsTab" component={MapsScreen} options={{ tabBarLabel: t('tabs.maps') }} />
      <Tab.Screen name="TimesTab" component={TimesScreen} options={{ tabBarLabel: t('tabs.times') }} />
      <Tab.Screen name="GuidesTab" component={GuidesScreen} options={{ tabBarLabel: t('tabs.guides') }} />
      <Tab.Screen name="AiTab" component={AiScreen} options={{ tabBarLabel: t('tabs.ai') }} />
    </Tab.Navigator>
  );
}

function RootNav() {
  const c = useColors();
  const scheme = useColorScheme();
  const navTheme = {
    ...(scheme === 'dark' ? DarkTheme : DefaultTheme),
    colors: {
      ...(scheme === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
      background: c.bg,
      card: c.surface,
      text: c.ink,
      border: c.line,
      primary: c.primary,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="Main" component={Tabs} />
        <Stack.Screen name="Station" component={StationScreen} />
        <Stack.Screen name="Route" component={RouteScreen} />
        <Stack.Screen name="MapDetail" component={MapDetailScreen} />
        <Stack.Screen name="Guide" component={GuideScreen} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ animation: 'fade_from_bottom' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
    Prompt: require('./assets/fonts/Prompt_400Regular.ttf'),
    'Prompt-SemiBold': require('./assets/fonts/Prompt_600SemiBold.ttf'),
    'Prompt-Bold': require('./assets/fonts/Prompt_700Bold.ttf'),
    NotoThai: require('./assets/fonts/NotoSansThai_400Regular.ttf'),
    'NotoThai-SemiBold': require('./assets/fonts/NotoSansThai_600SemiBold.ttf'),
    'NotoThai-Bold': require('./assets/fonts/NotoSansThai_700Bold.ttf'),
    NotoMyanmar: require('./assets/fonts/NotoSansMyanmar_400Regular.ttf'),
    'NotoMyanmar-SemiBold': require('./assets/fonts/NotoSansMyanmar_600SemiBold.ttf'),
    'NotoMyanmar-Bold': require('./assets/fonts/NotoSansMyanmar_700Bold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F3EDE3' }}>
        <ActivityIndicator color="#C4491D" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <LanguageProvider>
          <RootNav />
        </LanguageProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
