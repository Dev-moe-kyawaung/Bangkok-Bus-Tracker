import { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  HomeTab: undefined;
  MapsTab: undefined;
  TimesTab: undefined;
  GuidesTab: undefined;
  AiTab: undefined;
};

export type RootStackParamList = {
  Main: NavigatorScreenParams<TabParamList> | undefined;
  Station: { id: string };
  Route: { id: string };
  MapDetail: { id: string };
  Guide: { id: string };
  Search: { q?: string } | undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
