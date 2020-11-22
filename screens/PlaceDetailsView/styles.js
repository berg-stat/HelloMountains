import { StyleSheet, PixelRatio } from 'react-native';
import COLOR from '../../consts/colors';


export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLOR.BACKGROUND_PLACE_DETAILS,
  },
  header: {
    backgroundColor: COLOR.DARK_BLUE,
    borderBottomWidth: 0,
    elevation: 0,
  },
  addRecommendationButton: {
    position: 'absolute',
    bottom: PixelRatio.getPixelSizeForLayoutSize(4),
    width: '55%',
  },
});
