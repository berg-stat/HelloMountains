import { StyleSheet } from 'react-native';
import COLOR from '../../consts/colors';


export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: COLOR.BACKGROUND,
  },
  userDataForm: {
    backgroundColor: COLOR.BACKGROUND,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 20,
  },
  titleText: {
    marginTop: '10%',
    color: COLOR.WHITE,
    fontSize: 36,
  },
  changePasswordButton: {
    width: '80%',
  },
  signOutTextContainter: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: '5%',
  },
  signOutText: {
    fontSize: 16,
    color: COLOR.WHITE,
  },
});
