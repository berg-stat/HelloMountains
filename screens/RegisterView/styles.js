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
  registrationForm: {
    backgroundColor: COLOR.BACKGROUND,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 20,
  },
  titleText: {
    color: COLOR.WHITE,
    fontSize: 36,
  },
  infoText: {
    fontSize: 15,
    width: '80%',
    textAlign: 'center',
    color: '#7fb9f2',
  },
  confirmButton: {
    width: '80%',
  },
  loginRedirection: {
    fontSize: 15,
    margin: '6%',
    color: COLOR.WHITE,
  },
});
