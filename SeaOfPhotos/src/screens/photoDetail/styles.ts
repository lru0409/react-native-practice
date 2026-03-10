import { StyleSheet } from 'react-native';

import commonStyles, { CONTAINER_WIDTH } from '@src/styles/common';

const styles = StyleSheet.create({
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
  listLoadingContainer: commonStyles.listLoadingContainer,
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
  findMoreText: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 10,
    marginLeft: 5,
  },
  // TODO: emptyContainer, emptyText 스타일 common으로 옮기는 게 좋을수도
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: 'gray',
    fontSize: 18,
    fontWeight: '300',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginBottom: 80,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 23,
  },
});

export default styles;
