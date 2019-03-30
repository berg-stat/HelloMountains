import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import TitleBar from '../../components/TitleBar';
import styles from './styles';


export default class AddRecommendationView extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: '',
    };
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <TitleBar title="dodaj rekomendacje" onPress={this.goBack}/>
      </View>
    );
  }
}
