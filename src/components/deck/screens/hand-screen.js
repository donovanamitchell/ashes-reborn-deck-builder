import React, {useContext} from 'react';
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

const HandScreen = () => {
  const deck = useContext(DeckContext);

  return (
    <View style={styles.container}>
      <Text>First five picker</Text>
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

export default HandScreen;
