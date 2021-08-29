import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import SelectBox from './select-box';
import MultiSelectBox from './multi-select-box';
import {GlobalContext} from '../../store/global-store';
import {ADDABLE_CARD_TYPES} from './constants';

const CARD_TYPE_DATA = [{text: 'All', value: ''}].concat(
  ADDABLE_CARD_TYPES.map(type => {
    return {text: type, value: type};
  }),
);

const CardFilter = ({
  cardType,
  hideNonDeckCards,
  packStubs,
  setCardType,
  setHideNonDeckCards,
  setPackStubs,
}) => {
  const {releases} = useContext(GlobalContext);
  const [releaseData, setReleaseData] = useState([]);

  const {colors} = useTheme();

  useEffect(() => {
    setReleaseData(
      [
        {text: 'Owned Packs', value: 'OWNED_PACKS'},
        {text: 'All', value: 'ALL_PACKS'},
      ].concat(
        releases.map(release => {
          return {text: release.name, value: release.stub};
        }),
      ),
    );
  }, [releases]);

  return (
    <View style={[styles.filter, {borderBottomColor: colors.border}]}>
      <Text style={{color: colors.text}}>Packs</Text>
      <MultiSelectBox
        data={releaseData}
        value={packStubs}
        onChangeValue={items => setPackStubs(items)}
      />
      <Text style={{color: colors.text}}>Type</Text>
      <SelectBox
        data={CARD_TYPE_DATA}
        value={cardType}
        onChangeValue={item => setCardType(item)}
      />
      <Text style={{color: colors.text}}>Show Included Cards</Text>
      <Switch
        trackColor={{false: colors.border, true: colors.border}}
        thumbColor={colors.primary}
        style={styles.switch}
        value={hideNonDeckCards}
        onValueChange={() => setHideNonDeckCards(!hideNonDeckCards)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filter: {
    padding: 7,
    borderBottomWidth: 2,
  },
  switch: {
    alignSelf: 'flex-start',
  },
});

export default CardFilter;
