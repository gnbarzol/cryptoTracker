import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import CoinStack from 'cryptoTracker/src/components/coins/CoinStack';
import FavoritesStack from 'cryptoTracker/src/components/favorites/FavoritesStack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Color from 'cryptoTracker/src/res/colors';
import { Image } from 'react-native';

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions= {{
          tintColor: '#fefefe',
          style: {
            backgroundColor: Color.blackPearl,
          }
        }}
      >
        <Tabs.Screen 
          name="coins"
          component={CoinStack}
          options={{
            tabBarIcon: ({size, color}) => (
              <Image 
                style={{tintColor: color, width: size, height: size}}
                source={require('cryptoTracker/src/assets/bank.png')}
              />
            )
          }}
        />
        <Tabs.Screen 
          name="Favorites"
          component={FavoritesStack}
          options={{
            tabBarIcon: ({size, color}) => (
              <Image 
                style={{tintColor: color, width: size, height: size}}
                source={require('cryptoTracker/src/assets/star.png')}
              />
            )
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;
