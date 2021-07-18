import React, {useEffect, useState, useContext} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PheonixBornScreen from './screens/pheonixborn-screen';
import CardsScreen from './screens/cards-screen';
import DiceScreen from './screens/dice-screen';
import HandScreen from './screens/hand-screen';
import StatsScreen from './screens/stats-screen';
import {DeckContextProvider, DeckContext, getDeck} from './deck-context';
import Loading from '../util/loading';

const IntermediateContextLoader = params => {
  const {setDeck} = useContext(DeckContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getDeck(params.filename, params.newDeck)
      .then(gottenDeck => {
        setDeck(gottenDeck);
      })
      .finally(() => setLoading(false));
  }, [params.filename, params.newDeck]);

  if (loading === true) {
    return <Loading />;
  }
  return (
    <TopNav.Navigator>
      <TopNav.Screen name="Main" component={PheonixBornScreen} />
      <TopNav.Screen name="Cards" component={CardsScreen} />
      <TopNav.Screen name="First Five" component={HandScreen} />
      <TopNav.Screen name="Dice" component={DiceScreen} />
      <TopNav.Screen name="Stats" component={StatsScreen} />
    </TopNav.Navigator>
  );
};

const DeckScreen = ({navigation, route}) => {
  return (
    <DeckContextProvider>
      <IntermediateContextLoader
        filename={route.params.filename}
        newDeck={route.params.newDeck}
      />
    </DeckContextProvider>
  );
};

const TopNav = createMaterialTopTabNavigator();

export default DeckScreen;
