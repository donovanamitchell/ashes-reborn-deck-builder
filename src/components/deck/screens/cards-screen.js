import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, FlatList, View} from 'react-native';
import {DeckContext} from '../deck-context';
import CardFilter from '../../util/card-filter';
import {GlobalContext} from '../../../store/global-store';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CardAdder from '../../card/card-adder';
import {ADDABLE_CARD_TYPES} from '../../util/constants';

function hasType(filter, type) {
  if (filter) {
    return type === filter;
  } else {
    return ADDABLE_CARD_TYPES.includes(type);
  }
}

function containsSearchString(searchText, name, text, cost) {
  if (searchText) {
    let loweredText = searchText.toLowerCase();
    return (
      name.toLowerCase().includes(loweredText) ||
      (text && text.toLowerCase().includes(loweredText)) ||
      (cost && cost.join().toLowerCase().includes(loweredText))
    );
  }
  return true;
}

const CardsScreen = () => {
  const [cardCount, setCardCount] = useState(0);
  const [cardTypeFilter, setCardTypeFilter] = useState({});
  const [filteredCards, setFilteredCards] = useState([]);
  const [packStubsFilter, setPackStubsFilter] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [useAllPacks, setUseAllPacks] = useState(false);
  const [useOwnedPacks, setUseOwnedPacks] = useState(false);

  const {cards} = useContext(DeckContext);
  const state = useContext(GlobalContext);

  useEffect(() => {
    setCardCount(
      Object.entries(cards).reduce(
        (accumulator, value) => accumulator + value[1].count,
        0,
      ),
    );
  }, [cards]);

  useEffect(() => {
    function isFromPack(pack) {
      if (useAllPacks) {
        return true;
      }
      if (
        useOwnedPacks &&
        state.ownedReleases.find(release => release.stub === pack.stub)
      ) {
        return true;
      }
      if (packStubsFilter.length) {
        return packStubsFilter.find(stub => stub.value === pack.stub);
      }
      return true;
    }

    setFilteredCards(
      state.cards.filter(card => {
        // TODO: If I made each one of these into an effect would that be more
        // efficient?
        return (
          hasType(cardTypeFilter.value, card.type) &&
          containsSearchString(searchText, card.name, card.text, card.cost) &&
          isFromPack(card.release)
        );
      }),
    );
  }, [
    state.cards,
    cardTypeFilter,
    searchText,
    packStubsFilter,
    useOwnedPacks,
    useAllPacks,
    state.ownedReleases,
  ]);

  function onCardFilteredByPack(items) {
    let owned = items.find(({value}) => value === 'OWNED_PACKS');
    setUseOwnedPacks(owned && true);
    setUseAllPacks(
      (items.find(item => item.value === 'ALL_PACKS') ||
        (owned &&
          state.ownedReleases.find(release => release.stub === 'ALL_PACKS'))) &&
        true,
    );
    setPackStubsFilter(items);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.cardCounter}>
          {[
            'Cards: ',
            <Text
              key="2"
              style={cardCount !== 30 ? styles.errorText : styles.text}>
              {cardCount} / 30
            </Text>,
          ]}
        </Text>
        <TextInput
          style={styles.searchBox}
          onChangeText={text => setSearchText(text)}
          placeholder="Search"
          value={searchText}
        />
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
      {showFilter && (
        <CardFilter
          cardType={cardTypeFilter}
          packStubs={packStubsFilter}
          searchText={searchText}
          setCardType={setCardTypeFilter}
          setPackStubs={onCardFilteredByPack}
          setSearchText={setSearchText}
        />
      )}
      <FlatList
        data={filteredCards}
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
  cardCounter: {
    paddingRight: 5,
  },
  container: {
    flex: 1,
  },
  errorText: {
    color: 'red',
  },
  searchBox: {
    borderRadius: 6,
    borderColor: 'lightgrey',
    borderWidth: 2,
    padding: 0,
    paddingHorizontal: 4,
    flex: 1,
  },
  text: {
    color: 'black',
  },
  topBar: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 2,
    backgroundColor: 'white',
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterText: {
    paddingHorizontal: 5,
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
