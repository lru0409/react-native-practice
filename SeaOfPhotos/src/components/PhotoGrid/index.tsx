import { FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '@src/App';
import { Photo } from '@src/types/photo';
import styles, { getItemStyle, COLUMN_COUNT } from './styles';

export default function PhotoGrid({ photos }: { photos: Photo[] }) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Tabs'>>();

  return (
    <FlatList
      data={photos}
      numColumns={COLUMN_COUNT}
      keyExtractor={item => item.id}
      scrollEnabled={false}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={getItemStyle(index)}
          onPress={() => {
            navigation.navigate('PhotoDetail', { photo: item });
          }}
        >
          <Image style={styles.image} source={{ uri: item.urls.small }} />
        </TouchableOpacity>
      )}
    />
  );
}
