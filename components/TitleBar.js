import React, { Component } from 'react';
import {Text, TouchableWithoutFeedback, View, StyleSheet} from "react-native";
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/MaterialIcons";
import COLOR from "../consts/colors";


export default class TitleBar extends Component {
    static propTypes = {
        onPress: PropTypes.any
    };

    render() {
        return <View style={{flexDirection: "row", justifyItems: "flex-start"}}>
            <TouchableWithoutFeedback onPress={this.props.onPress} style={{justifySelf: "start"}}>
                <Icon name="keyboard-backspace" size={30} color={COLOR.DIM_GRAY}/>
            </TouchableWithoutFeedback>
            <Text style={styles.pageTitle}>
                Rejestracja
            </Text>
        </View>;
    }
}

const styles = StyleSheet.create({
    pageTitle: {
        fontSize: 20,
        color: COLOR.DIM_GRAY,
        fontWeight: 'bold',
        marginBottom: '4%',
    }
});
