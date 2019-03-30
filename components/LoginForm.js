import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import COLOR from '../consts/colors';
import Input from './Input';
import Button from './Button';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15%',
  },
  subContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default class LoginForm extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  onUserNameChange = (username) => {
    this.setState({ username });
  };

  onPasswordChange = (password) => {
    this.setState({ password });
  };

  onLogin = () => {
    this.props.navigation.navigate('Main');
  };

  onRegister = () => {
    this.props.navigation.navigate('Register');
  };

  renderInputs = () => (
    <View style={styles.subContainer}>
      <Input
        value={this.state.username}
        onChange={this.onUserNameChange}
        placeholder="Username"
      />
      <Input
        value={this.state.password}
        onChange={this.onPasswordChange}
        placeholder="Password"
        secureText
      />
    </View>
  );

  renderButtons = () => (
    <View style={styles.subContainer}>
      <Button label="Zaloguj" onPress={this.onLogin}/>
      <Button label="Rejestracja" onPress={this.onRegister}/>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        {this.renderInputs()}
        {this.renderButtons()}
      </View>
    );
  }
}
