import React, {useContext, useEffect, useState} from 'react';
import {Button, StyleSheet, FlatList, View} from 'react-native';

import {GlobalContext} from '../../store/global-store';
import DeckListItem from './deck-list-item';
import {getReleases} from '../../services/releases-service';
import {getSettings} from '../../services/settings-service';
import {setCardsFromReleases} from '../../services/cards-service';
import {getDeckFilenames} from '../../services/decks-service';
import Loading from '../util/loading';

const DecksScreen = ({navigation}) => {
  const {
    addDeck,
    decks,
    removeDeck,
    saveDecks,
    setCards,
    setDecks,
    setOwnedReleases,
    setReleases,
    setStoreImagesInFileSystem,
  } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Promise.all([
      getReleases().then(releases => {
        setReleases(releases);
        setCardsFromReleases(releases, setCards);
      }),
      getDeckFilenames().then(loadedDecks => setDecks(loadedDecks)),
      getSettings().then(settings => {
        setOwnedReleases(settings.ownedReleases);
        setStoreImagesInFileSystem(settings.storeImagesInFileSystem);
      }),
    ]).finally(() => setLoading(false));

    return () => {
      saveDecks();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            phoenixBorn={item.phoenixBorn}
            phoenixBornStub={item.phoenixBornStub}
            onPress={() => {
              navigation.navigate('Deck', {
                filename: item.filename,
                name: item.name,
              });
            }}
            onDelete={() => {
              removeDeck(item.filename);
              saveDecks();
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
            phoenixBorn: null,
            cards: {},
          };
          addDeck(newDeck);
          saveDecks();
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
