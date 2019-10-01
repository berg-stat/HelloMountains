import React, { Component } from 'react';
import { ActivityIndicator, Alert, Platform, StyleSheet, View } from 'react-native';
import { MapView } from 'expo';
import PropTypes from 'prop-types';
import axios from 'axios';

import { deviceStorage } from '../services';
import COLOR from '../consts/colors';
import ERROR from '../consts/errors';

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loader: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default class Map extends Component {
  static propTypes = {
    onMarkerClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      markers: null,
      isLoading: true,
    };
  };

  async componentDidMount() {
    const token = `Bearer ${await deviceStorage.getItem('id_token')}`;
    this.fetchPlaces(token);
  };

  fetchPlaces(token) {
    axios.get('/places',
      {
        headers: {
          Authorization: token,
        }
      })
      .then(response => {
        this.setState({isLoading: false});
        this.addPlacesFromResponseToState(response);
      })
      .catch(error => {
        this.setState({isLoading: false});
        Alert.alert(
          'Błąd',
          `${ERROR[error.response.data.message]}`,
          [
            { text: 'OK' },
          ],
          { cancelable: false },
        );
      });
  };

  addPlacesFromResponseToState(response) {
    this.setState({
      markers: response.data.places.map(place => {
        return (
          <MapView.Marker
            key={place.name}
            coordinate={{
              latitude: place.coordinates.latitude,
              longitude: place.coordinates.longitude
            }}
            onPress={() => this.props.onMarkerClick(place.name)}
            image={require('../assets/mapMarker.png')}
          />
        );
      })
    });
  };

  render() {
    const { markers, isLoading } = this.state;

    return (
      <View style={styles.map}>
      <MapView
        initialRegion={{
          latitude: 49.1794,
          longitude: 20.0881,
          latitudeDelta: 0.10,
          longitudeDelta: 0.10,
        }}
        provider="google"
        style={styles.map}
      >
        {markers}
      </MapView>
        {isLoading && (<ActivityIndicator style={styles.loader} size={Platform.OS === 'android' ? 70 : 'large'} color={COLOR.MAP_LOADER}/>)}
      </View>
    );
  }
}
