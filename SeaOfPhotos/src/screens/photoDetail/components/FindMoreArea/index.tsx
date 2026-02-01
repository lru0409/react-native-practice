import { forwardRef, useImperativeHandle } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import { usePagination } from '@src/hooks/usePagination';
import { PhotoGrid } from '@src/components';
import type { Photo } from '@src/types/photo';
import PhotoService from '@src/services/photo';
import styles from './styles';

type FindMoreAreaProps = {
  query: string;
};

export type FindMoreAreaRef = {
  loadMore: () => void;
};

const FindMoreArea = forwardRef<FindMoreAreaRef, FindMoreAreaProps>(({ query }, ref) => {
  const { data: photos, isFetchingFirst, isFetchingMore, loadMore } = usePagination<Photo>({
    queryKey: ['photos', query],
    fetchData: (page) => PhotoService.fetchPhotosByQuery(query, page),
  });

  useImperativeHandle(ref, () => ({
    loadMore,
  }), [loadMore]);

  return (
    <>
      <View>
        <Text style={styles.findMoreText}>더 찾아보기</Text>
        {isFetchingFirst ? (
          <View style={styles.initialLoadingContainer}>
            <ActivityIndicator />
          </View>
        ) : (
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
