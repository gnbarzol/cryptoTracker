import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CoinsScreen from './CoinScreen';
import CoinDetailScreen from './CoinDetailScreen';

import Color from 'cryptoTracker/src/res/colors';

const Stack = createStackNavigator();

const CoinStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Color.blackPearl,
          // shadowOpacity: 0,
          shadowColor: Color.blackPearl,
        },
        headerTintColor: Color.white,
      }}>
      <Stack.Screen name="Coins" component={CoinsScreen} />
      <Stack.Screen name="Coin Detail" component={CoinDetailScreen} />
    </Stack.Navigator>
  );
};

export default CoinStack;
