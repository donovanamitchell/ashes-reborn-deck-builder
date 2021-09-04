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
import {useTranslation} from 'react-i18next';

import {GlobalContext} from '../store/global-store';
import MultiSelectBox from './util/multi-select-box';
import SelectBox from './util/select-box';
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
import {THEMES} from './util/constants';

const SettingsScreen = () => {
  const {
    cards,
    ownedReleases,
    releases,
    theme,
    setCards,
    setOwnedReleases,
    setReleases,
    setStoreImagesInFileSystem,
    setTheme,
    storeImagesInFileSystem,
  } = useContext(GlobalContext);
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ownedReleaseData, setOwnedReleaseData] = useState([]);
  const [releaseData, setReleaseData] = useState([]);

  useEffect(() => {
    setReleaseData(
      [{text: t('common.all'), value: 'ALL_PACKS'}].concat(
        releases.map(release => {
          return {text: release.name, value: release.stub};
        }),
      ),
    );
  }, [releases, t]);

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
      theme: theme,
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

  let separator = (
    <View style={[styles.separator, {borderBottomColor: colors.border}]} />
  );

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}>
      {separator}
      <Text style={{color: colors.text}}>{t('settings.pleaseDoNotSue')}</Text>
      <Text style={{color: colors.text}}>
        {t('settings.issueTracker.part1')}
        <Text
          style={{color: colors.primary}}
          onPress={() =>
            Linking.openURL(
              'https://github.com/donovanamitchell/ashes-reborn-deck-builder/issues',
            )
          }>
          {t('settings.issueTracker.part2')}
        </Text>
        {t('settings.issueTracker.part3')}
      </Text>
      <Text style={{color: colors.text}}>
        {t('settings.thanksSkaak.part1')}
        <Text
          style={{color: colors.primary}}
          onPress={() => Linking.openURL('https://ashes.live/')}>
          {t('settings.thanksSkaak.part2')}
        </Text>
        {t('settings.thanksSkaak.part3')}
      </Text>
      {separator}
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
          title={t('settings.newReleasesButton')}
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
      {separator}
      <Text style={[styles.headerText, {color: colors.text}]}>
        {t('settings.ownedPacks')}
      </Text>
      <View style={styles.button}>
        <MultiSelectBox
          data={releaseData}
          value={ownedReleaseData}
          onChangeValue={items => changeOwnedReleases(items)}
        />
      </View>
      {separator}
      <Text style={[styles.headerText, {color: colors.text}]}>
        {t('settings.theme')}
      </Text>
      <View style={styles.button}>
        <SelectBox
          data={THEMES.map(value => {
            return {text: t(`settings.themes.${value}`), value: value};
          })}
          value={{text: t(`settings.themes.${theme}`)}}
          onChangeValue={item => {
            setTheme(item.value);
            saveSettings({
              ownedReleases: ownedReleases,
              storeImagesInFileSystem: storeImagesInFileSystem,
              theme: item.value,
            });
          }}
        />
      </View>
      {separator}
      <Text style={[styles.headerText, {color: colors.text}]}>
        {t('settings.cache')}
      </Text>
      <Text style={{color: colors.text}}>
        {t('settings.cacheOptionsDescription')}
      </Text>
      <View style={styles.toggleSwitchGroup}>
        <Text style={{color: colors.text}}>
          {storeImagesInFileSystem
            ? t('settings.cacheOptions.document')
            : t('settings.cacheOptions.cache')}
        </Text>
        <Switch
          value={storeImagesInFileSystem}
          trackColor={{false: colors.border, true: colors.border}}
          thumbColor={colors.primary}
          onValueChange={bool => {
            setStoreImagesInFileSystem(bool);
            saveSettings({
              ownedReleases: ownedReleases,
              storeImagesInFileSystem: bool,
              theme: theme,
            });
          }}
        />
      </View>
      {separator}
      <View style={styles.button}>
        <Button
          color={colors.primary}
          title={t('settings.downloadImagesButton')}
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
          title={t('settings.cacheClearButton')}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        />
      </View>
      {separator}
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
