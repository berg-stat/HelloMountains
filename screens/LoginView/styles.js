import {StyleSheet} from "react-native";
import COLOR from "../../consts/colors";

export default styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
    },
    appName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLOR.WHITE,
    }
});