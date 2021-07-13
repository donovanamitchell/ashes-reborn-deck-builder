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
