import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootStackParamList } from '@src/App';
import type { Photo } from '@src/types/photo';
import usePagination from '@src/hooks/usePagination';
import { PhotoGrid, SearchInput, BackButton, BottomDetectScrollView } from '@src/components';
import PhotoService from '@src/services/photo';
import styles from './styles';

export default function SearchDetailScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Tabs'>>();
  const { params } = useRoute<RouteProp<RootStackParamList, 'SearchDetail'>>();
  const { query: initialQuery } = params;

  const [query, setQuery] = useState(initialQuery);

  const { data: photos, isFirstFetching, isFetchingMore, firstFetch, loadMore } = usePagination<Photo>({
    fetchData: (page) => PhotoService.fetchPhotosByQuery(query, page),
  });

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
