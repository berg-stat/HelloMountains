import React from 'react';
import { SearchBar } from 'react-native-elements';

export default class PlacesSearchBar extends React.Component {
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
        placeholder="Search for place"
        onChangeText={this.updateSearch}
        value={this.state.search}
        lightTheme={true}
      />
    );
  }
}
