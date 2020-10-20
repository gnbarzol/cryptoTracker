import React, {useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import Http from 'cryptoTracker/src/libs/http';
import CoinItem from './CoinItem';
import CoinSearch from './CoinSearch';

import Color from 'cryptoTracker/src/res/colors';

const CoinsScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [coins, setCoins] = useState([]);
  const [allCoins, setAllCoins] = useState([]);

  const getData = async () => {
    setLoading(true);
    const response = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );
    setCoins(response.data);
    setAllCoins(response.data);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  const handlePress = (coin) => {
    props.navigation.navigate('Coin Detail', {coin});
  };

  const handleSearch = (text) => {
    const coinFiltered = allCoins.filter((coin) =>
      coin.name.toLowerCase().includes(text.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(text.toLowerCase())
    );

    setCoins(coinFiltered);
  };

  return (
    <View style={styles.container}>
      <CoinSearch onChange={handleSearch} />
      {loading && (
        <ActivityIndicator color="#000" size="large" style={styles.loader} />
      )}
      <FlatList
        data={coins}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <CoinItem item={item} onPress={() => handlePress(item)} />
        )}
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
    marginTop: 10,
  },
});

export default CoinsScreen;
