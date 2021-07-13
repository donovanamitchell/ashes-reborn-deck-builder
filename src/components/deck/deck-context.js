import React, {createContext} from 'react';

const DeckContext = createContext({});

export function initialState() {
  return {
    filename: `${Date.now().toString(16)}.json`,
    name: 'Testys Tasty Taco Truck',
    pheonixBorn: 'Testy Testerson',
    cards: {},
  };
}
export function deck(filename) {
  return {
    filename: filename,
    name: 'Testys Tasty Taco Truck',
    pheonixBorn: 'Testy Testerson',
    cards: {'shatter-pulse': 1, encore: 3, 'summon-salamander-monk': 2},
  };
}
export default DeckContext;
