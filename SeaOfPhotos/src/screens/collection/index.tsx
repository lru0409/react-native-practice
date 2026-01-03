import { useEffect } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQueryClient } from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/Ionicons';

import AuthService from '@src/services/auth';
import CollectionService from '@src/services/collection';
import { useAuth } from '@src/contexts/auth';
import { useUser } from '@src/hooks/useUser';
import styles from './styles';

export default function CollectionScreen() {
  const queryClient = useQueryClient();

  const { setIsLoggedIn, checkLogin } = useAuth();
  const { data: user, isLoading: isUserLoading, error: userError } = useUser();

  useEffect(() => {
    if (userError && userError.message === 'NO_TOKEN') {
      setIsLoggedIn(false);
    }
  }, [userError]);

  useEffect(() => {
    if (!user) {
      return;
    }

    // TODO: fetchUserCollections는 react query 사용할 수 없는 건가? 어떤 상황에서 react query 훅을 사용해야 하는 건가?

    const fetchMyCollections = async () => {
      const response = await CollectionService.fetchUserCollections(user.username, 1);
      if (!response.ok) {
        if (response.status === 404) {
          queryClient.invalidateQueries({ queryKey: ['user'] });
          const refreshedUser = await queryClient.fetchQuery({ queryKey: ['user']});
          if (refreshedUser) {
            const response = await CollectionService.fetchUserCollections(refreshedUser.username, 1);
            if (response.ok) {
              const collections = await response.json();
              console.log('collections (retry)', collections);
            } else {
              console.error('Failed to fetchUserCollections', response.status);
            }
          }
        } else {
          console.error('Failed to fetchUserCollections', response.status);
        }
        return;
      }
      const collections = await response.json();
      console.log('collections', collections);
    };
    fetchMyCollections();
  }, [user]);

  if (userError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Icon name="alert-circle" size={46} />
          <Text style={styles.errorText}>
            오류가 발생했습니다.
            {'\n'}
            나중에 다시 시도해주세요.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isUserLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.initialLoadingContainer}>
          <ActivityIndicator />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View>
        <Text>Collection</Text>
        <Button title="Logout" onPress={() => {
          AuthService.logout();
          checkLogin();
        }} />
      </View>
    </SafeAreaView>
  );
}
