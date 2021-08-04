import {FileSystem} from 'react-native-unimodules';

export const RELEASES_FILE = `${FileSystem.documentDirectory}ASHES_RELEASES.json`;

export async function getReleases() {
  try {
    let releases = [];
    let fileInfo = await FileSystem.getInfoAsync(RELEASES_FILE);
    if (fileInfo.exists) {
      releases = JSON.parse(await FileSystem.readAsStringAsync(fileInfo.uri));
    } else {
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
      FileSystem.writeAsStringAsync(RELEASES_FILE, JSON.stringify(releases));
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
    await FileSystem.deleteAsync(RELEASES_FILE, {
      idempotent: true,
    });
    return getReleases();
  } catch (e) {
    // TODO: error modal
    console.log(e);
    return [];
  }
}
