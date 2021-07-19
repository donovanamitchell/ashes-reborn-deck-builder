// https://wix.github.io/react-native-navigation/docs/third-party-react-context
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function initialState(filename) {
  return {
    filename: filename,
    name: '',
    pheonixBorn: null,
    pheonixBornStub: null,
    cards: {},
    dice: {},
    firstFive: [],
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

const initialDeckState = {
  filename: '',
  name: '',
  pheonixBorn: null,
  pheonixBornStub: null,
  cards: {},
  dice: {},
  firstFive: [],
};

const deckContextWrapper = component => ({
  ...initialDeckState,
  setName: text => {
    initialDeckState.name = text;
    component?.setState({context: deckContextWrapper(component)});
  },
  setPheonixborn: (name, stub) => {
    initialDeckState.pheonixBorn = name;
    initialDeckState.pheonixBornStub = stub;
    component?.setState({context: deckContextWrapper(component)});
  },
  setDeck: deck => {
    console.log('SET DECK', deck);
    initialDeckState.count = 0;
    initialDeckState.filename = deck.filename;
    initialDeckState.name = deck.name;
    initialDeckState.pheonixBorn = deck.pheonixBorn;
    initialDeckState.pheonixBornStub = deck.pheonixBornStub;
    initialDeckState.cards = deck.cards;
    initialDeckState.dice = deck.dice;
    initialDeckState.firstFive = deck.firstFive;
    component?.setState({context: deckContextWrapper(component)});
  },
});

export const DeckContext = React.createContext(deckContextWrapper());

export class DeckContextProvider extends React.Component {
  state = {context: deckContextWrapper(this)};
  render() {
    return (
      <DeckContext.Provider value={this.state.context}>
        {this.props.children}
      </DeckContext.Provider>
    );
  }
}
