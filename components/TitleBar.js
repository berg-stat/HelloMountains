import React from "react";
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';


export default class TitleBar extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const { title } = this.props;
    return (
      <View>
        <Text>{ title }</Text>
      </View>
    );
  }
}
