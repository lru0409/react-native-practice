import { Image, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '@src/App';
import { Photo } from '@src/types/photo';
import CollectionButton from '@src/components/CollectionButton';
import styles, { getItemStyle } from './styles';

type PhotoCardProps = {
  photo: Photo;
  index: number;
  size?: number;
};

export default function PhotoCard({ photo, index, size }: PhotoCardProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Tabs'>>();
  
  return (
    <TouchableOpacity
      style={getItemStyle(index, size)}
      onPress={() => {
        navigation.navigate('PhotoDetail', { photo });
      }}
    >
      <View style={styles.collectionButtonWrapper}>
        <CollectionButton
          isActive={photo.currentUserCollections.length > 0}
          onPress={() => {}}
        />
      </View>
      <Image style={styles.image} source={{ uri: photo.urls.small }} />
    </TouchableOpacity>
  );
}
