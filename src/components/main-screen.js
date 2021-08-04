import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DeckScreen from './deck/index';
import DecksScreen from './decks/index';
import SettingsScreen from './settings-screen';

const MainStack = createStackNavigator();

const MainScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Decks"
        component={DecksScreen}
        options={{title: 'Decks'}}
      />
      <MainStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{}}
      />
      <MainStack.Screen
        name="Deck"
        component={DeckScreen}
        options={({route}) => ({title: route.params.name || 'New Deck'})}
      />
    </MainStack.Navigator>
  );
};

export default MainScreen;
