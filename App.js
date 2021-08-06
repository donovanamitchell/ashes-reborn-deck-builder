/**
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {setJSExceptionHandler} from 'react-native-exception-handler';

import {GlobalContextProvider} from './src/store/global-store';
import CardModal from './src/components/card/card-modal';
import MainScreen from './src/components/main-screen';

const ModalStack = createStackNavigator();
const errorHandler = error => {
  Alert.alert(
    error.name,
    `Please create an issue in the ashes-reborn-deck-builder github repository.\n\n${error.stack}`,
    [{text: 'OK'}],
  );
};

setJSExceptionHandler(errorHandler, false);

const App = () => {
  return (
    <SafeAreaProvider>
      <GlobalContextProvider>
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
              options={({route}) => ({
                title: route.params.name || '',
              })}
            />
          </ModalStack.Navigator>
        </NavigationContainer>
      </GlobalContextProvider>
    </SafeAreaProvider>
  );
};

export default App;
