import { useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, NativeSyntheticEvent, NativeScrollEvent, ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

import { UNSPLASH_ACCESS_KEY } from '@env';
import { SCREEN_HORIZONTAL_PADDING } from '@src/constants/styles';
import { RootStackParamList } from '@src/App';
import Icon from 'react-native-vector-icons/Ionicons';
import PhotoGrid from '@src/components/PhotoGrid';
import { useEffect, useState } from 'react';
import { UNSPLASH_BASE_URL } from '@src/constants/api';
import { Photo, PhotoResponse } from '@src/types/photo';

const CONTAINER_WIDTH = Dimensions.get('window').width - SCREEN_HORIZONTAL_PADDING * 2;

export default function PhotoDetailScreen() {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<RootStackParamList, 'PhotoDetail'>>();
  const { photo } = params;
  const [isPhotoLoading, setIsPhotoLoading] = useState<boolean>(true);
  const [photoHeight, setPhotoHeight] = useState<number>(0);

  const [relatedPhotos, setRelatedPhotos] = useState<Photo[]>([]);
  const [hasMoreRelated, setHasMoreRelated] = useState<boolean>(false);
  const [isFirstFetching, setIsFirstFetching] = useState<boolean>(true);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const isFetchingMoreRef = useRef<boolean>(false);
  const relatedPageRef = useRef<number>(1);

  const scrollRef = useRef<ScrollView>(null);

  const fetchRelatedPhotos = async (page: number, query: string) => {
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
      total_pages: 1000;
      results: PhotoResponse[];
    };

    const totalPages = data.total_pages;
    setHasMoreRelated(relatedPageRef.current < totalPages);
    setRelatedPhotos(prev => [
      ...(page === 1 ? [] : prev),
      ...data.results.map(
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
    const readyPhoto = async () => {
      setIsPhotoLoading(true);
      const { width, height } = await Image.getSize(photo.urls.full);
      const ratio = height / width;
      setPhotoHeight(CONTAINER_WIDTH * ratio);
      setIsPhotoLoading(false);
    }
    const firstFetch = async () => {
      setIsFirstFetching(true);
      relatedPageRef.current = 1;
      await fetchRelatedPhotos(relatedPageRef.current, photo.description);
      setIsFirstFetching(false);
    };

    readyPhoto();
    firstFetch();

    if (scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [photo]);

  const loadMoreRelatedPhotos = async () => {
    if (!hasMoreRelated || isFetchingMoreRef.current) {
      return;
    }

    isFetchingMoreRef.current = true;
    setIsFetchingMore(true);

    relatedPageRef.current += 1;
    await fetchRelatedPhotos(relatedPageRef.current, photo.description);

    isFetchingMoreRef.current = false;
    setIsFetchingMore(false);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    const paddingToBottom = 20; // 바닥 감지 여유 공간
    const isBottom =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;

    if (isBottom) {
      loadMoreRelatedPhotos();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={{ height: '100%'}}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={20} style={styles.backIcon} />
        </TouchableOpacity>

        {isPhotoLoading && (
          <View style={styles.initialLoadingContainer}>
            <ActivityIndicator />
          </View>
        )}

        {!isPhotoLoading && (
          <ScrollView ref={scrollRef} style={styles.contentContainer} onScroll={handleScroll}>
            <Image source={{ uri: photo.urls.full }} style={[styles.photo, { height: photoHeight }]} />
              <View style={styles.infoContainer}>
                <Text style={styles.description}>{photo.description}</Text>
                <View style={styles.dateContainer}>
                  <Icon name="calendar-clear-outline" size={16} color="#393E46" />
                  <Text style={styles.date}>{photo.createdAt}</Text>
                </View>
                <View style={styles.userContainer}>
                  <Image
                    source={{ uri: photo.user.profileImage }}
                    style={styles.userProfileImage}
                  />
                  <Text style={styles.userName}>{photo.user.name}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.findoutMore}>더 찾아보기</Text>
                {isFirstFetching ? (
                  <View style={styles.initialLoadingContainer}>
                    <ActivityIndicator />
                  </View>
                ) : <PhotoGrid photos={relatedPhotos} />}
              </View>  
              {isFetchingMore && (
                <View style={styles.listLoadingContainer}>
                  <ActivityIndicator />
                </View>
              )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
  },
  contentContainer: {
    height: '100%',
  },
  backButton: {
    height: 35,
    width: 32,
    opacity: 0.8,
    backgroundColor: 'white',
    borderRadius: 10,
    position: 'absolute',
    zIndex: 1,
    left: 8,
    top: 8,
  },
  backIcon: {
    margin: 'auto',
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
  photo: {
    width: CONTAINER_WIDTH,
    resizeMode: 'cover',
    borderRadius: 16,
  },
  infoContainer: {
    padding: 15,
  },
  description: {
    fontSize: 16,
    marginBottom: 7,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 15,
  },
  date: {
    color: '#393E46',
    fontSize: 12,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  userProfileImage: {
    height: 40,
    width: 40,
    borderRadius: '50%',
  },
  findoutMore: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 10,
    marginLeft: 5,
  },
});
