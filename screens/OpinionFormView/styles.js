import { StyleSheet, PixelRatio } from 'react-native';
import COLOR from '../../consts/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    backgroundColor: COLOR.BACKGROUND_PLACE_DETAILS,
    paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(3),
    paddingTop: PixelRatio.getPixelSizeForLayoutSize(6),
    paddingBottom: PixelRatio.getPixelSizeForLayoutSize(3),
  },
  header: {
    backgroundColor: COLOR.DARK_BLUE,
    borderBottomWidth: 0,
  },
  textInput: {
    flex:1,
    width: '100%',
    marginBottom: PixelRatio.getPixelSizeForLayoutSize(3),
    fontSize: PixelRatio.getFontScale() * 18,
    padding: PixelRatio.getPixelSizeForLayoutSize(4),
    borderBottomLeftRadius: PixelRatio.getPixelSizeForLayoutSize(4),
    borderBottomRightRadius: PixelRatio.getPixelSizeForLayoutSize(4),
    borderColor: COLOR.LIGHT_DIM_GRAY,
    backgroundColor: COLOR.WHITE,
    textAlignVertical: 'top',
  },
  addRecommendationButton: {
    width: '55%',
  },
});
