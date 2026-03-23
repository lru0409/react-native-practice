import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  listContainer: {
    position: 'relative',
    paddingBottom: 8,
  },
  tabList: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  tabButton: {
    paddingVertical: 4,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    backgroundColor: 'black',
  },
  pagerContainer: {
    flex: 1,
  },
  pagerContent: {
    flexDirection: 'row',
    flex: 1,
  },
  page: {
    flex: 1,
  },
});

export default styles;
