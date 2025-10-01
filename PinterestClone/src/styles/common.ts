import { StyleSheet, Dimensions } from 'react-native';

export const SCREEN_HORIZONTAL_PADDING = 6;
export const CONTAINER_WIDTH = Dimensions.get('window').width - SCREEN_HORIZONTAL_PADDING * 2;

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
});

export default commonStyles;
