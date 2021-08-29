// https://reactjs.org/docs/hooks-custom.html
// https://wix.github.io/react-native-navigation/docs/third-party-react-context
import React from 'react';
import {deleteDeck, saveDecks} from '../services/decks-service';

export const globalState = {
  cards: [],
  decks: [],
  ownedReleases: [],
  releases: [],
  storeImagesInFileSystem: false,
  theme: 'dark',
};

const globalContextWrapper = component => ({
  ...globalState,
  addDeck: deck => {
    globalState.decks = globalState.decks.concat(deck);
    component?.setState({context: globalContextWrapper(component)});
  },
  removeDeck: filename => {
    // we flatmap here in order to ensure effects are properly triggered with a
    // new array
    globalState.decks = globalState.decks.flatMap(deck =>
      filename === deck.filename ? [] : deck,
    );
    component?.setState({context: globalContextWrapper(component)});
    deleteDeck(filename);
  },
  saveDecks: () => {
    saveDecks(globalState.decks);
  },
  setCards: cards => {
    globalState.cards = cards;
    component?.setState({context: globalContextWrapper(component)});
  },
  setDecks: decks => {
    globalState.decks = decks;
    component?.setState({context: globalContextWrapper(component)});
  },
  setOwnedReleases: releases => {
    globalState.ownedReleases = releases;
    component?.setState({context: globalContextWrapper(component)});
  },
  setReleases: releases => {
    globalState.releases = releases;
    component?.setState({context: globalContextWrapper(component)});
  },
  setStoreImagesInFileSystem: storeImagesInFileSystem => {
    globalState.storeImagesInFileSystem = storeImagesInFileSystem;
    component?.setState({context: globalContextWrapper(component)});
  },
  updateDeck: updatedDeck => {
    globalState.decks = globalState.decks
      .map(deck =>
        deck.filename === updatedDeck.filename ? updatedDeck : deck,
      )
      .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

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
