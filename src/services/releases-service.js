import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getReleases() {
  try {
    let releases = JSON.parse(await AsyncStorage.getItem('ASHES_RELEASES'));
    if (releases === null) {
      let response = await fetch(
        'https://api.ashes.live/v2/releases?show_legacy=false',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      releases = await response.json();

      AsyncStorage.setItem('ASHES_RELEASES', JSON.stringify(releases));
    }
    return releases;
  } catch (e) {
    // TODO: error modal
    console.log(e);
    return [];
  }
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
