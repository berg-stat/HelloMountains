import React, { Component } from 'react';
import { Alert, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Button, Input, KeyboardShift } from '../../components';
import styles from './styles';
import { deviceStorage } from '../../services';
import COLOR from '../../consts/colors';
import ERROR from '../../consts/errors';


export default class UserSettingsView extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
    }).isRequired,
  };

  static navigationOptions = {
    title: 'Twój profil',
    headerStyle: styles.header,
    headerTintColor: COLOR.WHITE,
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      oldPassword: '',
      newPassword: '',
      confirmedNewPassword: '',
    };
  };

  async componentDidMount() {
      this.setState({
        username: await deviceStorage.getItem('username'),
        email: await deviceStorage.getItem('email'),
      });
  };

  signOut = () => {
    deviceStorage.deleteItem('id_token');
    this.props.navigation.navigate('Login');
  };

  onChangePassword = () => {
    const { oldPassword, newPassword, confirmedNewPassword } = this.state;

    if (newPassword !== confirmedNewPassword) {
      this.resetPasswordsInput();
    } else {
      this.changeUserPassword(oldPassword, newPassword);
    }
  };

  resetPasswordsInput() {
    Alert.alert('Błąd', 'Podano niezgodne hasła.', [{ text: 'OK' }], { cancelable: false });

    this.setState({ newPassword: '', confirmedNewPassword: '' })
  }

  async changeUserPassword(oldPassword, newPassword) {
    const token = `Bearer ${await deviceStorage.getItem('id_token')}`;

    try {
      const response = await axios.put('/users/me/password',
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: token
          }
        });

      Alert.alert(
        'Zmiana hasła',
        `Hasło zostało poprawnie zmienione.`,
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
      this.setState({ password: '', confirmedPassword: '' });
    } catch (error) {
      this.setState({ email: '', password: '', confirmedPassword: '' });
      Alert.alert(
        'Błąd',
        `${ERROR[error.response.data.message]}`,
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    }
  }

  renderForm = () => (
    <View style={styles.userDataForm}>
      <Input
        value={this.state.oldPassword}
        onChange={oldPassword => this.setState({ oldPassword })}
        placeholder="Stare hasło"
        secureText
      />
      <Input
        value={this.state.newPassword}
        onChange={newPassword => this.setState({ newPassword })}
        placeholder="Nowe hasło"
        secureText
      />
      <Input
        value={this.state.confirmedNewPassword}
        onChange={confirmedNewPassword => this.setState({ confirmedNewPassword })}
        placeholder="Powtórz nowe hasło"
        secureText
      />
    </View>
  );

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoText}>
            {this.state.username}
          </Text>
          <Text style={styles.userInfoText}>
            {this.state.email}
          </Text>
        </View>
        <Text style={styles.changePasswordText}>
          Zmiana hasła
        </Text>
        {this.renderForm()}
        <View style={styles.changePasswordButton}>
          <Button label="Zmień hasło" onPress={this.onChangePassword}/>
        </View>
        <View style={styles.signOutTextContainer}>
          <Icon onPress={this.signOut} name="power-settings-new" size={34} color={COLOR.INFO_TEXT}/>
        </View>
      </View>
      </TouchableWithoutFeedback>
    );
  };
};
