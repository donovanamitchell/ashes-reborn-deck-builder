import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Pressable,
  View,
} from 'react-native';

const DeckListItem = props => {
  return (
    <Pressable
      style={({pressed}) => [
        {
          backgroundColor: pressed ? 'beige' : 'white',
        },
        styles.listItem,
      ]}
      onPress={() => {
        props.onPress();
      }}>
      <Text style={styles.listItem}>{props.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  listItem: {
    margin: 10,
    padding: 10,
    fontSize: 18,
  },
});

export default DeckListItem;
