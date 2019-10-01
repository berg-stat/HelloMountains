import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  Modal,
  TouchableWithoutFeedback,
  PixelRatio,
  TextInput,
  Keyboard,
  Alert,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';

import ReportReasonsSet from './ReportReasonsSet';
import COLOR from '../consts/colors';
import ERROR from '../consts/errors';
import { deviceStorage } from '../services';


const styles = StyleSheet.create({
  modal: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  reportForm: {
    width: '90%',
    borderRadius: PixelRatio.getFontScale() * 16,
    backgroundColor: COLOR.WHITE,
  },
  formHeader: {
    alignItems: 'center',
    padding: PixelRatio.getPixelSizeForLayoutSize(4),
    borderBottomWidth: PixelRatio.getPixelSizeForLayoutSize(.3),
    borderColor: COLOR.LIGHT_DIM_GRAY,
  },
  formHeaderTitle: {
    fontSize: PixelRatio.getFontScale() * 20,
    fontWeight: '500',
  },
  formTextInput: {
    flex: 1,
    height: '100%',
    width: '100%',
    flexWrap: 'wrap',
    fontSize: PixelRatio.getFontScale() * 17,
    padding: '2%',
    backgroundColor: COLOR.WHITE,
    textAlignVertical: 'top',
  },
  formTextInputContainer: {
    height: PixelRatio.getPixelSizeForLayoutSize(60),
  },
  formButton: {
    height: PixelRatio.getPixelSizeForLayoutSize(18),
    width: '100%',
    borderBottomLeftRadius: PixelRatio.getPixelSizeForLayoutSize(16),
    borderBottomRightRadius: PixelRatio.getPixelSizeForLayoutSize(16),
    borderTopWidth: PixelRatio.getPixelSizeForLayoutSize(.5),
    borderColor: COLOR.LIGHT_GRAY,
    backgroundColor: COLOR.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formButtonLabel: {
    fontSize: PixelRatio.getFontScale() * 18,
    color: COLOR.DARK_BLUE,
  }
});

export default class ReportRecommendationModal extends Component {
  static propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired,
    placeName: PropTypes.string.isRequired,
    opinionId: PropTypes.string,
  };

  static defaultProps = {
    opinionId: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      reason: '',
      text: '',
    }
  };

  sendReportRequest = async () => {
    const token = `Bearer ${await deviceStorage.getItem('id_token')}`;
    const url = `opinions/${this.props.placeName}/${this.props.opinionId}/report`;

    axios.put(url,
      {
        reason: this.state.reason,
        text: this.state.text
      },
      {
        headers: {
          Authorization: token,
        }
      })
      .then(response => {
        this.props.hideModal();
      })
      .catch(error => {
        Alert.alert(
          'Błąd',
          `${ERROR[error.response.data.message]}`,
          [
            {
              text: 'OK',
              onPress: this.props.hideModal,
            },
          ],
          { cancelable: false },
        );
      });
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
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.reportForm}>
                <View style={styles.formHeader}>
                  <Text style={styles.formHeaderTitle}>Powód zgłoszenia</Text>
                </View>
                <View>
                  <ReportReasonsSet
                    onChange={(reason) => this.setState({ reason })}
                  />
                </View>
                <View style={styles.formTextInputContainer}>
                  <TextInput
                    style={styles.formTextInput}
                    placeholder="Opisz powód zgłoszenia"
                    multiline={true}
                    onChangeText={(text) => this.setState({ text })}
                  />
                </View>
                <TouchableHighlight style={styles.formButton} onPress={this.sendReportRequest}
                                    underlayColor={COLOR.WHITE}>
                  <Text style={styles.formButtonLabel}>Zgłoś opinię</Text>
                </TouchableHighlight>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
};

