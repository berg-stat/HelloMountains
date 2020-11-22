import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  PixelRatio,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';

import Input from './Input';
import Button from './Button';
import ERROR from '../consts/errors';
import { deviceStorage } from '../services';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15%',
    paddingTop: 0,
  },
  subContainer: {
    height: PixelRatio.getPixelSizeForLayoutSize(38),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: PixelRatio.getPixelSizeForLayoutSize(16),
  },
});

export default class LoginForm extends Component {
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
      emailOrUsername: '',
      password: '',
    };
  }

  onEmailOrUsernameChange = (emailOrUsername) => {
    this.setState({ emailOrUsername });
  };

  onPasswordChange = (password) => {
    this.setState({ password });
  };

  onLogin = async () => {
    this.props.setLoaderState(true);
    Keyboard.dismiss();
    const { emailOrUsername, password } = this.state;

    if (emailOrUsername || password) {
      axios.post('/users/login',
        {
          emailOrUsername,
          password,
        })
        .then(response => {
          this.fetchUserDataToLocalStorage(response.data.token);
          deviceStorage.saveItem('id_token', response.data.token);
          this.props.setLoaderState(false);
          this.props.navigation.navigate('Map');
        })
        .catch(error => {
          this.setState({ emailOrUsername: '', password: '' });
          this.props.setLoaderState(false);

          Alert.alert('Błąd', `${ERROR[error.response.data.message]}`, [{ text: 'OK' }], { cancelable: false });
        });
    } else {
      Alert.alert('Błąd', 'Wpisz odpowiednie dane', [{ text: 'OK' }], { cancelable: false },);
    }
  };

  fetchUserDataToLocalStorage = (token) => {
    axios.get('/users/me',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        deviceStorage.saveItem('username', response.data.user.username);
        deviceStorage.saveItem('email', response.data.user.email);
      })
      .catch(error => {
        Alert.alert('Błąd', `${ERROR[error.response.data.message]}`, [{ text: 'OK' }], { cancelable: false });
      });
  };

  onRegister = () => {
    this.props.navigation.navigate('Register');
  };

  renderInputs = () => (
    <View style={styles.subContainer}>
      <Input
        value={this.state.emailOrUsername}
        onChange={this.onEmailOrUsernameChange}
        placeholder="E-mail lub nazwa użytkownika"
        keyboardType='email-address'
        autoCapitalize='none'
      />
      <Input
        value={this.state.password}
        onChange={this.onPasswordChange}
        placeholder="Hasło"
        autoCapitalize='none'
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
      <KeyboardAvoidingView  style={styles.container} behavior='padding'>
        {this.renderInputs()}
        {this.renderButtons()}
      </KeyboardAvoidingView>
    );
  }
}
