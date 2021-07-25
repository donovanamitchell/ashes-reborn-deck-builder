import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

// TODO: combine into cards-list
const ConjurationsList = ({navigation, sortedConjurations}) => {
  return sortedConjurations.map(conjuration => (
    <View key={conjuration.stub} style={[styles.container, styles.cardsList]}>
      <Text>{conjuration.count}</Text>
      <Text
        style={styles.linkText}
        onPress={() =>
          navigation.navigate('CardModal', {
            name: conjuration.name,
            stub: conjuration.stub,
          })
        }>
        {conjuration.name}
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

export default ConjurationsList;
