# ashes-reborn-deck-builder
This is a mobile deckbuilder for Ashes: Reborn written in React Native.

## Development
Add a `src/assets/cards.json` with test card data. Format shown below. This is the same format as the response from [Ashes Live](https://api.ashes.live/v2/cards).
```json
{
  "results": [
    {
      "name": "A really neat card",
      "stub": "neat-card-stub",
      "type": "Alteration Spell",
      "release": {
        "name": "The release name here",
        "stub": "the-release-stub"
      },
      "cost": [
        "[[main]]",
        "1 [[natural:class]]",
        "1 [[basic]]"
      ],
      "text": "This is a bunch of text to test card text",
    }
  ]
}
```

Run using `npx react-native run-android`

## TODO:
High Priority
- [ ] Fetch Card data via
  - [ ] Cache invalidation by pack in settings screen
  - [ ] Error modal
- [ ] Card image preload button in settings screen
  - [ ] Card Loading image
- [ ] Release 1.0

Medium Priority
- [ ] Card directory
- [ ] Pheonixborn unique card validation

Low Priority
- [ ] Credits page
- [ ] Squeeze pack name into card list
- [ ] Configurable text size
- [ ] Check different device sizes
- [ ] Improve loading screen
- [ ] Carriage return purge?
- [ ] Improve ReadMe
