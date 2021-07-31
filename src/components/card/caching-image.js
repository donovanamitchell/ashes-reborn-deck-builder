import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, ImageBackground} from 'react-native';
import {FileSystem} from 'react-native-unimodules';

const loadingImage = require('../../assets/loading-card.jpg');

async function getUri(stub) {
  const cacheUri = `${FileSystem.cacheDirectory}${stub}.png`;
  try {
    let existingImage = await FileSystem.getInfoAsync(cacheUri);
    if (existingImage.exists) {
      return cacheUri;
    }

    let image = await FileSystem.createDownloadResumable(
      `https://cdn.ashes.live/images/cards/${stub}.jpg`,
      cacheUri,
      {},
    ).downloadAsync();

    if (image.uri) {
      return image.uri;
    }
    // TODO: error? what do?
    return '';
  } catch (error) {
    // TODO: error modal
    console.log(error);
    return '';
  }
}

const CachingImage = ({resizeMode, stub}) => {
  const [uri, setUri] = useState('');

  useEffect(() => {
    if (stub) {
      getUri(stub).then(newUri => setUri(newUri));
    }
  }, [stub]);

  // TODO: solve stubless problem
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
