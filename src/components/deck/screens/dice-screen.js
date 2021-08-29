import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DiceView from '../../dice/dice-view';
import {DeckContext} from '../deck-context';
import {DICE_TYPES} from '../../util/constants';

const DiceScreen = () => {
  const {dice, incrementDice, decrementDice} = useContext(DeckContext);
  const [diceCount, setDiceCount] = useState(0);
  const {colors} = useTheme();

  useEffect(() => {
    setDiceCount(
      DICE_TYPES.reduce(
        (accumulator, value) => accumulator + (dice[value] || 0),
        0,
      ),
    );
  }, [dice]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.diceViewContainer}>
        <DiceView dice={dice} />
      </View>
      <View style={styles.diceCounters}>
        {DICE_TYPES.map(diceType => {
          return (
            <View key={diceType} style={styles.diceCounter}>
              <Text style={[styles.diceText, {color: colors.text}]}>
                {diceType.charAt(0).toUpperCase() + diceType.slice(1)}:
              </Text>
              <View style={styles.counter}>
                <Icon
                  name="add"
                  size={15}
                  onPress={() => {
                    if (diceCount < 10) {
                      incrementDice(diceType);
                    }
                  }}
                  style={[
                    styles.button,
                    {
                      color: colors.primary,
                      borderColor: colors.border,
                      backgroundColor: colors.card,
                    },
                  ]}
                />
                <Text style={{color: colors.text}}>
                  {dice[diceType] ? dice[diceType].toString() : '0'}
                </Text>
                <Icon
                  raised
                  name="remove"
                  size={15}
                  onPress={() => {
                    if (dice[diceType] > 0) {
                      decrementDice(diceType);
                    }
                  }}
                  style={[
                    styles.button,
                    {
                      color: colors.primary,
                      borderColor: colors.border,
                      backgroundColor: colors.card,
                    },
                  ]}
                />
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 6,
    borderWidth: 2,
  },
  counter: {
    alignItems: 'baseline',
    justifyContent: 'space-between',
    flexDirection: 'row',
    textAlign: 'center',
    width: '25%',
  },
  container: {
    flex: 1,
  },
  diceViewContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  diceCounters: {
    padding: 15,
  },
  diceCounter: {
    flexDirection: 'row',
    paddingBottom: 12,
  },
  diceText: {
    width: '70%',
  },
});

export default DiceScreen;
