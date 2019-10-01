import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  PixelRatio,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';

import TouchableTag from './TouchableTag';
import { deviceStorage } from '../services';
import COLOR from '../consts/colors';
import ERROR from '../consts/errors';


const db = {
  data: {
    tags: [
      {
        _id: 1,
        name: 'mokry śnieg',
        category: 'podłoże',
      },
      {
        _id: 2,
        name: 'związany śnieg',
        category: 'podłoże',
      },
      {
        _id: 3,
        name: 'lód',
        category: 'podłoże',
      },
      {
        _id: 4,
        name: 'świeży śnieg',
        category: 'podłoże',
      },
      {
        _id: 5,
        name: 'ślisko',
        category: 'podłoże',
      },
      {
        _id: 6,
        name: 'czekan',
        category: 'sprzęt',
      },
      {
        _id: 7,
        name: 'raki',
        category: 'sprzęt',
      },
      {
        _id: 8,
        name: 'kijki',
        category: 'sprzęt',
      },
      {
        _id: 9,
        name: 'lawiny',
        category: 'zagrożenia',
      },
      {
        _id: 10,
        name: 'spadające kamienie',
        category: 'zagrożenia',
      },
      {
        _id: 11,
        name: 'mgła',
        category: 'zagrożenia',
      },
      {
        _id: 12,
        name: 'silny wiatr',
        category: 'zagrożenia',
      },
    ]
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
    borderTopLeftRadius: PixelRatio.getPixelSizeForLayoutSize(4),
    borderTopRightRadius: PixelRatio.getPixelSizeForLayoutSize(4),
    padding: PixelRatio.getPixelSizeForLayoutSize(3),
    backgroundColor: COLOR.WHITE,
  },
  subsetContainer: {
    width: '100%',
    borderBottomWidth: PixelRatio.getPixelSizeForLayoutSize(.3),
    borderColor: COLOR.LIGHT_DIM_GRAY,
  },
  tagsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: PixelRatio.getPixelSizeForLayoutSize(2),
  },
  subsetTitle: {
    marginTop: PixelRatio.getPixelSizeForLayoutSize(1),
    marginLeft: PixelRatio.getPixelSizeForLayoutSize(2),
    fontSize: PixelRatio.getFontScale() * 14,
    color: COLOR.SLATE_GRAY,
  }
});

export default class TagsSet extends Component {
  static propTypes = {
    addTagToOpinion: PropTypes.func.isRequired,
    removeTagFromOpinion: PropTypes.func.isRequired,
    value: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
    })).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      tags: [],
    };
  };

  async componentDidMount() {
    this.addTagsFromResponseToState(db);
    // this.fetchTags();
  };

  async fetchTags() {
    const token = `Bearer ${await deviceStorage.getItem('id_token')}`;
    const url = `/tags/active`;

    axios.get(url,
      {
        headers: {
          Authorization: token,
        }
      })
      .then(response => {
        this.addTagsFromResponseToState(response);
      })
      .catch(error => {
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

  addTagsFromResponseToState(response) {
    const { tags } = response.data;
    const tagsMap = this.mapTagsToCategories(this.extractCategoriesFromTags(tags), tags);

    this.setState({
      tags: tagsMap,
    });
  };

  mapTagsToCategories(tagCategories, tags) {
    const { addTagToOpinion, removeTagFromOpinion } = this.props;

    let tagsMap = new Map();
    const chosenTagsNames = this.props.value.map(tag => tag.name);

    for (category of tagCategories) {
      tagsMap.set(category, tags.filter(tag => tag.category === category).map(tag =>
        <TouchableTag
          key={tag._id}
          text={tag.name}
          category={tag.category}
          isActive={chosenTagsNames.includes(tag.name)}
          activeColor={COLOR.TAG_ACTIVE}
          nonActiveColor={COLOR.TAG_NON_ACTIVE}
          addTagToOpinion={addTagToOpinion}
          removeTagFromOpinion={removeTagFromOpinion}
        />
      ));
    }

    return tagsMap;
  }

  extractCategoriesFromTags(tags) {
    let tagCategories = [];
    tags.map(tag => {
      if (!tagCategories.includes(tag.category)) {
        tagCategories.push(tag.category);
      }
    });

    return tagCategories;
  }

  renderTags() {
    const { tags } = this.state;

    let tagsSubsets = [];
    tags.forEach((value, key) => {
        tagsSubsets.push(
          <View key={key} style={styles.subsetContainer}>
            <Text style={styles.subsetTitle}>{key}</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={styles.tagsContainer}>
              {value}
              </View>
            </ScrollView>
          </View>);
    });

    return tagsSubsets
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderTags()}
      </View>
    );
  };
};
