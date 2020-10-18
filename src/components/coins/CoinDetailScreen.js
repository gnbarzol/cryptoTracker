import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, SectionList} from 'react-native';
import Color from 'cryptoTracker/src/res/colors';

const CoinDetailScreen = (props) => {
  const [coin, setCoin] = useState({});

  useEffect(() => {
    const {coin} = props.route.params;
    props.navigation.setOptions({title: coin.symbol}); //Change title of screen
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
});

export default CoinDetailScreen;
