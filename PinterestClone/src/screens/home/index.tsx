import { useState, useEffect } from 'react';
import {
  StyleSheet,
  FlatList,
  Dimensions,
  ViewStyle,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { UNSPLASH_ACCESS_KEY } from '@env';
import CategorySelector from './components/CategorySelector';
import { SCREEN_HORIZONTAL_PADDING } from '@src/constants/styles';
import { UNSPLASH_BASE_URL } from '@src/constants/api';
import { type Photo, type PhotoResponse } from '@src/types/photo';
import { RootStackParamList } from '@src/App';

const COLUMN_COUNT = 2;
const SPACING_BETWEEN_ITEMS = 5; // 아이템 사이 여백
const ITEM_SIZE =
  (Dimensions.get('window').width -
    SCREEN_HORIZONTAL_PADDING * 2 -
    SPACING_BETWEEN_ITEMS * (COLUMN_COUNT - 1)) /
  COLUMN_COUNT;

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Tabs'>>();

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    const fetchPhotos = async (page: number) => {
      const response = await fetch(`${UNSPLASH_BASE_URL}/photos?page=${page}`, {
        method: 'GET',
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const total = Number(response.headers.get('x-total'));
      const perPage = Number(response.headers.get('x-per-page'));
      const totalPages = Math.ceil(total / perPage);
      setHasMore(page < totalPages);

      const data = (await response.json()) as PhotoResponse[];
      setPhotos(prev => [
        ...prev,
        ...data.slice(page === 1 ? 0 : 1).map(
          item =>
            ({
              id: item.id,
              description: item.alt_description,
              createdAt: item.created_at,
              urls: item.urls,
              user: {
                name: item.user.name,
                profileImage: item.user.profile_image.medium,
              },
            } as Photo),
        ),
      ]);
    };

    fetchPhotos(page);
  }, [page]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <CategorySelector />
      <FlatList
        data={photos}
        numColumns={COLUMN_COUNT}
        keyExtractor={item => item.id}
        onEndReached={() => {
          if (hasMore) {
            setPage(prev => prev + 1);
          }
        }}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

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
