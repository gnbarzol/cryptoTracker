import React from 'react'
import {View, Text, StyleSheet} from 'react-native';
import Color from 'cryptoTracker/src/res/colors'

const CoinMarketItem = ({item}) => {

    return (
        <View style={styles.container}>
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.priceText}>{item.price_usd}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 10,
        borderColor: Color.zircon,
        borderWidth: 1,
        padding: 16,
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    nameText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    priceText: {
        color: '#fff'
    }
})

export default CoinMarketItem
