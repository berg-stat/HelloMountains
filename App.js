import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MainView from './screens/MainView';
import RegisterView from './screens/RegisterView/RegisterView';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <RegisterView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
