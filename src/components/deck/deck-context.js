// https://wix.github.io/react-native-navigation/docs/third-party-react-context
import React from 'react';
import {globalState} from '../../store/global-store';
import {saveDeck} from '../../services/decks-service';

const initialDeckState = {
  cardErrors: [],
  cards: {},
  dice: {},
  filename: '',
  firstFive: [],
  firstFiveErrors: [],
  format: 'Standard',
  name: '',
  phoenixBorn: null,
  phoenixBornStub: null,
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
        phoenixborn: card.phoenixborn,
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
    saveDeck(initialDeckState);
  },
  setCardErrors: errors => {
    console.log('SET CARD ERRORS', errors);
    initialDeckState.cardErrors = errors;
    component?.setState({context: deckContextWrapper(component)});
  },
  setDeck: deck => {
    console.log('SET DECK', deck);
    initialDeckState.count = 0;
    initialDeckState.filename = deck.filename;
    initialDeckState.name = deck.name;
    initialDeckState.phoenixBorn = deck.phoenixBorn;
    initialDeckState.phoenixBornStub = deck.phoenixBornStub;
    initialDeckState.cards = deck.cards;
    initialDeckState.dice = deck.dice;
    initialDeckState.firstFive = deck.firstFive;
    initialDeckState.format = deck.format;
    component?.setState({context: deckContextWrapper(component)});
  },
  setFirstFive: (index, firstFive) => {
    console.log('SET FFIVE', index, firstFive);
    initialDeckState.firstFive[index] = firstFive;
    initialDeckState.firstFive = Object.assign([], initialDeckState.firstFive);
    component?.setState({context: deckContextWrapper(component)});
  },
  setFirstFiveErrors: errors => {
    console.log('SET FFIVE ERRORS', errors);
    initialDeckState.firstFiveErrors = errors;
    component?.setState({context: deckContextWrapper(component)});
  },
  setFormat: format => {
    initialDeckState.format = format;
    component?.setState({context: deckContextWrapper(component)});
  },
  setName: text => {
    initialDeckState.name = text;
    component?.setState({context: deckContextWrapper(component)});
  },
  setPhoenixborn: (name, stub) => {
    initialDeckState.phoenixBorn = name;
    initialDeckState.phoenixBornStub = stub;
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
