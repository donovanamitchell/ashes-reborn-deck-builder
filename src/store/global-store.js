// https://reactjs.org/docs/hooks-custom.html
// https://wix.github.io/react-native-navigation/docs/third-party-react-context
import React from 'react';

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
  setCards: cards => {
    initialState.cards = cards;
    component?.setState({context: globalContextWrapper(component)});
  },
  setDecks: decks => {
    initialState.decks = decks;
    component?.setState({context: globalContextWrapper(component)});
  },
  setReleases: releases => {
    initialState.releases = releases;
    component?.setState({context: globalContextWrapper(component)});
  },
  updateDeck: newDeck => {
    initialState.decks = initialState.decks.map(deck =>
      deck.filename === newDeck.filename ? newDeck : deck,
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
