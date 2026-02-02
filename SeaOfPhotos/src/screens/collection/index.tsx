import { useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import AuthService from '@src/services/auth';
import { useAuth } from '@src/contexts/auth';
import { useUser } from '@src/hooks/useUser';
import { BottomDetectScrollView, CollectionGrid } from '@src/components';
import { Collection } from '@src/types/collection';
import { usePagination } from '@src/hooks/usePagination';
import CollectionService from '@src/services/collection';
import styles from './styles';

export default function CollectionScreen() {
  const { setIsLoggedIn, checkLogin } = useAuth();
  const { data: user, isLoading: isUserLoading, error: userError } = useUser();
  
  const {
    data: collections,
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

  if (userError || collectionsError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Icon name='alert-circle' size={46} />
          <Text style={styles.errorText}>
            오류가 발생했습니다.
            {'\n'}
            나중에 다시 시도해주세요.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isUserLoading || !(user?.profileImage?.medium)) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.initialLoadingContainer}>
          <ActivityIndicator />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: user.profileImage.medium }}
          style={styles.userProfileImage}
        />
        <Text>{user?.username}</Text>
      </View>
      {isCollectionsLoading && (
        <View style={styles.initialLoadingContainer}>
          <ActivityIndicator />
        </View>
      )}
      {!isCollectionsLoading && (
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
    </SafeAreaView>
  );
}
