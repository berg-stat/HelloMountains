import React, { Component } from 'react';
import { Alert, TextInput, View, TouchableHighlight, Text} from 'react-native';

import styles from './styles';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };
    }

    onLogin() {
        Alert.alert(`Zalogowałeś się!`);
    }

    onRegister() {
        Alert.alert(`Zarejestrowałeś się!`);
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    value={this.state.username}
                    onChangeText={(username) => this.setState({ username })}
                    placeholder={'Username'}
                    style={styles.input}
                />
                <TextInput
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    style={styles.input}
                />
                <View style={styles.button}>
                    <TouchableHighlight onPress={this.onLogin.bind(this)} underlayColor={COLOR.DIM_GRAY}>
                        <Text style={styles.buttonLabel}>ZALOGUJ</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.button}>
                    <TouchableHighlight onPress={this.onRegister.bind(this)} underlayColor={COLOR.DIM_GRAY}>
                        <Text style={styles.buttonLabel}>REJESTRACJA</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
