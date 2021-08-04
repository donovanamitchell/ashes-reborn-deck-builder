import React, {useEffect, useState, useContext} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PhoenixBornScreen from './screens/phoenixborn-screen';
import CardsScreen from './screens/cards-screen';
import DiceScreen from './screens/dice-screen';
import HandScreen from './screens/hand-screen';
import {DeckContextProvider, DeckContext} from './deck-context';
import {getDeck} from '../../services/decks-service';
import Loading from '../util/loading';

const IntermediateContextLoader = params => {
  const {setDeck, save} = useContext(DeckContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getDeck(params.filename, params.newDeck)
      .then(gottenDeck => {
        setDeck(gottenDeck);
      })
      .finally(() => setLoading(false));
    return () => {
      save();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.filename, params.newDeck]);

  if (loading === true) {
    return <Loading />;
  }
  return (
    <TopNav.Navigator>
      <TopNav.Screen name="Main" component={PhoenixBornScreen} />
      <TopNav.Screen name="Cards" component={CardsScreen} />
      <TopNav.Screen name="First Five" component={HandScreen} />
      <TopNav.Screen name="Dice" component={DiceScreen} />
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
