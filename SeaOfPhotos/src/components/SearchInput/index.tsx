import { TextInput } from 'react-native';
import styles from './styles';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export default function SearchInput({ value, onChange, onSubmit }: SearchInputProps) {
  return (
    <TextInput
      style={styles.textInput}
      placeholder="Sea of photos 검색"
      placeholderTextColor="gray"
      value={value}
      onChangeText={onChange}
      returnKeyType="search"
      onSubmitEditing={onSubmit}
    />
  );
}
