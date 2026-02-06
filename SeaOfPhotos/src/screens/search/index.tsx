import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '@src/App';
import { SearchInput, Container } from '@src/components';

export default function SearchScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Tabs'>>();

  const [query, setQuery] = useState('');

  return (
    <Container>
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
    </Container>
  );
}
