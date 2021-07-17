import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import SelectBox from './select-box';
import MultiSelectBox from './multi-select-box';

const CardFilter = () => {
  const [cardType, setCardType] = useState('All');
  const [packStubs, setPackStubs] = useState([]);
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.filter}>
      <Text>Packs</Text>
      <MultiSelectBox
        data={[
          {text: 'Owned Packs', value: 'OWNED_PACKS'},
          {text: 'All Packs', value: 'ALL_PACKS'},
          {text: 'Crabs for days', value: 'crabs-for-days'},
          {text: 'Crabs for weeks', value: 'crabs-for-weeks'},
          {text: 'Crabs for months', value: 'crabs-for-months'},
          {text: 'Crabs for years', value: 'crabs-for-years'},
          {text: 'An eternity of crabs', value: 'crabs-for-eternity'},
        ]}
        value={packStubs}
        onChangeValue={items => setPackStubs(items)}
      />
      <Text>Type</Text>
      <SelectBox
        data={[
          {text: 'All', value: ''},
          {text: 'Action Spell', value: 'Action Spell'},
          {text: 'Ally', value: 'Ally'},
          {text: 'Alteration Spell', value: 'Alteration Spell'},
          {text: 'Reaction Spell', value: 'Reaction Spell'},
          {text: 'Ready Spell', value: 'Ready Spell'},
        ]}
        value={cardType}
        onChangeValue={item => setCardType(item.text)}
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
