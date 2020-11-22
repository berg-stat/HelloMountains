import React, { Component } from 'react';
import { View, TextInput, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
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


export default class OpinionFormView extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          placeName: PropTypes.string.isRequired,
          value: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            tags: PropTypes.arrayOf(PropTypes.shape({
                _id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                category: PropTypes.string.isRequired,
              }).isRequired
            ).isRequired,
            date: PropTypes.string.isRequired,
          }),
        }).isRequired
      }).isRequired,
      navigate: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
    }).isRequired,
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('value') ? 'Edytuj opinię' : 'Dodaj opinie',
    headerStyle: styles.header,
    headerTintColor: COLOR.WHITE,
    headerRight:
      <TouchableWithoutFeedback onPress={navigation.getParam('onPress')}>
        <Icon name="add" size={40} color={COLOR.WHITE}/>
      </TouchableWithoutFeedback>
  });

  constructor(props) {
    super(props);

    const { navigation } = props;
    this.state = navigation.getParam('value')
      ? {
        placeName: navigation.getParam('placeName'),
        text: navigation.getParam('value').text,
        chosenTags: navigation.getParam('value').tags.map(tag => tag.isActive && ({name: tag.name, category: tag.category})),
      }
      : {
        placeName: navigation.getParam('placeName'),
        text: '',
        chosenTags: [],
      }
  };

  componentDidMount() {
    this.props.navigation.getParam('value')
      ? this.props.navigation.setParams({ onPress: this.sendOpinionUpdateRequest })
      : this.props.navigation.setParams({ onPress: this.addOpinion });
  }

  addTagToOpinion = (tag) => {
    this.state.chosenTags.push({
      'name': tag.state.text,
      'category': tag.state.category,
    });
  };

  removeTagFromOpinion = (tagToRemoved) => {
    this.setState({
      chosenTags: this.state.chosenTags.filter((tag) => {
        return tag.name !== tagToRemoved.state.text
      })
    });
  };

  addOpinion = async () => {
    const token = `Bearer ${await deviceStorage.getItem('id_token')}`;
    const url = `/opinions/${this.state.placeName}/`;

    axios.post(url, {
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

  sendOpinionUpdateRequest = async () => {
    const { _id, date }  = this.props.navigation.getParam('value');
    const token = `Bearer ${await deviceStorage.getItem('id_token')}`;
    const url = `/opinions/${this.state.placeName}/${_id}`;


    axios.put(url, {
        text: this.state.text,
        date: date,
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
    const { text, chosenTags } = this.state;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TouchableTagsSet value={chosenTags} addTagToOpinion={this.addTagToOpinion} removeTagFromOpinion={this.removeTagFromOpinion}/>
          <TextInput
            style={styles.textInput}
            placeholder="Opisz warunki panujące na wyprawie!"
            multiline
            value={text}
            onChangeText={(text) => this.setState({ text })}
          />
          <View style={styles.addRecommendationButton}>
            <Button
              label={this.props.navigation.getParam('value') ? "Edytuj opinie" : "Dodaj opinie"}
              onPress={this.props.navigation.getParam('value') ? this.sendOpinionUpdateRequest : this.addOpinion}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
};
