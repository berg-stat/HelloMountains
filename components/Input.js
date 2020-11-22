import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import COLOR from '../consts/colors';


const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '100%',
    padding: 10,
    paddingLeft: 20,
    borderBottomColor: COLOR.WHITE,
    borderBottomWidth: 2,
    marginBottom: 10,
    fontSize: 16,
    color: COLOR.WHITE,
  },
});

export default class Input extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    secureText: PropTypes.bool,
  };

  render() {
    return (
      <TextInput
        onChangeText={this.props.onChange}
        style={styles.input}
        secureTextEntry={this.props.secureText}
        placeholderTextColor={COLOR.INPUT_PLACEHOLDER}
        {...this.props}
      />
    );
  }
}
