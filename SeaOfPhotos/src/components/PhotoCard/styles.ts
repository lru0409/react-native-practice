import { StyleSheet, Dimensions, ViewStyle } from 'react-native';

import { SCREEN_HORIZONTAL_PADDING, PHOTO_GRID } from '@src/styles/common';

const contentWidth = Dimensions.get('window').width - SCREEN_HORIZONTAL_PADDING * 2;
const totalSpacing = PHOTO_GRID.SPACING_BETWEEN_ITEMS * (PHOTO_GRID.COLUMN_COUNT - 1);
const itemSize = (contentWidth - totalSpacing) / PHOTO_GRID.COLUMN_COUNT;

export const getItemStyle = (index: number, size?: number): ViewStyle => {
  return {
    width: size || itemSize,
    height: itemSize * 1.2,
    borderRadius: 16,
    marginRight: (index + 1) % PHOTO_GRID.COLUMN_COUNT === 0 ? 0 : PHOTO_GRID.SPACING_BETWEEN_ITEMS,
    marginBottom: PHOTO_GRID.SPACING_BETWEEN_ITEMS,
    overflow: 'hidden',
    position: 'relative',
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  likeButtonWrapper: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 1,
  },
});

export default styles;
