import React, {useContext, useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View, Modal} from 'react-native';
import {Constants} from 'react-native-unimodules';
import {GlobalContext} from '../store/global-store';
import MultiSelectBox from './util/multi-select-box';
import {resetReleases, saveOwnedReleases} from '../services/releases-service';
import DeleteCacheModal from './settings/delete-cache-modal';
import {
  deleteAllCards,
  deleteCards,
  setCardsFromReleases,
} from '../services/cards-service';
import Loading from './util/loading';

const SettingsScreen = () => {
  const {
    cards,
    releases,
    ownedReleases,
    setOwnedReleases,
    setCards,
    setReleases,
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
    saveOwnedReleases(packs);
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
    <View style={styles.container}>
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
          title="Check for Updates"
          onPress={() => {
            resetReleases().then(newReleases => {
              setReleases(newReleases);
              setCardsFromReleases(newReleases, setCards);
            });
          }}
        />
      </View>
      <Text>Owned Packs</Text>
      <View style={styles.button}>
        <MultiSelectBox
          data={releaseData}
          value={ownedReleaseData}
          onChangeValue={items => changeOwnedReleases(items)}
        />
      </View>
      <Text>Cache</Text>
      <View style={styles.button}>
        <Button
          title="Download All Card Images"
          onPress={() => {
            // TODO: FastImage cannot mark expired items in the cache. Replace
            // Library
            // FastImage.preload(
            //   cards.map(({stub}) => {
            //     return {
            //       uri: `https://cdn.ashes.live/images/cards/${stub}.jpg`,
            //     };
            //   }),
            // );
            // Test unimodules intallation
            console.log(Constants.systemFonts);
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
    </View>
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
});

export default SettingsScreen;
