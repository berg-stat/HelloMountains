import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  PixelRatio,
} from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import 'moment/locale/pl'
import PropTypes from 'prop-types';
import axios from 'axios';

import Tag from './Tag';
import COLOR from '../consts/colors';
import ERROR from '../consts/errors';
import { deviceStorage } from '../services';


const styles = StyleSheet.create({
  recommendation: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(4),
    padding: PixelRatio.getPixelSizeForLayoutSize(3),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '2%',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textOpinion: {
    fontSize: PixelRatio.getFontScale() * 18,
    textAlign: 'justify',
    marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(2),
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(4),
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: PixelRatio.getPixelSizeForLayoutSize(1),
    paddingLeft: PixelRatio.getPixelSizeForLayoutSize(1),
    paddingRight: PixelRatio.getPixelSizeForLayoutSize(1),
    borderTopWidth: PixelRatio.getPixelSizeForLayoutSize(0.5),
    borderColor: COLOR.LIGHT_GRAY,
  },
  numberOfLikes: {
    paddingRight: PixelRatio.getPixelSizeForLayoutSize(2),
    color: COLOR.SLATE_GRAY,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'monospace',
    fontWeight: 'bold',
    fontSize: PixelRatio.getFontScale() * 20,
  },
  likeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  timestamp: {
    color: COLOR.SLATE_GRAY,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: PixelRatio.getFontScale() * 15,
    fontWeight: '500',
    marginLeft: PixelRatio.getPixelSizeForLayoutSize(2),
    marginBottom: PixelRatio.getPixelSizeForLayoutSize(2),
  },
});

export default class Recommendation extends Component {
  static propTypes = {
    recommendation: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })),
      likes: PropTypes.arrayOf(PropTypes.string).isRequired,
      user: PropTypes.shape({
        username: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    username: PropTypes.string.isRequired,
    showMoreOptions: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const isLikedByUser = props.recommendation.likes.includes(props.username);

    this.state = {
      isLikedByUser: isLikedByUser,
      numberOfLikes: props.recommendation.likes.length,
      likeIcon: isLikedByUser ? 'like1' : 'like2',
      likeIconColor: isLikedByUser ? COLOR.BACKGROUND : COLOR.BLACK,
    }
  };

  renderTags = (tags) => {
    return tags.map((tag) => <Tag key={tag._id} info={tag.name}/>);
  };

  formatDate = () => {
    moment.locale('pl');
    return moment(this.props.recommendation.date).fromNow();
  };

  onLikePress = async () => {
    const token = `Bearer ${await deviceStorage.getItem('id_token')}`;
    const url = `/opinions/${this.state.placeName}/${this.props.recommendation._id}/`;

    if(this.state.isLikedByUser) {
      this.setStateToNotLiked();

      try {
        const response = await this.sendUnlikeToAPI(url, token);
      } catch(error) {
        this.setStateToLiked();

        Alert.alert(
          'Błąd',
          `${ERROR[error.response.data.message]}`,
          [
            { text: 'OK' },
          ],
          { cancelable: false },
        );
      }
    }
    else {
      this.setStateToLiked();

      try {
       const response = await this.sendLikeToAPI(url, token);
      } catch(error) {
        this.setStateToNotLiked();

        Alert.alert(
          'Błąd',
          `${ERROR[error.response.data.message]}`,
          [
            { text: 'OK' },
          ],
          { cancelable: false },
        );
      }
    }
  };

  sendLikeToAPI = async (url, token) => {
    return await axios.put(`${url}likes`,
      {},
      {
        headers: {
          Authorization: token,
        }
      });
  };

  sendUnlikeToAPI = async (url, token) => {
    return await axios.put(`${url}unlikes`,
      {},
      {
        headers: {
          Authorization: token,
        }
      });
  };

  setStateToLiked = () => {
    this.setState({
      isLikedByUser: true,
      numberOfLikes: (this.state.numberOfLikes + 1),
      likeIcon: 'like1',
      likeIconColor: COLOR.BACKGROUND,
    });
  };

  setStateToNotLiked = () => {
    this.setState({
        isLikedByUser: false,
        numberOfLikes: (this.state.numberOfLikes - 1),
        likeIcon: 'like2',
        likeIconColor: COLOR.BLACK,
      }
    );
  };

  adjustBackgroundColor = () => {
    const difference = moment().diff(moment(this.props.recommendation.date), 'days');

    if (difference >= 7) {
      return COLOR.VERY_OLD_RECOMMENDATION;
    }
    return difference < 1 ? COLOR.RECENT_RECOMMENDATION : COLOR.MODERATE_OLD_RECOMMENDATION;
  };

  render() {
    const { numberOfLikes, likeIcon, likeIconColor } = this.state;
    const { _id, text, tags, user, date } = this.props.recommendation;
    const { showMoreOptions } = this.props;
    return (
      <View style={{
        ...styles.recommendation,
        backgroundColor: this.adjustBackgroundColor(),
      }}>
        <View style={styles.header}>
        <Text style={styles.userName}>{user.username}</Text>
        <IconEntypo
          name={"dots-three-horizontal"}
          size={25} color={COLOR.SLATE_GRAY}
          onPress={() => {showMoreOptions({_id, text, tags, date, user: user.username})}}/>
        </View>
        <View style={styles.tagsContainer}>
          {this.renderTags(tags)}
        </View>
        <Text style={styles.textOpinion}>{text}</Text>
        <View style={styles.footer}>
          <View style={styles.likeContainer}>
          <Text style={styles.numberOfLikes}>{numberOfLikes}</Text>
          <TouchableOpacity onPress={this.onLikePress}>
            <IconAnt name={likeIcon} size={PixelRatio.getFontScale() * 23} color={likeIconColor}/>
          </TouchableOpacity>
          </View>
          <Text style={styles.timestamp}>{this.formatDate()}</Text>
        </View>
      </View>
    );
  }
}
