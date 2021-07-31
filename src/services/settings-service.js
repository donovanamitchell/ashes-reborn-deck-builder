import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getSettings() {
  let settings = JSON.parse(await AsyncStorage.getItem('ASHES_SETTINGS'));
  if (settings === null) {
    return {ownedReleases: [], storeImagesInFileSystem: false};
  }
  return settings;
}

export async function saveSettings(settings) {
  return await AsyncStorage.setItem('ASHES_SETTINGS', JSON.stringify(settings));
}
