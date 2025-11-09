import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '@src/App';
import { SearchInput } from '@src/components';
import styles from './styles';

export default function SearchScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Tabs'>>();

  const [query, setQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <SearchInput
        value={query}
        onChange={setQuery}
        onSubmit={() => {
          const trimmed = query.trim();
          if (trimmed) {
            navigation.navigate('SearchDetail', { query: trimmed });
          }
        }}
      />
    </SafeAreaView>
  );
}
