import { StyleSheet } from 'react-native';

import { SCREEN_HORIZONTAL_PADDING } from '@src/styles/common';

const styles = StyleSheet.create({
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING + 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

export default styles;