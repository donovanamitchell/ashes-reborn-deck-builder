import React, {useContext, useEffect} from 'react';
import {Button, StyleSheet, FlatList, View} from 'react-native';
import {Context} from '../../store/global-store';
import DecksService from '../../services/decks-service';
import DeckListItem from './deck-list-item';

const service = new DecksService();
const cardData = require('../../assets/cards.json');

const DecksScreen = ({navigation}) => {
  const [state, dispatch] = useContext(Context);
  // const [decks, setDecks] = useState(service.decks());

  useEffect(() => {
    // dispatch({type: 'SET_CARDS', payload: cardData.results});
    dispatch({type: 'SET_DECKS', payload: service.decks()});
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
      />
      <FlatList
        data={state.decks}
        renderItem={({item}) => (
          <DeckListItem
            name={item.name}
            onPress={() => {
              navigation.navigate('Deck', {filename: item.filename});
            }}
          />
        )}
        keyExtractor={item => item.filename}
      />
      <Button title="New Deck" onPress={() => navigation.navigate('Deck')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    margin: 10,
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor: 'beige',
  },
});

export default DecksScreen;
