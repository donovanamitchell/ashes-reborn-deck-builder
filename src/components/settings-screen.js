import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {GlobalContext} from '../store/global-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  const state = useContext(GlobalContext);

  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <Text>TODO: have some settings</Text>
      <Text>Cache</Text>
      {/* TODO: Add card data clear and check for updates button */}
      <Button
        title="Nuke Cache"
        onPress={() => {
          AsyncStorage.clear();
        }}
      />
      <Button
        title="Decks"
        onPress={() => this.props.navigation.navigate('Decks')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SettingsScreen;
