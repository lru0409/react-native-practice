import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { Photo } from '@src/types/photo';
import { CollectionButton } from '@src/components';
import formatDate from '@src/utils/formatDate';
import styles from './style';
import { RootStackParamList } from '@src/App';

type PhotoHeroProps = {
  photo: Photo;
  photoHeight: number;
};

const PhotoHero = ({ photo, photoHeight }: PhotoHeroProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Profile'>>();

  return (
    <>
      <View style={styles.photoWrapper}>
        <Image source={{ uri: photo.urls.full }} style={[styles.photo, { height: photoHeight }]} />
        <View style={styles.collectionButtonWrapper}>
          <CollectionButton
            isActive={photo.currentUserCollections.length > 0}
            onPress={() => {}}
          />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.description}>{photo.description}</Text>
        <View style={styles.dateContainer}>
          <Icon name="calendar-clear-outline" size={16} color="#393E46" />
          <Text style={styles.date}>{formatDate(photo.createdAt)}</Text>
        </View>
        <TouchableOpacity style={styles.userContainer} onPress={() => {
          navigation.navigate('Profile', { username: photo.user.username });
        }}>
          <Image
            source={{ uri: photo.user.profileImage }}
            style={styles.userProfileImage}
          />
          <Text style={styles.userName}>{photo.user.name}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PhotoHero;
