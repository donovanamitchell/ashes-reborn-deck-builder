import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ClearableTextInput = ({value, style, onChangeText, placeholder}) => {
  return (
    <View style={[styles.searchBoxContainer, style]}>
      <TextInput
        style={styles.searchBox}
        onChangeText={text => onChangeText(text)}
        placeholderTextColor="darkgrey"
        placeholder={placeholder}
        value={value}
      />
      <Icon
        name="backspace"
        size={15}
        style={styles.deleteButtonIcon}
        onPress={() => onChangeText('')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  deleteButtonIcon: {
    color: 'grey',
    paddingRight: 4,
  },
  searchBox: {
    color: 'black',
    padding: 0,
    paddingHorizontal: 10,
    flex: 1,
  },
  searchBoxContainer: {
    borderRadius: 6,
    borderColor: 'lightgrey',
    borderWidth: 2,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ClearableTextInput;
