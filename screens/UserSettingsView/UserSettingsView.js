import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import Button from '../../components/Button';
import Input from '../../components/Input';
import styles from './styles';


export default class UserSettingsView extends Component {
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

  onUserNameChange = (username) => {
    this.setState({ username });
  };

  onEmailChange = (email) => {
    this.setState({ email });
  };

  signOut = () => {
    this.props.navigation.navigate('Login');
  }

  renderForm = () => (
    <View style={styles.userDataForm}>
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
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Ustawienia
        </Text>
        {this.renderForm()}
        <View style={styles.changePasswordButton}>
          <Button label="Zmień hasło" />
        </View>
        <View style={styles.signOutTextContainter}>
          <Text onPress={this.signOut} style={styles.signOutText}>Wyloguj się</Text>
        </View>
      </View>
    );
  }
}
