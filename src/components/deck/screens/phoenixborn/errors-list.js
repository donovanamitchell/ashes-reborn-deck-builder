import React from 'react';
import {Text, View} from 'react-native';

const ErrorsList = ({cardErrors, firstFiveErrors, errorColor}) => {
  let cardErrorTexts = cardErrors.map((error, index) => (
    <Text key={`card${index}`} style={{color: errorColor}}>
      {error}
    </Text>
  ));

  let firstFiveErrorTexts = [];
  firstFiveErrors.forEach((error, index) => {
    if (error && firstFiveErrors.indexOf(error) === index) {
      firstFiveErrorTexts.push(
        <Text style={{color: errorColor}} key={`firstFive${index}`}>
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

export default ErrorsList;
