import { StyleSheet } from 'react-native';

import commonStyles from '@src/styles/common';

const styles = StyleSheet.create({
  backButtonContainer: {
    position: 'absolute',
    zIndex: 1,
    left: 8,
    top: 8,
  },
  initialLoadingContainer: commonStyles.initialLoadingContainer,
  listLoadingContainer: commonStyles.listLoadingContainer,
  findMoreText: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 10,
    marginLeft: 5,
  },
  // TODO: emptyContainer, emptyText 스타일 common으로 옮기는 게 좋을수도
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginBottom: 80,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 23,
  },
});

export default styles;
