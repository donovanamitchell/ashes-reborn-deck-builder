import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CardImage from './card-image';
import StringWithIcons from '../util/string-with-icons';
import {useNavigation} from '@react-navigation/native';

const CardView = props => {
  const navigation = useNavigation();
  return (
    <View style={[styles.cardContent, props.style]}>
      <CardImage
        stub={props.card.stub}
        name={props.card.name}
        style={styles.image}
      />
      <View style={styles.description}>
        {props.card.cost && (
          <Text>{StringWithIcons(props.card.cost.join(', '), navigation)}</Text>
        )}
        <Text>{StringWithIcons(props.card.text, navigation)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    alignSelf: 'flex-start',
    width: '20%',
  },
  description: {
    paddingLeft: 5,
    width: '80%',
  },
});

export default CardView;
