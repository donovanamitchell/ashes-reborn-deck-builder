import React, {Component, useState, useContext} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  FlatList,
  View,
} from 'react-native';
import DeckContext from '../deck-context';

const PheonixBornScreen = ({navigation, route}) => {
  const deck = useContext(DeckContext);

  return (
    <View style={styles.container}>
      <Text>Name: {deck.name}</Text>
      <Text>Filename: {deck.filename}</Text>
      <Text>Pheonixborn: {deck.pheonixBorn}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PheonixBornScreen;
