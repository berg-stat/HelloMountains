import React from "react";
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Recommendation from './Recommendation'



export default class RecommendationsList extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
  };

  __renderRecommendations() {
    const recommendationList = this.props.items;
    return (
      recommendationList.map( recom => {
        return (
          <Recommendation
            key={recom.id}
            recommendation={recom}
          />
        )
      })
    );
  }

  render() {
    return (
      <View>
        {this.__renderRecommendations()}
      </View>
    );
  }
}
