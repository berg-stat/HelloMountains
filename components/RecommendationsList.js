import React, { Component } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  PixelRatio,
  ActivityIndicator,
  Platform,
  Text
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';

import Recommendation from './Recommendation';
import { deviceStorage } from '../services';
import ERROR from '../consts/errors';
import RecommendationMoreOptionsModal from './RecommendationMoreOptionsModal';
import ReportRecommendationModal from './ReportRecommendationModal';
import COLOR from '../consts/colors';


const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: '100%',
    paddingLeft: PixelRatio.getPixelSizeForLayoutSize(3),
    paddingRight: PixelRatio.getPixelSizeForLayoutSize(3),
  },
  infoText: {
    textAlign: 'center',
    width: '100%',
    marginTop: '50%',
    fontSize: PixelRatio.getFontScale() * 20,
    color: COLOR.SLATE_GRAY,
  },
  loader: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default class RecommendationsList extends Component {
  static propTypes = {
    placeName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    onRecommendationEdit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      placeName: props.placeName,
      recommendations: [],
      isModalVisible: {
        moreOptions: false,
        report: false,
      },
      selectedRecommendation: null,
      isLoading: true,
    }
  }

  async componentDidMount() {
    const token = `Bearer ${await deviceStorage.getItem('id_token')}`;
    this.fetchRecommendations(token);
  }

  fetchRecommendations(token) {
    const url = `opinions/${this.state.placeName}`;

    axios.get(url,
      {
        headers: {
          Authorization: token,
        }
      })
      .then(response => {
        response.data.opinions.sort((a, b) => new Date(b.date) - new Date(a.date));
        this.setState({
          recommendations: response.data.opinions,
          isLoading: false,
        });
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

  renderRecommendation = ({ item }) => {
    return (
      <Recommendation
        id={item.id}
        recommendation={item}
        username={this.props.username}
        showMoreOptions={(recommendation) => {
          this.setMoreOptionsModalState(true, recommendation)
        }}
      />
    );
  };

  renderRecommendations() {
    const { isLoading, recommendations } = this.state;
    if(!isLoading && !recommendations.length) {
      return (
        <Text style={styles.infoText}>Brak opinii</Text>
      );
    }
    return (
      <FlatList
        data={this.state.recommendations}
        renderItem={this.renderRecommendation}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={this.renderRecommendationsListHeader}
        ListFooterComponent={this.renderRecommendationsListFooter}
      />
    );
  };

  setMoreOptionsModalState = (visible, recommendation) => {
    this.setState({
      isModalVisible: {
        ...this.state.isModalVisible,
        moreOptions: visible,
      },
      selectedRecommendation: recommendation,
    });
  };

  clearModalsState = () => {
    this.setState({
      isModalVisible: {
        moreOptions: false,
        report: false,
      },
      selectedRecommendation: null,
    });
  };

  showReportModal = () => {
    this.setState({
      isModalVisible: {
        moreOptions: false,
        report: true,
      }
    });
  };

  sendRemovalRequest = async () => {
    const { _id } = this.state.selectedRecommendation;
    const token = `Bearer ${await deviceStorage.getItem('id_token')}`;
    const url = `opinions/${this.state.placeName}/${_id}`;

    return axios.delete(url,
      {
        headers: {
          Authorization: token,
        }
      })
      .then(response => {
        this.setState({
          recommendations: this.state.recommendations.filter((recommendation) => recommendation._id !== _id),
        });
        this.clearModalsState();
      })
      .catch(error => {
        Alert.alert(
          'Błąd',
          `${ERROR[error.response.data.message]}`,
          [
            {
              text: 'OK',
              onPress: this.clearModalsState,
            },
          ],
          { cancelable: false },
        );
      });
  };

  deleteRecommendation = () => {
    Alert.alert("Czy napewno chcesz usunąc opinię?", "",
      [
        {
          text: 'Tak',
          onPress: this.sendRemovalRequest,
        },
        {
          text: 'Nie',
        },
      ],
      { cancelable: false },
    );
  };

  renderRecommendationsListHeader = () => {
    return <View
      style={{
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(6),
      }}
    />;
  };

  renderSeparator = () => {
    return <View
      style={{
        height: PixelRatio.getPixelSizeForLayoutSize(6),
      }}
    />;
  };

  renderRecommendationsListFooter = () => {
    return <View
      style={{
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(23),
      }}
    />;
  };

  render() {
    const { isModalVisible, placeName, selectedRecommendation, isLoading } = this.state;
    const { onRecommendationEdit } = this.props;
    return (
      <View style={styles.listContainer}>
        {this.renderRecommendations()}
        <RecommendationMoreOptionsModal
          modalVisible={isModalVisible.moreOptions}
          recommendationAuthor={selectedRecommendation ? selectedRecommendation.user : ''}
          hideModal={() => {
            this.setMoreOptionsModalState(false, null)
          }}
          editRecommendation={() => {
            this.setMoreOptionsModalState(false, null);
            onRecommendationEdit(selectedRecommendation);
          }}
          reportRecommendation={this.showReportModal}
          deleteRecommendation={this.deleteRecommendation}
        />
        <ReportRecommendationModal
          modalVisible={isModalVisible.report}
          hideModal={this.clearModalsState}
          placeName={placeName}
          opinionId={selectedRecommendation && selectedRecommendation._id}
        />
        {isLoading && (<ActivityIndicator style={styles.loader} size={Platform.OS === 'android' ? 70 : 'large'} color={COLOR.RECOMMENDATION_LIST_LOADER}/>)}
      </View>
    );
  }
}
