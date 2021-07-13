import React, {Component} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import PheonixBornScreen from './screens/pheonixborn-screen';
import CardsScreen from './screens/cards-screen';
import DiceScreen from './screens/dice-screen';
import HandScreen from './screens/hand-screen';
import StatsScreen from './screens/stats-screen';
import DeckContext, {deck} from './deck-context';

const DeckScreen = ({navigation, route}) => {
  return (
    <DeckContext.Provider value={deck(route.params.filename)}>
      <TopNav.Navigator>
        <TopNav.Screen name="Main" component={PheonixBornScreen} />
        <TopNav.Screen name="Cards" component={CardsScreen} />
        <TopNav.Screen name="First Five" component={HandScreen} />
        <TopNav.Screen name="Dice" component={DiceScreen} />
        <TopNav.Screen name="Stats" component={StatsScreen} />
      </TopNav.Navigator>
    </DeckContext.Provider>
  );
};

const TopNav = createMaterialTopTabNavigator();

export default DeckScreen;
