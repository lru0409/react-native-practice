import { View, Button, SafeAreaView } from 'react-native';
import { authorize } from 'react-native-app-auth';
import EncryptedStorage from 'react-native-encrypted-storage';

import { UNSPLASH_ACCESS_KEY, UNSPLASH_SECRET_KEY } from '@env';
import styles from './styles';

const config = {
  usePKCE: false,
  clientId: UNSPLASH_ACCESS_KEY,
  clientSecret: UNSPLASH_SECRET_KEY,
  scopes: ['public', 'read_user'],
  // scopes: ['public', 'read_user', 'write_user', 'read_photos', 'write_photos', 'read_collections', 'write_collections'],
  redirectUrl: 'com.seaofphotos://oauth',
  serviceConfiguration: {
    authorizationEndpoint: 'https://unsplash.com/oauth/authorize',
    tokenEndpoint: 'https://unsplash.com/oauth/token',
  },
};

export default function LoginScreen() {

  const handleLogin = async () => {
    try {
      const result = await authorize(config);
      await EncryptedStorage.setItem('auth', JSON.stringify(result));
      console.log('logged in', result);
    } catch (error) {
      console.error('auth error', error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        <Button title="Login with Unsplash" onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
}
