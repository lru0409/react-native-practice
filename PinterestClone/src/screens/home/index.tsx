import { useState, useEffect, useRef } from 'react';
import { StyleSheet, FlatList, ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { UNSPLASH_ACCESS_KEY } from '@env';
import CategorySelector from './components/CategorySelector';
import { SCREEN_HORIZONTAL_PADDING } from '@src/constants/styles';
import { UNSPLASH_BASE_URL } from '@src/constants/api';
import { type Photo, type PhotoResponse } from '@src/types/photo';
import PhotoGrid from '@src/components/PhotoGrid';

export default function HomeScreen() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isFirstFetching, setIsFirstFetching] = useState<boolean>(true); // 첫 페이지 로딩 중
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false); // 두 번째 이상의 페이지 로딩 중
  const isFetchingMoreRef = useRef<boolean>(false);
  const pageRef = useRef<number>(1);

  const fetchPhotos = async (page: number) => {
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

  useEffect(() => {
    const firstFetch = async () => {
      setIsFirstFetching(true);
      await fetchPhotos(pageRef.current);
      setIsFirstFetching(false);
    };
    firstFetch();
  }, []);

  const loadMorePhotos = async () => {
    if (!hasMore || isFetchingMoreRef.current) {
      return;
    }

    isFetchingMoreRef.current = true;
    setIsFetchingMore(true);

    pageRef.current += 1;
    await fetchPhotos(pageRef.current);

    isFetchingMoreRef.current = false;
    setIsFetchingMore(false);
  };

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
          onEndReached={loadMorePhotos}
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

// TODO: 스타일 별도의 파일로 분리
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
  },
  initialLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listLoadingContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
