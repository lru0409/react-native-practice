import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';

import { RootStackParamList } from '@src/App';
import styles from './styles';
import { BackButton } from '@src/components';

export default function CollectionDetailScreen() {
  const { params } = useRoute<RouteProp<RootStackParamList, 'CollectionDetail'>>();
  const { collection } = params;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerContainer}>
        <BackButton />
        <Text style={styles.title}>{collection.title}</Text>
      </View>
      <View>
        <Text>description: {collection.description}</Text>
        <Text>createdAt: {collection.createdAt}</Text>
        <Text>updatedAt: {collection.updatedAt}</Text>
        <Text>totalPhotos: {collection.totalPhotos}</Text>
        <Text>private: {collection.private}</Text>
        <Text>coverPhoto: {collection.coverPhoto.urls.small}</Text>
      </View>
    </SafeAreaView>
  );
}