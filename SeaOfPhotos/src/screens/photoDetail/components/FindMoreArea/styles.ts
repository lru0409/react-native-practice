import { StyleSheet } from 'react-native';

import commonStyles from '@src/styles/common';

const styles = StyleSheet.create({
  findMoreText: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 10,
    marginLeft: 5,
  },
  initialLoadingContainer: commonStyles.initialLoadingContainer,
  listLoadingContainer: commonStyles.listLoadingContainer,
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
    paddingTop: 15,
    paddingBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 23,
  },
});

export default styles;
