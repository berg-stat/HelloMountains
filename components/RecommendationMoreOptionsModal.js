import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Modal,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
  PixelRatio,
} from 'react-native';
import PropTypes from 'prop-types';

import COLOR from '../consts/colors';
import { deviceStorage } from '../services';


const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalButtonsContainer: {
    width: '95%',
    marginBottom: PixelRatio.getPixelSizeForLayoutSize(9),
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(5),
    backgroundColor: COLOR.WHITE,
  },
  modalButton: {
    height: PixelRatio.getPixelSizeForLayoutSize(16),
    width: '100%',
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(5),
    backgroundColor: COLOR.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonLabel: {
    fontSize: PixelRatio.getFontScale() * 16,
    color: COLOR.DARK_BLUE,
  },
  modalDeleteButtonLabel: {
    fontSize: PixelRatio.getFontScale() * 16,
    color: COLOR.BRICK_RED,
  },
});

export default class RecommendationMoreOptionsModal extends Component {
  static propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    recommendationAuthor: PropTypes.string,
    hideModal: PropTypes.func.isRequired,
    editRecommendation: PropTypes.func.isRequired,
    reportRecommendation: PropTypes.func.isRequired,
    deleteRecommendation: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
    }
  };

  async componentDidMount() {
    const username = await deviceStorage.getItem('username');

    this.setState( {
      username
    });
  };

  renderButtons =  () => {
    const { recommendationAuthor, editRecommendation, reportRecommendation, deleteRecommendation } = this.props;
    const { username } = this.state;

    if (recommendationAuthor === username) {
      return (
        <View style={styles.modalButtonsContainer}>
          <TouchableHighlight  style={styles.modalButton} onPress={editRecommendation} underlayColor={COLOR.WHITE}>
            <Text style={styles.modalButtonLabel}>Edytuj opinię</Text>
          </TouchableHighlight>
          <TouchableHighlight  style={styles.modalButton} onPress={deleteRecommendation} underlayColor={COLOR.WHITE}>
            <Text style={styles.modalDeleteButtonLabel}>Usuń opinię</Text>
          </TouchableHighlight>
        </View>
      )
    }
    else {
      return (
        <View style={styles.modalButtonsContainer}>
          <TouchableHighlight  style={styles.modalButton} onPress={reportRecommendation} underlayColor={COLOR.WHITE}>
            <Text style={styles.modalButtonLabel}>Zgłoś opinię</Text>
          </TouchableHighlight>
        </View>
      )
    }
  };

  render() {
    const { modalVisible, hideModal } = this.props;
    return (
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={hideModal}
      >
        <TouchableWithoutFeedback onPress={hideModal}>
          <View style={styles.modal}>
            {this.renderButtons()}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
};

