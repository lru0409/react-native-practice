import { StyleSheet } from 'react-native';

import commonStyles from '@src/styles/common';

const styles = StyleSheet.create({
  container: commonStyles.container,
  initialLoadingContainer: commonStyles.initialLoadingContainer,
  listLoadingContainer: commonStyles.listLoadingContainer,
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  searchInputContainer: {
    flex: 1,
  },
  contentContainer: {
    marginTop: 7,
  },
});

export default styles;
