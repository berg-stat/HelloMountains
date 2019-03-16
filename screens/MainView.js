import React from 'react';
import { StyleSheet, View } from 'react-native';

import SettingsButton from '../components/SettingsButton';
import PlacesSearchBar from '../components/PlacesSearchBar';
import Map from '../components/Map';

export default class MainView extends React.Component {
  render() {
    return (
      <View
        style={{
          ...styles.containter,
          ...styles.map
        }}
      >
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
  containter: {
    flex: 1,
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  settingsButton: {
    alignItems: 'flex-end'
  }
});
