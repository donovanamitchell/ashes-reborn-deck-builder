import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';

import DeckScreen from './deck/index';
import DecksScreen from './decks/index';
import SettingsScreen from './settings-screen';

const MainStack = createStackNavigator();

const MainScreen = () => {
  const {t} = useTranslation();

  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Decks"
        component={DecksScreen}
        options={{title: t('decks.title')}}
      />
      <MainStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{title: t('settings.title')}}
      />
      <MainStack.Screen
        name="Deck"
        component={DeckScreen}
        options={({route}) => ({title: route.params.name || t('deck.title')})}
      />
    </MainStack.Navigator>
  );
};

export default MainScreen;
