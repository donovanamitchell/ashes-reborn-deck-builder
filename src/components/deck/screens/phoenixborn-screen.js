import React, {useState, useEffect, useContext, useRef} from 'react';
import {StyleSheet, ScrollView, Text, TextInput, View} from 'react-native';
import {debounce, sortedIndexBy} from 'lodash';

import {DeckContext} from '../deck-context';
import {GlobalContext} from '../../../store/global-store';
import CardsList from './phoenixborn/cards-list';
import CardView from '../../card/card-view';
import ClearableTextInput from '../../util/clearable-text-input';
import DiceView from '../../dice/dice-view';
import ErrorsList from './phoenixborn/errors-list';
import FirstFive from './phoenixborn/first-five';
import SelectBox from '../../util/select-box';
import {PLAY_FORMATS} from '../../util/constants';

const playFormatSelections = PLAY_FORMATS.map(format => {
  return {text: format, value: format};
});

const PhoenixBornScreen = ({navigation, route}) => {
  const state = useContext(GlobalContext);
  const {
    cardErrors,
    cards,
    description,
    dice,
    filename,
    firstFiveErrors,
    format,
    name,
    phoenixBorn,
    phoenixBornStub,
    setDescription,
    setFormat,
    setName,
    setPhoenixborn,
  } = useContext(DeckContext);

  const [phoenixBornCard, setPhoenixbornCard] = useState({});
  const [phoenixBornCards, setPhoenixbornCards] = useState([]);
  const [sortedDeckCards, setSortedDeckCards] = useState([]);

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
    let sortedCards = {Conjuration: []};
    if (phoenixBornCard.conjurations) {
      phoenixBornCard.conjurations.forEach(card => {
        sortedCards.Conjuration.splice(
          sortedIndexBy(sortedCards.Conjuration, card, x => x.name),
          0,
          card,
        );
      });
    }
    Object.entries(cards).forEach(value => {
      let card = value[1];
      if (!sortedCards[card.type]) {
        sortedCards[card.type] = [];
      }
      if (card.conjurations) {
        card.conjurations.forEach(conjuration => {
          sortedCards.Conjuration.splice(
            sortedIndexBy(sortedCards.Conjuration, conjuration, x => x.name),
            0,
            conjuration,
          );
        });
      }
      sortedCards[card.type].splice(
        sortedIndexBy(sortedCards[card.type], card, x => x.name),
        0,
        card,
      );
    });
    if (sortedCards.Conjuration.length <= 0) {
      delete sortedCards.Conjuration;
    }
    setSortedDeckCards(sortedCards);
  }, [cards, phoenixBornCard]);

  const debouncedRef = useRef(debounce(func => func(), 1000)).current;

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
            debouncedRef(state.saveDecks);
          }}
          placeholder="Deck Name"
          placeholderTextColor="darkgrey"
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
            state.saveDecks();
          }}
          data={phoenixBornCards}
        />
        {phoenixBornStub && phoenixBornCard && (
          <CardView style={styles.cardView} card={phoenixBornCard} />
        )}
        <Text style={styles.headerText}>Description:</Text>
        <TextInput
          style={styles.multilineTextInput}
          multiline
          value={description}
          placeholder="Description"
          placeholderTextColor="darkgrey"
          onChangeText={text => setDescription(text)}
        />
        <Text style={styles.headerText}>Format:</Text>
        <SelectBox
          value={{text: format, value: format}}
          onChangeValue={item => {
            setFormat(item.value);
          }}
          data={playFormatSelections}
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
  multilineTextInput: {
    paddingVertical: 0,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderColor: 'lightgrey',
    color: 'black',
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
