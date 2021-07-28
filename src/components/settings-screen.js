import React, {useContext, useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View, Modal, Pressable} from 'react-native';
import {GlobalContext} from '../store/global-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MultiSelectBox from './util/multi-select-box';
import {saveOwnedReleases} from '../services/releases-service';
import DeleteCacheModal from './settings/delete-cache-modal';
import {
  deleteAllCards,
  deleteCards,
  getCardsFromReleases,
} from '../services/cards-service';

const SettingsScreen = () => {
  const {releases, ownedReleases, setOwnedReleases, setCards} =
    useContext(GlobalContext);

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
      .then(() =>
        getCardsFromReleases(releases.flatMap(release => release.stub)).then(
          cards =>
            setCards(
              cards.sort((first, second) => {
                if (first.name < second.name) {
                  return -1;
                }
                if (first.name > second.name) {
                  return 1;
                }
                return 0;
              }),
            ),
        ),
      )
      .finally(() => setLoading(false));
  }

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button
          title="Check for Updates"
          onPress={() => {
            // AsyncStorage.clear();
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
            // AsyncStorage.clear();
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
  centeredView: {
    flex: 1,
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default SettingsScreen;
