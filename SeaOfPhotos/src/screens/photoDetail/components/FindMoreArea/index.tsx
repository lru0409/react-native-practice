import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import { UNSPLASH_ACCESS_KEY } from '@env';
import { UNSPLASH_BASE_URL } from '@src/constants/api';
import { Photo, PhotoResponse } from '@src/types/photo';
import usePagination from '@src/hooks/usePagination';
import { PhotoGrid } from '@src/components';
import styles from './styles';

type FindMoreAreaProps = {
  query: string;
};

export type FindMoreAreaRef = {
  loadMore: () => Promise<void>;
};

const FindMoreArea = forwardRef<FindMoreAreaRef, FindMoreAreaProps>(({ query }, ref) => {
  const { data: photos, isFirstFetching, isFetchingMore, firstFetch, loadMore } = usePagination<Photo>({
    fetchData: fetchPhotos,
  });

  async function fetchPhotos(page: number) {
    const response = await fetch(
      `${UNSPLASH_BASE_URL}/search/photos?query=${query}&page=${page}`,
      {
        method: 'GET',
        headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = (await response.json()) as {
      total_pages: number;
      results: PhotoResponse[];
    };

    return {
      data: data.results.map(
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
      hasMore: page < data.total_pages,
    };
  };

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
