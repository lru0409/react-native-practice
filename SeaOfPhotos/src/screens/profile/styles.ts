import { StyleSheet } from 'react-native';

const ADDITIONAL_HORIZONTAL_PADDING = 18;

const styles = StyleSheet.create({
  settingsButton: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 10,
  },
  profileInfoContainer: {
    gap: 12,
    marginBottom: 16,
    paddingHorizontal: ADDITIONAL_HORIZONTAL_PADDING,
  },
  profileHeader: {
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
    marginBottom: 4,
  },
  username: {
    fontSize: 14,
    color: 'gray',
  },
  profileSubInfo: {
    gap: 4,
  },
  subInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  subInfoText: {
    fontSize: 12,
  },
  tabs: {
    flex: 1,
  },
  tabsList: {
    marginHorizontal: ADDITIONAL_HORIZONTAL_PADDING,
  },
  tabsPager: {
    flex: 1,
    marginTop: 12,
  },
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
  errorNotice: {
    marginBottom: 80,
  },
});

export default styles;
