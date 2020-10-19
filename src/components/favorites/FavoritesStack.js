import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Color from 'cryptoTracker/src/res/colors';

import FavoritesScreen from './FavoritesScreen';

const Stack = createStackNavigator();

const FavoritesStack = () => {
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
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
};

export default FavoritesStack;
