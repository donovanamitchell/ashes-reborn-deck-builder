import React, {useContext, useState} from 'react';
import {StyleSheet, Text, FlatList, View} from 'react-native';
import {DeckContext} from '../deck-context';
import CardFilter from '../../util/card-filter';
import {GlobalContext} from '../../../store/global-store';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CardAdder from '../../card/card-adder';

const CardsScreen = () => {
  const {cards} = React.useContext(DeckContext);
  const state = useContext(GlobalContext);
  const [showFilter, setShowFilter] = useState(false);

  function cardCount() {
    return Object.entries(cards).reduce(
      (accumulator, value) => accumulator + value[1],
      0,
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text>Cards: {cardCount()} / 30</Text>
        <View style={styles.filter}>
          <Text style={styles.filterText}>Filters:</Text>
          <Icon
            name="filter-list"
            size={25}
            style={styles.button}
            onPress={() => setShowFilter(!showFilter)}
          />
        </View>
      </View>
      {showFilter && <CardFilter />}
      <FlatList
        data={state.cards}
        renderItem={({item}) => (
          <CardAdder card={item} count={cards[item.stub]} />
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 7,
    backgroundColor: 'white',
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterText: {
    paddingRight: 5,
  },
  button: {
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 6,
    borderColor: 'lightgrey',
    borderWidth: 2,
  },
});

export default CardsScreen;
