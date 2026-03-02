import { ActivityIndicator, View, Text } from 'react-native';

import type { Photo } from '@src/types/photo';
import { usePagination } from '@src/hooks/usePagination';
import { InfiniteScrollView, PhotoGrid, Container } from '@src/components';
import CategorySelector from './components/CategorySelector';
import PhotoService from '@src/services/photo'; // TODO: 모든 서비스를 @/src/services 경로에서 임포트할 수 있도록
import styles from './styles';

export default function HomeScreen() {
  const {
    data: photos,
    isFetchingFirst,
    isFetchingMore,
    isRefetching,
    loadMore,
    refetch,
  } = usePagination<Photo>({
    queryKey: ['photos'],
    fetchData: PhotoService.fetchPhotos,
  });

  return (
    <Container>
      <CategorySelector />
      {isFetchingFirst && (
        <View style={styles.initialLoadingContainer}>
          <ActivityIndicator />
        </View>
      )}
      {!isFetchingFirst && photos.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No photos found</Text>
        </View>
      )}
      {!isFetchingFirst && photos.length > 0 && (
        <InfiniteScrollView
          isRefreshing={isRefetching}
          onRefresh={refetch}
          onEndReached={() => loadMore()}
        >
          <PhotoGrid photos={photos} />
          {isFetchingMore && (
            <View style={styles.listLoadingContainer}>
              <ActivityIndicator />
            </View>
          )}
        </InfiniteScrollView>
      )}
    </Container>
  );
}
