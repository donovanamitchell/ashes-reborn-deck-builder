# ashes-reborn-deck-builder
This is a mobile deckbuilder for Ashes: Reborn written in React Native.

## Development

Run using `npx react-native run-android`

## TODO:
High Priority
- [x] Fetch Card data via
  - [x] Cache invalidation by pack in settings screen
  - [ ] Error modal
- [x] Card image preload button in settings screen
  - [ ] Card Loading image
- [ ] Release 1.0

Medium Priority
- [ ] Card directory
- [ ] Pheonixborn unique card validation
- [ ] Ability to clear card text search
- [ ] "Build" Tab? Some way of viewing the list of cards to add to the deck in grid form so that it is easier to constuct a deck (a checklist?).

Low Priority
- [ ] TextInput styling, especially card text search
- [ ] Credits page
- [ ] Squeeze pack name into card list
- [ ] Configurable text size
- [ ] Check different device sizes
- [ ] Improve loading screen
- [ ] Improve ReadMe
- [ ] Basic deck description field
- [ ] Ashes.live deck integration
- [ ] Replace AsyncStorage with FileSystem, because AsyncStorage doesn't support images and requiring both is redundant.
- [ ] When returning to the Decks screen while loading images on the edit deck screen, react will complain when the image finshes downloading because the image component has unmounted.
