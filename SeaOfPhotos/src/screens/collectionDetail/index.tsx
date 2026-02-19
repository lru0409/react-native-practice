import { Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/AntDesign';

import { RootStackParamList } from '@src/App';
import { InfiniteScrollView, Container, PhotoGrid } from '@src/components';
import { usePagination } from '@src/hooks/usePagination';
import { Photo } from '@src/types/photo';
import CollectionService from '@src/services/collection';
import formatDate from '@src/utils/formatDate';
import styles from './styles';

export default function CollectionDetailScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'CollectionDetail'>>();
  const { params } = useRoute<RouteProp<RootStackParamList, 'CollectionDetail'>>();
  const { collection } = params;

  const {
    data: collectionPhotos, // NOTE: API를 통해 접근 가능한 사진만 받아올 수 있음
    isFetchingFirst: isCollectionPhotosLoading,
    isFetchingMore: isCollectionPhotosLoadingMore,
    isError: isCollectionPhotosError,
    loadMore,
  } = usePagination<Photo>({
    queryKey: ['collectionPhotos', collection.id],
    fetchData: (page) => CollectionService.fetchCollectionPhotos(collection.id, page),
  });

  return (
    <Container
      useHeader={true}
      headerTitle={collection.title}
      headerRight={
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            navigation.navigate('CollectionEditor', { mode: 'update', defaultCollection: collection });
          }}
        >
          <Icon name="edit" size={20} style={styles.editIcon} />
        </TouchableOpacity>
      }
      isLoading={isCollectionPhotosLoading}
      isError={Boolean(isCollectionPhotosError)}
    >
      <InfiniteScrollView onEndReached={() => loadMore()}>
        <View style={styles.textContent}>
          {collection.description ? (<Text style={styles.description}>{collection.description}</Text>) : null}
          <Text style={styles.date}>Created {formatDate(collection.createdAt)} · Updated {formatDate(collection.updatedAt)}</Text>
        </View>
        <PhotoGrid photos={collectionPhotos} />
        {isCollectionPhotosLoadingMore && (
          <View style={styles.listLoadingContainer}>
            <ActivityIndicator />
          </View>
        )}
      </InfiniteScrollView>
    </Container>
  );
}
