import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PheonixBornScreen from './screens/pheonixborn-screen';
import CardsScreen from './screens/cards-screen';
import DiceScreen from './screens/dice-screen';
import HandScreen from './screens/hand-screen';
import StatsScreen from './screens/stats-screen';
import DeckContext, {getDeck, initialState} from './deck-context';
import Loading from '../util/loading';

const DeckScreen = ({navigation, route}) => {
  const [deck, setDeck] = useState(initialState(route.params.filename));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDeck(route.params.filename, route.params.newDeck)
      .then(gottenDeck => {
        setDeck(gottenDeck);
      })
      .finally(() => setLoading(false));
  }, [route.params.filename, route.params.newDeck]);

  if (loading === true) {
    return <Loading />;
  }

  return (
    <DeckContext.Provider value={deck}>
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
