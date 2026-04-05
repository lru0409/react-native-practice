import { StyleSheet } from 'react-native';

import { SCREEN_HORIZONTAL_PADDING } from '@src/styles/common';

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING + 10,
  },
  menuGroup: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
});

export default styles;
