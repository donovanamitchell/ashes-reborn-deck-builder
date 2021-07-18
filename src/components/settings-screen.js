import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Context} from '../store/global-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  const [state, dispatch] = useContext(Context);

  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <Text>TODO: have some settings</Text>
      <Text>Cache</Text>
      {/* TODO: Add card data clear and check for updates button */}
      <Button
        title="Reset Releases"
        onPress={() => dispatch({type: 'RESET_RELEASES'})}
      />
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
