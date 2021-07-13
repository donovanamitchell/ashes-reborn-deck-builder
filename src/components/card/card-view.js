import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CardImage from './card-image';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StringWithIcons from '../util/string-with-icons';
import {useNavigation} from '@react-navigation/native';

const CardView = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.listItem}>
      <Text style={styles.cardName}>{props.card.name}</Text>
      <View style={styles.cardContent}>
        <CardImage
          stub={props.card.stub}
          name={props.card.name}
          style={styles.image}
        />
        <View style={styles.description}>
          {props.card.cost && (
            <Text>
              {StringWithIcons(props.card.cost.join(', '), navigation)}
            </Text>
          )}
          <Text>{StringWithIcons(props.card.text, navigation)}</Text>
        </View>
        <View style={styles.counter}>
          <Icon
            name="add"
            size={15}
            onPress={() => console.log('Add pushed')}
            style={styles.button}
          />
          <Text>{props.count ? props.count.toString() : '0'} / 3</Text>
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
  image: {
    alignSelf: 'flex-start',
    width: '15%',
  },
  description: {
    paddingLeft: 5,
    width: '60%',
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
  cardName: {
    paddingBottom: 2,
    fontWeight: 'bold',
  },
});

export default CardView;
