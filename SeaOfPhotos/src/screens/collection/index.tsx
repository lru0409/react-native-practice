import { useEffect } from 'react';
import { View, Text, ActivityIndicator, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { RootStackParamList } from '@src/App';
import { CollectionService } from '@src/services';
import { useAuth } from '@src/contexts/auth';
import { useUser } from '@src/hooks/useUser';
import { Container, CollectionCard } from '@src/components';
import { Collection } from '@src/types/collection';
import { usePagination } from '@src/hooks/usePagination';
import { COLLECTION_GRID } from '@src/styles/common';
import styles from './styles';

export default function CollectionScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Tabs'>>();
  const { setIsLoggedIn } = useAuth();
  const { data: me, isLoading: isMeLoading, error: meError } = useUser();
  
  const {
    data: collections, // NOTE: private 컬렉션은 받아올 수 없음
    isFetchingFirst,
    isFetchingMore,
    isRefetching,
    error,
    loadMore,
    refetch,
  } = usePagination<Collection>({
    queryKey: ['collections', me?.username],
    fetchData: (page) => CollectionService.fetchUserCollections(me?.username!, page),
    enabled: Boolean(me?.username),
  });

  useEffect(() => {
    if (meError && meError.message === 'NO_TOKEN') {
      setIsLoggedIn(false);
    }
  }, [meError]);

  return (
    <Container
      isError={Boolean(meError) || Boolean(error)}
      isLoading={isMeLoading}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.userButton} onPress={() => {
          if (me) {
            navigation.navigate('Profile', {});
          }
        }}>
          <Image
            source={{ uri: me?.profileImage.medium }}
            style={styles.userProfileImage}
          />
          <Text style={styles.username}>{me?.username}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigation.navigate('CollectionEditor', { mode: 'create' });
        }}>
          <Icon name='add' size={24} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={collections}
        numColumns={COLLECTION_GRID.COLUMN_COUNT}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => <CollectionCard collection={item} index={index} key={item.id} />}
        refreshing={isRefetching}
        onRefresh={refetch}
        scrollEnabled={collections.length > 0}
        onEndReached={loadMore}
        contentContainerStyle={collections.length === 0 ? styles.emptyContainer : undefined }
        ListEmptyComponent={isFetchingFirst ? <ActivityIndicator /> : <Text style={styles.emptyText}>Let's create your collection!</Text>}
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
