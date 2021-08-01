import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ErrorsList = ({cardErrors, firstFiveErrors}) => {
  let cardErrorTexts = cardErrors.map((error, index) => (
    <Text key={`card${index}`} style={styles.error}>
      {error}
    </Text>
  ));

  let firstFiveErrorTexts = [];
  firstFiveErrors.forEach((error, index) => {
    if (error && firstFiveErrors.indexOf(error) === index) {
      firstFiveErrorTexts.push(
        <Text style={styles.error} key={`firstFive${index}`}>
          {error}
        </Text>,
      );
    }
  });

  let errors = cardErrorTexts.concat(firstFiveErrorTexts);

  if (errors.length) {
    return <View>{errors}</View>;
  }

  return null;
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
  },
});

export default ErrorsList;
