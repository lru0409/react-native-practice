import { StyleSheet } from 'react-native';

import { SCREEN_HORIZONTAL_PADDING } from '@src/styles/common';

const styles = StyleSheet.create({
  profileContainer: {
    paddingTop: 10,
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING + 10,
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