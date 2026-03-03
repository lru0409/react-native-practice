import { StyleSheet } from 'react-native';
import commonStyles from '@src/styles/common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginBottom: 25,
  },
  formContent: {
    flex: 1,
    gap: 14,
  },
  inputFieldContainer: {
    gap: 5,
  },
  switchFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  labelContainer: {
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  labelDescription: {
    fontSize: 12,
    color: 'darkgray',
  },
  input: commonStyles.textInput,
});

export default styles;