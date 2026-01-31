import { FlatList, Image, TouchableOpacity, View, Text } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// import { RootStackParamList } from '@src/App';
import { Collection } from '@src/types/collection';
import styles, { getItemStyle, COLUMN_COUNT } from './styles';
import formatDate from '@src/utils/formatDate';

// TODO: PhotoGrid와 구조가 거의 유사해서 공통 컴포넌트로 추상화 가능할 듯
export default function CollectionGrid({ collections }: { collections: Collection[] }) {
  // const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Tabs'>>();

  return (
    <FlatList
      data={collections}
      numColumns={COLUMN_COUNT}
      keyExtractor={item => item.id}
      scrollEnabled={false}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={getItemStyle(index)}
          onPress={() => {
            console.log('go to collection detail');
          }}
        >
          <Image style={styles.image} source={{ uri: item.coverPhoto.urls.small }} />
          <View style={styles.textContent}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {item.title}
            </Text>
            <Text style={styles.details}>사진 {item.totalPhotos}개 · {formatDate(item.updatedAt)}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}