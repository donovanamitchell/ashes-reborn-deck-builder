import React, {createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeckContext = createContext({});

export function initialState(filename) {
  return {
    filename: filename,
    name: '',
    pheonixBorn: null,
    cards: {},
  };
}
export async function getDeck(filename, newDeck) {
  if (newDeck === true) {
    return initialState(filename);
  }

  try {
    let deck = JSON.parse(await AsyncStorage.getItem(filename));
    if (deck === null) {
      // TODO: error modal
      console.log('Could not find deck');
      deck = initialState(filename);
    }

    console.log(deck);
    return deck;
  } catch (e) {
    // TODO: error modal
    console.log(e);
    return initialState(filename);
  }
}
export default DeckContext;
