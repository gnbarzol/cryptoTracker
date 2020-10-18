import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import CoinStack from 'cryptoTracker/src/components/coins/CoinStack';

const App = () => {
  return (
    <NavigationContainer>
      <CoinStack />
    </NavigationContainer>
  );
};

export default App;
