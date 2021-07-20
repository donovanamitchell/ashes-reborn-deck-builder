// https://reactjs.org/docs/hooks-custom.html
// https://wix.github.io/react-native-navigation/docs/third-party-react-context
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  filename: '',
  name: '',
  pheonixBorn: null,
  pheonixBornStub: null,
  cards: {},
  dice: {},
  firstFive: [],
};

const globalContextWrapper = component => ({
  ...initialState,
  addDeck: deck => {
    initialState.decks = initialState.decks.concat(deck);
    component?.setState({context: globalContextWrapper(component)});
  },
  saveDecks: () => {
    console.log('SAVING DECKS', initialState.decks);
    AsyncStorage.setItem(
      'ASHES_DECKS_MAIN_SCREEN',
      JSON.stringify(initialState.decks),
    );
  },
  setCards: cards => {
    initialState.cards = cards;
    component?.setState({context: globalContextWrapper(component)});
  },
  setDecks: decks => {
    console.log('SET DECKS', decks);
    initialState.decks = decks;
    component?.setState({context: globalContextWrapper(component)});
  },
  setReleases: releases => {
    initialState.releases = releases;
    component?.setState({context: globalContextWrapper(component)});
  },
  updateDeck: updatedDeck => {
    initialState.decks = initialState.decks.map(deck =>
      deck.filename === updatedDeck.filename ? updatedDeck : deck,
    );
    component?.setState({context: globalContextWrapper(component)});
  },
});

export const GlobalContext = React.createContext(globalContextWrapper());

export class GlobalContextProvider extends React.Component {
  state = {context: globalContextWrapper(this)};
  render() {
    return (
      <GlobalContext.Provider value={this.state.context}>
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}
