import { StyleSheet } from 'react-native';
import COLOR from '../../consts/colors';


export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.BACKGROUND,
  },
  header: {
    backgroundColor: COLOR.BACKGROUND,
    borderBottomWidth: 0,
  },
  titleText: {
    color: COLOR.WHITE,
    fontSize: 36,
  },
  infoText: {
    fontSize: 15,
    width: '80%',
    textAlign: 'center',
    color: COLOR.INFO_TEXT,
  },
  loginRedirection: {
    justifyContent: 'space-between',
    marginTop: '6%',
    marginBottom: '6%',
    fontSize: 15,
    color: COLOR.WHITE,
  },
  registrationFormContainer: {
    width: '100%',
  },
  loader: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
