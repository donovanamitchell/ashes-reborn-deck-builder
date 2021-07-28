import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CachingImage from './caching-image';

const CardImage = props => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.imageContainer}
      onPress={() => {
        navigation.navigate('CardModal', {stub: props.stub, name: props.name});
      }}>
      <CachingImage />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 30.0 / 42.0,
  },
});
export default CardImage;
