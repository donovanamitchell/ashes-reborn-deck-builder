import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomHeader = props => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {colors} = useTheme();

  return (
    <View style={styles.header}>
      <Text numberOfLines={1} style={[styles.title, {color: colors.text}]}>
        {t(props.title)}
      </Text>
      {!props.noIcon && (
        <Icon
          name="photo-library"
          raised
          style={[styles.button, {color: colors.primary}]}
          size={25}
          onPress={() => navigation.navigate('Cards')}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  title: {
    flex: 1,
    paddingLeft: 5,
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default CustomHeader;
