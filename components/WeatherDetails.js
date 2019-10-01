import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import COLOR from '../consts/colors';


const styles = StyleSheet.create({
  temperatureText: {
    fontSize: 20,
    color: COLOR.WHITE,
  }
});

export default class WeatherDetails extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    const { temperature } = this.props.data;
    return (
      <View>
        <Text style={styles.temperatureText}>Temperatura {temperature}&deg;C</Text>
      </View>
    );
  }
}
