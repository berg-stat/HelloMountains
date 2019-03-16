import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MapView } from 'expo';

import SettingsButton from '../components/SettingsButton';
import PlacesSearch from '../components/SearchBar';

export default class MainView extends React.Component {
  render() {
    return (
      <View
        style={{
          ...styles.containter,
          ...styles.map
        }}
      >
        <MapView
          initialRegion={{
            latitude: 49.1794,
            longitude: 20.0881,
            latitudeDelta: 0.35,
            longitudeDelta: 0.35
          }}
          provider="google"
          style={styles.map}
        />
        <View style={{ marginTop: '7%' }}>
          <PlacesSearch />
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
    justifyContent: 'space-between'
  },
  map: {
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
