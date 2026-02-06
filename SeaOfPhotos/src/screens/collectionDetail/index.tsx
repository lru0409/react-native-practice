import { Text } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

import { RootStackParamList } from '@src/App';
import { Container } from '@src/components';

export default function CollectionDetailScreen() {
  const { params } = useRoute<RouteProp<RootStackParamList, 'CollectionDetail'>>();
  const { collection } = params;

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