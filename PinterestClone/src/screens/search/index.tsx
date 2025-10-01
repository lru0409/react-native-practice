import { useState } from 'react';
import { TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '@src/App';
import styles from './styles';

export default function SearchScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Tabs'>>();

  const [query, setQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* searchInput 컴포넌트화 */}
      <TextInput
        style={styles.textInput}
        placeholder='Pinterest 검색'
        placeholderTextColor='gray'
        value={query}
        onChangeText={setQuery}
        returnKeyType='search'
        onSubmitEditing={() => {
          const trimmed = query.trim();
          if (trimmed) {
            navigation.navigate('SearchDetail', { query: trimmed });
          }
        }}
      />
    </SafeAreaView>
  );
}
