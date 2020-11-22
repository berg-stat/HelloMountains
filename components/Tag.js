import React, { Component } from 'react';
import { View, Text, StyleSheet, PixelRatio } from 'react-native';
import PropTypes from 'prop-types';

import COLOR from '../consts/colors';


const styles = StyleSheet.create({
  tag: {
    marginRight: PixelRatio.getPixelSizeForLayoutSize(1),
    marginBottom: PixelRatio.getPixelSizeForLayoutSize(1),

    paddingTop: PixelRatio.getPixelSizeForLayoutSize(1),
    paddingBottom: PixelRatio.getPixelSizeForLayoutSize(2),
    paddingLeft: PixelRatio.getPixelSizeForLayoutSize(3),
    paddingRight: PixelRatio.getPixelSizeForLayoutSize(3),

    borderRadius: PixelRatio.getPixelSizeForLayoutSize(15),
    backgroundColor: COLOR.INFO_TEXT,
  },
  text: {
    fontSize: PixelRatio.getFontScale() * 15,
    fontWeight: '500',
    color: COLOR.WHITE,
  }
});

export default class Tag extends Component {
  static propTypes = {
    info: PropTypes.string.isRequired,
  };

  render() {
    const { info } = this.props;
    return (
      <View style={styles.tag}>
        <Text style={styles.text}>{ info }</Text>
      </View>
    );
  }
}
