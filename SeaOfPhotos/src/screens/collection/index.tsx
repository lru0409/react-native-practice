import { useEffect } from 'react';
import { View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { RootStackParamList } from '@src/App';
import { CollectionService } from '@src/services';
import { useAuth } from '@src/contexts/auth';
import { useUser } from '@src/hooks/useUser';
import { InfiniteScrollView, CollectionGrid, Container } from '@src/components';
import { Collection } from '@src/types/collection';
import { usePagination } from '@src/hooks/usePagination';
import styles from './styles';

export default function CollectionScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Tabs'>>();
  const { setIsLoggedIn } = useAuth();
  const { data: user, isLoading: isUserLoading, error: userError } = useUser();
  
  const {
    data: collections, // NOTE: private 컬렉션은 받아올 수 없음
    isFetchingFirst: isCollectionsLoading,
    isFetchingMore: isCollectionsLoadingMore,
    isRefetching: isCollectionsRefetching,
    error: collectionsError,
    loadMore,
    refetch,
  } = usePagination<Collection>({
    queryKey: ['collections', user?.username],
    fetchData: (page) => CollectionService.fetchUserCollections(user?.username!, page),
    enabled: Boolean(user?.username),
  });

  useEffect(() => {
    if (userError && userError.message === 'NO_TOKEN') {
      setIsLoggedIn(false);
    }
  }, [userError]);

  return (
    <Container
      isError={Boolean(userError) || Boolean(collectionsError)}
      isLoading={isUserLoading}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.userButton} onPress={() => {
          if (user) {
            navigation.navigate('Profile', { user });
          }
        }}>
          <Image
            source={{ uri: user?.profileImage.medium }}
            style={styles.userProfileImage}
          />
          <Text style={styles.username}>{user?.username}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigation.navigate('CollectionEditor', { mode: 'create' });
        }}>
          <Icon name='add' size={24} />
        </TouchableOpacity>
      </View>
      {isCollectionsLoading && (
        <View style={styles.initialLoadingContainer}>
          <ActivityIndicator />
        </View>
      )}
      {!isCollectionsLoading && collections.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Let's create your collection!</Text>
        </View>
      )}
      {!isCollectionsLoading && collections.length > 0 && (
        <InfiniteScrollView
          isRefreshing={isCollectionsRefetching}
          onRefresh={refetch}
          onEndReached={() => loadMore()}
        >
          <CollectionGrid collections={collections} />
          {isCollectionsLoadingMore && (
            <View style={styles.listLoadingContainer}>
              <ActivityIndicator />
            </View>
          )}
        </InfiniteScrollView>
      )}
    </Container>
  );
}
