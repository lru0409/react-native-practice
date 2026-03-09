import { StyleSheet, Dimensions, ViewStyle } from 'react-native';

import { SCREEN_HORIZONTAL_PADDING, COLLECTION_GRID } from '@src/styles/common';

const contentWidth = Dimensions.get('window').width - SCREEN_HORIZONTAL_PADDING * 2;
const totalSpacing = COLLECTION_GRID.SPACING_BETWEEN_ITEMS * (COLLECTION_GRID.COLUMN_COUNT - 1);
const itemSize = (contentWidth - totalSpacing) / COLLECTION_GRID.COLUMN_COUNT;

export const getItemStyle = (index: number): ViewStyle => {
  return { 
    width: itemSize,
    height: itemSize + 55,
    marginRight: (index + 1) % COLLECTION_GRID.COLUMN_COUNT === 0 ? 0 : COLLECTION_GRID.SPACING_BETWEEN_ITEMS,
    marginBottom: COLLECTION_GRID.SPACING_BETWEEN_ITEMS,
    overflow: 'hidden',
  };
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    height: 55,
    padding: 7,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  details: {
    fontSize: 12,
    color: 'gray',
  }
});

export default styles;