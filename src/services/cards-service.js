// TODO: replace AsyncStorage with FileSystem? It feels redundant to have both
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FileSystem} from 'react-native-unimodules';
import {globalState} from '../store/global-store';

function directory() {
  return globalState.storeImagesInFileSystem
    ? FileSystem.documentDirectory
    : FileSystem.cacheDirectory;
}

export async function deleteCards(releaseStubs) {
  try {
    return Promise.all([
      // I hate splats
      ...releaseStubs.map(stub => AsyncStorage.removeItem(`${stub}-cards`)),
      // I don't think this is how contexts are supposed to be used
      uncacheImages(
        globalState.cards.filter(
          ({release}) => release && releaseStubs.includes(release.stub),
        ),
      ),
    ]);
  } catch (error) {
    // TODO: error modal
    console.log(error);
    return [];
  }
}

export async function deleteAllCards() {
  try {
    let cardFilenames = (
      await FileSystem.readDirectoryAsync(directory())
    ).filter(filename => filename.endsWith('-card.jpg'));
    let keys = await AsyncStorage.getAllKeys();

    return Promise.all([
      // I hate splats
      ...cardFilenames.map(filename =>
        FileSystem.deleteAsync(`${directory()}${filename}`, {
          idempotent: true,
        }),
      ),
      AsyncStorage.multiRemove(keys.filter(key => key.endsWith('-cards'))),
    ]);
  } catch (error) {
    // TODO: error modal
    console.log(error);
    return Promise.new;
  }
}

export async function getCardUri(stub) {
  const cacheUri = `${directory()}${stub}-card.jpg`;
  try {
    let existingImage = await FileSystem.getInfoAsync(cacheUri);
    if (existingImage.exists) {
      return cacheUri;
    }

    let image = await FileSystem.createDownloadResumable(
      `https://cdn.ashes.live/images/cards/${stub}.jpg`,
      cacheUri,
      {},
    ).downloadAsync();

    if (image.uri) {
      return image.uri;
    }
    // TODO: error? what do?
    return '';
  } catch (error) {
    // TODO: error modal
    console.log(error);
    return '';
  }
}

export function getCardsFromReleases(releaseStubs) {
  return Promise.all(releaseStubs.map(stub => getCardsFromRelease(stub))).then(
    cardPacks => cardPacks.flat(),
  );
}

export async function getCardsFromRelease(releaseStub) {
  try {
    let cards = JSON.parse(await AsyncStorage.getItem(`${releaseStub}-cards`));
    if (cards === null) {
      let pageSize = 30;
      let response = await fetch(
        `https://api.ashes.live/v2/cards?mode=listing&releases=all&r=${releaseStub}&limit=${pageSize}&offset=0`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      let release = await response.json();
      let totalCount = release.count;
      cards = release.results;

      if (totalCount > pageSize) {
        let fetchedReleases = await Promise.all(
          Array.from(
            {length: Math.ceil(totalCount / pageSize) - 1},
            (_value, index) =>
              fetch(
                `https://api.ashes.live/v2/cards?mode=listing&releases=all&r=${releaseStub}&limit=${pageSize}&offset=${
                  (index + 1) * pageSize
                }`,
                {
                  method: 'GET',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                },
              ).then(response => response.json()),
          ),
        );
        fetchedReleases.forEach(
          fetchedRelease => (cards = cards.concat(fetchedRelease.results)),
        );
      }

      AsyncStorage.setItem(`${releaseStub}-cards`, JSON.stringify(cards));
    }

    return cards;
  } catch (e) {
    // TODO: error modal
    console.log(e);
    return [];
  }
}

export function preloadImages(stubs) {
  return Promise.all(stubs.map(stub => getCardUri(stub)));
}

export async function setCardsFromReleases(releases, setCards) {
  const cards = await getCardsFromReleases(
    releases.map(release => release.stub),
  );
  return setCards(
    cards.sort((first, second) => {
      if (first.name < second.name) {
        return -1;
      }
      if (first.name > second.name) {
        return 1;
      }
      return 0;
    }),
  );
}

export function uncacheImages(stubs) {
  return Promise.all(
    stubs.map(stub =>
      FileSystem.deleteAsync(`${directory()}${stub}-card.jpg`, {
        idempotent: true,
      }),
    ),
  );
}
