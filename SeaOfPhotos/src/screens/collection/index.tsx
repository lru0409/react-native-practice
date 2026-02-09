import { useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { RootStackParamList } from '@src/App';
import AuthService from '@src/services/auth';
import { useAuth } from '@src/contexts/auth';
import { useUser } from '@src/hooks/useUser';
import { BottomDetectScrollView, CollectionGrid, Container } from '@src/components';
import { Collection } from '@src/types/collection';
import { usePagination } from '@src/hooks/usePagination';
import CollectionService from '@src/services/collection';
import styles from './styles';

export default function CollectionScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Tabs'>>();
  const { setIsLoggedIn, checkLogin } = useAuth();
  const { data: user, isLoading: isUserLoading, error: userError } = useUser();
  
  const {
    data: collections, // NOTE: private 컬렉션은 받아올 수 없음
    isFetchingFirst: isCollectionsLoading,
    isFetchingMore: isCollectionsLoadingMore,
    error: collectionsError,
    loadMore,
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
        <TouchableOpacity style={styles.userButton} onPress={() => { console.log('go to user profile'); }}>
          <Image
            source={{ uri: user?.profileImage.medium }}
            style={styles.userProfileImage}
          />
          <Text style={styles.username}>{user?.username}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigation.navigate('CollectionCreation');
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
        <BottomDetectScrollView onEndReached={() => loadMore()}>
          <CollectionGrid collections={collections} />
          {isCollectionsLoadingMore && (
            <View style={styles.listLoadingContainer}>
              <ActivityIndicator />
            </View>
          )}
        </BottomDetectScrollView>
      )}
      {/* <Button title='Logout' onPress={() => {
        AuthService.logout();
        checkLogin();
      }} /> */}
    </Container>
  );
}
