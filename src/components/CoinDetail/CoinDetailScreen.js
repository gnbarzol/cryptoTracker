import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  SectionList,
  ActivityIndicator,
  Pressable,
  Alert,
} from 'react-native';
import Color from 'cryptoTracker/src/res/colors';
import Http from 'cryptoTracker/src/libs/http';
import Storage from 'cryptoTracker/src/libs/storage';

import CoinMarketItem from './CoinMarketItem';

const ButtonAdd = ({onPress}) => {
  return (
    <Pressable style={styles.btnFav} onPress={onPress}>
      <Text style={styles.btnText}>Add Favorite</Text>
    </Pressable>
  );
};

const ButtonRemove = ({onPress}) => {
  return (
    <Pressable style={[styles.btnFav, styles.btnRemove]} onPress={onPress}>
      <Text style={styles.btnText}>Delete Favorite</Text>
    </Pressable>
  );
};

const CoinDetailScreen = (props) => {
  const [coin, setCoin] = useState({});
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFav, setIsFav] = useState(false);

  const getMarkets = async (coinId) => {
    setLoading(true);
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    const markets = await Http.instance.get(url);
    setLoading(false);
    setMarkets(markets);
  };

  useEffect(() => {
    const {coin} = props.route.params;
    getFav(coin.id);
    props.navigation.setOptions({title: coin.symbol}); //Change title of screen
    setCoin(coin);
    getMarkets(coin.id);
  }, []);

  const getSections = (coin) => {
    const sections = [
      {
        title: 'Market cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24],
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h],
      },
    ];
    return sections;
  };

  const getSymbolIcon = (coinNameId) => {
    if (coinNameId) {
      let name = coinNameId.toLowerCase().replace(' ', '-');
      return `https://c1.coinlore.com/img/16x16/${name}.png`;
    }
  };

  const generatedRandom = () => {
    return Math.floor(Math.random() * (100 - 0)) + 0;
  };

  const generatedId = () => {
    return `${generatedRandom()}-${generatedRandom()}`;
  };

  const toggleFav = () => {
    isFav ? removeFav() : addFav();
  };

  const addFav = async () => {
    const value = JSON.stringify(coin);
    const key = `favorite-${coin.id}`;

    const stored = await Storage.instance.store(key, value);
    stored && setIsFav(true);
  };

  const removeFav = () => {
    Alert.alert('Remove favorite', 'Are you sure?', [
      {
        text: 'cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: async () => {
          const key = `favorite-${coin.id}`;

          const removed = await Storage.instance.remove(key);
          removed && setIsFav(false);
        },
        style: 'destructive',
      },
    ]);
  };

  const getFav = async (coinId) => {
    try {
      const key = `favorite-${coinId}`;
      const favString = await Storage.instance.get(key);
      favString && setIsFav(true);
    } catch (err) {
      console.log('get favorites err', err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <View style={styles.row}>
          <Image
            style={styles.symbolIcon}
            source={{uri: getSymbolIcon(coin.nameid)}}
          />
          <Text style={styles.titleText}>{coin.name}</Text>
        </View>
        {isFav ? (
          <ButtonRemove onPress={toggleFav} />
        ) : (
          <ButtonAdd onPress={toggleFav} />
        )}
      </View>

      <SectionList
        style={styles.section}
        sections={getSections(coin)}
        keyExtractor={(item) => item}
        renderItem={({item}) => (
          <View style={styles.sectionItem}>
            <Text style={styles.sectionItemText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({section}) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
          </View>
        )}
      />

      <Text style={styles.marketTitle}>Markets</Text>

      {loading && <ActivityIndicator color="#000" size="large" />}
      <FlatList
        style={styles.marketList}
        horizontal={true}
        keyExtractor={(item) => item.name + generatedId()}
        data={markets}
        renderItem={({item}) => <CoinMarketItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.charade,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subHeader: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    color: Color.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  symbolIcon: {
    width: 30,
    height: 30,
  },
  section: {
    maxHeight: 220,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 8,
  },
  sectionHeaderText: {
    color: Color.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionItem: {
    padding: 8,
  },
  sectionItemText: {
    color: Color.white,
    fontSize: 14,
  },
  marketTitle: {
    color: Color.white,
    fontSize: 16,
    margin: 8,
    fontWeight: 'bold',
  },
  marketList: {
    maxHeight: 100,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
  },
  btnFav: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: Color.picton,
  },
  btnRemove: {
    backgroundColor: Color.carmine,
  },
  btnText: {
    color: Color.white,
  },
});

export default CoinDetailScreen;
