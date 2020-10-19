import React from 'react'
import { View, StyleSheet } from 'react-native';
import Color from 'cryptoTracker/src/res/colors';

import FavoritesEmpty from './FavoritesEmpty';

const FavoritesScreen = () => {
    return (
        <View style={styles.container}>
            <FavoritesEmpty />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.charade
    },
})

export default FavoritesScreen
