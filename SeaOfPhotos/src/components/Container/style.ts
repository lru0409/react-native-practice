import { StyleSheet, Dimensions } from 'react-native';

export const SCREEN_HORIZONTAL_PADDING = 6;
export const CONTAINER_WIDTH = Dimensions.get('window').width - SCREEN_HORIZONTAL_PADDING * 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
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
  headerSpacer: {
    width: 32,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 23,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;