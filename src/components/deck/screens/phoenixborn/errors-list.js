import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

// TODO: combine into cards-list
const ErrorsList = ({cardErrors, firstFiveErrors}) => {
  let cardErrorTexts = cardErrors.map((error, index) => (
    <Text id={'card' + index} style={styles.error}>
      {error}
    </Text>
  ));

  let firstFiveErrorTexts = [];
  firstFiveErrors.forEach((error, index) => {
    if (error && firstFiveErrors.indexOf(error) === index) {
      firstFiveErrorTexts.push(
        <Text style={styles.error} id={'firstFive' + index}>
          {error}
        </Text>,
      );
    }
  });

  return <View>{cardErrorTexts.concat(firstFiveErrorTexts)}</View>;
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
  },
});

export default ErrorsList;
