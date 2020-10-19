import React, {useState} from 'react';
import {View, TextInput, Platform, StyleSheet} from 'react-native';

import Color from 'cryptoTracker/src/res/colors';

const CoinSearch = ({onChange}) => {
  const [text, setText] = useState('');

  const handleText = (text) => {
    setText(text);
    onChange && onChange(text);
  };

  return (
    <View>
      <TextInput
        style={[
          styles.textInput,
          Platform.OS == 'ios' ? styles.textInputIOS : styles.textInputAndroid,
        ]}
        onChangeText={handleText}
        value={text}
        placeholder="Search coin"
        placeholderTextColor="#fff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: Color.zircon,
    paddingLeft: 16,
    color: '#fff'
  },
  textInputAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: Color.zircon,
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8,
  },
});

export default CoinSearch;
