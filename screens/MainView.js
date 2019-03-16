import React from 'react';
import { StyleSheet, View } from 'react-native';

import SettingsButton from '../components/SettingsButton';
import PlacesSearchBar from '../components/PlacesSearchBar';
import Map from '../components/Map';

export default class MainView extends React.Component {
  navigateToPlace = (id) => {
    this.props.navigation.navigate('PlaceDetails', {
      placeId: id,
      weatherPlaceId: id
    })
  };

  render() {
    return (
      <View style={styles.container}>
        <Map
          onMarkerClick={this.navigateToPlace}
        />
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
