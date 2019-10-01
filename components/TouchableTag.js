import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  PixelRatio
} from 'react-native'
import PropTypes from 'prop-types';

import COLOR from '../consts/colors';


export default class TouchableTag extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    activeColor: PropTypes.string.isRequired,
    nonActiveColor: PropTypes.string.isRequired,
    addTagToOpinion: PropTypes.func.isRequired,
    removeTagFromOpinion: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      text: props.text,
      category: props.category,
      isActive: props.isActive,
      backgroundColor: props.isActive ? props.activeColor : props.nonActiveColor,
    };
  };

  makeStyles = () => {
    const { backgroundColor } = this.state;

    return StyleSheet.create({
      view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: PixelRatio.getPixelSizeForLayoutSize(1),
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(1),

        paddingTop: PixelRatio.getPixelSizeForLayoutSize(1),
        paddingBottom: PixelRatio.getPixelSizeForLayoutSize(2),
        paddingLeft: PixelRatio.getPixelSizeForLayoutSize(3),
        paddingRight: PixelRatio.getPixelSizeForLayoutSize(3),

        borderRadius: PixelRatio.getPixelSizeForLayoutSize(15),
        backgroundColor,
      },
      touchable: {
        marginLeft: PixelRatio.getPixelSizeForLayoutSize(2),
        marginRight: PixelRatio.getPixelSizeForLayoutSize(2),
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(2),
      },
      text: {
        textAlign: 'center',
        fontSize: PixelRatio.getFontScale() * 15,
        fontWeight: '600',
        color: COLOR.WHITE,
      },
    });
  };

  changeState = () => {
    if(this.state.isActive)
      this.deactivateTag();
    else
      this.activateTag();
  };

  activateTag = () => {
    const { activeColor, addTagToOpinion } = this.props;

    this.setState({
      isActive: true,
      backgroundColor: activeColor,
    });

    addTagToOpinion(this);
  };

  deactivateTag = () => {
    const { nonActiveColor, removeTagFromOpinion } = this.props;

    this.setState({
      isActive: false,
      backgroundColor: nonActiveColor,
    });

    removeTagFromOpinion(this);
  };

  render() {
    const { text } = this.state;
    const styles = this.makeStyles();

    return (
      <TouchableWithoutFeedback style={styles.touchable} onPress={this.changeState}>
        <View style={styles.view}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };
};
