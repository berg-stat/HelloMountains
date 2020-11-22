import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';

import COLOR from '../consts/colors';


export default class SettingsButton extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
  };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={this.props.onPress}
      >
        <Icon name="settings" size={50} color={COLOR.DARK_BLUE}/>
      </TouchableWithoutFeedback>
    );
  }
}
