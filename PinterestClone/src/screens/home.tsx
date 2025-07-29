import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const numColumns = 2;
const spacing = 5; // 아이템 사이 여백
const sidePadding = 6; // 화면 좌우 여백

const screenWidth = Dimensions.get('window').width;
const itemSize =
  (screenWidth - sidePadding * 2 - spacing * (numColumns - 1)) / numColumns;

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
      <View>
        <Text>Category Selector Area</Text>
      </View>
      <FlatList
        data={DATA}
        numColumns={numColumns}
        keyExtractor={item => item.id}
        renderItem={({ index }) => <View style={getItemStyle(index)} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sidePadding,
    paddingTop: sidePadding,
  },
});

const getItemStyle = (index: number): ViewStyle => {
  return {
    width: itemSize,
    height: itemSize,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: (index + 1) % numColumns === 0 ? 0 : spacing,
    marginBottom: spacing,
  };
};
