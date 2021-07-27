import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getReleases() {
  try {
    let releases = JSON.parse(await AsyncStorage.getItem('ASHES_RELEASES'));
    if (releases === null) {
      // TODO: Fetch via API
      releases = require('../assets/releases.json');
      console.log('TODO: Fetching via API, reading from file instead');
      AsyncStorage.setItem('ASHES_RELEASES', JSON.stringify(releases));
    }
    return releases;
  } catch (e) {
    // TODO: error modal
    console.log(e);
    return [];
  }
}

export async function getOwnedReleases() {
  let releases = JSON.parse(await AsyncStorage.getItem('ASHES_OWNED_RELEASES'));
  if (releases === null) {
    return [];
  }
  return releases;
}

export async function resetReleases() {
  try {
    await AsyncStorage.removeItem('ASHES_RELEASES');
    return getReleases();
  } catch (e) {
    // TODO: error modal
    console.log(e);
    return [];
  }
}

export async function saveOwnedReleases(ownedReleases) {
  return await AsyncStorage.setItem(
    'ASHES_OWNED_RELEASES',
    JSON.stringify(ownedReleases),
  );
}
