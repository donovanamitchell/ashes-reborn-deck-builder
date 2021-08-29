import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';

import {DeckContext} from '../deck/deck-context';
import CardView from './card-view';

const CardAdder = ({card, count}) => {
  const {incrementCard, decrementCard} = useContext(DeckContext);
  const {colors} = useTheme();

  return (
    <View style={[styles.listItem, {backgroundColor: colors.card}]}>
      <Text style={[styles.cardName, {color: colors.text}]}>{card.name}</Text>
      <View style={styles.cardContent}>
        <CardView style={[styles.cardView, {color: colors.text}]} card={card} />
        <View style={styles.counter}>
          <Icon
            name="add"
            size={15}
            onPress={() => {
              if (count < 3 || !count) {
                incrementCard(card);
              }
            }}
            style={[
              styles.button,
              {color: colors.primary, borderColor: colors.border},
            ]}
          />
          <Text style={{color: colors.text}}>
            {count ? count.toString() : '0'} / 3
          </Text>
          <Icon
            raised
            name="remove"
            size={15}
            onPress={() => {
              if (count > 0) {
                decrementCard(card);
              }
            }}
            style={[
              styles.button,
              {color: colors.primary, borderColor: colors.border},
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    marginTop: 5,
    padding: 7,
    flex: 1,
  },
  cardContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardName: {
    paddingBottom: 2,
    fontWeight: 'bold',
  },
  cardView: {
    width: '75%',
  },
  counter: {
    alignItems: 'baseline',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    textAlign: 'center',
    width: '25%',
  },
  button: {
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 6,
    borderWidth: 2,
  },
});

export default CardAdder;
