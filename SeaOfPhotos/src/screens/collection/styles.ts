import { StyleSheet } from 'react-native';

import commonStyles from '@src/styles/common';

const styles = StyleSheet.create({
  container: commonStyles.container,
  initialLoadingContainer: commonStyles.initialLoadingContainer,
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 23,
  }
});

export default styles;