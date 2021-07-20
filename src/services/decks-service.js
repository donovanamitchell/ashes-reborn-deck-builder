import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getDeck(filename) {
  try {
    return JSON.parse(await AsyncStorage.getItem(filename));
  } catch (e) {
    // TODO: error modal
    console.log(e);
    return null;
  }
}

export async function getDeckFilenames() {
  let decks = JSON.parse(await AsyncStorage.getItem('ASHES_DECKS_MAIN_SCREEN'));

  if (decks == null) {
    return [];
  }

  return decks;
}
