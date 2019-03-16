import {StyleSheet} from "react-native";
import COLOR from "../../consts/colors";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR.WHITE,
    },
    input: {
        width: '75%',
        height: '11%',
        padding: 10,
        borderWidth: 1,
        borderColor: COLOR.LIGHT_SLATE_GRAY,
        borderRadius: 20,
        marginBottom: 10,
    },
    button: {
        width: '75%',
        height: '11%',
        marginBottom: 21,
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
    }
});