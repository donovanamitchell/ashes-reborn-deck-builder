import React, {useContext, useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {GlobalContext} from '../store/global-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MultiSelectBox from './util/multi-select-box';
import {saveOwnedReleases} from '../services/releases-service';

const SettingsScreen = () => {
  const {releases, ownedReleases, setOwnedReleases} = useContext(GlobalContext);
  const [releaseData, setReleaseData] = useState([]);
  const [ownedReleaseData, setOwnedReleaseData] = useState([]);

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
            AsyncStorage.clear();
          }}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Reset Card Data"
          onPress={() => {
            AsyncStorage.clear();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 15,
    marginBottom: 15,
  },
});

export default SettingsScreen;
