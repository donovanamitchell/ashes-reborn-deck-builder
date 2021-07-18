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

class DecksService {
  decks() {
    return [
      {
        filename: 'big-long-uuid-generated-by-magic',
        name: 'Crab Season',
        pheonixBorn: 'Dondo the Mighty',
      },
      {
        filename: 'another-long-uuid',
        name: "Tim's rims",
        pheonixBorn: 'Rimmy Tim',
      },
      {
        filename: 'one-more-guid',
        name: 'Why did it have to be snakes',
        pheonixBorn: 'Indy J',
      },
    ];
  }

  deck(filename) {
    return {
      filename: filename,
      name: 'Crab Season',
      pheonixBorn: 'Dondo the Mighty',
      cards: [
        {name: 'crab', count: 3},
        {name: 'other crab', count: 3},
        {name: 'continuing to crab', count: 3},
        {name: 'summon big crab', count: 1},
        {name: 'crab season', count: 1},
        {name: 'crab seasoning', count: 3},
      ],
    };
  }
}

export default DecksService;
