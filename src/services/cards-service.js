import AsyncStorage from '@react-native-async-storage/async-storage';

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

export async function deleteCards(releaseStubs) {
  try {
    // TODO: delete card images
    return Promise.all(
      releaseStubs.map(stub => AsyncStorage.removeItem(`${stub}-cards`)),
    );
  } catch (e) {
    // TODO: error modal
    console.log(e);
    return [];
  }
}

export async function deleteAllCards() {
  try {
    // TODO: delete card images
    let keys = await AsyncStorage.getAllKeys();
    return AsyncStorage.multiRemove(keys.filter(key => key.endsWith('-cards')));
  } catch (e) {
    // TODO: error modal
    console.log(e);
    return [];
  }
}
