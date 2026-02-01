import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { Photo } from '@src/types/photo';
import { usePagination } from '@src/hooks/usePagination';
import { BottomDetectScrollView, PhotoGrid } from '@src/components';
import CategorySelector from './components/CategorySelector';
import PhotoService from '@src/services/photo'; // TODO: 모든 서비스를 @/src/services 경로에서 임포트할 수 있도록
import styles from './styles';

export default function HomeScreen() {
  const {
    data: photos,
    isFetchingFirst,
    isFetchingMore,
    loadMore,
  } = usePagination<Photo>({
    queryKey: ['photos'],
    fetchData: PhotoService.fetchPhotos,
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <CategorySelector />
      {isFetchingFirst && (
        <View style={styles.initialLoadingContainer}>
          <ActivityIndicator />
        </View>
      )}
      {!isFetchingFirst && (
        <BottomDetectScrollView onEndReached={() => loadMore()}>
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
