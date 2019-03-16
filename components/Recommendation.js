import React from "react";
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';


export default class Recommendation extends React.Component {
  static propTypes = {
    recommendation: PropTypes.object.isRequired,
  };

  render() {
    const recommendation = this.props.recommendation;
    return (
      <View>
        <Text>{recommendation.rating}* {recommendation.text}</Text>
      </View>
    );
  }
}
