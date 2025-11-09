import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { UNSPLASH_ACCESS_KEY } from '@env';
import { UNSPLASH_BASE_URL } from '@src/constants/api';
import { type Photo, type PhotoResponse } from '@src/types/photo';
import usePagination from '@src/hooks/usePagination';
import { BottomDetectScrollView, PhotoGrid } from '@src/components';
import CategorySelector from './components/CategorySelector';
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
      {!isFirstFetching && (
        <BottomDetectScrollView onEndReached={loadMore}>
          <PhotoGrid photos={photos} />
          {isFetchingMore && (
            <View style={styles.listLoadingContainer}>
              <ActivityIndicator />
            </View>
          )}
        </BottomDetectScrollView>
      )}
    </SafeAreaView>
  );
}
