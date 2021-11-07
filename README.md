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
- [ ] Release 1.0.7
  - [x] Shining Hydra heads not appearing in conjuration list
  - [x] Fallen conjuration has too many when Summon book and Rising Horde are used
  - [x] Image spill on card modal for slim devices
- [ ] Release 1.1.0
  - [ ] "Build" Tab? Some way of viewing the list of cards to add to the deck in grid form so that it is easier to constuct a deck (a checklist?).
  - [ ] Improved Dice filters

Medium Priority
- [ ] Additional FF sets
- [ ] Automated tests
- [ ] Display Life, Spellboard, Battlefield for selected Phoenixborn
- [ ] Required packs list

Low Priority
- [ ] Better Tablet support
- [ ] Squeeze pack name into card list
- [ ] Configurable text size
- [ ] Improve loading screen
- [ ] When returning to the Decks screen while loading images on the edit deck screen, react will complain when the image finshes downloading because the image component has unmounted.

Very Low Priority
- [ ] Ashes.live deck integration
- [ ] Improve ReadMe
