import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
    height: 36,
    paddingLeft: 10,
    paddingRight: 14,
    borderRadius: 999,
    backgroundColor: '#111827',
    marginBottom: 12,
  },
  iconWrap: {
    width: 18,
    height: 18,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#374151',
  },
  text: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default styles;
