import {FileSystem} from 'react-native-unimodules';

export const DECKS_FILE = `${FileSystem.documentDirectory}ASHES_DECKS.json`;

export function initialState(filename) {
  return {
    cardErrors: [],
    cards: {},
    description: '',
    dice: {},
    filename: filename,
    firstFive: [],
    firstFiveErrors: [],
    format: 'standard',
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

  let deck = {};
  let fileInfo = await FileSystem.getInfoAsync(deckFilePath(filename));
  if (fileInfo.exists) {
    deck = JSON.parse(await FileSystem.readAsStringAsync(fileInfo.uri));
  } else {
    deck = initialState(filename);
  }

  return deck;
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
  return FileSystem.writeAsStringAsync(
    deckFilePath(deck.filename),
    JSON.stringify(deck),
  );
}

export async function saveDecks(decks) {
  return FileSystem.writeAsStringAsync(DECKS_FILE, JSON.stringify(decks));
}
