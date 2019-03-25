import React, { Component } from 'react';
import { TextInput, View, Text } from 'react-native';

import TitleBar from '../../components/TitleBar';
import Button from '../../components/Button';
import Input from '../../components/Input';
import styles from './styles';


export default class RegisterView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: '',
    };
  }

  __onRegister = () => {
    this.props.navigation.navigate('Main');
  };

  __goBack = () => {
    this.props.navigation.goBack();
  };

  __onUserNameChange = (username) => {
    this.setState({ username });
  };

  __onEmailChange = (email) => {
    this.setState({ email });
  };

  __renderForm = () => {
    return (
      <View style={styles.card}>
        <Text style={styles.infoText}>
          Stwórz konto
        </Text>
        <Input
          value={this.state.username}
          onChange={this.__onUserNameChange}
          placeholder="Username"
        />
        <Input
          value={this.state.email}
          onChange={this.__onEmailChange}
          placeholder="E-mail"
        />
        <Input
          value={this.state.password}
          onChange={(password) => this.setState({ password })}
          placeholder="Password"
          secureText
        />
        <Input
          value={this.state.password}
          onChange={(password) => this.setState({ password })}
          placeholder="Confirm password"
          secureText
        />
        <Text style={styles.infoText}>
          Klikając zarejestruj, akceptujesz naszą politykę prywatności.
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <TitleBar title="Rejestracja" onPress={this.__goBack} />
        {this.__renderForm()}
        <Button onPress={this.__onRegister} label="Zarejestruj"/>
      </View>
    );
  }
}
