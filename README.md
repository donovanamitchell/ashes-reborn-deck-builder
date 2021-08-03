# ashes-reborn-deck-builder
This is a mobile deckbuilder for Ashes: Reborn written in React Native.

## Development

Run using `npx react-native run-android`

## TODO:
High Priority
- [x] Fetch Card data via
  - [x] Cache invalidation by pack in settings screen
  - [ ] Error modals
- [ ] Replace AsyncStorage with FileSystem, because AsyncStorage doesn't support images and requiring both is redundant.
- [ ] Release 1.0

Medium Priority
- [ ] Card directory
- [ ] "Build" Tab? Some way of viewing the list of cards to add to the deck in grid form so that it is easier to constuct a deck (a checklist?).
- [ ] Check different device sizes still look reasonable

Low Priority
- [ ] Squeeze pack name into card list
- [ ] Configurable text size
- [ ] Improve loading screen
- [ ] Basic deck description field
- [ ] When returning to the Decks screen while loading images on the edit deck screen, react will complain when the image finshes downloading because the image component has unmounted.
- [ ] Add Deck Name to deck page header

Very Low Priority
- [ ] Ashes.live deck integration
- [ ] Improve ReadMe
