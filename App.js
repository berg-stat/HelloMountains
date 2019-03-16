import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import MainView from './screens/MainView';
import RegisterView from './screens/RegisterView/RegisterView';
import LoginView from './screens/LoginView/LoginView';
import PlaceDetailsView from './screens/PlaceDetailsView'


const RootStack = createStackNavigator(
  {
    Login: LoginView,
    Register: RegisterView,
    Main: MainView,
    PlaceDetails: PlaceDetailsView
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },

);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
