import React from "react";
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/MaterialIcons";
import COLOR from '../consts/colors';


export default class Recommendation extends React.Component {
  static propTypes = {
    recommendation: PropTypes.object.isRequired,
  };

  __renderStars = (number) => {
    return new Array(number).map((i) => <Icon key={i} name="star" size={12} color={COLOR.DIM_GRAY}/>);
  };

  render() {
    const { text, rating } = this.props.recommendation;
    return (
      <View style={{ alignContent: 'space-between' }}>
        {this.__renderStars(rating)}
        <Text>{text}</Text>
      </View>
    );
  }
}
