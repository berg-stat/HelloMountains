import React from "react";
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';


export default class WeatherDetails extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    const temperature = this.props.data.temperature;
    return (
      <View>
        <Text>Temperatura {temperature}</Text>
      </View>
    );
  }
}
