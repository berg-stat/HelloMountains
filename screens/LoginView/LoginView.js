import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  ImageBackground,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Platform,
} from 'react-native';

import { LoginForm } from '../../components';
import COLOR from '../../consts/colors';
import styles from './styles';


export default class LoginView extends Component {
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
    }
  }

  static navigationOptions = {
    title: 'Logowanie',
    headerStyle: styles.header,
    header: null,
  };

  setLoaderState = (state) => {
    this.setState( {
      isLoading: state,
    });
  };

  render() {
    const { isLoading } = this.state;

    return (
      <ImageBackground source={require('../../assets/backgroundImage.png')} style={{ width: '100%', height: '100%' }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>

            <View style={styles.titleContainer}>
                <Image source={require('../../assets/appLogo.png')} style={styles.imageSize}/>
                <Text style={styles.titleText}>Hello Mountains</Text>
            </View>

            <LoginForm
              navigation={this.props.navigation}
              setLoaderState={this.setLoaderState}
            />

          </View>
        </TouchableWithoutFeedback>
        {isLoading && (<ActivityIndicator style={styles.loader} size={Platform.OS === 'android' ? 70 : 'large'} color={COLOR.WHITE}/>)}

      </ImageBackground>
    );
  }
}
