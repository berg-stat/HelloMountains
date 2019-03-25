import React, { Component } from 'react';
import { ImageBackground, View, Text } from 'react-native';
import LoginForm from "../../components/LoginForm";
import styles from './styles';

export default class LoginView extends Component {

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
