import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import {
  SettingsButton,
  PlacesSearchBar,
  Map,
} from '../../components';
import styles from './styles';


export default class MapView extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  static navigationOptions = {
    title: 'Mapa',
    headerStyle: styles.header,
    header: null,
  };

  navigateToPlace = (placeName) => {
    this.props.navigation.navigate('PlaceDetails', {
      placeName: placeName,
    });
  };

  navigateToUserSettings = () => {
    this.props.navigation.navigate('UserSettings');
  };

  render() {
    return (
      <View style={styles.container}>
        <Map
          onMarkerClick={(placeName) => this.navigateToPlace(placeName)}
        />
        <View style={styles.placesSearchBar}>
          <PlacesSearchBar/>
        </View>
        <View style={styles.settingsButton}>
          <SettingsButton onPress={this.navigateToUserSettings}/>
        </View>
      </View>
    );
  }
}
