import { forwardRef, useImperativeHandle } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { usePagination } from '@src/hooks/usePagination';
import { PhotoGrid } from '@src/components';
import type { Photo } from '@src/types/photo';
import { PhotoService } from '@src/services';
import styles from './styles';

type FindMoreAreaProps = {
  query: string;
};

export type FindMoreAreaRef = {
  loadMore: () => void;
};

const FindMoreArea = forwardRef<FindMoreAreaRef, FindMoreAreaProps>(({ query }, ref) => {
  const { data: photos, isFetchingFirst, isFetchingMore, isError, loadMore } = usePagination<Photo>({
    queryKey: ['photos', query],
    fetchData: (page) => PhotoService.fetchPhotosByQuery(query, page),
  });

  useImperativeHandle(ref, () => ({
    loadMore,
  }), [loadMore]);

  if (isError) {
    return (
      <View>
        <Text style={styles.findMoreText}>더 찾아보기</Text>
        <View style={styles.errorContainer}>
          <Icon name='alert-circle' size={46} />
          <Text style={styles.errorText}>
            오류가 발생했습니다.
            {'\n'}
            나중에 다시 시도해주세요.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <>
      <View>
        <Text style={styles.findMoreText}>더 찾아보기</Text>
        {isFetchingFirst && (
          <View style={styles.initialLoadingContainer}>
            <ActivityIndicator />
          </View>
        )}
        {/* TODO: empty ui를 ScrollView 밖으로 뺄 것 */}
        {!isFetchingFirst && photos.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No photos found</Text>
          </View>
        )}
        {!isFetchingFirst && photos.length > 0 && (
          <PhotoGrid photos={photos} />
        )}
      </View>
      {isFetchingMore && (
        <View style={styles.listLoadingContainer}>
          <ActivityIndicator />
        </View>
      )}
    </>
  );
});

export default FindMoreArea;
