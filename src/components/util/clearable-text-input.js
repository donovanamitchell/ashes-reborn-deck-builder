import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';

const ClearableTextInput = ({value, style, onChangeText, placeholder}) => {
  const {colors} = useTheme();

  return (
    <View
      style={[
        styles.searchBoxContainer,
        {borderColor: colors.border, backgroundColor: colors.card},
        style,
      ]}>
      <TextInput
        style={[styles.searchBox, {color: colors.text}]}
        onChangeText={text => onChangeText(text)}
        placeholderTextColor={colors.border}
        placeholder={placeholder}
        value={value}
      />
      <Icon
        name="backspace"
        size={15}
        style={[styles.deleteButtonIcon, {color: colors.primary}]}
        onPress={() => onChangeText('')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  deleteButtonIcon: {
    paddingRight: 4,
  },
  searchBox: {
    padding: 0,
    paddingHorizontal: 10,
    flex: 1,
  },
  searchBoxContainer: {
    borderRadius: 6,
    borderWidth: 2,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ClearableTextInput;
