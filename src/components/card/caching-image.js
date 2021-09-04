import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, ImageBackground} from 'react-native';
import {getCardUri} from '../../services/cards-service';

const loadingImage = require('../../assets/loading-card.png');

const CachingImage = ({resizeMode, stub}) => {
  const [uri, setUri] = useState('');

  useEffect(() => {
    if (stub) {
      getCardUri(stub).then(newUri => setUri(newUri));
    }
  }, [stub]);

  if (stub && uri) {
    return (
      <ImageBackground
        style={styles.image}
        resizeMode="contain"
        source={loadingImage}>
        <Image source={{uri: uri}} style={styles.image} resizeMode="contain" />
      </ImageBackground>
    );
  } else {
    return (
      <ImageBackground
        style={styles.image}
        resizeMode="contain"
        source={loadingImage}
      />
    );
  }
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    aspectRatio: 30.0 / 42.0,
  },
});

export default CachingImage;
