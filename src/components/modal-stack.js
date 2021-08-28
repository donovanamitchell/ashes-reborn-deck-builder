import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';

import CardModal from './card/card-modal';
import {GlobalContext} from '../store/global-store';
import MainScreen from './main-screen';

const Stack = createStackNavigator();

const themeMap = {
  dark: DarkTheme,
  light: DefaultTheme,
  rightPhoenix: {
    dark: false,
    colors: {
      primary: 'red',
      background: 'yellow',
      card: 'green',
      text: 'blue',
      border: 'purple',
      notification: 'orange',
    },
  },
};

const ModalStack = () => {
  const {theme} = useContext(GlobalContext);

  return (
    <NavigationContainer theme={themeMap[theme]}>
      <Stack.Navigator mode="modal">
        <Stack.Screen
          component={MainScreen}
          options={{headerShown: false}}
          name="Main"
        />
        <Stack.Screen
          component={CardModal}
          name="CardModal"
          options={({route}) => ({
            title: route.params.name || '',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ModalStack;
