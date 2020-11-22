import { StyleSheet } from 'react-native';
import COLOR from '../../consts/colors';


export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLOR.BACKGROUND,
  },
  header: {
    backgroundColor: COLOR.BACKGROUND,
    borderBottomWidth: 0,
  },
  userDataForm: {
    backgroundColor: COLOR.BACKGROUND,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: '2.5%',
  },
  userInfoContainer: {
    width: '100%',
    alignItems: 'center',
    padding: '5%',
    margin: '5%',
    marginTop: 0,
    minHeight: '17%',
    borderBottomWidth: 1,
    backgroundColor: COLOR.INFO_TEXT,
    color: COLOR.DARK_BLUE,
    borderColor: COLOR.DARK_BLUE,
  },
  changePasswordText: {
    color: COLOR.INFO_TEXT,
    fontSize: 20,
  },
  userInfoText: {
    color: COLOR.DARK_BLUE,
    fontSize: 22,
  },
  changePasswordButton: {
    width: '80%',
  },
  signOutTextContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: '2.5%',
  },
  signOutText: {
    fontSize: 16,
    color: COLOR.WHITE,
  },
});
