import React, {useContext, useEffect, useState} from 'react';
import {Button, StyleSheet, FlatList, View} from 'react-native';
import {GlobalContext} from '../../store/global-store';
import DeckListItem from './deck-list-item';
import {getReleases} from '../../services/releases-service';
import {getCardsFromReleases} from '../../services/cards-service';
import {getDeckFilenames} from '../../services/decks-service';
import Loading from '../util/loading';

const DecksScreen = ({navigation}) => {
  const {decks, setCards, setDecks, setReleases, addDeck} =
    useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Promise.all([
      getReleases().then(releases => {
        setReleases(releases);
        getCardsFromReleases(releases.flatMap(release => release.stub)).then(
          cards => setCards(cards),
        );
      }),
      getDeckFilenames().then(loadedDecks => setDecks(loadedDecks)),
    ]).finally(() => setLoading(false));
  }, []);

  if (loading === true) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Button
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
      />
      <FlatList
        data={decks}
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
          addDeck(newDeck);
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
