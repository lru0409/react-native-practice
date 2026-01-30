import { StyleSheet, Dimensions, ViewStyle } from 'react-native';

import { SCREEN_HORIZONTAL_PADDING } from '@src/styles/common';

export const COLUMN_COUNT = 2;
const SPACING_BETWEEN_ITEMS = 5; // 아이템 사이 여백
const ITEM_SIZE = (Dimensions.get('window').width - SCREEN_HORIZONTAL_PADDING * 2 - SPACING_BETWEEN_ITEMS * (COLUMN_COUNT - 1)) / COLUMN_COUNT;

export const getItemStyle = (index: number): ViewStyle => {
  return { 
    width: ITEM_SIZE,
    height: ITEM_SIZE + 50,
    marginRight: (index + 1) % COLUMN_COUNT === 0 ? 0 : SPACING_BETWEEN_ITEMS,
    marginBottom: SPACING_BETWEEN_ITEMS,
    overflow: 'hidden',
  };
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
  },
  textContent: {
    height: 50,
  }
});

export default styles;