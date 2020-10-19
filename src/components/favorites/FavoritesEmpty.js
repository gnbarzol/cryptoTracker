import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Color from 'cryptoTracker/src/res/colors';

const FavoritesEmpty = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textEmpty}>You don't have any favorite yet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.charade,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textEmpty: {
    color: Color.white,
    fontWeight: 'bold',
  },
});

export default FavoritesEmpty;
