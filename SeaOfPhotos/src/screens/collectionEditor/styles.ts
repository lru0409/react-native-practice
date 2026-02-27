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
  // TODO: login button과 스타일이 겹침. Button 컴포넌트 만들자
  saveButton: {
    padding: 12,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;