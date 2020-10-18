import React, {Component} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

class CoinsScreen extends Component {

    handlePress = () => {
        this.props.navigation.navigate('Coin Detail')
    }

  render() {
    return (
      <View style={styles.container}>
        <Text>Coins screem</Text>
        <Pressable onPress={this.handlePress} style={styles.btn}>
            <Text>Ir a detail</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'red'
    },
    btn: {
        padding: 8,
        backgroundColor: 'blue',
        borderRadius: 10,
        textAlign: 'center'
    }

})

export default CoinsScreen;
