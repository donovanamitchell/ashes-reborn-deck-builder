# ashes-reborn-deck-builder
This is a mobile deckbuilder for Ashes: Reborn written in React Native.

## Development

I followed this guide to set up my environment https://docs.microsoft.com/en-us/windows/dev-environment/javascript/react-native-for-android

Run using `npx react-native run-android`

## Deployment

I followed this guide for building and deploying a release https://reactnative.dev/docs/signed-apk-android. It is now very high priority to get this into a CI process so I never have to remember this again.

## TODO:
High Priority
- [ ] Github CI
- [ ] Release 1.1.0
  - [ ] Card directory
  - [ ] Dark Mode bugfix
  - [ ] Rotation bugfix
  - [ ] Card List optimizations
  - [ ] I18n options

Medium Priority
- [ ] "Build" Tab? Some way of viewing the list of cards to add to the deck in grid form so that it is easier to constuct a deck (a checklist?).
- [ ] Automated tests
- [ ] Life, Spellboard, Battlefield list for Phoenixborn
- [ ] Required packs list
- [ ] Deck text export option

Low Priority
- [ ] Better Tablet support
- [ ] Squeeze pack name into card list
- [ ] Configurable text size
- [ ] Improve loading screen
- [ ] When returning to the Decks screen while loading images on the edit deck screen, react will complain when the image finshes downloading because the image component has unmounted.

Very Low Priority
- [ ] Ashes.live deck integration
- [ ] Improve ReadMe