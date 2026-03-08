import { StyleSheet, Dimensions } from 'react-native';

export const SCREEN_HORIZONTAL_PADDING = 6;
export const CONTAINER_WIDTH = Dimensions.get('window').width - SCREEN_HORIZONTAL_PADDING * 2;

export const PHOTO_GRID_COLUMN_COUNT = 2;

export const PHOTO_GRID = {
  COLUMN_COUNT: 2,
  SPACING_BETWEEN_ITEMS: 5,
};

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
  },
  initialLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listLoadingContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 14,
    borderStyle: 'solid',
    paddingVertical: 12,
    paddingHorizontal: 17,
    fontSize: 15,
    width: '100%',
  },
});

export default commonStyles;
