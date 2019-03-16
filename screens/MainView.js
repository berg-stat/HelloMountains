import React from 'react';
import { StyleSheet, View } from 'react-native';

import SettingsButton from '../components/SettingsButton';
import PlacesSearchBar from '../components/PlacesSearchBar';
import Map from '../components/Map';

export default class MainView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Map />
        <View style={{ marginTop: '7%' }}>
          <PlacesSearchBar />
        </View>
        <View style={styles.settingsButton}>
          <SettingsButton />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  settingsButton: {
    alignItems: 'flex-end'
  }
});
