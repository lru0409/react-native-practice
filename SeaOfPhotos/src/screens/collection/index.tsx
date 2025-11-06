import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AuthService from '@src/services/auth';
import { useAuth } from '@src/contexts/auth';

export default function CollectionScreen() {
  const { checkLogin } = useAuth();

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
