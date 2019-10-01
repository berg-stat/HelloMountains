import React, { Component } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';

import { deviceStorage } from '../services';
import Button from './Button';
import Input from './Input';
import COLOR from '../consts/colors';
import ERROR from '../consts/errors';


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  registrationForm: {
    backgroundColor: COLOR.BACKGROUND,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 20,
  },
  confirmButtonContainer: {
    alignItems: 'center',
    width: '80%',
  },
});

export default class RegisterForm extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
    }).isRequired,
    setLoaderState: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      confirmedPassword: '',
    };
  };

  onRegister = () => {
    const { username, email, password, confirmedPassword } = this.state;

    if (!username) {
      return this.showAlert('Wprowadź nazwę użytkownika');
    }

    if (!email) {
      return this.showAlert('Wprowadź email');
    }

    if (password !== confirmedPassword) {
      this.resetPasswordsInput();
    } else {
      this.registerUser();
    }
  };

  showAlert = (message) => {
    Alert.alert(
      'Błąd',
      message,
      [
        { text: 'OK' },
      ],
      { cancelable: false },
    );
  };

  resetPasswordsInput() {
    this.showAlert('Podano niezgodne hasła.');

    this.setState({ password: '', confirmedPassword: '' })
  };

  async registerUser() {
    this.props.setLoaderState(true);
    const { username, email, password } = this.state;

    try {
      const response = await axios.post('/users',
        {
          username,
          email,
          password,
        });

      deviceStorage.saveItem('username', username);
      deviceStorage.saveItem('email', email);
      deviceStorage.saveItem('id_token', response.data.token);
      this.props.setLoaderState(false);
      this.props.navigation.navigate('Map');
    } catch (error) {
      this.props.setLoaderState(false);
      this.setState({ username: '', email: '', password: '', confirmedPassword: '' });
      this.showAlert(`${ERROR[error.response.data.message]}`);
    }
  };

  renderInputs = () => (
    <View style={styles.registrationForm}>
      <Input
        value={this.state.username}
        onChange={username => this.setState({ username })}
        placeholder="Nazwa użytkownika"
      />
      <Input
        value={this.state.email}
        onChange={email => this.setState({ email })}
        placeholder="E-mail"
        keyboardType='email-address'
        autoCapitalize='none'
      />
      <Input
        value={this.state.password}
        onChange={password => this.setState({ password })}
        placeholder="Hasło"
        secureText
      />
      <Input
        value={this.state.confirmedPassword}
        onChange={confirmedPassword => this.setState({ confirmedPassword })}
        placeholder="Powtórz hasło"
        secureText
      />
    </View>
  );

  renderButtons = () => (
    <View style={styles.confirmButtonContainer}>
      <Button onPress={this.onRegister} label="Zarejestruj"/>
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
