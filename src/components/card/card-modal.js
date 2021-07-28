import React from 'react';
import {Pressable} from 'react-native';
import CachingImage from './caching-image';

// TODO: stub guesser from card name?
const CardModal = ({route, navigation}) => {
  return (
    <Pressable
      style={{flex: 1, width: '100%', padding: 10}}
      onPress={() => {
        let cardName = route.params.stub;
        console.log(`Dismissed card with stub: ${cardName}`);
        navigation.goBack();
      }}>
      <CachingImage resizeMode="cover" />
    </Pressable>
  );
};

export default CardModal;
