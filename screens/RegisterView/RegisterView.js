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

  goBack = () => {
    this.props.navigation.goBack();
  };

  onUserNameChange = (username) => {
    this.setState({ username });
  };

  onEmailChange = (email) => {
    this.setState({ email });
  };

  renderForm = () => (
    <View style={styles.card}>
      <Text style={styles.infoText}>
        Stwórz konto
      </Text>
      <Input
        value={this.state.username}
        onChange={this.onUserNameChange}
        placeholder="Username"
      />
      <Input
        value={this.state.email}
        onChange={this.onEmailChange}
        placeholder="E-mail"
      />
      <Input
        value={this.state.password}
        onChange={password => this.setState({ password })}
        placeholder="Password"
        secureText
      />
      <Input
        value={this.state.password}
        onChange={password => this.setState({ password })}
        placeholder="Confirm password"
        secureText
      />
      <Text style={styles.infoText}>
        Klikając zarejestruj, akceptujesz naszą politykę prywatności.
      </Text>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <TitleBar title="Rejestracja" onPress={this.goBack}/>
        {this.renderForm()}
        <Button onPress={this.onRegister} label="Zarejestruj"/>
      </View>
    );
  }
}
