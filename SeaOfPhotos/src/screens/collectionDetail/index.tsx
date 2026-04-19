import { Alert, Text, View, ActivityIndicator, TouchableOpacity, FlatList, Modal } from 'react-native';
import { useState } from 'react';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import { RootStackParamList } from '@src/App';
import { Container, PhotoCard } from '@src/components';
import { usePagination } from '@src/hooks/usePagination';
import { useDeleteCollection } from '@src/hooks/useDeleteCollection';
import { Photo } from '@src/types/photo';
import { PhotoService } from '@src/services';
import { PHOTO_GRID } from '@src/styles/common';
import formatDate from '@src/utils/formatDate';
import styles from './styles';

export default function CollectionDetailScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'CollectionDetail'>>();
  const { params } = useRoute<RouteProp<RootStackParamList, 'CollectionDetail'>>();
  const { collection, isOwner = false } = params;
  const insets = useSafeAreaInsets();

  const [menuVisible, setMenuVisible] = useState(false);

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
    fetchData: (page) => PhotoService.fetchCollectionPhotos(collection.id, page),
  });

  const { deleteCollection, isPending: isDeletePending } = useDeleteCollection({
    onSuccess: () => navigation.goBack(),
    onError: () => {
      Alert.alert('컬렉션 삭제 실패', '나중에 다시 시도해 주세요.', [
        { text: '확인', style: 'cancel' },
      ]);
    },
  });

  const handleEdit = () => {
    setMenuVisible(false);
    navigation.navigate('CollectionEditor', { mode: 'update', defaultCollection: collection });
  };

  const handleDelete = () => {
    setMenuVisible(false);
    Alert.alert('컬렉션 삭제', '이 컬렉션을 삭제할까요?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => deleteCollection({ collectionId: collection.id }),
      },
    ]);
  };

  return (
    <>
      <Container
        useHeader={true}
        headerTitle={collection.title}
        headerRight={
          isOwner ? (
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => setMenuVisible(true)}
            >
              <Icon name="ellipsis-horizontal" size={20} color="black" />
            </TouchableOpacity>
          ) : undefined
        }
        isLoading={isFetchingFirst || isDeletePending}
        isError={Boolean(isError)}
      >
        <FlatList
          data={photos}
          numColumns={PHOTO_GRID.COLUMN_COUNT}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => <PhotoCard photo={item} index={index} key={item.id} />}
          refreshing={isRefetching}
          onRefresh={refetch}
          scrollEnabled={photos.length > 0}
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

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.menuBackdrop}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View style={[styles.dropdownMenu, { top: insets.top + 43, right: 14 }]}>
            <TouchableOpacity style={styles.menuItem} onPress={handleEdit}>
              <Icon name="create-outline" size={16} color="black" />
              <Text style={styles.menuItemText}>수정</Text>
            </TouchableOpacity>
            <View style={styles.menuSeparator} />
            <TouchableOpacity style={styles.menuItem} onPress={handleDelete}>
              <Icon name="trash-outline" size={16} color="#FF3B30" />
              <Text style={[styles.menuItemText, styles.menuItemDestructive]}>삭제</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
