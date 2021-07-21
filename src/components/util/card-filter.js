import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
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
  packStubs,
  searchText,
  setCardType,
  setPackStubs,
  setSearchText,
}) => {
  const {releases} = useContext(GlobalContext);
  const [releaseData, setReleaseData] = useState([]);

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
    <View style={styles.filter}>
      <Text>Packs</Text>
      <MultiSelectBox
        data={releaseData}
        value={packStubs}
        onChangeValue={items => setPackStubs(items)}
      />
      <Text>Type</Text>
      <SelectBox
        data={CARD_TYPE_DATA}
        value={cardType}
        onChangeValue={item => setCardType(item)}
      />
      <Text>Search</Text>
      <TextInput
        style={styles.button}
        onChangeText={text => setSearchText(text)}
        value={searchText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filter: {
    padding: 7,
    backgroundColor: 'white',
  },
  button: {
    borderRadius: 6,
    borderColor: 'lightgrey',
    borderWidth: 2,
  },
});

export default CardFilter;
