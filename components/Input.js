import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import COLOR from '../consts/colors';


const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '100%',
    padding: 10,
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: COLOR.LIGHT_SLATE_GRAY,
    borderRadius: 20,
    marginBottom: 10,
    color: COLOR.DIM_GRAY,
  },
});

export default class Input extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    secureText: PropTypes.bool,
  };

  render() {
    return (
      <TextInput
        value={this.props.value}
        onChangeText={this.props.onChange}
        placeholder={this.props.placeholder}
        style={styles.input}
        secureTextEntry={this.props.secureText}
        placeholderTextColor={COLOR.SLATE_GRAY}
      />
    );
  }
}
