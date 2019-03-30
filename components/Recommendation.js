import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLOR from '../consts/colors';

const styles = StyleSheet.create({
  recommendation: {
    alignContent: 'space-between',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  starsContainer: {
    flexDirection: 'row',
  },
});

export default class Recommendation extends React.Component {
  static propTypes = {
    recommendation: PropTypes.object.isRequired,
  };

  renderStars = (number) => {
    const stars = new Array(number).fill(null, 0, number);
    return stars.map(i => <Icon key={i} name="star" size={12} color={COLOR.DIM_GRAY}/>);
  };

  render() {
    const { text, rating } = this.props.recommendation;
    return (
      <View style={styles.recommendation}>
        <View style={styles.starsContainer}>
          {this.renderStars(rating)}
        </View>
        <Text>{text}</Text>
      </View>
    );
  }
}
