import { StyleSheet } from 'react-native';

import commonStyles, { CONTAINER_WIDTH } from '@src/styles/common';

const styles = StyleSheet.create({
  container: commonStyles.container,
  backButtonContainer: {
    position: 'absolute',
    zIndex: 1,
    left: 8,
    top: 8,
  },
  contentContainer: {
    height: '100%',
  },
  initialLoadingContainer: commonStyles.initialLoadingContainer,
  photoWrapper: {
    position: 'relative',
  },
  photo: {
    width: CONTAINER_WIDTH,
    resizeMode: 'cover',
    borderRadius: 16,
  },
  likeButtonWrapper: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    zIndex: 1,
  },
  infoContainer: {
    padding: 15,
  },
  description: {
    fontSize: 16,
    marginBottom: 7,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 15,
  },
  date: {
    color: '#393E46',
    fontSize: 12,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  userProfileImage: {
    height: 40,
    width: 40,
    borderRadius: '50%',
  },
});

export default styles;
