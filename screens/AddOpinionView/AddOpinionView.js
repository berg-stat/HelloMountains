import React, { Component } from 'react';
import {
  View,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  PixelRatio,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import axios from 'axios';

import {
  Button,
  TouchableTagsSet,
} from '../../components';
import { deviceStorage } from '../../services';
import styles from './styles';
import COLOR from '../../consts/colors';
import ERROR from '../../consts/errors';


export default class AddOpinionView extends Component {
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
    title: 'Dodaj opinie',
    headerStyle: styles.header,
    headerTintColor: COLOR.WHITE,
    headerRight:
      <TouchableWithoutFeedback onPress={navigation.getParam('addOpinion')}>
        <Icon name="add" size={PixelRatio.getPixelSizeForLayoutSize(17.5)} color={COLOR.WHITE}/>
      </TouchableWithoutFeedback>
  });

  constructor(props) {
    super(props);

    this.state = {
      placeName: props.navigation.getParam('placeName'),
      text: '',
      chosenTags: [],
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ addOpinion: this.addOpinion });
  }

  addTagToOpinion = (tag) => {
    this.state.chosenTags.push({
      'name': tag.state.text,
      'category': tag.state.category,
    });
  };

  removeTagFromOpinion = (tagToRemoved) => {
    this.setState({
      chosenTags: this.state.chosenTags.filter((tag) => {return tag.name !== tagToRemoved.state.text})
    });
  };

  addOpinion = async () => {
    const token = `Bearer ${await deviceStorage.getItem('id_token')}`;
    const url = `/opinions/${this.state.placeName}/`;

    axios.post(url,{
      text: this.state.text,
      date: new Date(),
      tags: this.state.chosenTags,
      },
      {
      headers: {
        Authorization: token,
      }
    })
      .then(() => {
      this.props.navigation.push('PlaceDetails', { placeName: this.state.placeName });
    })
      .catch((error) => {
        Alert.alert(
          'Błąd',
          `${ERROR[error.response.data.message]}`,
          [
            { text: 'OK' },
          ],
          { cancelable: false },
        );
      });
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TouchableTagsSet addTagToOpinion={this.addTagToOpinion} removeTagFromOpinion={this.removeTagFromOpinion}/>
        <TextInput
            style={styles.textInput}
            placeholder="Opisz warunki panujące na wyprawie!"
            multiline
            onChangeText={(text) => this.setState({ text })}
          />
        <View style={styles.addRecommendationButton}>
          <Button
            label="Dodaj opinie"
            onPress={this.addOpinion}
          />
        </View>
      </View>
      </TouchableWithoutFeedback>
    );
  };
};
