import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import TouchableTag from './TouchableTag';

import COLOR from '../consts/colors';


const db = {
  data: {
    reportReasons : [
      'misleading',
      'vulgar',
      'faulty'
    ],
  },
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 6,
    backgroundColor: COLOR.WHITE,
  },
  tagsContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
});

export default class ReportReasonsSet extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      reasons: [],
      tagDeactivationFunc: () => {}
    };
  };

  async componentDidMount() {
    this.addReasonsFromResponseToState(db);
  };

  addReasonsFromResponseToState(response) {
    const { reportReasons } = response.data;

    this.setState({
      reasons: reportReasons,
    });
  };

  renderTags() {
    const { reasons } = this.state;

    return reasons.map((reason) =>
    <TouchableTag
      key={reason}  //TO DO:should by change on reason id
      text={reason}
      category={'reason'}
      isActive={false}
      activeColor={COLOR.TAG_ACTIVE}
      nonActiveColor={COLOR.TAG_NON_ACTIVE}
      addTagToOpinion={this.addReasonToReport}
      removeTagFromOpinion={this.removeReasonFromReport}
    />
    );
  };

  addReasonToReport = (tag) => {
    this.state.tagDeactivationFunc();
    this.props.onChange(tag.state.text);

    this.setState({
        tagDeactivationFunc: () => {
          tag.setState({ isActive: false, backgroundColor: tag.props.nonActiveColor })
        },
      }
    );
  };

  removeReasonFromReport = () => {
    this.state.tagDeactivationFunc();
    this.props.onChange('');

    this.setState({
        tagDeactivationFunc: () => {
        },
      }
    );
  };


  render() {
    return (
      <View style={styles.container}>
        {this.renderTags()}
      </View>
    );
  };
};
