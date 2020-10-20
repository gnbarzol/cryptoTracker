import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Color from 'cryptoTracker/src/res/colors';
import Storage from 'cryptoTracker/src/libs/storage';

import FavoritesEmpty from './FavoritesEmpty';
import CoinItem from 'cryptoTracker/src/components/coins/CoinItem';

const FavoritesScreen = ({navigation}) => {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFavs();
    });
    return unsubscribe;
    // getFavs();
  }, [navigation]);

  const handlePress = (coin) => {
    navigation.navigate('Coin Detail', {coin});
  };

  const getFavs = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys();
      const keys = allKeys.filter((key) => key.includes('favorite-'));
      const responseFavs = await Storage.instance.getAll(keys);
      const favorites = responseFavs.map((fav) => JSON.parse(fav[1]));
      console.log(favorites);
      setFavs(favorites);
    } catch (err) {
      console.log('get favorites err', err);
    }
  };

  return (
    <View style={styles.container}>
      {favs.length > 0 ? (
        <FlatList
          data={favs}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <CoinItem item={item} onPress={() => handlePress(item)} />
          )}
        />
      ) : (
        <FavoritesEmpty />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.charade,
  },
});

export default FavoritesScreen;
