import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

type ButtonProps = {
  text: string;
  disabled?: boolean;
  onPress?: () => void;
};

export default function Button({ text, disabled, onPress }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={() => { onPress?.(); }}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}
