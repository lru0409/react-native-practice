import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';

type SettingMenuItemProps = {
  iconName: string;
  label: string;
  onPress: () => void;
  danger?: boolean;
};

export default function SettingMenuItem({
  iconName,
  label,
  onPress,
  danger = false,
}: SettingMenuItemProps) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <Icon name={iconName} size={20} color={danger ? '#dc2626' : '#111827'} />
        <Text style={[styles.menuLabel, danger && styles.menuLabelDanger]}>{label}</Text>
      </View>
      <Icon name="chevron-forward" size={18} color="#9ca3af" />
    </TouchableOpacity>
  );
}
