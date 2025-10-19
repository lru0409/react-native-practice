import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { UNSPLASH_ACCESS_KEY } from '@env';
import { RootStackParamList } from '@src/App';
import { Photo, PhotoResponse } from '@src/types/photo';
import { UNSPLASH_BASE_URL } from '@src/constants/api';
import usePagination from '@src/hooks/usePagination';
import PhotoGrid from '@src/components/PhotoGrid';
import SearchInput from '@src/components/SearchInput';
import BackButton from '@src/components/BackButton';
import BottomDetectScrollView from '@src/components/BottomDetectScrollView';
import styles from './styles';

export default function SearchDetailScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Tabs'>>();
  const { params } = useRoute<RouteProp<RootStackParamList, 'SearchDetail'>>();
  const { query: initialQuery } = params;

  const [query, setQuery] = useState(initialQuery);

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
      data: data.results.map(item => ({
        id: item.id,
        description: item.alt_description,
        createdAt: item.created_at,
        urls: item.urls,
        user: {
          name: item.user.name,
          profileImage: item.user.profile_image.medium,
        },
      } as Photo)),
      hasMore: page < data.total_pages,
    };
  }

  useEffect(() => {
    firstFetch();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerContainer}>
        <BackButton />
        <View style={styles.searchInputContainer}>
          <SearchInput
            value={query}
            onChange={setQuery}
            onSubmit={() => {
              const trimmed = query.trim();
              if (trimmed && trimmed !== initialQuery) {
                navigation.push('SearchDetail', { query: trimmed });
              }
            }}
          />
        </View>
      </View>
      {isFirstFetching && (
        <View style={styles.initialLoadingContainer}>
          <ActivityIndicator />
        </View>
      )}
      {!isFirstFetching && (
        <BottomDetectScrollView onEndReached={loadMore} style={styles.contentContainer}>
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
