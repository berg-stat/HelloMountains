import React from 'react';
import { StyleSheet } from 'react-native';
import { MapView } from 'expo';

export default class Map extends React.Component {
  render() {
    return (
      <MapView
        initialRegion={{
          latitude: 49.1794,
          longitude: 20.0881,
          latitudeDelta: 0.35,
          longitudeDelta: 0.35
        }}
        provider="google"
        style={styles.map}
      >
        <MapView.Marker
          coordinate={{ latitude: 49.1794, longitude: 20.0881 }}
        />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});
