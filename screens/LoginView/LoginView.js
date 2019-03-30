import React, { Component } from 'react';
import { ImageBackground, View, Text } from 'react-native';
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
        <ImageBackground
          source={require('../../assets/homePagePhoto.jpg')}
          style={styles.image}
        >
          <View style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={styles.appName}>
              Hello Mountains!
            </Text>
          </View>
        </ImageBackground>
        <LoginForm navigation={this.props.navigation}/>
      </View>
    );
  }
}
