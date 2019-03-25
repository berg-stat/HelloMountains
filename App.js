import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import MainView from './screens/MainView/MainView';
import RegisterView from './screens/RegisterView/RegisterView';
import LoginView from './screens/LoginView/LoginView';
import PlaceDetailsView from './screens/PlaceDetailsView/PlaceDetailsView';
import AddRecommendationView from './screens/AddRecommendationView/AddRecommendationView';


const RootStack = createStackNavigator(
  {
    Login: LoginView,
    Register: RegisterView,
    Main: MainView,
    PlaceDetails: PlaceDetailsView,
    AddRecommendation: AddRecommendationView,
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
