import React from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Platform,
  StatusBar,
  View,
} from 'react-native';
import deviceStorage from '../../services/deviceStorage';
import COLOR from '../../consts/colors';
import styles from './styles.js';


export default class AuthLoadingView extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const userToken = await deviceStorage.getItem('id_token');
    this.props.navigation.navigate(userToken ? 'Map' : 'Login');
  };

  render() {
    return (
      <ImageBackground source={require('../../assets/backgroundImage.png')} style={{ width: '100%', height: '100%' }}>
        <View style={styles.container}>
          <ActivityIndicator size={Platform.OS === 'android' ? 70 : "large"} color={COLOR.INFO_TEXT}/>
          <StatusBar barStyle="default"/>
        </View>
      </ImageBackground>
    );
  }
}
