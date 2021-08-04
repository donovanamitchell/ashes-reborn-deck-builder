import {FileSystem} from 'react-native-unimodules';
import {globalState} from '../store/global-store';

export const CARD_DATA_DIRECTORY = FileSystem.documentDirectory;

function directory() {
  return globalState.storeImagesInFileSystem
    ? FileSystem.documentDirectory
    : FileSystem.cacheDirectory;
}

function cardDataPath(releaseStub) {
  return `${CARD_DATA_DIRECTORY}${releaseStub}-cards.json`;
}

export async function deleteCards(releaseStubs) {
  try {
    return Promise.all([
      // I hate splats
      ...releaseStubs.map(stub =>
        FileSystem.deleteAsync(cardDataPath(stub), {idempotent: true}),
      ),
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

    let cardDataFilenames = (
      await FileSystem.readDirectoryAsync(CARD_DATA_DIRECTORY)
    ).filter(filename => filename.endsWith('-cards.json'));

    console.log(cardFilenames, cardDataFilenames);

    return Promise.all([
      // I hate splats
      ...cardFilenames.map(filename =>
        FileSystem.deleteAsync(`${directory()}${filename}`, {
          idempotent: true,
        }),
      ),
      ...cardDataFilenames.map(filename =>
        FileSystem.deleteAsync(`${CARD_DATA_DIRECTORY}${filename}`, {
          idempotent: true,
        }),
      ),
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
    let cards = [];
    let fileInfo = await FileSystem.getInfoAsync(cardDataPath(releaseStub));

    if (fileInfo.exists) {
      cards = JSON.parse(await FileSystem.readAsStringAsync(fileInfo.uri));
    } else {
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

      FileSystem.writeAsStringAsync(
        cardDataPath(releaseStub),
        JSON.stringify(cards),
      );
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
