import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import TitleBar from '../../components/TitleBar';
import Button from '../../components/Button';
import Input from '../../components/Input';
import styles from './styles';


export default class RegisterView extends Component {
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
      email: '',
    };
  }

  onRegister = () => {
    this.props.navigation.navigate('Main');
  };

  onNavigateToLogin = () => {
    this.props.navigation.navigate('Login');
  };

  onUserNameChange = (username) => {
    this.setState({ username });
  };

  onEmailChange = (email) => {
    this.setState({ email });
  };

  renderForm = () => (
    <View style={styles.registrationForm}>
      <Input
        value={this.state.username}
        onChange={this.onUserNameChange}
        placeholder="Nazwa użytkownika"
      />
      <Input
        value={this.state.email}
        onChange={this.onEmailChange}
        placeholder="E-mail"
      />
      <Input
        value={this.state.password}
        onChange={password => this.setState({ password })}
        placeholder="Hasło"
        secureText
      />
      <Input
        value={this.state.password}
        onChange={password => this.setState({ password })}
        placeholder="Powtórz hasło"
        secureText
      />

    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Stwórz konto
        </Text>
        {this.renderForm()}
        <View style={styles.confirmButton}>
          <Button onPress={this.onRegister} label="Zarejestruj" />
        </View>
        <Text style={styles.loginRedirection}>
          Masz już konto?{" "}
          <Text onPress={this.onNavigateToLogin} style={{textDecorationLine: "underline"}}>Przejdź do logowania </Text>
        </Text>
        <Text style={styles.infoText}>
          Klikając zarejestruj, akceptujesz naszą politykę prywatności.
        </Text>
      </View>
    );
  }
}
