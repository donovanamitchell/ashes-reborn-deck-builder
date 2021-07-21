import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, ScrollView, Text, TextInput, View} from 'react-native';
import SelectBox from '../../util/select-box';
import {DeckContext} from '../deck-context';
import {GlobalContext} from '../../../store/global-store';
import CardView from '../../card/card-view';

const PheonixBornScreen = ({navigation, route}) => {
  const state = useContext(GlobalContext);
  const {
    cards,
    filename,
    name,
    pheonixBorn,
    pheonixBornStub,
    setName,
    setPheonixborn,
  } = useContext(DeckContext);

  const [pheonixBornCards, setPheonixbornCards] = useState([]);
  const [sortedDeckCards, setSortedDeckCards] = useState([]);

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
    setSortedDeckCards(
      Object.entries(cards).sort((first, second) => {
        if (first[1].name < second[1].name) {
          return -1;
        }
        if (first[1].name > second[1].name) {
          return 1;
        }
        return 0;
      }),
    );
  }, [cards]);

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

  function cardsList() {
    return sortedDeckCards.map(item => (
      <View key={item.stub} style={styles.cardsList}>
        <Text>{item[1].count}</Text>
        <Text
          style={styles.linkText}
          onPress={() =>
            navigation.navigate('CardModal', {
              name: item[1].name,
              stub: item[1].stub,
            })
          }>
          {item[1].name}
        </Text>
      </View>
    ));
  }

  return (
    <View style={styles.container}>
      <ScrollView style={[styles.container, styles.editSection]}>
        <Text style={styles.headerText} key="deckName">
          Deck Name:
        </Text>
        <TextInput
          key="deckNameInput"
          style={styles.textInput}
          onChangeText={text => {
            setName(text);
            state.updateDeck(shortenedDeck({name: text}));
          }}
          placeholder="Deck Name"
          value={name}
        />
        <Text style={styles.headerText} key="pheonix">
          Pheonixborn:
        </Text>
        <SelectBox
          key="pheonixSelect"
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
        {pheonixBornStub && (
          <CardView
            key="cardView"
            style={styles.cardView}
            card={state.cards.find(card => card.stub === pheonixBornStub)}
          />
        )}
        <Text style={styles.headerText} key="dice">
          Dice:
        </Text>
        <Text style={styles.headerText} key="firstFive">
          First Five:
        </Text>
        <Text style={styles.headerText} key="cards">
          Cards:
        </Text>
        <View style={styles.cardsListContainer}>{cardsList()}</View>
        <Text style={styles.headerText} key="conjurations">
          Conjurations:
        </Text>
      </ScrollView>
    </View>
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
    textDecorationLine: 'underline',
  },
  headerText: {
    fontWeight: 'bold',
  },
});

export default PheonixBornScreen;
