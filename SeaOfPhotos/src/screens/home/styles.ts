import { StyleSheet } from 'react-native';

import commonStyles from '@src/styles/common';

const styles = StyleSheet.create({
  initialLoadingContainer: commonStyles.initialLoadingContainer,
  listLoadingContainer: commonStyles.listLoadingContainer,
  // TODO: emptyContainer, emptyText 스타일 중복
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: 'gray',
    fontSize: 18,
    fontWeight: '300',
  },
});

export default styles;