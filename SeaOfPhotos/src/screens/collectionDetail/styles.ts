import { StyleSheet } from 'react-native';

import commonStyles from '@src/styles/common';

const styles = StyleSheet.create({
  container: commonStyles.container,
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default styles;