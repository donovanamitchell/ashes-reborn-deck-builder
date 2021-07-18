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
import {DeckContext} from '../deck-context';

const DiceScreen = () => {
  // const [deck, setDeck] = useContext(DeckContext);

  return (
    <View style={styles.container}>
      <Text>Dice picker here</Text>
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

export default DiceScreen;
