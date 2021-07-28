import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';

const loadingImage = require('../../assets/loading-card.jpg');

const CachingImage = ({resizeMode, stub}) => {
  const [image, setImage] = useState(loadingImage);

  return (
    <ImageBackground
      style={styles.image}
      resizeMode={resizeMode || 'center'}
      source={image}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});

export default CachingImage;
