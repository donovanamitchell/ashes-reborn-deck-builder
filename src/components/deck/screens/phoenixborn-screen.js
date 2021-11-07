import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  Button,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {debounce, sortedIndexBy} from 'lodash';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Clipboard from '@react-native-clipboard/clipboard';
import {camelCase} from 'lodash';

import {DeckContext} from '../deck-context';
import {GlobalContext} from '../../../store/global-store';
import CardsList from './phoenixborn/cards-list';
import CardView from '../../card/card-view';
import ClearableTextInput from '../../util/clearable-text-input';
import DiceView from '../../dice/dice-view';
import ErrorsList from './phoenixborn/errors-list';
import FirstFive from './phoenixborn/first-five';
import SelectBox from '../../util/select-box';
import {PLAY_FORMATS} from '../../util/constants';

function exportString(t, name, phoenixBorn, sortedDeckCards, dice) {
  console.log(name, phoenixBorn, sortedDeckCards, dice);
  let string = [
    name,
    phoenixBorn,
    Object.entries(dice)
      .flatMap(die => (die[1] ? `${die[1]} ${t('common.dice')[die[0]]}` : []))
      .join('\n'),
    Object.entries(sortedDeckCards)
      .map(
        cards =>
          `${t('common.types')[camelCase(cards[0])]}:\n` +
          cards[1].map(card => `${card.count} ${card.name}`).join('\n') +
          '\n',
      )
      .join('\n'),
  ].join('\n\n');
  console.log(string);
  return string;
}

