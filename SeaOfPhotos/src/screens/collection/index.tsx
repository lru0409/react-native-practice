import { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AuthService from '@src/services/auth';
import CollectionService from '@src/services/collection';
import { useAuth } from '@src/contexts/auth';
import { useUser } from '@src/hooks/useUser';

export default function CollectionScreen() {
  const { checkLogin } = useAuth();
  const { data: user, isLoading: isUserLoading, error: userError } = useUser();

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchMyCollections = async () => {
      try {
        const collections = await CollectionService.fetchUserCollections(user.username, 1);
        console.log('collections', collections);
      } catch (error) {
        // TODO: 404 에러면 fetchUser 다시 호출 후 다시 시도?
        console.error('Failed to fetch my collections', error);
      }
    };
    fetchMyCollections();
  }, [user]);

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
