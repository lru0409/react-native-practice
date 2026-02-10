import { Text } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

import { RootStackParamList } from '@src/App';
import { Container } from '@src/components';
import CollectionService from '@src/services/collection';

export default function CollectionDetailScreen() {
  const { params } = useRoute<RouteProp<RootStackParamList, 'CollectionDetail'>>();
  const { collection } = params;

  const {
    data: collectionPhotos,
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
    >
      <Text>description: {collection.description}</Text>
      <Text>createdAt: {collection.createdAt}</Text>
      <Text>updatedAt: {collection.updatedAt}</Text>
      <Text>totalPhotos: {collection.totalPhotos}</Text>
      <Text>private: {collection.private}</Text>
      <Text>coverPhoto: {collection.coverPhoto.urls.small}</Text>
    </Container>
  );
}