import { StyleSheet } from 'react-native';
import COLOR from '../../consts/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: COLOR.BACKGROUND,
    borderBottomWidth: 0,
  },
  settingsButton: {
    alignItems: 'flex-end',
  },
  placesSearchBar: {
    marginTop: '7%',
  },
});
