import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { MapView } from 'expo';

const db = {
  places: [
    {
      id: 1,
      name: 'Rysy',
      latitude: 49.1794,
      longitude: 20.0881,
    },
    {
      id: 2,
      name: 'Kasprowy Wierch',
      latitude: 49.225,
      longitude: 19.975,
    },
    {
      id: 3,
      name: 'Czarny Staw',
      latitude: 49.186,
      longitude: 20.073,
    },
  ],
};


const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default class Map extends React.Component {
  static propTypes = {
    onMarkerClick: PropTypes.func.isRequired,
  };

  renderMarker() {
    const placesList = db.places;
    return placesList.map(place => (
      <MapView.Marker
        key={place.id}
        coordinate={{ latitude: place.latitude, longitude: place.longitude }}
        onPress={() => this.props.onMarkerClick(place.id)}
      />
    ));
  }

  render() {
    return (
      <MapView
        initialRegion={{
          latitude: 49.1794,
          longitude: 20.0881,
          latitudeDelta: 0.35,
          longitudeDelta: 0.35,
        }}
        provider="google"
        style={styles.map}
      >
        {this.renderMarker()}
      </MapView>
    );
  }
}
