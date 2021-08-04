import {FileSystem} from 'react-native-unimodules';

export const SETTINGS_FILE = `${FileSystem.documentDirectory}ASHES_SETTINGS.json`;

export async function getSettings() {
  let fileInfo = await FileSystem.getInfoAsync(SETTINGS_FILE);
  if (fileInfo.exists) {
    return JSON.parse(await FileSystem.readAsStringAsync(fileInfo.uri));
  } else {
    return {
      ownedReleases: [{name: 'All', stub: 'ALL_PACKS'}],
      storeImagesInFileSystem: false,
    };
  }
}

export async function saveSettings(settings) {
  return FileSystem.writeAsStringAsync(SETTINGS_FILE, JSON.stringify(settings));
}
