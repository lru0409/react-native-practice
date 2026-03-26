import { StyleSheet } from 'react-native';

import { SCREEN_HORIZONTAL_PADDING } from '@src/styles/common';

const PADDING_HORIZONTAL = SCREEN_HORIZONTAL_PADDING + 18;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  profileInfoContainer: {
    gap: 12,
    marginBottom: 16,
    paddingHorizontal: PADDING_HORIZONTAL,
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
    marginHorizontal: PADDING_HORIZONTAL,
  },
  tabsPager: {
    flex: 1,
    marginTop: 12,
  },
  tabsPanel: {
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    flex: 1,
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
});

export default styles;
