import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MainView from './screens/MainView';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MainView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
