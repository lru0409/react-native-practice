import React, { useState } from 'react';
import { ActivityIndicator, View, Text, FlatList } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '@src/App';
import type { Photo } from '@src/types/photo';
import { usePagination } from '@src/hooks/usePagination';
import { PhotoCard, SearchInput, BackButton, Container } from '@src/components';
import { PhotoService } from '@src/services';
import styles from './styles';
import { PHOTO_GRID } from '@src/styles/common';

export default function SearchDetailScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Tabs'>>();
  const { params } = useRoute<RouteProp<RootStackParamList, 'SearchDetail'>>();
  const { query: initialQuery } = params;

  const [query, setQuery] = useState(initialQuery);

  const {
    data: photos,
    isFetchingFirst,
    isFetchingMore,
    isRefetching,
    loadMore,
    refetch,
  } = usePagination<Photo>({
    queryKey: ['photos', query],
    fetchData: (page) => PhotoService.fetchPhotosByQuery(query, page),
  });

  return (
    <Container>
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
