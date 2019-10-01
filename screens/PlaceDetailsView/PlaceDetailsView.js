import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { HeaderBackButton } from 'react-navigation';

import {
  RecommendationsList,
  Button,
  DetailsPanel,
} from '../../components';
import styles from './styles';
import COLOR from '../../consts/colors';
import { deviceStorage } from '../../services';


export default class PlaceDetailsView extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          placeName: PropTypes.string.isRequired,
        }).isRequired
      }).isRequired,
      navigate: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
    }).isRequired,
  };

  static navigationOptions = ({ navigation }) => ({
    headerStyle: styles.header,
    headerTintColor: COLOR.WHITE,
    headerBackTitle: navigation.getParam('placeName'),
    headerTruncatedBackTitle: navigation.getParam('placeName').substring(0, 8).concat('...'),
    headerLeft:
      <HeaderBackButton
        title="Mapa"
        backTitleVisible={true}
        tintColor={COLOR.WHITE}
        onPress={() => navigation.navigate('Map')}
      />,
  });

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      placeName: props.navigation.getParam('placeName'),
    };
  };

  async componentDidMount() {
      const username = await deviceStorage.getItem('username');
      this.setState({ username });
  };

  addRecommendation = () => {
    this.props.navigation.navigate('OpinionForm', { placeName: this.state.placeName });
  };

  navigateToEditRecommendation = (recommendationToEdit) => {
    this.props.navigation.navigate('OpinionForm', { placeName: this.state.placeName, value: recommendationToEdit });
  };

  render() {
    const { placeName, username } = this.state;
    return (
      <View style={styles.container}>
        <DetailsPanel placeName={placeName}/>
        <RecommendationsList placeName={placeName} username={username} onRecommendationEdit={this.navigateToEditRecommendation}/>
        <View style={styles.addRecommendationButton}>
          <Button
            label="Dodaj opinie"
            onPress={this.addRecommendation}
          />
        </View>
      </View>
    );
  };
};
