import { StyleSheet } from 'react-native';
import COLOR from '../../consts/colors';

export default StyleSheet.create({
  container: {
    width: '100%',
    ...StyleSheet.absoluteFill,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLOR.WHITE,
  },
});
