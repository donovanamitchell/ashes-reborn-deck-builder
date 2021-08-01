import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const CardsList = ({navigation, sortedDeckCards}) => {
  return sortedDeckCards.map(item => (
    <View key={item[1].stub} style={[styles.container, styles.cardsList]}>
      <Text>{item[1].count}</Text>
      <Text
        style={styles.linkText}
        onPress={() =>
          navigation.navigate('CardModal', {
            name: item[1].name,
            stub: item[1].stub,
          })
        }>
        {item[1].name}
      </Text>
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
    color: 'blue',
  },
});

export default CardsList;
