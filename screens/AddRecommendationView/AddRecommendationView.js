import React, { Component } from 'react';
import { TextInput, View, TouchableWithoutFeedback, Text } from 'react-native';
import TitleBar from '../../components/TitleBar';
import styles from './styles';


export default class AddRecomendationView extends Component {
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

  render() {
    return (
      <View style={styles.container}>
        <TitleBar title={'Rejestracja'} onPress={this.__goBack}/>
        <View style={styles.card}>
          <Text style={styles.infoText}>
            Stwórz konto
          </Text>
          <TextInput
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
            placeholder={'Username'}
            style={styles.input}
          />
          <TextInput
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            placeholder={'E-mail'}
            style={styles.input}
          />
          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder={'Password'}
            secureTextEntry={true}
            style={styles.input}
          />
          <TextInput
            value={this.state.password}
            //onChangeText={(password) => this.setState({ password })}
            placeholder={'Confirm password'}
            secureTextEntry={true}
            style={styles.input}
          />
          <Text style={styles.infoText}>
            Klikając zarejestruj, akceptujesz naszą politykę prywatności.
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={this.__onRegister}>
          <View style={styles.button}>
            <Text style={styles.buttonLabel}>ZAREJESTRUJ</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
