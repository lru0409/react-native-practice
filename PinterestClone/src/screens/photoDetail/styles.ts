import { StyleSheet } from 'react-native';

import commonStyles, { CONTAINER_WIDTH } from '@src/styles/common';

const styles = StyleSheet.create({
  container: commonStyles.container,
  contentContainer: {
    height: '100%',
  },
  backButton: {
    height: 35,
    width: 32,
    opacity: 0.8,
    backgroundColor: 'white',
    borderRadius: 10,
    position: 'absolute',
    zIndex: 1,
    left: 8,
    top: 8,
  },
  backIcon: {
    margin: 'auto',
  },
  initialLoadingContainer: commonStyles.initialLoadingContainer,
  listLoadingContainer: commonStyles.listLoadingContainer,
  photo: {
    width: CONTAINER_WIDTH,
    resizeMode: 'cover',
    borderRadius: 16,
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
  findoutMore: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 10,
    marginLeft: 5,
  },
});

export default styles;
