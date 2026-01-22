import { useEffect } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import AuthService from '@src/services/auth';
import { useAuth } from '@src/contexts/auth';
import { useUser } from '@src/hooks/useUser';
import { useCollections } from '@src/hooks/useCollections';
import styles from './styles';

export default function CollectionScreen() {
  const { setIsLoggedIn, checkLogin } = useAuth();
  const { data: user, isLoading: isUserLoading, error: userError } = useUser();
  const { data: collections, isLoading: isCollectionsLoading, error: collectionsError } = useCollections(user?.username, 1);

  useEffect(() => {
    if (userError && userError.message === 'NO_TOKEN') {
      setIsLoggedIn(false);
    }
  }, [userError]);

  if (userError || collectionsError) {
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

  if (isUserLoading || isCollectionsLoading) {
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
        <Text>username: {user?.username}</Text>
        <Text>collections: {collections?.length}</Text> {/* TODO: 더 잘 표현하기 */}
        <Button title="Logout" onPress={() => {
          AuthService.logout();
          checkLogin();
        }} />
      </View>
    </SafeAreaView>
  );
}
