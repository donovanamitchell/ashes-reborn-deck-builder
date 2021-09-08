import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {camelCase} from 'lodash';

import SelectBox from './select-box';
import MultiSelectBox from './multi-select-box';
import {GlobalContext} from '../../store/global-store';

const CardFilter = ({
  cardType,
  cardTypes,
  hideNonDeckCards,
  packStubs,
  setCardType,
  setHideNonDeckCards,
  setPackStubs,
}) => {
  const {releases} = useContext(GlobalContext);
  const [releaseData, setReleaseData] = useState([]);
  const [cardTypeData, setCardTypeData] = useState([]);

  const {colors} = useTheme();
  const {t} = useTranslation();

  useEffect(() => {
    setReleaseData(
      [
        {text: t('common.ownedPacks'), value: 'OWNED_PACKS'},
        {text: t('common.all'), value: 'ALL_PACKS'},
      ].concat(
        releases.map(release => {
          return {text: release.name, value: release.stub};
        }),
      ),
    );
  }, [releases, t]);

  useEffect(() => {
    setCardTypeData(
      [{text: t('common.all'), value: ''}].concat(
        cardTypes.map(type => {
          return {text: t(`common.types.${camelCase(type)}`), value: type};
        }),
      ),
    );
  }, [cardTypes, t]);

  return (
    <View style={[styles.filter, {borderBottomColor: colors.border}]}>
      <Text style={{color: colors.text}}>{t('deck.cards.packs')}</Text>
      <MultiSelectBox
        data={releaseData}
        value={packStubs}
        onChangeValue={items => setPackStubs(items)}
      />
      <Text style={{color: colors.text}}>{t('deck.cards.type')}</Text>
      <SelectBox
        data={cardTypeData}
        value={cardType}
        onChangeValue={item => setCardType(item)}
      />
      {setHideNonDeckCards && (
        <>
          <Text style={{color: colors.text}}>
            {t('deck.cards.showCardsSwitch')}
          </Text>
          <Switch
            trackColor={{false: colors.border, true: colors.border}}
            thumbColor={colors.primary}
            style={styles.switch}
            value={hideNonDeckCards}
            onValueChange={() => setHideNonDeckCards(!hideNonDeckCards)}
          />
        </>
      )}
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
