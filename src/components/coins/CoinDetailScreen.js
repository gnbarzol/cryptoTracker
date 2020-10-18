import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

const CoinDetailScreen = (props) => {
  const { coin } = props.route.params;

  return (
    <View>
      <Text>{coin.name}</Text>
    </View>
  );
};

export default CoinDetailScreen;
