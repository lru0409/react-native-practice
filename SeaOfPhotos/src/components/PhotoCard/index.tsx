import { Image, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '@src/App';
import { Photo } from '@src/types/photo';
import LikeButton from '@src/components/LikeButton';
import styles, { getItemStyle } from './styles';

export default function PhotoCard({ photo, index, size }: { photo: Photo, index: number, size?: number }) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Tabs'>>();
  
  return (
    <TouchableOpacity
      style={getItemStyle(index, size)}
      onPress={() => {
        navigation.navigate('PhotoDetail', { photo });
      }}
    >
      <View style={styles.likeButtonWrapper}>
        <LikeButton />
      </View>
      <Image style={styles.image} source={{ uri: photo.urls.small }} />
    </TouchableOpacity>
  )
}
