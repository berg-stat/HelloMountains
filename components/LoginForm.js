import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import COLOR from '../consts/colors';
import Input from '../components/Input';
import Button from '../components/Button';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  __onUserNameChange = (username) => {
    this.setState({ username });
  };

  __onPasswordChange = (password) => {
    this.setState({ password });
  };

  __onLogin = () => {
    this.props.navigation.navigate('Main');
  };

  __onRegister = () => {
    this.props.navigation.navigate('Register');
  };

  __renderInputs = () => {
    return (
      <View style={styles.subContainer}>
        <Input
          value={this.state.username}
          onChange={this.__onUserNameChange}
          placeholder="Username"
        />
        <Input
          value={this.state.password}
          onChange={this.__onPasswordChange}
          placeholder="Password"
          secureText
        />
      </View>
    );
  };

  __renderButtons = () => {
    return (
      <View style={styles.subContainer}>
        <Button label="Zaloguj" onPress={this.__onLogin}/>
        <Button label="Rejestracja" onPress={this.__onRegister}/>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.__renderInputs()}
        {this.__renderButtons()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLOR.WHITE,
    padding: '15%',
  },
  subContainer: {
    width: '100%',
    alignItems: 'center',
  },
});
