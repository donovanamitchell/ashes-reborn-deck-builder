import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {sortBy} from 'lodash';

const CardsList = ({navigation, sortedDeckCards, linkColor, textColor}) => {
  return sortBy(Object.entries(sortedDeckCards), ['0']).map(value => (
    <View key={value[0]}>
      <Text style={{color: textColor}}>{value[0]}</Text>
      {value[1].map((card, index) => (
        <View key={index} style={[styles.container, styles.cardsList]}>
          <Text style={{color: textColor}}>{card.count}</Text>
          <Text
            style={[styles.linkText, {color: linkColor}]}
            onPress={() =>
              navigation.navigate('CardModal', {
                name: card.name,
                stub: card.stub,
              })
            }>
            {card.name}
          </Text>
        </View>
      ))}
    </View>
  ));
};

const styles = StyleSheet.create({
  cardsList: {
    flexDirection: 'row',
    padding: 5,
  },
  container: {
    flex: 1,
  },
  linkText: {
    paddingLeft: 5,
  },
});

export default CardsList;
