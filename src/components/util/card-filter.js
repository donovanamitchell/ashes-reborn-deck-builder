import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import SelectBox from './select-box';

const CARD_TYPES = [
  'conjurations',
  'phoenixborn',
  'ally',
  'action_spell',
  'reaction_spell',
  'alteration_spell',
  'ready_spell',
  'conjuration',
  'conjured_alteration_spell',
];

const CardFilter = () => {
  const [cardType, setCardType] = useState('All');
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.filter}>
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
