import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import SelectBox from '../../util/select-box';
import {DeckContext} from '../deck-context';
import CardImage from '../../card/card-image';
import {TOURNAMENT_CHAINED_LIST} from '../../util/constants';

const HandScreen = () => {
  const {
    firstFive,
    cards,
    format,
    firstFiveErrors,
    setFirstFive,
    setFirstFiveErrors,
  } = useContext(DeckContext);
  const [sortedCards, setSortedCards] = useState([]);

  useEffect(() => {
    let sorted = Object.entries(cards)
      .sort((first, second) => {
        if (first[1].name < second[1].name) {
          return -1;
        }
        if (first[1].name > second[1].name) {
          return 1;
        }
        return 0;
      })
      .map(card => {
        return {text: card[1].name, value: card[1].stub};
      });
    setSortedCards(sorted);
  }, [cards]);

  useEffect(() => {
    let cardHash = {};
    let errors = [];
    firstFive.forEach((card, index) => {
      if (!card) {
        return;
      }
      if (
        format === 'Tournament' &&
        TOURNAMENT_CHAINED_LIST.includes(card.stub)
      ) {
        errors[index] = `${card.name} is Chained cannot be in the first five`;
      }
      if (cardHash[card.stub]) {
        cardHash[card.stub].count++;
      } else {
        cardHash[card.stub] = {
          count: 1,
          copies: cards[card.stub] && cards[card.stub].count,
        };
      }
      if (!cardHash[card.stub].copies) {
        errors[index] = `There are no copies of ${card.name} in this deck`;
      } else if (cardHash[card.stub].count > cardHash[card.stub].copies) {
        errors[
          index
        ] = `There are too many copies of ${card.name} in the first five`;
      }
    });
    setFirstFiveErrors(errors);
    // Adding setFirstFiveError to the dependancy list will cause infinite
    // updates due to the stange things that the deck context needs for react
    // navigation to work
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstFive, cards]);

  function cardSelector(index) {
    return (
      <View key={index} style={styles.cardView}>
        <View style={styles.selectBoxView}>
          <SelectBox
            value={{
              text: firstFive[index] && firstFive[index].name,
              value: firstFive[index] && firstFive[index].stub,
            }}
            onChangeValue={item => {
              setFirstFive(index, {name: item.text, stub: item.value});
            }}
            data={sortedCards}
          />
          <Text style={styles.errorText}>{firstFiveErrors[index]}</Text>
        </View>
        <CardImage
          style={styles.image}
          stub={(firstFive[index] && firstFive[index].stub) || 'card-back'}
          name={(firstFive[index] && firstFive[index].name) || ''}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {[
        cardSelector(0),
        cardSelector(1),
        cardSelector(2),
        cardSelector(3),
        cardSelector(4),
      ]}
    </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  errorText: {
    color: 'red',
  },
  image: {
    width: '20%',
    flexWrap: 'wrap',
  },
  selectBoxView: {
    width: '80%',
    paddingRight: 5,
  },
});

export default HandScreen;
