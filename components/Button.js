import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  StyleSheet,
  PixelRatio,
} from 'react-native';
import PropTypes from 'prop-types';

import COLOR from '../consts/colors';


const styles = StyleSheet.create({
  button: {
    height: PixelRatio.getPixelSizeForLayoutSize(15),
    width: '100%',
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(15),
    borderColor: COLOR.WHITE,
    backgroundColor: COLOR.DARK_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    color: COLOR.WHITE,
    textShadowRadius: PixelRatio.getPixelSizeForLayoutSize(10),
    textShadowColor: COLOR.LIGHT_SLATE_GRAY,
  },
});

export default class Button extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
  };

  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        onPress={this.props.onPress}
        underlayColor={COLOR.DARK_BLUE}
      >
        <Text style={styles.buttonLabel}>{this.props.label.toUpperCase()}</Text>
      </TouchableHighlight>
    );
  }
}
