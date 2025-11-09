import { StyleSheet } from 'react-native';

import commonStyles from '@src/styles/common';

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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
    margin: 25,
  },
  loginButton: {
    padding: 12,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;