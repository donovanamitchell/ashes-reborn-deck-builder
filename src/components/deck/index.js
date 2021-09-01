import React, {useEffect, useState, useContext} from 'react';
import {AppState} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useTranslation} from 'react-i18next';

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
  const {t} = useTranslation();

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

  useEffect(() => {
    AppState.addEventListener('change', saveDeckWhenBackgrounded);

    return () => {
      AppState.removeEventListener('change', saveDeckWhenBackgrounded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function saveDeckWhenBackgrounded(nextAppState) {
    if (nextAppState === 'background') {
      save();
    }
  }

  if (loading === true) {
    return <Loading />;
  }
  return (
    <TopNav.Navigator>
      <TopNav.Screen
        name="Main"
        component={PhoenixBornScreen}
        options={{title: t('deck.main.title')}}
      />
      <TopNav.Screen
        name="Cards"
        component={CardsScreen}
        options={{title: t('deck.cards.title')}}
      />
      <TopNav.Screen
        name="First Five"
        component={HandScreen}
        options={{title: t('deck.firstFive.title')}}
      />
      <TopNav.Screen
        name="Dice"
        component={DiceScreen}
        options={{title: t('deck.dice.title')}}
      />
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
