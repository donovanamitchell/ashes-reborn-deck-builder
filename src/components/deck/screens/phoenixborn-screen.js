import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';

import {DeckContext} from '../deck-context';
import {GlobalContext} from '../../../store/global-store';
import CardsList from './phoenixborn/cards-list';
import CardView from '../../card/card-view';
import ClearableTextInput from '../../util/clearable-text-input';
import ConjurationsList from './phoenixborn/conjuration-list';
import DiceView from '../../dice/dice-view';
import ErrorsList from './phoenixborn/errors-list';
import FirstFive from './phoenixborn/first-five';
import SelectBox from '../../util/select-box';

const PhoenixBornScreen = ({navigation, route}) => {
  const state = useContext(GlobalContext);
  const {
    cardErrors,
    cards,
    dice,
    filename,
    firstFiveErrors,
    name,
    phoenixBorn,
    phoenixBornStub,
    setName,
    setPhoenixborn,
  } = useContext(DeckContext);

  const [phoenixBornCard, setPhoenixbornCard] = useState({});
  const [phoenixBornCards, setPhoenixbornCards] = useState([]);
  const [sortedDeckCards, setSortedDeckCards] = useState([]);
  const [sortedConjurations, setSortedConjurations] = useState([]);

  useEffect(() => {
    let card = state.cards.find(({stub}) => stub === phoenixBornStub) || {};
    if (card.conjurations) {
      card.conjurations = card.conjurations.map(conjuration => {
        let conjurationCard = state.cards.find(
          ({stub}) => stub === conjuration.stub,
        );
        conjuration.count = (conjurationCard && conjurationCard.copies) || 0;
        return conjuration;
      });
    }
    setPhoenixbornCard(card);
  }, [phoenixBornStub, state.cards]);

  useEffect(() => {
    setPhoenixbornCards(
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
    setSortedConjurations(
      sortedCards
        .concat([[phoenixBornCard.stub, phoenixBornCard]])
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
  }, [cards, phoenixBornCard]);

  function shortenedDeck(overrides) {
    return Object.assign(
      {
        name: name,
        phoenixBorn: phoenixBorn,
        phoenixBornStub: phoenixBornStub,
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
        <Text style={styles.headerText}>Phoenixborn:</Text>
        <SelectBox
          value={{text: phoenixBorn, value: phoenixBornStub}}
          onChangeValue={item => {
            setPhoenixborn(item.text, item.value);
            state.updateDeck(
              shortenedDeck({
                phoenixBornStub: item.value,
                phoenixBorn: item.text,
              }),
            );
          }}
          data={phoenixBornCards}
        />
        {phoenixBornStub && phoenixBornCard && (
          <CardView style={styles.cardView} card={phoenixBornCard} />
        )}
        <Text style={styles.headerText}>Legality:</Text>
        <SelectBox
          value={{text: 'Standard', value: 'standard'}}
          onChangeValue={item => {
            console.log(item);
          }}
          data={[{text: 'Standard', value: 'standard'}]}
        />
        <ErrorsList cardErrors={cardErrors} firstFiveErrors={firstFiveErrors} />
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

export default PhoenixBornScreen;
