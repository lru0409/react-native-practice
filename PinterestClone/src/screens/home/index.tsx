import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategorySelector from './components/CategorySelector';
import { SCREEN_HORIZONTAL_PADDING } from '../../constants/styles'

const COLUMN_COUNT = 2;
const SPACING_BETWEEN_ITEMS = 5; // 아이템 사이 여백
const ITEM_SIZE =
  (Dimensions.get('window').width - SCREEN_HORIZONTAL_PADDING * 2 - SPACING_BETWEEN_ITEMS * (COLUMN_COUNT - 1)) / COLUMN_COUNT;

const DATA = [
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' },
  { id: '5' },
  { id: '6' },
  { id: '7' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <CategorySelector />
      <FlatList
        data={DATA}
        numColumns={COLUMN_COUNT}
        keyExtractor={item => item.id}
        renderItem={({ index }) => <View style={getItemStyle(index)} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
  },
});

const getItemStyle = (index: number): ViewStyle => {
  return {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: (index + 1) % COLUMN_COUNT === 0 ? 0 : SPACING_BETWEEN_ITEMS,
    marginBottom: SPACING_BETWEEN_ITEMS,
  };
};
