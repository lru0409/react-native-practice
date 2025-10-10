import { StyleSheet } from 'react-native';

import commonStyles from '@src/styles/common';

const styles = StyleSheet.create({
  container: commonStyles.container,
  initialLoadingContainer: commonStyles.initialLoadingContainer,
  listLoadingContainer: commonStyles.listLoadingContainer,
  contentContainer: {
    marginTop: 5,
  },
});

export default styles;
