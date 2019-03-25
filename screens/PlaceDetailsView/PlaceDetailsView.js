import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import TitleBar from '../../components/TitleBar';
import WeatherDetails from '../../components/WeatherDetails';
import RecommendationsList from '../../components/RecommendationsList';
import Button from '../../components/Button';

const db = {
  placeId: {
    placeInfo: {
      placeName: "Rysy",
      height: 2499,
    },
    recommendations: [
      {
        id: 1,
        rating: 5,
        text: "Fajno",
      },
      {
        id: 2,
        rating: 3,
        text: "tak srednio srednio bym powiedzial",
      },
      {
        id: 3,
        rating: 4,
        text: "tak srednio srednio bym powiedzial",
      },
      {
        id: 4,
        rating: 1,
        text: "tak srednio srednio bym powiedzial",
      },
    ]
  }
};

const weatherApi = {
  weatherPlaceId: {
    temperature: -10,
    wind: "windy",
  }
};


export default class PlaceDetailsView extends React.Component {
  static propTypes = {
    placeId: PropTypes.number.isRequired,
    weatherPlaceId: PropTypes.number.isRequired,
    navigation: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      placeInfo: {
        placeName: '',
      },
      recommendations: [],
      weatherInfo: {}
    }
  }

  componentDidMount() {
    console.log('Request to backend');
    this.fetchPlaceInfoAndRecommendations();
    this.fetchWeatherInfo()
  }

  fetchPlaceInfoAndRecommendations() {
    console.log("Fetching recommendations");
    const { recommendations, placeInfo } = db.placeId;
    this.setState({
      placeInfo,
      recommendations,
    })
  }

  fetchWeatherInfo() {
    console.log("Fetching recommendations");
    const weatherInfo = weatherApi.weatherPlaceId;
    this.setState({
      weatherInfo,
    })
  }

  __goBack = () => {
    this.props.navigation.goBack();
  };

  __addRecommendation = () => {
    this.props.navigation.navigate('AddRecommendation', { placeId: this.props.placeId });
  };

  render() {
    const { placeName } = this.state.placeInfo;
    const weather = this.state.weatherInfo;
    const { recommendations } = this.state;
    return (
      <View style={styles.container}>
        <TitleBar onPress={this.__goBack} title={placeName}/>
        <WeatherDetails data={weather}/>
        <RecommendationsList items={recommendations}/>
        <Button
          label={'Add recommendation'}
          onPress={this.__addRecommendation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
