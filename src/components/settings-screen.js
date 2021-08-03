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
    <ScrollView style={styles.container}>
      <Text>
        Please submit any bugs or feature requests to our{' '}
        <Text
          style={styles.linkText}
          onPress={() =>
            Linking.openURL(
              'https://github.com/donovanamitchell/ashes-reborn-deck-builder/issues',
            )
          }>
          Issue Tracker
        </Text>
        .
      </Text>
      <Text>
        Special thanks to the developers of{' '}
        <Text
          style={styles.linkText}
          onPress={() => Linking.openURL('https://ashes.live/')}>
          Ashes Live
        </Text>{' '}
        for graciously allowing the Ashes Reborn Deck Builder to use their API.
      </Text>
      <View style={styles.separator} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={loading}
        onRequestClose={() => {}}>
        <View style={styles.container}>
          <Loading />
        </View>
      </Modal>
      <View style={styles.button}>
        <Button
          title="Check for New Releases"
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
      <View style={styles.separator} />
      <Text style={styles.headerText}>Owned Packs</Text>
      <View style={styles.button}>
        <MultiSelectBox
          data={releaseData}
          value={ownedReleaseData}
          onChangeValue={items => changeOwnedReleases(items)}
        />
      </View>
      <View style={styles.separator} />
      <Text style={styles.headerText}>Cache</Text>
      <Text>
        The card images can either be stored in a cache or document store.
        Images stored in the cache may be deleted automatically by the system to
        save storage space. Images in the document store will not be deleted
        unless the card data is reset.
      </Text>
      <View style={styles.toggleSwitchGroup}>
        <Text>
          {storeImagesInFileSystem ? 'Document Storage' : 'Cache Storage'}
        </Text>
        <Switch
          value={storeImagesInFileSystem}
          trackColor={{false: 'lightgrey', true: 'lightgrey'}}
          thumbColor={'grey'}
          onValueChange={bool => {
            setStoreImagesInFileSystem(bool);
            saveSettings({
              ownedReleases: ownedReleases,
              storeImagesInFileSystem: bool,
            });
          }}
        />
      </View>
      <View style={styles.separator} />
      <View style={styles.button}>
        <Button
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
          title="Reset Card Data"
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        />
      </View>
      <View style={styles.separator} />
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
    backgroundColor: 'white',
  },
  headerText: {
    fontWeight: 'bold',
  },
  linkText: {
    paddingLeft: 5,
    color: 'blue',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: 'grey',
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
