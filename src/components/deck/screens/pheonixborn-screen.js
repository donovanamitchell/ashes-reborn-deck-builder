import React, {useState, useEffect, useContext} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  FlatList,
  View,
} from 'react-native';
import SelectBox from '../../util/select-box';
import {DeckContext} from '../deck-context';
import {Context} from '../../../store/global-store';

const PheonixBornScreen = ({navigation, route}) => {
  const [state, dispatch] = useContext(Context);
  const [pheonixBornCards, setPheonixbornCards] = useState([]);
  const {setPheonixborn, name, pheonixBorn, setName} = useContext(DeckContext);
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

  return (
    <View style={styles.container}>
      <View style={[styles.container, styles.editSection]}>
        <Text>Deck Name:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setName(text)}
          placeholder="Deck Name"
          value={name}
        />
        <Text>Pheonixborn:</Text>
        <SelectBox
          value={pheonixBorn}
          onChangeValue={item => setPheonixborn(item.text, item.value)}
          data={pheonixBornCards}
        />
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
});

export default PheonixBornScreen;
