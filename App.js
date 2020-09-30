import 'react-native-gesture-handler';
import React from 'react';
import {View} from 'react-native';
import {AppContainer} from './src/config/routes';
console.disableYellowBox = true;

function App() {
  return (
    <View style={{flex:1}}>
      <AppContainer />
    </View>
  );
}

export default App;