// https://reactjs.org/docs/hooks-custom.html
// https://wix.github.io/react-native-navigation/docs/third-party-react-context
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const globalState = {
  cards: [],
  releases: [],
  decks: [],
};

const globalContextWrapper = component => ({
  ...globalState,
  addDeck: deck => {
    globalState.decks = globalState.decks.concat(deck);
    component?.setState({context: globalContextWrapper(component)});
  },
  saveDecks: () => {
    console.log('SAVING DECKS', globalState.decks);
    AsyncStorage.setItem(
      'ASHES_DECKS_MAIN_SCREEN',
      JSON.stringify(globalState.decks),
    );
  },
  setCards: cards => {
    globalState.cards = cards;
    component?.setState({context: globalContextWrapper(component)});
  },
  setDecks: decks => {
    console.log('SET DECKS', decks);
    globalState.decks = decks;
    component?.setState({context: globalContextWrapper(component)});
  },
  setReleases: releases => {
    console.log('SET RELEASES', releases);
    globalState.releases = releases;
    component?.setState({context: globalContextWrapper(component)});
  },
  updateDeck: updatedDeck => {
    globalState.decks = globalState.decks.map(deck =>
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
