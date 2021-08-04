import {FileSystem} from 'react-native-unimodules';

export const DECKS_FILE = `${FileSystem.documentDirectory}ASHES_DECKS.json`;

export function initialState(filename) {
  return {
    filename: filename,
    cardErrors: [],
    cards: {},
    dice: {},
    firstFive: [],
    firstFiveErrors: [],
    format: 'Standard',
    name: '',
    phoenixBorn: null,
    phoenixBornStub: null,
  };
}

function deckFilePath(filename) {
  return `${FileSystem.documentDirectory}${filename}`;
}

export async function deleteDeck(filename) {
  return FileSystem.deleteAsync(deckFilePath(filename), {
    idempotent: true,
  });
}

export async function getDeck(filename, newDeck) {
  if (newDeck === true) {
    return initialState(filename);
  }

  try {
    let deck = {};
    let fileInfo = await FileSystem.getInfoAsync(deckFilePath(filename));
    if (fileInfo.exists) {
      deck = JSON.parse(await FileSystem.readAsStringAsync(fileInfo.uri));
    } else {
      // TODO: error modal
      console.log('Could not find deck');
      deck = initialState(filename);
    }

    console.log(deck);
    return deck;
  } catch (e) {
    // TODO: error modal
    console.log(e);
    return initialState(filename);
  }
}

export async function getDeckFilenames() {
  let decks = [];
  let fileInfo = await FileSystem.getInfoAsync(DECKS_FILE);
  if (fileInfo.exists) {
    decks = JSON.parse(await FileSystem.readAsStringAsync(fileInfo.uri));
  }

  return decks.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
}

export async function saveDeck(deck) {
  FileSystem.writeAsStringAsync(
    deckFilePath(deck.filename),
    JSON.stringify(deck),
  );
}

export async function saveDecks(decks) {
  return FileSystem.writeAsStringAsync(DECKS_FILE, JSON.stringify(decks));
}
