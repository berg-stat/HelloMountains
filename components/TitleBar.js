import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import COLOR from '../consts/colors';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '75%',
  },
  pageTitle: {
    fontSize: 20,
    color: COLOR.DIM_GRAY,
    fontWeight: 'bold',
    marginBottom: '4%',
  },
});

export default class TitleBar extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  render() {
    const { title, onPress } = this.props;
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onPress}>
          <Icon name="keyboard-backspace" size={30} color={COLOR.DIM_GRAY}/>
        </TouchableWithoutFeedback>

        <Text style={styles.pageTitle}>{title}</Text>
        <View/>
      </View>
    );
  }
}
