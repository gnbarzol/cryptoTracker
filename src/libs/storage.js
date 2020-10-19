import AsyncStorage from '@react-native-community/async-storage';

class Storage {
  static instance = new Storage(); //Singleton Aplied

  store = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (err) {
      console.log('Storage store err', err);
      return false;
    }
  };

  get = async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (err) {
      console.log('Storage get err', err);
      throw new Error(err);
    }
  };

  remove = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (err) {
      console.log('Storage remove err', err);
      return false;
    }
  };

  getAll = async (keys) => {
    try {
      return await AsyncStorage.multiGet(keys);
    } catch (err) {
      console.log('Storage getAll err', err);
      throw new Error(err);
    }
  };

  getAllKeys = async () => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (err) {
      console.log('Storage getAllKeys err', err);
      throw new Error(err);
    }
  };
}

export default Storage;
