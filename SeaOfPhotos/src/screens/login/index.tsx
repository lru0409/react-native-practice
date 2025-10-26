import { View, Button, SafeAreaView, Linking } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

import { UNSPLASH_ACCESS_KEY, UNSPLASH_SECRET_KEY } from '@env';
import styles from './styles';
import { useEffect } from 'react';

export default function LoginScreen() {

  const handleLogin = async () => {
    const authorizationEndpoint = 'https://unsplash.com/oauth/authorize';
    const redirectUrl = 'com.seaofphotos://oauth';
    const scope = 'public+read_user';
    const authUrl = `${authorizationEndpoint}?client_id=${UNSPLASH_ACCESS_KEY}&redirect_uri=${redirectUrl}&response_type=code&scope=${scope}`;
    Linking.openURL(authUrl);
  }

  useEffect(() => {
    const handleUrl = async (event: { url: string }) => {
      const { url } = event;
      if (url.startsWith('com.seaofphotos://oauth')) {
        const code = url.split('code=')[1];
        console.log('Authorization code:', code);
        // TODO: 토큰 발급 요청
        const response = await fetch(`https://unsplash.com/oauth/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: UNSPLASH_ACCESS_KEY,
            client_secret: UNSPLASH_SECRET_KEY,
            redirect_uri: 'com.seaofphotos://oauth',
            code: code,
            grant_type: 'authorization_code',
          }).toString(),
        });
        if (!response.ok) {
          const errText = await response.text();
          console.log(`Failed to get token: ${errText}`);
          return;
        }
        const data = await response.json();
        await EncryptedStorage.setItem('unsplash_access_token', data.access_token);
      }
    }
    const subscription = Linking.addEventListener('url', handleUrl);

    return () => {
      subscription.remove();
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        <Button title="Login with Unsplash" onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
}