const PhoenixBornScreen = ({navigation, route}) => {
  const state = useContext(GlobalContext);
  const {
    cardErrors,
    cards,
    description,
    dice,
    filename,
    firstFiveErrors,
    format,
    name,
    phoenixBorn,
    phoenixBornStub,
    setDescription,
    setFormat,
    setName,
    setPhoenixborn,
  } = useContext(DeckContext);
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [phoenixBornCard, setPhoenixbornCard] = useState({});
  const [phoenixBornCards, setPhoenixbornCards] = useState([]);
  const [sortedDeckCards, setSortedDeckCards] = useState([]);

  useEffect(() => {
    let card = state.cards.find(({stub}) => stub === phoenixBornStub) || {};
    if (card.conjurations) {
      card.conjurations = card.conjurations.map(conjuration => {
        let conjurationCard = state.cards.find(
          ({stub}) => stub === conjuration.stub,
        );
        conjuration.count = (conjurationCard && conjurationCard.copies) || 0;
        return conjuration;
      });
    }
    setPhoenixbornCard(card);
  }, [phoenixBornStub, state.cards]);

  useEffect(() => {
    setPhoenixbornCards(
      state.cards.flatMap(card => {
        if (card.type !== 'Phoenixborn') {
          return [];
        }

        return {text: card.name, value: card.stub};
      }),
    );
  }, [state.cards]);

  useEffect(() => {
    let sortedCards = {Conjuration: []};
    if (phoenixBornCard.conjurations) {
      phoenixBornCard.conjurations.forEach(card => {
        sortedCards.Conjuration.splice(
          sortedIndexBy(sortedCards.Conjuration, card, x => x.name),
          0,
          card,
        );
      });
    }
    Object.entries(cards).forEach(value => {
      let card = value[1];
      if (!sortedCards[card.type]) {
        sortedCards[card.type] = [];
      }
      if (card.conjurations) {
        card.conjurations.forEach(conjuration => {
          let index = sortedIndexBy(
            sortedCards.Conjuration,
            conjuration,
            x => x.name,
          );
          if (
            sortedCards.Conjuration[index] &&
            sortedCards.Conjuration[index].stub !== conjuration.stub
          ) {
            sortedCards.Conjuration.splice(index, 0, conjuration);
          }
        });
      }
      sortedCards[card.type].splice(
        sortedIndexBy(sortedCards[card.type], card, x => x.name),
        0,
        card,
      );
    });
    if (sortedCards.Conjuration.length <= 0) {
      delete sortedCards.Conjuration;
    }
    setSortedDeckCards(sortedCards);
  }, [cards, phoenixBornCard]);

  const debouncedRef = useRef(debounce(func => func(), 1000)).current;

  function shortenedDeck(overrides) {
    return Object.assign(
      {
        name: name,
        phoenixBorn: phoenixBorn,
        phoenixBornStub: phoenixBornStub,
        filename: filename,
      },
      overrides,
    );
  }

  const playFormatSelections = PLAY_FORMATS.map(value => {
    return {text: t(`common.formats.${value}`), value: value};
  });

  return (
    <ScrollView style={styles.container}>
      <View key="main" style={[styles.container, styles.editSection]}>
        <Text style={[styles.headerText, {color: colors.text}]}>
          {t('deck.main.name')}
        </Text>
        <ClearableTextInput
          onChangeText={text => {
            setName(text);
            state.updateDeck(shortenedDeck({name: text}));
            debouncedRef(state.saveDecks);
          }}
          placeholder={t('deck.main.namePlaceholder')}
          placeholderTextColor={colors.border}
          value={name}
        />
        <Text style={[styles.headerText, {color: colors.text}]}>
          {t('deck.main.phoenixborn')}
        </Text>
        <SelectBox
          value={{text: phoenixBorn, value: phoenixBornStub}}
          onChangeValue={item => {
            setPhoenixborn(item.text, item.value);
            state.updateDeck(
              shortenedDeck({
                phoenixBornStub: item.value,
                phoenixBorn: item.text,
              }),
            );
            state.saveDecks();
          }}
          data={phoenixBornCards}
        />
        {phoenixBornStub && phoenixBornCard && (
          <CardView
            style={[styles.cardView, {color: colors.text}]}
            card={phoenixBornCard}
          />
        )}
        <Text style={[styles.headerText, {color: colors.text}]}>
          {t('deck.main.description')}
        </Text>
        <TextInput
          style={[
            styles.multilineTextInput,
            {
              color: colors.text,
              borderColor: colors.border,
              backgroundColor: colors.card,
            },
          ]}
          multiline
          value={description}
          placeholder={t('deck.main.descriptionPlaceholder')}
          placeholderTextColor={colors.border}
          onChangeText={text => setDescription(text)}
        />
        <Text style={[styles.headerText, {color: colors.text}]}>
          {t('deck.main.format')}
        </Text>
        <SelectBox
          value={{text: t(`common.formats.${format}`), value: format}}
          onChangeValue={item => {
            setFormat(item.value);
          }}
          data={playFormatSelections}
        />
        <ErrorsList
          cardErrors={cardErrors}
          firstFiveErrors={firstFiveErrors}
          errorColor={colors.notification}
        />
        <Text style={[styles.headerText, {color: colors.text}]}>
          {t('deck.main.dice')}
        </Text>
        <DiceView dice={dice} />
        <Text style={[styles.headerText, {color: colors.text}]}>
          {t('deck.main.firstFive')}
        </Text>
        <FirstFive />
        <Text style={[styles.headerText, {color: colors.text}]}>
          {t('deck.main.cards')}
        </Text>
        <View style={styles.cardsListContainer}>
          <CardsList
            linkColor={colors.primary}
            textColor={colors.text}
            navigation={navigation}
            sortedDeckCards={sortedDeckCards}
          />
        </View>
        <Button
          title={t('deck.main.copy')}
          color={colors.primary}
          onPress={() =>
            Clipboard.setString(
              exportString(t, name, phoenixBorn, sortedDeckCards, dice),
            )
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardsList: {
    flexDirection: 'row',
    padding: 5,
  },
  cardsListContainer: {
    paddingBottom: 5,
  },
  container: {
    flex: 1,
  },
  editSection: {
    padding: 15,
  },
  multilineTextInput: {
    paddingVertical: 0,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 2,
  },
  cardView: {
    paddingTop: 10,
  },
  headerText: {
    fontWeight: 'bold',
  },
});

export default PhoenixBornScreen;
