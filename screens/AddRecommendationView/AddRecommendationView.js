import React, { Component } from 'react';
import { View } from 'react-native';
import TitleBar from '../../components/TitleBar';
import styles from './styles';


export default class AddRecommendationView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: '',
    };
  }

  __goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <TitleBar title="dodaj rekomendacje" onPress={this.__goBack}/>
      </View>
    );
  }
}
