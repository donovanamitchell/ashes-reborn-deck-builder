import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';

import CardsScreen from './cards';
import DeckScreen from './deck/index';
import DecksScreen from './decks/index';
import SettingsScreen from './settings-screen';
import CustomHeader from './main/custom-header';

const MainStack = createStackNavigator();

const MainScreen = () => {
  const {t} = useTranslation();

  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Decks"
        component={DecksScreen}
        options={{
          headerTitle: props => <CustomHeader {...props} title="decks.title" />,
        }}
      />
      <MainStack.Screen
        name="Cards"
        component={CardsScreen}
        options={{
          headerTitle: props => (
            <CustomHeader {...props} title="cards.title" noIcon={true} />
          ),
        }}
      />
      <MainStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: props => (
            <CustomHeader {...props} title="settings.title" />
          ),
        }}
      />
      <MainStack.Screen
        name="Deck"
        component={DeckScreen}
        options={({route}) => ({
          headerTitle: props => (
            <CustomHeader
              {...props}
              title={route.params.name || t('deck.title')}
              back="true"
            />
          ),
        })}
      />
    </MainStack.Navigator>
  );
};

export default MainScreen;
