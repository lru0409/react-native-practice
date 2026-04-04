import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  menuItem: {
    minHeight: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
  },
  menuLabelDanger: {
    color: '#dc2626',
  },
});

export default styles;
