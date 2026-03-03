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
    isFetchingFirst: isCollectionPhotosLoadingFirst,
    isFetchingMore: isCollectionPhotosLoadingMore,
    isRefetching: isCollectionPhotosRefetching,
    isError: isCollectionPhotosError,
    loadMore,
    refetch,
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
      isLoading={isCollectionPhotosLoadingFirst}
      isError={Boolean(isCollectionPhotosError)}
    >
      {/* TODO: empty ui를 ScrollView 밖으로 뺄 것 */}
      {/* TODO: PhotoGrid, CollectionGrid에 가상화가 작동하도록 해야 함 */}
      <InfiniteScrollView
        isRefreshing={isCollectionPhotosRefetching}
        onRefresh={refetch}
        onEndReached={() => loadMore()}
      >
        <View style={styles.textContent}>
          {collection.description ? (<Text style={styles.description}>{collection.description}</Text>) : null}
          <Text style={styles.date}>Created {formatDate(collection.createdAt)} · Updated {formatDate(collection.updatedAt)}</Text>
        </View>
        {!isCollectionPhotosLoadingFirst && collectionPhotos.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No photos found</Text>
          </View>
        )}
        {!isCollectionPhotosLoadingFirst && collectionPhotos.length > 0 && (
          <PhotoGrid photos={collectionPhotos} />
        )}
        {isCollectionPhotosLoadingMore && (
          <View style={styles.listLoadingContainer}>
            <ActivityIndicator />
          </View>
        )}
      </InfiniteScrollView>
    </Container>
  );
}
