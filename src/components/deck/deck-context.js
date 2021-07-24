// https://wix.github.io/react-native-navigation/docs/third-party-react-context
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {globalState} from '../../store/global-store';

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

// Object.assign is sprinkled throughout this somewhat horrible hack in itself
// in order to ensure cards/dice/firstFive trigger effects correctly, because if
// they are not NEW objects the effect will assume it has not changed.
const deckContextWrapper = component => ({
  ...initialDeckState,
  decrementCard: card => {
    if (
      initialDeckState.cards[card.stub] &&
      initialDeckState.cards[card.stub].count > 1
    ) {
      initialDeckState.cards[card.stub].count -= 1;
    } else {
      delete initialDeckState.cards[card.stub];
    }
    initialDeckState.cards = Object.assign({}, initialDeckState.cards);
    component?.setState({context: deckContextWrapper(component)});
  },
  decrementDice: diceType => {
    if (initialDeckState.dice[diceType]) {
      initialDeckState.dice[diceType]--;
    }
    initialDeckState.dice = Object.assign({}, initialDeckState.dice);
    component?.setState({context: deckContextWrapper(component)});
  },
  incrementCard: card => {
    if (initialDeckState.cards[card.stub]) {
      initialDeckState.cards[card.stub].count += 1;
    } else {
      let cardContent = {
        count: 1,
        name: card.name,
        stub: card.stub,
      };
      if (card.conjurations) {
        cardContent.conjurations = card.conjurations.map(conjuration => {
          // This feels stupidly hacky.
          let conjurationCard = globalState.cards.find(
            c => c.stub === conjuration.stub,
          );
          return {
            stub: conjuration.stub,
            name: conjuration.name,
            count: (conjurationCard && conjurationCard.copies) || 0,
          };
        });
      }
      initialDeckState.cards[card.stub] = cardContent;
    }
    initialDeckState.cards = Object.assign({}, initialDeckState.cards);
    component?.setState({context: deckContextWrapper(component)});
  },
  incrementDice: diceType => {
    if (initialDeckState.dice[diceType]) {
      initialDeckState.dice[diceType]++;
    } else {
      initialDeckState.dice[diceType] = 1;
    }
    initialDeckState.dice = Object.assign({}, initialDeckState.dice);
    component?.setState({context: deckContextWrapper(component)});
  },
  save: () => {
    console.log('SAVING DECK', initialDeckState);
    AsyncStorage.setItem(
      initialDeckState.filename,
      JSON.stringify(initialDeckState),
    );
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
  setFirstFive: (index, firstFive) => {
    console.log('SET FFIVE', index, firstFive);
    initialDeckState.firstFive[index] = firstFive;
    initialDeckState.firstFive = Object.assign([], initialDeckState.firstFive);
    component?.setState({context: deckContextWrapper(component)});
  },
  setName: text => {
    initialDeckState.name = text;
    component?.setState({context: deckContextWrapper(component)});
  },
  setPheonixborn: (name, stub) => {
    initialDeckState.pheonixBorn = name;
    initialDeckState.pheonixBornStub = stub;
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
