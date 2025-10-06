import { useRef } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, NativeSyntheticEvent, NativeScrollEvent, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

import { RootStackParamList } from '@src/App';
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import FindMoreArea, { FindMoreAreaRef } from './components/FindMoreArea';
import { CONTAINER_WIDTH } from '@src/styles/common';
import styles from './styles';

export default function PhotoDetailScreen() {
  const navigation = useNavigation();
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

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    const paddingToBottom = 20; // 바닥 감지 여유 공간
    const isBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;

    if (isBottom) {
      findMoreAreaRef.current?.loadMore();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={{ height: '100%'}}>
        {/* backButton 컴포넌트화 */}
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
              <FindMoreArea ref={findMoreAreaRef} query={photo.description} />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
