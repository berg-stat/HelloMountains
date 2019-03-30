import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import SettingsButton from '../../components/SettingsButton';
import PlacesSearchBar from '../../components/PlacesSearchBar';
import Map from '../../components/Map';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  settingsButton: {
    alignItems: 'flex-end',
  },
  placesSearchBar: {
    marginTop: '7%',
  },
});

export default class MainView extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  navigateToPlace = (id) => {
    this.props.navigation.navigate('PlaceDetails', {
      placeId: id,
      weatherPlaceId: id,
    });
  };

  navigateToUserSettings = () => {
    this.props.navigation.navigate('UserSettings');
  }

  render() {
    return (
      <View style={styles.container}>
        <Map
          onMarkerClick={() => this.navigateToPlace(1)}
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
