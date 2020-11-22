import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Platform,
} from 'react-native';

import { KeyboardShift, LoginForm, RegisterForm } from '../../components';
import styles from './styles';
import COLOR from '../../consts/colors';


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
      isLoading: false,
    };
  };

  static navigationOptions = {
    title: 'Rejestracja',
    headerStyle: styles.header,
    headerTintColor: COLOR.WHITE,
  };

  onNavigateToLogin = () => {
    this.props.navigation.navigate('Login');
  };

  setLoaderState = (state) => {
    this.setState( {
      isLoading: state,
    });
  };

  render() {
    const { isLoading } = this.state;

    return (
      <KeyboardShift>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.titleText}>
            Stwórz konto
          </Text>
          <View style={styles.registrationFormContainer}>
            <RegisterForm
              navigation={this.props.navigation}
              setLoaderState={this.setLoaderState}
            />
          </View>
          <Text style={styles.loginRedirection}>
            <Text>Masz już konto?{'  '}</Text>
            <Text onPress={this.onNavigateToLogin} style={{ textDecorationLine: 'underline' }}>Przejdź do
              logowania</Text>
          </Text>
          <Text style={styles.infoText}>
            Klikając zarejestruj, akceptujesz naszą politykę prywatności.
          </Text>
        </View>
        </TouchableWithoutFeedback>
        {isLoading && (<ActivityIndicator style={styles.loader} size={Platform.OS === 'android' ? 70 : 'large'} color={COLOR.WHITE}/>)}
      </KeyboardShift>
    );
  }
}
