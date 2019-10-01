import { StyleSheet } from 'react-native';
import COLOR from '../../consts/colors';

export default StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFill,
  },
  titleContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: COLOR.BACKGROUND,
    borderBottomWidth: 0,
  },
  imageSize: {
    width: 150,
    height: 100,
  },
  titleText: {
    color: COLOR.WHITE,
    fontSize: 35,
    width: '100%',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: COLOR.DARK_BLUE,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 6,
  },
  loader: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
