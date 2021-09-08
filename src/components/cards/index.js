import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, FlatList, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {CARD_TYPES} from '../util/constants';
import {GlobalContext} from '../../store/global-store';
import ClearableTextInput from '../util/clearable-text-input';
import CardView from '../card/card-view';
import CardFilter from '../util/card-filter';

function hasType(filter, type) {
  if (filter) {
    return type === filter;
  } else {
    return true;
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

// TODO: reduce shared code with cards-screen
const CardsScreen = ({navigation}) => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const state = useContext(GlobalContext);

  const [cardTypeFilter, setCardTypeFilter] = useState({});
  const [filteredCards, setFilteredCards] = useState([]);
  const [packStubsFilter, setPackStubsFilter] = useState([
    {text: 'Owned Packs', value: 'OWNED_PACKS'},
  ]);
  const [searchText, setSearchText] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [useAllPacks, setUseAllPacks] = useState(
    state.ownedReleases.find(({stub}) => stub === 'ALL_PACKS'),
  );
  const [useOwnedPacks, setUseOwnedPacks] = useState(true);

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
        <ClearableTextInput
          onChangeText={setSearchText}
          value={searchText}
          placeholder={t('deck.cards.searchPlaceholder')}
        />
        <View style={styles.filter}>
          <Text style={[styles.filterText, {color: colors.text}]}>
            {t('deck.cards.filters')}
          </Text>
          <Icon
            name="filter-list"
            size={25}
            style={[
              styles.button,
              {
                color: colors.primary,
                borderColor: colors.border,
                backgroundColor: colors.card,
              },
            ]}
            onPress={() => setShowFilter(!showFilter)}
          />
        </View>
      </View>
      {showFilter && (
        <CardFilter
          cardType={cardTypeFilter}
          cardTypes={CARD_TYPES}
          packStubs={packStubsFilter}
          setCardType={setCardTypeFilter}
          setPackStubs={onCardFilteredByPack}
        />
      )}
      <FlatList
        data={filteredCards}
        renderItem={({item}) => (
          <View style={[styles.listItem, {backgroundColor: colors.card}]}>
            <Text style={[styles.cardName, {color: colors.text}]}>
              {item.name}
            </Text>
            <CardView card={item} />
          </View>
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
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 2,
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
    borderWidth: 2,
  },
  listItem: {
    marginTop: 5,
    padding: 7,
    flex: 1,
  },
  cardName: {
    paddingBottom: 2,
    fontWeight: 'bold',
  },
});

export default CardsScreen;
