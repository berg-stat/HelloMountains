import React from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';

import Recommendation from './Recommendation';


export default class RecommendationsList extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
  };

  renderRecommendations() {
    return (
      <FlatList
        data={this.props.items}
        renderItem={
          ({ item }) => {
            return (<Recommendation
              key={item.id}
              recommendation={item}
            />);
          }
        }
      />
    );
  }

  render() {
    return (
      <View style={{ width: '80%' }}>
        {this.renderRecommendations()}
      </View>
    );
  }
}
