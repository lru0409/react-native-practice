import { StyleSheet } from 'react-native';

import commonStyles from '@src/styles/common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginBottom: 25,
  },
  content: {
    flex: 1,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: '50%',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  username: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 2,
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
});

export default styles;