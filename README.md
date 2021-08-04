# ashes-reborn-deck-builder
This is a mobile deckbuilder for Ashes: Reborn written in React Native.

## Development

Run using `npx react-native run-android`

## TODO:
High Priority
- [ ] Release 1.0
  - [x] Fetch Card data via
    - [x] Cache invalidation by pack in settings screen
    - [ ] Error modals
  - [ ] Check different device sizes still look reasonable
  - [ ] App Icon

Medium Priority
- [ ] Card directory
- [ ] "Build" Tab? Some way of viewing the list of cards to add to the deck in grid form so that it is easier to constuct a deck (a checklist?).

Low Priority
- [ ] Squeeze pack name into card list
- [ ] Configurable text size
- [ ] Improve loading screen
- [ ] When returning to the Decks screen while loading images on the edit deck screen, react will complain when the image finshes downloading because the image component has unmounted.

Very Low Priority
- [ ] Ashes.live deck integration
- [ ] Improve ReadMe
