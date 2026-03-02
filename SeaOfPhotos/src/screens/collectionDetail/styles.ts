import { StyleSheet } from 'react-native';

import commonStyles from '@src/styles/common';

const styles = StyleSheet.create({
  listLoadingContainer: commonStyles.listLoadingContainer,
  editButton: {
    height: 35,
    width: 32,
  },
  editIcon: {
    margin: 'auto',
  },
  textContent: {
    paddingTop: 10,
    paddingHorizontal: 15,
    paddingBottom: 17,
    gap: 10,
  },
  description: {
    lineHeight: 20,
  },
  date: {
    fontSize: 13,
    color: 'gray',
  },
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