import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DICE_TYPES} from '../util/constants';
import {AshesIcon} from '../util/ashes-icon';

function diceIcons(dice) {
  let basics = new Array(10).fill('basic');
  let index = 0;
  DICE_TYPES.forEach(diceType => {
    if (dice[diceType]) {
      // Fills array with a number of diceType strings
      basics.splice(
        index,
        dice[diceType],
        ...new Array(dice[diceType]).fill(diceType),
      );
      index += dice[diceType];
    }
  });
  return basics
    .slice(0, 10)
    .map((diceType, index) => (
      <AshesIcon
        style={[styles[diceType], styles.dice]}
        key={index}
        name={diceType === 'basic' ? diceType : `${diceType}:power`}
        size={25}
      />
    ));
}

const DiceView = ({dice}) => {
  return <View style={styles.container}>{diceIcons(dice)}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  dice: {
    padding: 2,
    borderRadius: 6,
    borderColor: 'lightgrey',
    borderWidth: 2,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  basic: {
    backgroundColor: 'white',
    color: 'lightgrey',
  },
  time: {
    backgroundColor: 'rgb(161, 38, 22)',
    color: 'rgb(189, 227, 250)',
  },
  sympathy: {
    backgroundColor: 'rgb(16, 152, 130)',
    color: 'rgb(238, 201, 183)',
  },
  charm: {
    backgroundColor: 'rgb(240, 80, 152)',
    color: 'rgb(247, 237, 64)',
  },
  divine: {
    backgroundColor: 'rgb(255, 255, 255)',
    color: 'rgb(179, 127, 28)',
  },
  natural: {
    backgroundColor: 'rgb(1, 74, 153)',
    color: 'rgb(238, 238, 2)',
  },
  illusion: {
    backgroundColor: 'rgb(73, 14, 104)',
    color: 'rgb(149, 229, 255)',
  },
  ceremonial: {
    backgroundColor: 'rgb(17, 24, 34)',
    color: 'rgb(255, 50, 70)',
  },
});

export default DiceView;
