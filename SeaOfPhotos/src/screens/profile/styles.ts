import { StyleSheet } from 'react-native';

import { SCREEN_HORIZONTAL_PADDING } from '@src/styles/common';

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING + 10,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 12,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: '50%',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  username: {
    fontSize: 14,
    color: 'gray',
  },
  bio: {
    marginBottom: 12,
  },
  subInfoContainer: {
    gap: 4,
    marginBottom: 18,
  },
  subInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  subInfoText: {
    fontSize: 12,
  }
});

export default styles;
