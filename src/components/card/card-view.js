import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {isArray} from 'lodash';

import CardImage from './card-image';
import StringWithIcons from '../util/string-with-icons';

function costString(costs, orSeparator) {
  return costs
    .map(cost => (isArray(cost) ? cost.join(orSeparator) : cost))
    .join(', ');
}

const CardView = props => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const {t} = useTranslation();

  return (
    <View style={[styles.cardContent, props.style]}>
      <View style={styles.imageContainer}>
        <View style={styles.imageResizeToWidth}>
          <CardImage stub={props.card.stub} name={props.card.name} />
        </View>
      </View>
      <View style={styles.description}>
        {props.card.cost && (
          <Text style={{color: colors.text}}>
            {StringWithIcons(
              costString(props.card.cost, t('common.orSeparator')),
              navigation,
            )}
          </Text>
        )}
        <Text style={{color: colors.text}}>
          {StringWithIcons(props.card.text, navigation)}
        </Text>
        {props.card.phoenixborn && (
          <Text style={{color: colors.text}}>
            {t('cards.uniqueCard', {phoenixborn: props.card.phoenixborn})}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageResizeToWidth: {
    flex: 0,
    flexDirection: 'row',
  },
  imageContainer: {
    alignSelf: 'flex-start',
    flex: 1,
  },
  description: {
    paddingLeft: 5,
    flex: 4,
  },
});

export default CardView;
