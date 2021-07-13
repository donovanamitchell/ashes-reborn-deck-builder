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
import CardView from '../../card/card-view';
import CardFilter from '../../util/card-filter';
import {Context} from '../../../store/global-store';

const CardsScreen = () => {
  const deck = useContext(DeckContext);
  const [state, dispatch] = useContext(Context);

  return (
    <View style={styles.container}>
      <CardFilter />
      <FlatList
        data={state.cards}
        renderItem={({item}) => (
          <CardView card={item} count={deck.cards[item.stub]} />
        )}
        keyExtractor={item => item.stub}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CardsScreen;
