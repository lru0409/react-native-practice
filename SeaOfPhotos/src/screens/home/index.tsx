import { ActivityIndicator, View, Text, FlatList } from 'react-native';

import type { Photo } from '@src/types/photo';
import { usePagination } from '@src/hooks/usePagination';
import { Container, PhotoCard } from '@src/components';
import CategorySelector from './components/CategorySelector';
import { PhotoService } from '@src/services';
import { PHOTO_GRID } from '@src/styles/common';
import styles from './styles';

export default function HomeScreen() {
  const {
    data: photos,
    isFetchingFirst,
    isFetchingMore,
    isRefetching,
    isError,
    loadMore,
    refetch,
  } = usePagination<Photo>({
    queryKey: ['photos'],
    fetchData: PhotoService.fetchPhotos,
  });

  return (
    <Container isError={isError}>
      <CategorySelector />
      <FlatList
        data={photos}
        numColumns={PHOTO_GRID.COLUMN_COUNT}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => <PhotoCard photo={item} index={index} />}
        refreshing={isRefetching}
        onRefresh={refetch}
        scrollEnabled={photos.length > 0}
        onEndReached={loadMore}
        contentContainerStyle={photos.length === 0 ? styles.emptyContainer : undefined}
        ListEmptyComponent={isFetchingFirst ? <ActivityIndicator /> : <Text style={styles.emptyText}>No photos found</Text>}
        ListFooterComponent={
          isFetchingMore ? (
            <View style={styles.listLoadingContainer}>
              <ActivityIndicator />
            </View>
          ) : undefined
        }
      />
    </Container>
  );
}
