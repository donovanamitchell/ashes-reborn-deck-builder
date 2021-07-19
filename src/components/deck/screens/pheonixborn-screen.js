import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import SelectBox from '../../util/select-box';
import {DeckContext} from '../deck-context';
import {GlobalContext} from '../../../store/global-store';
import CardView from '../../card/card-view';

const PheonixBornScreen = ({navigation, route}) => {
  const {cards, updateDeck} = useContext(GlobalContext);
  const [pheonixBornCards, setPheonixbornCards] = useState([]);
  const {
    name,
    pheonixBorn,
    pheonixBornStub,
    filename,
    setName,
    setPheonixborn,
  } = useContext(DeckContext);

  useEffect(() => {
    setPheonixbornCards(
      cards.flatMap(card => {
        if (card.type !== 'Phoenixborn') {
          return [];
        }

        return {text: card.name, value: card.stub};
      }),
    );
  }, [cards]);

  function shortenedDeck() {
    return {
      name: name,
      pheonixBorn: pheonixBorn,
      pheonixBornStub: pheonixBornStub,
      filename: filename,
    };
  }

  return (
    <View style={styles.container}>
      <View style={[styles.container, styles.editSection]}>
        <Text>Deck Name:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => {
            setName(text);
            updateDeck(shortenedDeck());
          }}
          placeholder="Deck Name"
          value={name}
        />
        <Text>Pheonixborn:</Text>
        <SelectBox
          value={pheonixBorn}
          onChangeValue={item => setPheonixborn(item.text, item.value)}
          data={pheonixBornCards}
        />
        {pheonixBornStub && (
          <CardView
            style={styles.cardView}
            card={cards.find(card => card.stub === pheonixBornStub)}
          />
        )}
        <Text>Dice:</Text>
        <Text>First Five:</Text>
        <Text>Cards:</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default PheonixBornScreen;
