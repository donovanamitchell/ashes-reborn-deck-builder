import React from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import FastImage from 'react-native-fast-image';

const loadingImage = require('../../assets/loading-card.jpg');

const CachingImage = ({resizeMode, stub}) => {
  // TODO: solve stubless problem
  if (stub) {
    return (
      <ImageBackground
        style={styles.image}
        resizeMode={resizeMode || 'center'}
        source={loadingImage}>
        <FastImage
          style={styles.image}
          resizeMode={resizeMode || FastImage.resizeMode.center}
          source={{
            uri: `https://cdn.ashes.live/images/cards/${stub}.jpg`,
            cache: FastImage.cacheControl.immutable,
          }}
        />
      </ImageBackground>
    );
  } else {
    return (
      <ImageBackground
        style={styles.image}
        resizeMode={resizeMode || 'center'}
        source={loadingImage}
      />
    );
  }
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});

export default CachingImage;
