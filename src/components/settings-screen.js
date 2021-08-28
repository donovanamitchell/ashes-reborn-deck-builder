import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {GlobalContext} from '../store/global-store';
import MultiSelectBox from './util/multi-select-box';
import {resetReleases} from '../services/releases-service';
import {saveSettings} from '../services/settings-service';
import DeleteCacheModal from './settings/delete-cache-modal';
import {
  deleteAllCards,
  deleteCards,
  preloadImages,
  setCardsFromReleases,
} from '../services/cards-service';
import Loading from './util/loading';

const SettingsScreen = () => {
  const {
    cards,
    ownedReleases,
    releases,
    setCards,
    setOwnedReleases,
    setReleases,
    setStoreImagesInFileSystem,
    storeImagesInFileSystem,
  } = useContext(GlobalContext);
  const {colors} = useTheme();

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ownedReleaseData, setOwnedReleaseData] = useState([]);
  const [releaseData, setReleaseData] = useState([]);

  useEffect(() => {
    setReleaseData(
      [{text: 'All', value: 'ALL_PACKS'}].concat(
        releases.map(release => {
          return {text: release.name, value: release.stub};
        }),
      ),
    );
  }, [releases]);

  useEffect(() => {
    setOwnedReleaseData(
      ownedReleases.map(release => {
        return {text: release.name, value: release.stub};
      }),
    );
  }, [ownedReleases]);

  function changeOwnedReleases(newOwnedReleases) {
    let packs = newOwnedReleases.map(release => {
      return {name: release.text, stub: release.value};
    });
    saveSettings({
      ownedReleases: packs,
      storeImagesInFileSystem: storeImagesInFileSystem,
    });
    setOwnedReleases(packs);
  }

  function deleteReleases(releasesToDelete) {
    setLoading(true);
    let promise;
    if (releasesToDelete.find(({value}) => value === 'ALL_PACKS')) {
      promise = deleteAllCards();
    } else {
      promise = deleteCards(releasesToDelete.map(({value}) => value));
    }
    promise
      .then(() => setCardsFromReleases(releases, setCards))
      .finally(() => setLoading(false));
  }

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={[styles.separator, {borderBottomColor: colors.border}]} />
      <Text style={{color: colors.text}}>
        All images, graphics, textual and game contents © 2015-2021 Plaid Hat
        Games. All rights reserved.
      </Text>
      <Text style={{color: colors.text}}>
        Please submit any bugs or feature requests to our{' '}
        <Text
          style={{color: colors.primary}}
          onPress={() =>
            Linking.openURL(
              'https://github.com/donovanamitchell/ashes-reborn-deck-builder/issues',
            )
          }>
          Issue Tracker
        </Text>
        .
      </Text>
      <Text style={{color: colors.text}}>
        Special thanks to the developers of{' '}
        <Text
          style={{color: colors.primary}}
          onPress={() => Linking.openURL('https://ashes.live/')}>
          Ashes Live
        </Text>{' '}
        for graciously allowing the Ashes Reborn Deck Builder to use their API
        and the Ashes Font.
      </Text>
      <View style={[styles.separator, {borderBottomColor: colors.border}]} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={loading}
        onRequestClose={() => {}}>
        <View style={[styles.container, {backgroundColor: colors.background}]}>
          <Loading />
        </View>
      </Modal>
      <View style={styles.button}>
        <Button
          title="Check for New Releases"
          color={colors.primary}
          onPress={() => {
            setLoading(true);
            resetReleases().then(newReleases => {
              setReleases(newReleases);
              setCardsFromReleases(newReleases, setCards);
              setLoading(false);
            });
          }}
        />
      </View>
      <View style={[styles.separator, {borderBottomColor: colors.border}]} />
      <Text style={[styles.headerText, {color: colors.text}]}>Owned Packs</Text>
      <View style={styles.button}>
        <MultiSelectBox
          data={releaseData}
          value={ownedReleaseData}
          onChangeValue={items => changeOwnedReleases(items)}
        />
      </View>
      <View style={[styles.separator, {borderBottomColor: colors.border}]} />
      <Text style={[styles.headerText, {color: colors.text}]}>Cache</Text>
      <Text style={{color: colors.primary}}>
        The card images can either be stored in a cache or document store.
        Images stored in the cache may be deleted automatically by the system to
        save storage space. Images in the document store will not be deleted
        unless the card data is reset.
      </Text>
      <View style={styles.toggleSwitchGroup}>
        <Text style={{color: colors.primary}}>
          {storeImagesInFileSystem ? 'Document Storage' : 'Cache Storage'}
        </Text>
        <Switch
          value={storeImagesInFileSystem}
          // TODO: make sure this isn't wrong and dumb
          trackColor={{false: colors.border, true: colors.border}}
          thumbColor={colors.primary}
          onValueChange={bool => {
            setStoreImagesInFileSystem(bool);
            saveSettings({
              ownedReleases: ownedReleases,
              storeImagesInFileSystem: bool,
            });
          }}
        />
      </View>
      <View style={[styles.separator, {borderBottomColor: colors.border}]} />
      <View style={styles.button}>
        <Button
          color={colors.primary}
          title="Download All Card Images"
          onPress={() => {
            setLoading(true);
            preloadImages(cards.map(({stub}) => stub)).finally(() =>
              setLoading(false),
            );
          }}
        />
      </View>
      <DeleteCacheModal
        releaseData={releaseData}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        deleteReleases={deleteReleases}
      />
      <View style={styles.button}>
        <Button
          color={colors.primary}
          title="Reset Card Data"
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        />
      </View>
      <View style={[styles.separator, {borderBottomColor: colors.border}]} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    marginBottom: 15,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  buttonView: {
    width: '50%',
    padding: 5,
  },
  container: {
    flex: 1,
    padding: 15,
  },
  headerText: {
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  toggleSwitchGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
});

export default SettingsScreen;
