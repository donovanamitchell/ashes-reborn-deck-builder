import React from 'react';
import {Text} from 'react-native';
import {AshesIcon} from './ashes-icon';
import {useTheme} from '@react-navigation/native';

const StringWithIcons = (string, navigation) => {
  const {colors} = useTheme();

  if (string === undefined) {
    return string;
  }
  return string.split(/(\[\[.*?\]\])/).flatMap((text, index) => {
    if (text.startsWith('[[')) {
      let trimmedText = text.slice(2, -2);
      if (AshesIcon.hasIcon(trimmedText)) {
        return <AshesIcon key={index} name={trimmedText} size={15} />;
      }
      return (
        <Text
          key={index}
          style={{color: colors.primary}}
          onPress={() => navigation.navigate('CardModal', {name: trimmedText})}>
          {trimmedText}
        </Text>
      );
    } else {
      return text;
    }
  });
};

export default StringWithIcons;
