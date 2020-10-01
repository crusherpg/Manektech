import 'react-native-gesture-handler';
import React from 'react';
import {View} from 'react-native';
import {AppContainer} from './src/config/routes';
import { Provider } from 'react-redux'; 
import configureStore from './src/store/configureStore';

const store = configureStore();
console.disableYellowBox = true;

function App() {
  return (
      <Provider store={store}>
          <AppContainer />
      </Provider>
  );
}

export default App;