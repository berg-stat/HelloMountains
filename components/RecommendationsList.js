import React from "react";
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';

import Recommendation from './Recommendation'


export default class RecommendationsList extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
  };

  __renderRecommendations() {
    const recommendationList = this.props.items.map(recommendation => ({
      ...recommendation,
      key: recommendation.name
    }));
    return (
      <FlatList
        data={recommendationList}
        renderItem={({ item }) => <Recommendation recommendation={item}/>}
      />
    );
  }

  render() {
    return (
      <View style={{ width: '80%'}}>
        {this.__renderRecommendations()}
      </View>
    );
  }
}
