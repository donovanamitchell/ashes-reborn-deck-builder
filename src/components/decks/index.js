import React, {useContext, useState, useEffect} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  FlatList,
  View,
} from 'react-native';
import {Context} from '../../store/global-store';
import DecksService from '../../services/decks-service';
import DeckListItem from './deck-list-item';

const service = new DecksService();
const cardData = require('../../assets/cards.json');

const DecksScreen = ({navigation}) => {
  const [state, dispatch] = useContext(Context);
  // const [decks, setDecks] = useState(service.decks());

  useEffect(() => {
    dispatch({type: 'SET_CARDS', payload: cardData.results});
    dispatch({type: 'SET_DECKS', payload: service.decks()});
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Button
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
      />
      <FlatList
        data={state.decks}
        renderItem={({item}) => (
          <DeckListItem
            name={item.name}
            onPress={() =>
              navigation.navigate('Deck', {filename: item.filename})
            }
          />
        )}
        keyExtractor={item => item.filename}
      />
      <Button title="New Deck" onPress={() => navigation.navigate('Deck')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    margin: 10,
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor: 'beige',
  },
});

export default DecksScreen;

// const cardData = {
//   "count": 14,
//   "next": null,
//   "previous": null,
//   "results": [
//     {
//       "name": "Crescendo",
//       "stub": "crescendo",
//       "type": "Reaction Spell",
//       "release": {
//         "name": "The Song of Soaksend",
//         "stub": "the-song-of-soaksend"
//       },
//       "placement": "Discard",
//       "cost": [
//         "1 [[sympathy:class]]",
//         "1 [[discard]]"
//       ],
//       "dice": [
//         "sympathy"
//       ],
//       "magicCost": {
//         "sympathy:class": 1
//       },
//       "text": "You may play this spell after you have declared attackers. Deal 1 damage to a target unit you control to deal 3 damage to a target unit."
//     },
//     {
//       "name": "Encore",
//       "stub": "encore",
//       "type": "Action Spell",
//       "release": {
//         "name": "The Song of Soaksend",
//         "stub": "the-song-of-soaksend"
//       },
//       "placement": "Discard",
//       "cost": [
//         "[[main]]"
//       ],
//       "text": "Search your discard pile for a card other than Encore and place it on the top or bottom of your draw pile. Draw 1 card.",
//       "phoenixborn": "Namine Hymntide"
//     },
//     {
//       "name": "Flute Mage",
//       "stub": "flute-mage",
//       "type": "Ally",
//       "release": {
//         "name": "The Song of Soaksend",
//         "stub": "the-song-of-soaksend"
//       },
//       "placement": "Battlefield",
//       "cost": [
//         "[[main]]",
//         "1 [[sympathy:class]]",
//         "1 [[basic]]"
//       ],
//       "dice": [
//         "sympathy"
//       ],
//       "magicCost": {
//         "basic": 1,
//         "sympathy:class": 1
//       },
//       "text": "Enliven: [[side]] - [[exhaust]]: Remove 1 exhaustion token from a target unit.",
//       "attack": 1,
//       "life": 2,
//       "recover": 1
//     },
//     {
//       "name": "Guilt Link",
//       "stub": "guilt-link",
//       "type": "Ready Spell",
//       "release": {
//         "name": "The Song of Soaksend",
//         "stub": "the-song-of-soaksend"
//       },
//       "placement": "Spellboard",
//       "cost": [
//         "[[main]]",
//         "1 [[sympathy:class]]"
//       ],
//       "dice": [
//         "sympathy"
//       ],
//       "magicCost": {
//         "sympathy:class": 1
//       },
//       "text": "After 1 or more wound tokens are placed on your Phoenixborn as a result of a unit's attack, place 1 status token on this spell if it has no status tokens on it.\n\n[[side]] - [[exhaust]]: Remove 1 status token from this spell to destroy a unit you control. If you do, choose a target player to destroy a unit they control."
//     },
//     {
//       "name": "Magic Syphon",
//       "stub": "magic-syphon",
//       "type": "Ready Spell",
//       "release": {
//         "name": "The Song of Soaksend",
//         "stub": "the-song-of-soaksend"
//       },
//       "placement": "Spellboard",
//       "cost": [
//         "[[main]]",
//         "1 [[sympathy:class]]"
//       ],
//       "dice": [
//         "sympathy"
//       ],
//       "magicCost": {
//         "sympathy:class": 1
//       },
//       "text": "[[side]] - [[exhaust]]: Change 1 die in your active pool to a side of your choice. Change 1 die in a target player's active pool to a side of your choice."
//     },
//     {
//       "name": "Namine Hymntide",
//       "stub": "namine-hymntide",
//       "type": "Phoenixborn",
//       "release": {
//         "name": "The Song of Soaksend",
//         "stub": "the-song-of-soaksend"
//       },
//       "dice": [
//         "sympathy"
//       ],
//       "text": "Calming Melody: [[side]] - [[exhaust]] - 1 [[sympathy:class]]: Draw 1 card. You may place 1 exhaustion token on this card and 1 exhaustion token on a target Phoenixborn.",
//       "battlefield": 6,
//       "life": 17,
//       "spellboard": 4
//     },
//     {
//       "name": "River Skald",
//       "stub": "river-skald",
//       "type": "Ally",
//       "release": {
//         "name": "The Song of Soaksend",
//         "stub": "the-song-of-soaksend"
//       },
//       "placement": "Battlefield",
//       "cost": [
//         "[[main]]",
//         "2 [[sympathy:class]]"
//       ],
//       "dice": [
//         "sympathy"
//       ],
//       "magicCost": {
//         "sympathy:class": 2
//       },
//       "text": "Harsh Melody: When this unit comes into play, draw 1 card. You may discard 1 card from your hand to deal X damage to a target unit.\n\nX = the magic play cost of the discarded card.",
//       "attack": 2,
//       "life": 2,
//       "recover": 1
//     },
//     {
//       "name": "Salamander Monk",
//       "stub": "salamander-monk",
//       "type": "Conjuration",
//       "release": {
//         "name": "The Song of Soaksend",
//         "stub": "the-song-of-soaksend"
//       },
//       "placement": "Battlefield",
//       "text": "* Spirit Form: When this unit is destroyed, place a [[Salamander Monk Spirit]] conjuration onto your battlefield.",
//       "conjurations": [
//         {
//           "name": "Salamander Monk Spirit",
//           "stub": "salamander-monk-spirit"
//         }
//       ],
//       "attack": 1,
//       "life": 1,
//       "recover": 0,
//       "copies": 2
//     },
//     {
//       "name": "Salamander Monk Spirit",
//       "stub": "salamander-monk-spirit",
//       "type": "Conjuration",
//       "release": {
//         "name": "The Song of Soaksend",
//         "stub": "the-song-of-soaksend"
//       },
//       "placement": "Battlefield",
//       "text": "* Transparent: This unit cannot block or be chosen as the target of an attack.",
//       "attack": 1,
//       "life": 1,
//       "recover": 0,
//       "copies": 3
//     },
//     {
//       "name": "Shatter Pulse",
//       "stub": "shatter-pulse",
//       "type": "Reaction Spell",
//       "release": {
//         "name": "The Song of Soaksend",
//         "stub": "the-song-of-soaksend"
//       },
//       "placement": "Discard",
//       "cost": [
//         "2 [[sympathy:class]]",
//         "1 [[basic]]"
//       ],
//       "dice": [
//         "sympathy"
//       ],
//       "magicCost": {
//         "basic": 1,
//         "sympathy:class": 2
//       },
//       "text": "You may play this spell after a unit you control is destroyed. Destroy a target unit. You may change 2 dice in a target player's active pool to a side of your choice."
//     },
//     {
//       "name": "Squall Stallion",
//       "stub": "squall-stallion",
//       "type": "Conjuration",
//       "release": {
//         "name": "The Song of Soaksend",
//         "stub": "the-song-of-soaksend"
//       },
//       "placement": "Battlefield",
//       "text": "Lightning Speed: This unit cannot be targeted by reaction spells an opponent controls.\n\n* Torrent 1: [[side]]: Place 1 card from your hand on the top or bottom of your draw pile. If you do, place 1 status token on all Squall Stallions you control.\n\n* X = the number of status tokens on this unit.",
//       "attack": "X",
//       "life": 3,
//       "recover": 0,
//       "copies": 2
//     },
//     {
//       "name": "String Mage",
//       "stub": "string-mage",
//       "type": "Ally",
//       "release": {
//         "name": "The Song of Soaksend",
//         "stub": "the-song-of-soaksend"
//       },
//       "placement": "Battlefield",
//       "cost": [
//         "[[main]]",
//         "1 [[sympathy:power]]",
//         "1 [[sympathy:class]]"
//       ],
//       "dice": [
//         "sympathy"
//       ],
//       "magicCost": {
//         "sympathy:class": 1,
//         "sympathy:power": 1
//       },
//       "text": "Exchange Link 1: [[side]]: Move 1 wound or status token from a target unit onto this unit, or move 1 wound or status token from this unit onto a target unit.",
//       "attack": 1,
//       "life": 3,
//       "recover": 2
//     },
//     {
//       "name": "Summon Salamander Monk",
//       "stub": "summon-salamander-monk",
//       "type": "Ready Spell",
//       "release": {
//         "name": "The Song of Soaksend",
//         "stub": "the-song-of-soaksend"
//       },
//       "placement": "Spellboard",
//       "cost": [
//         "[[main]]"
//       ],
//       "dice": [
//         "sympathy"
//       ],
//       "text": "[[main]] - [[exhaust]] - 1 [[sympathy:class]]: Place a [[Salamander Monk]] conjuration onto your battlefield.",
//       "conjurations": [
//         {
//           "name": "Salamander Monk",
//           "stub": "salamander-monk"
//         },
//         {
//           "name": "Salamander Monk Spirit",
//           "stub": "salamander-monk-spirit"
//         }
//       ]
//     },
//     {
//       "name": "Summon Squall Stallion",
//       "stub": "summon-squall-stallion",
//       "type": "Ready Spell",
//       "release": {
//         "name": "The Song of Soaksend",
//         "stub": "the-song-of-soaksend"
//       },
//       "placement": "Spellboard",
//       "cost": [
//         "[[main]]",
//         "1 [[sympathy:power]]"
//       ],
//       "dice": [
//         "sympathy"
//       ],
//       "magicCost": {
//         "sympathy:power": 1
//       },
//       "text": "[[main]] - [[exhaust]] - 1 [[sympathy:class]] - 1 [[basic]]: Draw 1 card. Place a [[Squall Stallion]] conjuration onto your battlefield.",
//       "conjurations": [
//         {
//           "name": "Squall Stallion",
//           "stub": "squall-stallion"
//         }
//       ]
//     }
//   ]
// }