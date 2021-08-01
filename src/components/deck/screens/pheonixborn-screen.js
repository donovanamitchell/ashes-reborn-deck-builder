import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import SelectBox from '../../util/select-box';
import {DeckContext} from '../deck-context';
import {GlobalContext} from '../../../store/global-store';
import CardView from '../../card/card-view';
import FirstFive from './pheonixborn/first-five';
import DiceView from '../../dice/dice-view';
import ConjurationsList from './pheonixborn/conjuration-list';
import CardsList from './pheonixborn/cards-list';
import ClearableTextInput from '../../util/clearable-text-input';

const PheonixBornScreen = ({navigation, route}) => {
  const state = useContext(GlobalContext);
  const {
    cards,
    dice,
    filename,
    name,
    pheonixBorn,
    pheonixBornStub,
    setName,
    setPheonixborn,
  } = useContext(DeckContext);

  const [pheonixBornCard, setPheonixbornCard] = useState({});
  const [pheonixBornCards, setPheonixbornCards] = useState([]);
  const [sortedDeckCards, setSortedDeckCards] = useState([]);
  const [sortedConjurations, setSortedConjurations] = useState([]);

  useEffect(() => {
    let card = state.cards.find(({stub}) => stub === pheonixBornStub) || {};
    if (card.conjurations) {
      card.conjurations = card.conjurations.map(conjuration => {
        let conjurationCard = state.cards.find(
          ({stub}) => stub === conjuration.stub,
        );
        conjuration.count = (conjurationCard && conjurationCard.copies) || 0;
        return conjuration;
      });
    }
    setPheonixbornCard(card);
  }, [pheonixBornStub, state.cards]);

  useEffect(() => {
    setPheonixbornCards(
      state.cards.flatMap(card => {
        if (card.type !== 'Phoenixborn') {
          return [];
        }

        return {text: card.name, value: card.stub};
      }),
    );
  }, [state.cards]);

  useEffect(() => {
    let sortedCards = Object.entries(cards).sort((first, second) => {
      if (first[1].name < second[1].name) {
        return -1;
      }
      if (first[1].name > second[1].name) {
        return 1;
      }
      return 0;
    });
    setSortedDeckCards(sortedCards);
    console.log([pheonixBornCard.stub, pheonixBornCard]);
    setSortedConjurations(
      sortedCards
        .concat([[pheonixBornCard.stub, pheonixBornCard]])
        .flatMap(item => {
          if (item[1].conjurations) {
            return item[1].conjurations;
          } else {
            return [];
          }
        })
        .sort((first, second) => {
          if (first.name < second.name) {
            return -1;
          }
          if (first.name > second.name) {
            return 1;
          }
          return 0;
        }),
    );
  }, [cards, pheonixBornCard]);

  function shortenedDeck(overrides) {
    return Object.assign(
      {
        name: name,
        pheonixBorn: pheonixBorn,
        pheonixBornStub: pheonixBornStub,
        filename: filename,
      },
      overrides,
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View key="main" style={[styles.container, styles.editSection]}>
        <Text style={styles.headerText}>Deck Name:</Text>
        <ClearableTextInput
          onChangeText={text => {
            setName(text);
            state.updateDeck(shortenedDeck({name: text}));
          }}
          placeholder="Deck Name"
          value={name}
        />
        <Text style={styles.headerText}>Pheonixborn:</Text>
        <SelectBox
          value={{text: pheonixBorn, stub: pheonixBornStub}}
          onChangeValue={item => {
            setPheonixborn(item.text, item.value);
            state.updateDeck(
              shortenedDeck({
                pheonixBornStub: item.value,
                pheonixBorn: item.text,
              }),
            );
          }}
          data={pheonixBornCards}
        />
        {pheonixBornStub && pheonixBornCard && (
          <CardView style={styles.cardView} card={pheonixBornCard} />
        )}
        <Text style={styles.headerText}>Dice:</Text>
        <DiceView dice={dice} />
        <Text style={styles.headerText}>First Five:</Text>
        <FirstFive />
        <Text style={styles.headerText}>Cards:</Text>
        <View style={styles.cardsListContainer}>
          <CardsList
            navigation={navigation}
            sortedDeckCards={sortedDeckCards}
          />
        </View>
        <Text style={styles.headerText}>Conjurations:</Text>
        <View style={styles.cardsListContainer}>
          <ConjurationsList
            navigation={navigation}
            sortedConjurations={sortedConjurations}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardsList: {
    flexDirection: 'row',
    padding: 5,
  },
  cardsListContainer: {
    paddingBottom: 5,
  },
  container: {
    flex: 1,
  },
  editSection: {
    backgroundColor: 'white',
    padding: 15,
  },
  textInput: {
    borderRadius: 6,
    borderColor: 'lightgrey',
    borderWidth: 2,
  },
  cardView: {
    paddingTop: 10,
  },
  linkText: {
    paddingLeft: 5,
    color: 'blue',
  },
  headerText: {
    fontWeight: 'bold',
  },
});

export default PheonixBornScreen;
