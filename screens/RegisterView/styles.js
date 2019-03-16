import {StyleSheet} from "react-native";
import COLOR from "../../consts/colors";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR.WHITE,
    },
    card: {
        backgroundColor: COLOR.LIGHT_DIM_GRAY,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '90%',
        height: '10%',
        padding: 10,
        borderWidth: 1,
        borderColor: COLOR.LIGHT_SLATE_GRAY,
        borderRadius: 20,
        marginBottom: 10,
    },
    button: {
        width: '80%',
        height: '7%',
        marginBottom: 21,
        marginTop: 21,
        borderWidth: 1,
        borderColor: COLOR.LIGHT_SLATE_GRAY,
        borderRadius: 20,
        backgroundColor: COLOR.DIM_GRAY,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLabel: {
        color: COLOR.TEXT,
        textShadowRadius: 10,
        textShadowColor: COLOR.LIGHT_SLATE_GRAY,
    },
    infoText: {
        fontSize: 15,
        margin: '6%',
        alignSelf: 'center',
    },
    pageTitle: {
        fontSize: 20,
        color: COLOR.DIM_GRAY,
        fontWeight: 'bold',
        marginBottom: '4%',
    }
});