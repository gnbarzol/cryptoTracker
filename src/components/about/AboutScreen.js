import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Color from 'cryptoTracker/src/res/colors';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imgShadow}>
        <Image
          style={styles.imgProfile}
          source={{
            uri:
              'https://res.cloudinary.com/duo6yoqmy/image/upload/v1599967553/profile_difxb3.jpg',
          }}
        />
      </View>
      <Text style={styles.text}>Developed by Gary Barzola </Text>
      <Text style={styles.text}>Guayaquil, Ecuador </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.charade,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Color.white,
  },
  imgProfile: {
    width: 100,
    height: 100,
    margin: 16,
    borderRadius: 50,
  },
  imgShadow: {
    shadowColor: Color.white,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 5.46,
    shadowOpacity: 0.3,
    elevation: 9,
  }
});

export default AboutScreen;
