import React from 'react';
import {ImageBackground, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CardImage = props => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={{flex: 1, aspectRatio: 30.0 / 42.0}}
      onPress={() => {
        navigation.navigate('CardModal', {stub: props.stub, name: props.name});
      }}>
      <ImageBackground
        style={{flex: 1}}
        resizeMode="center"
        source={require('../../assets/loading-card.jpg')}
      />
    </Pressable>
  );
};

export default CardImage;
