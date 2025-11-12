import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import usePagination from '@src/hooks/usePagination';
import { PhotoGrid } from '@src/components';
import type { Photo } from '@src/types/photo';
import PhotoService from '@src/services/photo';
import styles from './styles';

type FindMoreAreaProps = {
  query: string;
};

export type FindMoreAreaRef = {
  loadMore: () => Promise<void>;
};

const FindMoreArea = forwardRef<FindMoreAreaRef, FindMoreAreaProps>(({ query }, ref) => {
  const { data: photos, isFirstFetching, isFetchingMore, firstFetch, loadMore } = usePagination<Photo>({
    fetchData: (page) => PhotoService.fetchPhotosByQuery(query, page),
  });

  useEffect(() => {
    firstFetch();
  }, [query]);

  useImperativeHandle(ref, () => ({
    loadMore,
  }), [loadMore]);

  return (
    <>
      <View>
        <Text style={styles.findMoreText}>더 찾아보기</Text>
        {isFirstFetching ? (
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
