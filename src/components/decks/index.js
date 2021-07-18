import React, {useContext, useEffect} from 'react';
import {Button, StyleSheet, FlatList, View} from 'react-native';
import {Context} from '../../store/global-store';
import DeckListItem from './deck-list-item';
import {getReleases} from '../../services/releases-service';
import {getCardsFromReleases} from '../../services/cards-service';
import {getDeckFilenames} from '../../services/decks-service';

const DecksScreen = ({navigation}) => {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    getReleases().then(releases => {
      dispatch({type: 'SET_RELEASES', payload: releases});
      getCardsFromReleases(releases.flatMap(release => release.stub)).then(
        cards => dispatch({type: 'SET_CARDS', payload: cards}),
      );
    });
    getDeckFilenames().then(decks =>
      dispatch({type: 'SET_DECKS', payload: decks}),
    );
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
      <Button
        title="New Deck"
        onPress={() => {
          let newDeck = {
            filename: `${Date.now().toString(16)}_ASHES_DECK`,
            name: '',
            pheonixBorn: null,
            cards: {},
          };
          dispatch({type: 'ADD_DECK', payload: newDeck});
          navigation.navigate('Deck', {
            filename: newDeck.filename,
            newDeck: true,
          });
        }}
      />
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
