/**
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {Alert} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {setJSExceptionHandler} from 'react-native-exception-handler';

import {GlobalContextProvider} from './src/store/global-store';
import ModalStack from './src/components/modal-stack';

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
        <ModalStack />
      </GlobalContextProvider>
    </SafeAreaProvider>
  );
};

export default App;
