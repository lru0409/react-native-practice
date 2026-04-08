import { Text, View, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/AntDesign';

import { RootStackParamList } from '@src/App';
import { Container, PhotoCard } from '@src/components';
import { usePagination } from '@src/hooks/usePagination';
import { Photo } from '@src/types/photo';
import { CollectionService } from '@src/services';
import formatDate from '@src/utils/formatDate';
import styles from './styles';
import { PHOTO_GRID } from '@src/styles/common';

export default function CollectionDetailScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'CollectionDetail'>>();
  const { params } = useRoute<RouteProp<RootStackParamList, 'CollectionDetail'>>();
  const { collection, isOwner = false } = params;

  const {
    data: photos, // NOTE: API를 통해 접근 가능한 사진만 받아올 수 있음
    isFetchingFirst,
    isFetchingMore,
    isRefetching,
    isError,
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
      isLoading={isFetchingFirst}
      isError={Boolean(isError)}
    >
      <FlatList
        data={photos}
        numColumns={PHOTO_GRID.COLUMN_COUNT}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => <PhotoCard photo={item} index={index} key={item.id} />}
        refreshing={isRefetching}
        onRefresh={refetch}
        onEndReached={loadMore}
        contentContainerStyle={{ flex: 1 }}
        ListHeaderComponent={
          <View style={styles.textContent}>
            {collection.description ? (<Text style={styles.description}>{collection.description}</Text>) : null}
            <Text style={styles.date}>Created {formatDate(collection.createdAt)} · Updated {formatDate(collection.updatedAt)}</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No photos found</Text>
          </View>
        }
        ListFooterComponent={
          isFetchingMore ? (
            <View style={styles.listLoadingContainer}>
              <ActivityIndicator />
            </View>
          ) : undefined
        }
      />
    </Container>
  );
}
