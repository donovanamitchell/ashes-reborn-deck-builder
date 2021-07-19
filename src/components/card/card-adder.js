import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CardView from './card-view';

const CardAdder = ({card, count}) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.cardName}>{card.name}</Text>
      <View style={styles.cardContent}>
        <CardView style={styles.cardView} card={card} />
        <View style={styles.counter}>
          <Icon
            name="add"
            size={15}
            onPress={() => console.log('Add pushed')}
            style={styles.button}
          />
          <Text>{card.count ? card.count.toString() : '0'} / 3</Text>
          <Icon
            raised
            name="remove"
            size={15}
            onPress={() => console.log('Remove pushed')}
            style={styles.button}
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
    backgroundColor: 'white',
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
    borderColor: 'lightgrey',
    borderWidth: 2,
  },
});

export default CardAdder;
