/**
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useContext, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import GlobalStore from './src/store/global-store';

import CardModal from './src/components/card/card-modal';
import MainScreen from './src/components/main-screen';

const ModalStack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <GlobalStore>
        <NavigationContainer>
          <ModalStack.Navigator mode="modal">
            <ModalStack.Screen
              component={MainScreen}
              options={{headerShown: false}}
              name="Main"
            />
            <ModalStack.Screen
              component={CardModal}
              name="CardModal"
              options={({route}) => ({title: route.params.name})}
            />
          </ModalStack.Navigator>
        </NavigationContainer>
      </GlobalStore>
    </SafeAreaProvider>
  );
};

export default App;
