import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Http from 'cryptoTracker/src/libs/http';

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
      {loading && <Text>Loading...</Text>}
      <Text>Coins screem</Text>
      <Pressable onPress={handlePress} style={styles.btn}>
        <Text>Ir a detail</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 10,
    textAlign: 'center',
  },
});

export default CoinsScreen;
