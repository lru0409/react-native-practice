import React, { useEffect, useState, useRef } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native';

import { UNSPLASH_ACCESS_KEY } from '@env';
import { RootStackParamList } from '@src/App';
import { SCREEN_HORIZONTAL_PADDING } from '@src/constants/styles';
import { Photo, PhotoResponse } from '@src/types/photo';
import { UNSPLASH_BASE_URL } from '@src/constants/api';
import PhotoGrid from '@src/components/PhotoGrid';

export default function SearchDetailScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Tabs'>>();
  const { params } = useRoute<RouteProp<RootStackParamList, 'SearchDetail'>>();
  const { query: initialQuery } = params;

  const [query, setQuery] = useState(initialQuery);

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isFirstFetching, setIsFirstFetching] = useState<boolean>(true);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const isFetchingMoreRef = useRef<boolean>(false);
  const pageRef = useRef<number>(1);


  const fetchPhotos = async (page: number, query: string) => {
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
    }

    const totalPages = data.total_pages;
    setHasMore(page < totalPages);
    setPhotos(prev => [
      ...prev,
      ...data.results.map(item => ({
        id: item.id,
        description: item.alt_description,
        createdAt: item.created_at,
        urls: item.urls,
        user: {
          name: item.user.name,
          profileImage: item.user.profile_image.medium,
        },
      } as Photo))
    ])
  }

  useEffect(() => {
    const firstFetch = async () => {
      setIsFirstFetching(true);
      await fetchPhotos(pageRef.current, query);
      setIsFirstFetching(false);
    }
    firstFetch();
  }, []);

  const loadMorePhotos = async () => {
    if (!hasMore || isFetchingMoreRef.current) {
      return;
    }
    
    isFetchingMoreRef.current = true;
    setIsFetchingMore(true);

    pageRef.current += 1;
    await fetchPhotos(pageRef.current, query);

    isFetchingMoreRef.current = false;
    setIsFetchingMore(false);
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <TextInput
        style={styles.textInput}
        placeholder="Pinterest 검색"
        placeholderTextColor="gray"
        value={query}
        onChangeText={setQuery}
        returnKeyType="search"
        onSubmitEditing={() => {
          const trimmed = query.trim();
          if (trimmed && trimmed !== initialQuery) {
            navigation.navigate('SearchDetail', { query: trimmed });
          }
        }}
      />
      {isFirstFetching && (
        <View style={styles.initialLoadingContainer}>
          <ActivityIndicator />
        </View>
      )}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 14,
    borderStyle: 'solid',
    paddingVertical: 12,
    paddingHorizontal: 17,
    fontSize: 15,
    lineHeight: 20,
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
