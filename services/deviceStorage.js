import { AsyncStorage } from 'react-native';


const deviceStorage = {
  async saveItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(`AsyncStorage Error: ${error.message}`);
    }
  },

  async deleteItem(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`AsyncStorage Error: ${error.message}`);
    }
  },

  async getItem(key) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(`AsyncStorage Error: ${error.message}`);
    }
  }
};

export default deviceStorage;
