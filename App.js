import React, { Component } from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import axios from 'axios';

import LoginView from './screens/LoginView';
import RegisterView from './screens/RegisterView';
import MapView from './screens/MapView';
import PlaceDetailsView from './screens/PlaceDetailsView';
import UserSettingsView from './screens/UserSettingsView';
import OpinionFormView from './screens/OpinionFormView';
import AuthLoadingView from './screens/AuthLoadingView';


axios.defaults.baseURL = process.env.API_BASE_URL || 'http://192.168.1.12:3650/api/v1';

const AppStack = createStackNavigator({
  Map: MapView,
  PlaceDetails: PlaceDetailsView,
  UserSettings: UserSettingsView,
  OpinionForm: OpinionFormView,
}, {
  headerLayoutPreset: 'center',
  headerBackTitleVisible: true,
});
const AuthStack = createStackNavigator({
  Register: RegisterView,
  Login: LoginView
}, {
  headerLayoutPreset: 'center',
  headerBackTitleVisible: true,
});

const AppContainer = createAppContainer(createSwitchNavigator({
    AuthLoading: AuthLoadingView,
    App: AppStack,
    Auth: AuthStack,
  }, {
    initialRouteName: 'AuthLoading',
  }
));

export default class App extends Component {
  render() {
    return <AppContainer/>;
  }
}
