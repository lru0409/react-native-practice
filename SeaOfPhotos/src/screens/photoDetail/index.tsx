import { useRef, useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { RootStackParamList } from '@src/App';
import { CONTAINER_WIDTH, PHOTO_GRID } from '@src/styles/common';
import { BackButton, LikeButton, Container, PhotoCard } from '@src/components';
import { usePagination } from '@src/hooks/usePagination';
import { Photo } from '@src/types/photo';
import { PhotoService } from '@src/services';
import formatDate from '@src/utils/formatDate';
import styles from './styles';

export default function PhotoDetailScreen() {
  const { params } = useRoute<RouteProp<RootStackParamList, 'PhotoDetail'>>();
  const { photo } = params;
  const [isPhotoLoading, setIsPhotoLoading] = useState<boolean>(true);
  const [photoHeight, setPhotoHeight] = useState<number>(0);
  
  const scrollRef = useRef<ScrollView>(null);

  const {
    data: morePhotos,
    isFetchingFirst: isMorePhotosLoadingFirst,
    isFetchingMore: isMorePhotosLoadingMore,
    isError: isMorePhotosError,
    isRefetching: isMorePhotosRefetching,
    refetch: refetchMorePhotos,
    loadMore: loadMoreMorePhotos,
  } = usePagination<Photo>({
    queryKey: ['morePhotos', photo.description],
    fetchData: (page) => PhotoService.fetchPhotosByQuery(photo.description, page),
  });

  useEffect(() => {
    const readyPhoto = async () => {
      setIsPhotoLoading(true);
      const { width, height } = await Image.getSize(photo.urls.full);
      const ratio = height / width;
      setPhotoHeight(CONTAINER_WIDTH * ratio);
      setIsPhotoLoading(false);
    }

    readyPhoto();

    if (scrollRef.current) {
      scrollRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [photo]);

  return (
    <Container>
      <View style={{ height: '100%'}}>
        <View style={styles.backButtonContainer}>
          <BackButton />
        </View>

        {isPhotoLoading && (
          <View style={styles.initialLoadingContainer}>
            <ActivityIndicator />
          </View>
        )}

        {!isPhotoLoading && (
          <FlatList
            data={morePhotos}
            numColumns={PHOTO_GRID.COLUMN_COUNT}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => <PhotoCard photo={item} index={index} />}
            refreshing={isMorePhotosRefetching}
            onRefresh={refetchMorePhotos}
            scrollEnabled={morePhotos.length > 0}
            onEndReached={loadMoreMorePhotos}
            contentContainerStyle={morePhotos.length === 0 ? { flex: 1 } : undefined}
            ListHeaderComponent={
              <>
                <View style={styles.photoWrapper}>
                  <Image source={{ uri: photo.urls.full }} style={[styles.photo, { height: photoHeight }]} />
                  <View style={styles.likeButtonWrapper}>
                    <LikeButton />
                  </View>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.description}>{photo.description}</Text>
                  <View style={styles.dateContainer}>
                    <Icon name="calendar-clear-outline" size={16} color="#393E46" />
                    <Text style={styles.date}>{formatDate(photo.createdAt)}</Text>
                  </View>
                  <View style={styles.userContainer}>
                    <Image
                      source={{ uri: photo.user.profileImage }}
                      style={styles.userProfileImage}
                    />
                    <Text style={styles.userName}>{photo.user.name}</Text>
                  </View>
                </View>
                <Text style={styles.findMoreText}>더 찾아보기</Text>
              </>
            }
            ListEmptyComponent={
              isMorePhotosLoadingFirst ? (
                <View style={styles.initialLoadingContainer}>
                  <ActivityIndicator />
                </View>
              ) : isMorePhotosError ? (
                <View style={styles.errorContainer}>
                  <Icon name='alert-circle' size={46} />
                  <Text style={styles.errorText}>
                    오류가 발생했습니다.
                    {'\n'}
                    나중에 다시 시도해주세요.
                  </Text>
                </View>
              ) : (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No photos found</Text>
                </View>
              )
            }
            ListFooterComponent={
              isMorePhotosLoadingMore ? (
                <View style={styles.listLoadingContainer}>
                  <ActivityIndicator />
                </View>
              ) : undefined
            }
          />
        )}
      </View>
    </Container>
  );
}
