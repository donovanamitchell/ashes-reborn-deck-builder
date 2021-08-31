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
import i18n from './src/i18n/i18n';

const errorHandler = error => {
  Alert.alert(
    error.name,
    i18n.t('errors.githubIssue', {stacktrace: error.stack}),
    [{text: i18n.t('errors.ok')}],
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
