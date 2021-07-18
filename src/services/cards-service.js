import AsyncStorage from '@react-native-async-storage/async-storage';

const cardData = require('../assets/cards.json');

export function getCardsFromReleases(releaseStubs) {
  return Promise.all(releaseStubs.map(stub => getCardsFromRelease(stub))).then(
    cardPacks => cardPacks.flat(),
  );
}

export async function getCardsFromRelease(releaseStub) {
  try {
    let cards = JSON.parse(await AsyncStorage.getItem(`${releaseStub}-cards`));
    if (cards === null) {
      // TODO: Fetch via API
      console.log(
        `TODO: Fetch ${releaseStub} via API, reading from local file instead`,
      );
      cards = cardData.results.filter(
        card => card.release.stub === releaseStub,
      );
      AsyncStorage.setItem(`${releaseStub}-cards`, JSON.stringify(cards));
    }

    return cards;
  } catch (e) {
    // TODO: error modal
    console.log(e);
    return [];
  }
}

export async function resetCards(releaseStub) {
  try {
    await AsyncStorage.removeItem(`${releaseStub}-cards`);
    return getCardsFromRelease(releaseStub);
  } catch (e) {
    // TODO: error modal
    console.log(e);
    return [];
  }
}
