import { StyleSheet } from 'react-native';

import commonStyles from '@src/styles/common';

const styles = StyleSheet.create({
  container: commonStyles.container,
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 14,
    borderStyle: 'solid',
    paddingVertical: 12,
    paddingHorizontal: 17,
    fontSize: 15,
    lineHeight: 20,
  },
  initialLoadingContainer: commonStyles.initialLoadingContainer,
  listLoadingContainer: commonStyles.listLoadingContainer,
});

export default styles;
