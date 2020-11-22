import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  PixelRatio,
} from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import PropTypes from 'prop-types';
import axios from 'axios';

import ERROR from '../consts/errors';
import COLOR from '../consts/colors';
import { deviceStorage } from '../services';


const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingLeft: PixelRatio.getPixelSizeForLayoutSize(6),
    paddingRight: PixelRatio.getPixelSizeForLayoutSize(6),
    paddingBottom: PixelRatio.getPixelSizeForLayoutSize(4),
    backgroundColor: COLOR.DARK_BLUE,
    color: COLOR.WHITE,
  },
  placeName: {
    marginBottom: '2%',
    fontSize: responsiveFontSize(4),
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLOR.WHITE,
  },
  infoText: {
    fontSize: 20,
    color: COLOR.WHITE,
  },
});

export default class DetailsPanel extends Component {
  static propTypes = {
    placeName: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      placeName: props.placeName,
      elevation: null,
    };
  };

  async componentDidMount() {
    const token = `Bearer ${await deviceStorage.getItem('id_token')}`;
    this.fetchPlaceInfo(token);
  }

  fetchPlaceInfo(token) {
    const url = `places/${this.state.placeName}`;

    axios.get(url,
      {
        headers: {
          Authorization: token,
        }
      })
      .then(response => {
        this.setState({ elevation: response.data.place.coordinates.elevation })
      })
      .catch(error => {
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

  render() {
    const { placeName, elevation } = this.state;
    return (
      <View style={styles.container}>
        <Text numberOfLines={1} style={styles.placeName}>{placeName}</Text>
        <Text style={styles.infoText}>{elevation}</Text>
      </View>
    );
  }
}

