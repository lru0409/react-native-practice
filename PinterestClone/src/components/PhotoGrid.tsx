import {
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '@src/App';
import { Photo } from '@src/types/photo';
import { SCREEN_HORIZONTAL_PADDING } from '@src/constants/styles';

const COLUMN_COUNT = 2;
const SPACING_BETWEEN_ITEMS = 5; // 아이템 사이 여백
const ITEM_SIZE =
  (Dimensions.get('window').width -
    SCREEN_HORIZONTAL_PADDING * 2 -
    SPACING_BETWEEN_ITEMS * (COLUMN_COUNT - 1)) /
  COLUMN_COUNT;

export default function PhotoGrid({ photos }: { photos: Photo[] }) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Tabs'>>();

  return (
    <FlatList
      data={photos}
      numColumns={COLUMN_COUNT}
      keyExtractor={item => item.id}
      scrollEnabled={false}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={getItemStyle(index)}
          onPress={() => {
            navigation.navigate('PhotoDetail', { photo: item });
          }}
        >
          <Image style={styles.image} source={{ uri: item.urls.small }} />
        </TouchableOpacity>
      )}
    />
  );
}

const getItemStyle = (index: number): ViewStyle => {
  return {
    width: ITEM_SIZE,
    height: ITEM_SIZE * 1.2,
    borderRadius: 16,
    marginRight: (index + 1) % COLUMN_COUNT === 0 ? 0 : SPACING_BETWEEN_ITEMS,
    marginBottom: SPACING_BETWEEN_ITEMS,
    overflow: 'hidden',
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
