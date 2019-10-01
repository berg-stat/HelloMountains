import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import { StyleSheet } from 'react-native';

import COLOR from '../consts/colors';


export default class PlacesSearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };
  }

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    return (
      <SearchBar
        placeholder="Wyszukaj miejsce..."
        onChangeText={this.updateSearch}
        value={this.state.search}
        inputStyle={styles.inputStyle}
        searchIcon={{ color: COLOR.WHITE }}
        clearIcon={{ color: COLOR.WHITE }}
        placeholderTextColor={COLOR.WHITE}
        inputContainerStyle={styles.inputStyleContainer}
        containerStyle={styles.containerStyle}
      />
    );
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    width: '100%',
    fontSize: 16,
    opacity: 1,
    color: COLOR.WHITE,
  },
  containerStyle: {
    margin: 10,
    backgroundColor: COLOR.DARK_BLUE,
    borderRadius: 35,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    opacity: 0.8,
  },
  inputStyleContainer: {
    backgroundColor: COLOR.DARK_BLUE,
    borderRadius: 25,
    opacity: 1,
  },
});
