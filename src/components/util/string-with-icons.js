import React from 'react';
import {Text} from 'react-native';
import {AshesIcon} from './ashes-icon';

function StringWithIcons(string, navigation) {
  return string.split(/(\[\[.*?\]\])/).flatMap((text, index) => {
    if (text.startsWith('[[')) {
      let trimmedText = text.slice(2, -2);
      if (AshesIcon.hasIcon(trimmedText)) {
        return <AshesIcon key={index} name={trimmedText} size={15} />;
      }
      return (
        <Text
          key={index}
          style={{color: 'blue', textDecorationLine: 'underline'}}
          onPress={() => navigation.navigate('CardModal', {name: trimmedText})}>
          {trimmedText}
        </Text>
      );
    } else {
      return text;
    }
  });
}

export default StringWithIcons;
