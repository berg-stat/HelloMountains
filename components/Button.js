import React from 'react';
import { Text, TouchableHighlight, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import COLOR from '../consts/colors';


export default class Button extends React.Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
  };

  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        onPress={this.props.onPress}
        underlayColor={COLOR.DIM_GRAY}
      >
        <Text style={styles.buttonLabel}>{this.props.label.toUpperCase()}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: '80%',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    borderColor: COLOR.LIGHT_SLATE_GRAY,
    backgroundColor: COLOR.DIM_GRAY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    color: COLOR.TEXT,
    textShadowRadius: 10,
    textShadowColor: COLOR.LIGHT_SLATE_GRAY,
  },
});
