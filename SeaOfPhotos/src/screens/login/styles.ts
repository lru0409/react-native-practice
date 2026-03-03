import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  bottomContent: {
    alignSelf: 'stretch',
    marginVertical: 25,
    marginHorizontal: 10,
  },
});

export default styles;