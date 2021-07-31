import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, ImageBackground} from 'react-native';
import {getCardUri} from '../../services/cards-service';

const loadingImage = require('../../assets/loading-card.jpg');

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
        resizeMode={resizeMode || 'center'}
        source={loadingImage}>
        <Image
          source={{uri: uri}}
          style={styles.image}
          resizeMode={resizeMode || 'center'}
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
