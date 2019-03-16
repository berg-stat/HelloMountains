import React from 'react';
import { TouchableWithoutFeedback, Alert } from 'react-native';
import { Icon } from 'react-native-elements';

export default class SettingsButton extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Alert.alert('User Settings!');
        }}
      >
        <Icon name="settings" size={50} />
      </TouchableWithoutFeedback>
    );
  }
}
