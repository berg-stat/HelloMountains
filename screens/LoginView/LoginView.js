import React, { Component } from 'react';
import {ImageBackground, View, Text} from 'react-native';
import LoginForm from "../LoginForm/LoginForm";
import styles from './styles';

export default class LoginView extends Component {

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require('../../assets/homePagePhoto.jpg')}
                    style={styles.image}
                >
                    <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.appName}>
                            Hello Mountains!
                        </Text>
                    </View>
                </ImageBackground>
                <LoginForm/>
            </View>
        );
    }
}
