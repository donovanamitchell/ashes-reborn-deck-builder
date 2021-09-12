import React, {useContext, useEffect, useState} from 'react';
import {Button, StyleSheet, FlatList, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

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
    setTheme,
  } = useContext(GlobalContext);
  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();

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
        setTheme(settings.theme || 'light');
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
        color={colors.primary}
        title={t('decks.settingsButton')}
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
        title={t('decks.createDeckButton')}
        color={colors.primary}
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
});

export default DecksScreen;
