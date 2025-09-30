import { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '@src/App';
import { SCREEN_HORIZONTAL_PADDING } from '@src/constants/styles';

export default function SearchScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Tabs'>>();

  const [query, setQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 14,
    borderStyle: 'solid',
    paddingVertical: 12,
    paddingHorizontal: 17,
    fontSize: 15,
    lineHeight: 20,
  },
});
