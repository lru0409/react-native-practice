import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EncryptedStorage from 'react-native-encrypted-storage';

import { useAuth } from '@src/contexts/auth';

export default function CollectionScreen() {
  const { checkLogin } = useAuth();

  return (
    <SafeAreaView>
      <View>
        <Text>Collection</Text>
        <Button title="Logout" onPress={() => {
          EncryptedStorage.removeItem('unsplash_access_token');
          checkLogin();
        }} />
      </View>
    </SafeAreaView>
  );
}
