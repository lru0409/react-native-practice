import { useEffect } from 'react';
import { FlatList, ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { UNSPLASH_ACCESS_KEY } from '@env';
import CategorySelector from './components/CategorySelector';
import { UNSPLASH_BASE_URL } from '@src/constants/api';
import { type Photo, type PhotoResponse } from '@src/types/photo';
import usePagination from '@src/hooks/usePagination';
import PhotoGrid from '@src/components/PhotoGrid';
import styles from './styles';

export default function HomeScreen() {
  const { data: photos, isFirstFetching, isFetchingMore, firstFetch, loadMore } = usePagination<Photo>({
    fetchData: fetchPhotos,
  });

  async function fetchPhotos(page: number) {
    const response = await fetch(`${UNSPLASH_BASE_URL}/photos?page=${page}`, {
      method: 'GET',
      headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const total = Number(response.headers.get('x-total'));
    const perPage = Number(response.headers.get('x-per-page'));
    const totalPages = Math.ceil(total / perPage);

    const data = (await response.json()) as PhotoResponse[];
    return {
      data: data.slice(page === 1 ? 0 : 1).map(
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
          } as Photo)),
      hasMore: page < totalPages,
    }
  };

  useEffect(() => {
    firstFetch();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <CategorySelector />
      {isFirstFetching && (
        <View style={styles.initialLoadingContainer}>
          <ActivityIndicator />
        </View>
      )}
      {/* FlatList 의도와 너무 안 맞는 듯 함. ScrollView 쓰는 게 나을까? */}
      {!isFirstFetching && (
        <FlatList
          data={[photos]}
          renderItem={({ item }: { item: Photo[] }) => <PhotoGrid photos={item} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          scrollEventThrottle={100}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={
            isFetchingMore ? (
              <View style={styles.listLoadingContainer}>
                <ActivityIndicator />
              </View>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}
