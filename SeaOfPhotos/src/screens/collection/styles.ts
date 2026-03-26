import { StyleSheet } from 'react-native';

import commonStyles from '@src/styles/common';

const styles = StyleSheet.create({
  container: commonStyles.container,
  listLoadingContainer: commonStyles.listLoadingContainer,
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 15,
  },
  userButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userProfileImage: {
    width: 40,
    height: 40,
    borderRadius: '50%',
  },
  username: {
    fontSize: 16,
    fontWeight: '500',
  },
  // TODO empty ui 컴포넌트 분리
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