import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, FlatList, View} from 'react-native';
import {DeckContext} from '../deck-context';
import CardFilter from '../../util/card-filter';
import {GlobalContext} from '../../../store/global-store';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CardAdder from '../../card/card-adder';

const CardsScreen = () => {
  const {cards} = useContext(DeckContext);
  const state = useContext(GlobalContext);
  const [cardCount, setCardCount] = useState(0);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    setCardCount(
      Object.entries(cards).reduce(
        (accumulator, value) => accumulator + value[1].count,
        0,
      ),
    );
  }, [cards]);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text>
          {[
            'Cards: ',
            <Text key="2" style={cardCount > 30 ? styles.errorText : {}}>
              {cardCount} / 30
            </Text>,
          ]}
        </Text>
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
          <CardAdder
            card={item}
            count={cards[item.stub] && cards[item.stub].count}
          />
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
  errorText: {
    color: 'red',
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
