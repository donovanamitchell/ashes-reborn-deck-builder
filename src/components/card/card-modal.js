import React from 'react';
import {ImageBackground, Pressable} from 'react-native';

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
      <ImageBackground
        style={{flex: 1}}
        source={require('../../assets/loading-card.jpg')}
      />
    </Pressable>
  );
};

export default CardModal;
