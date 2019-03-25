import { StyleSheet } from "react-native";
import COLOR from "../../consts/colors";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.WHITE,
  },
  card: {
    backgroundColor: COLOR.LIGHT_DIM_GRAY,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 15,
    margin: '6%',
    alignSelf: 'center',
  },
});