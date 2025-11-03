import { View, SafeAreaView, Linking, Text, TouchableOpacity } from 'react-native';

import { UNSPLASH_ACCESS_KEY } from '@env';
import { useAuth } from '@src/contexts/auth';
import { requestAccessToken } from '@src/services/auth';
import styles from './styles';
import { useEffect } from 'react';

export default function LoginScreen() {
  const { checkLogin } = useAuth();

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
      if (!url.startsWith('com.seaofphotos://oauth')) {
        return;
      }
      const code = url.split('code=')[1];
      await requestAccessToken(code ?? '');
      checkLogin();
    }
    const subscription = Linking.addEventListener('url', handleUrl);

    return () => {
      subscription.remove();
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContent}>
        <Text style={styles.title}>Sea of Photos</Text>
        <Text style={styles.subtitle}>Explore photos from Unsplash</Text>
      </View>
      <View style={styles.bottomContent}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login with Unsplash</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
