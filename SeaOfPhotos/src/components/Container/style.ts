import { StyleSheet } from 'react-native';

import { SCREEN_HORIZONTAL_PADDING } from '@src/styles/common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  horizontalPadding: {
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingBottom: 4,
  },
  headerLeft: {
    width: 80,
    height: 35,
  },
  backButton: {
    height: 35,
    width: 32,
  },
  backIcon: {
    margin: 'auto',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    height: 35,
    width: 80,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    flex: 1,
  },
  bottom: {
    marginTop: 'auto',
    marginBottom: 25,
    paddingHorizontal: 10,
  },
});

export default styles;
