import { StyleSheet } from 'react-native';

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
  // TODO: SearchInput이랑 스타일이 겹침. Input 컴포넌트를 공통 컴포넌트로 만들어놓고 재사용하면 좋을 듯
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 14,
    borderStyle: 'solid',
    paddingVertical: 12,
    paddingHorizontal: 17,
    fontSize: 15,
    width: '100%',
  },
  // TODO: login button과 스타일이 겹침. Button 컴포넌트 만들자
  createButton: {
    padding: 12,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;