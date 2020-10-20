import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AboutScreen from './AboutScreen';
import Color from 'cryptoTracker/src/res/colors';

const Stack = createStackNavigator();

const AboutStack = () => {
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
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
};

export default AboutStack;
