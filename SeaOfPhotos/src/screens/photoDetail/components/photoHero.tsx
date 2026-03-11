import { View, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Photo } from '@src/types/photo';
import { LikeButton } from '@src/components';
import formatDate from '@src/utils/formatDate';
import styles from './style';

const PhotoHero = ({ photo, photoHeight }: { photo: Photo, photoHeight: number }) => {
  return (
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
    </>
  );
};

export default PhotoHero;