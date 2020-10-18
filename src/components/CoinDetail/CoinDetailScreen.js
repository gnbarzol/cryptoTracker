import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  SectionList,
} from 'react-native';
import Color from 'cryptoTracker/src/res/colors';
import Http from 'cryptoTracker/src/libs/http';

import CoinMarketItem from './CoinMarketItem';

const CoinDetailScreen = (props) => {
  const [coin, setCoin] = useState({});
  const [markets, setMarkets] = useState([]);

  getMarkets = async (coinId) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    const markets = await Http.instance.get(url);
    setMarkets(markets);
  };

  useEffect(() => {
    const {coin} = props.route.params;
    props.navigation.setOptions({title: coin.symbol}); //Change title of screen
    getMarkets(coin.id);
    setCoin(coin);
  }, []);

  getSections = (coin) => {
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

  getSymbolIcon = (coinNameId) => {
    if (coinNameId) {
      let name = coinNameId.toLowerCase().replace(' ', '-');
      return `https://c1.coinlore.com/img/16x16/${name}.png`;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <Image
          style={styles.symbolIcon}
          source={{uri: getSymbolIcon(coin.nameid)}}
        />
        <Text style={styles.titleText}>{coin.name}</Text>
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

      <FlatList
      style={styles.marketList}
        horizontal={true}
        keyExtractor={(item) => `${item.base}-${item.name}-${item.quote}`}
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
  subHeader: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
  },
  titleText: {
    color: '#fff',
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
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionItem: {
    padding: 8,
  },
  sectionItemText: {
    color: '#fff',
    fontSize: 14,
  },
  marketTitle: {
    color: '#fff',
    fontSize: 16,
    margin: 8,
    fontWeight: 'bold'
  },
  marketList: {
    maxHeight: 100,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8
  }
});

export default CoinDetailScreen;
