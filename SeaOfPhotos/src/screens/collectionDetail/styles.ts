import { StyleSheet } from 'react-native';

import commonStyles from '@src/styles/common';

const styles = StyleSheet.create({
  listLoadingContainer: commonStyles.listLoadingContainer,
  menuButton: {
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
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
  menuBackdrop: {
    flex: 1,
  },
  dropdownMenu: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 10,
    minWidth: 150,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 10,
  },
  menuItemText: {
    fontSize: 15,
  },
  menuItemDestructive: {
    color: '#FF3B30',
  },
  menuSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 8,
  },
});

export default styles;
