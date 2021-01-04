/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import Routes from './src/utils/Routes';
import store from './src/utils/Reducers';

//Base view of App, incorporating the redux store, react navigation routes

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
          <Routes/>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
