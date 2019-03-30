import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import LoginForm from '../../components/LoginForm';
import styles from './styles';


export default class LoginView extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Image source={require('../../assets/appLogo.png')} style={styles.imageSize}/>
          <Text style={styles.titleText}>Hello Mountains</Text>
        </View>
        <LoginForm navigation={this.props.navigation}/>
      </View>
    );
  }
}
