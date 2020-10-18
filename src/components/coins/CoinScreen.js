import React, {useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import Http from 'cryptoTracker/src/libs/http';
import CoinItem from './CoinItem';

import Color from 'cryptoTracker/src/res/colors'

const CoinsScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [coins, setCoins] = useState([]);

  const getData = async () => {
    setLoading(true);
    const response = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );
    setCoins(response.data);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  handlePress = () => {
    props.navigation.navigate('Coin Detail');
  };

  return (
    <View style={styles.container}>
        {loading && <ActivityIndicator color="#000" size="large" style={styles.loader} />}
        <FlatList
          data={coins}
          renderItem={({item}) => <CoinItem item={item} />}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.charade,
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 10,
    textAlign: 'center',
  },
  loader: {
      marginTop: 10
  }
});

export default CoinsScreen;
