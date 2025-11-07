import { useRef } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';

import { RootStackParamList } from '@src/App';
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import FindMoreArea, { FindMoreAreaRef } from './components/FindMoreArea';
import { CONTAINER_WIDTH } from '@src/styles/common';
import BackButton from '@src/components/BackButton';
import LikeButton from '@src/components/LikeButton'; // TODO: 모든 컴포넌트를 @/src/components 경로에서 임포트할 수 있도록
import BottomDetectScrollView from '@src/components/BottomDetectScrollView';
import styles from './styles';

export default function PhotoDetailScreen() {
  const { params } = useRoute<RouteProp<RootStackParamList, 'PhotoDetail'>>();
  const { photo } = params;
  const [isPhotoLoading, setIsPhotoLoading] = useState<boolean>(true);
  const [photoHeight, setPhotoHeight] = useState<number>(0);
  
  const scrollRef = useRef<ScrollView>(null);
  const findMoreAreaRef = useRef<FindMoreAreaRef>(null);

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
    <SafeAreaView style={styles.container} edges={['top']}>
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
          <BottomDetectScrollView
            ref={scrollRef}
            style={styles.contentContainer}
            onEndReached={() => {
              findMoreAreaRef.current?.loadMore();
            }}
          >
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
            <FindMoreArea ref={findMoreAreaRef} query={photo.description} />
          </BottomDetectScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
