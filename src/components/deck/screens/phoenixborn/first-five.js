import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {DeckContext} from '../../deck-context';
import CardImage from '../../../card/card-image';

const FirstFive = () => {
  const {firstFive} = useContext(DeckContext);

  function cardImage(index) {
    if (!firstFive[index]) {
      return (
        <View style={styles.image} key={index}>
          <CardImage stub="card-back" name="" />
        </View>
      );
    }
    return (
      <View style={styles.image} key={index}>
        <CardImage
          stub={firstFive[index].stub || 'card-back'}
          name={firstFive[index].name || ''}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {[cardImage(0), cardImage(1), cardImage(2), cardImage(3), cardImage(4)]}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    padding: 2,
    width: '20%',
  },
});

export default FirstFive;
