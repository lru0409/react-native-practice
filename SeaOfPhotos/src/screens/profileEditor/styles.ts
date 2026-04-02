import { StyleSheet } from 'react-native';

import commonStyles, { SCREEN_HORIZONTAL_PADDING } from '@src/styles/common';

const styles = StyleSheet.create({
  formContent: {
    paddingTop: 10,
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING + 10,
    gap: 14,
  },
  inputFieldContainer: {
    gap: 5,
  },
  rowFieldContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  halfField: {
    flex: 1,
    gap: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  input: commonStyles.textInput,
});

export default styles;
