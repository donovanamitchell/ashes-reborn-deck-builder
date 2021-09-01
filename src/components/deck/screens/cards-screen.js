import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, FlatList, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {DeckContext} from '../deck-context';
import CardFilter from '../../util/card-filter';
import {GlobalContext} from '../../../store/global-store';
import CardAdder from '../../card/card-adder';
import {ADDABLE_CARD_TYPES} from '../../util/constants';
import ClearableTextInput from '../../util/clearable-text-input';

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

function isInDeck(hideNonDeckCards, cards, stub) {
  return hideNonDeckCards ? cards[stub] && cards[stub].count : true;
}

const CardsScreen = () => {
  const {colors} = useTheme();

  const {cards, phoenixBorn, setCardErrors} = useContext(DeckContext);
  const state = useContext(GlobalContext);

  const [cardCount, setCardCount] = useState(0);
  const [cardTypeFilter, setCardTypeFilter] = useState({});
  const [filteredCards, setFilteredCards] = useState([]);
  const [hideNonDeckCards, setHideNonDeckCards] = useState(false);
  const [packStubsFilter, setPackStubsFilter] = useState([
    {text: 'Owned Packs', value: 'OWNED_PACKS'},
  ]);
  const [searchText, setSearchText] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [useAllPacks, setUseAllPacks] = useState(
    state.ownedReleases.find(({stub}) => stub === 'ALL_PACKS'),
  );
  const [useOwnedPacks, setUseOwnedPacks] = useState(true);
  const {t} = useTranslation();

  useEffect(() => {
    let iterableCards = Object.entries(cards);
    let newCardCound = iterableCards.reduce(
      (accumulator, value) => accumulator + value[1].count,
      0,
    );
    setCardCount(newCardCound);

    let errors = [];
    if (newCardCound > 30) {
      errors.push(t('errors.cards.tooMany'));
    } else if (newCardCound < 30) {
      errors.push(t('errors.cards.tooFew'));
    }

    iterableCards.forEach(card => {
      if (card[1].phoenixborn && card[1].phoenixborn !== phoenixBorn) {
        errors.push(
          t('errors.cards.uniqueCard', {
            cardName: card[1].name,
            phoenixborn: card[1].phoenixborn,
          }),
        );
      }
    });

    setCardErrors(errors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards, phoenixBorn]);

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
          isInDeck(hideNonDeckCards, cards, card.stub) &&
          hasType(cardTypeFilter.value, card.type) &&
          containsSearchString(searchText, card.name, card.text, card.cost) &&
          isFromPack(card.release)
        );
      }),
    );
    // `cards` are not included here so that cards do not filter immediately on
    // removal in case of a misclick.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    hideNonDeckCards,
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
        <Text style={[styles.cardCounter, {color: colors.text}]}>
          {[
            t('deck.cards.cardCount'),
            <Text
              key="2"
              style={{
                color: cardCount !== 30 ? colors.notification : colors.text,
              }}>
              {cardCount} / 30
            </Text>,
          ]}
        </Text>
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
          hideNonDeckCards={hideNonDeckCards}
          packStubs={packStubsFilter}
          setCardType={setCardTypeFilter}
          setHideNonDeckCards={setHideNonDeckCards}
          setPackStubs={onCardFilteredByPack}
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
});

export default CardsScreen;
