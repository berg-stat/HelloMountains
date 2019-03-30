import { StyleSheet } from 'react-native';
import COLOR from '../../consts/colors';

export default StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLOR.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFill,
  },
  titleContainer: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageSize: {
    width: 150,
    height: 100,
  },
  titleText: {
    color: COLOR.WHITE,
    fontSize: 35,
    fontWeight: 'bold',
    textShadowColor: COLOR.DARK_BLUE,
    textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 4,

  },
});
