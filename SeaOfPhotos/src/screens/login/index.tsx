import { View, Linking, Text } from 'react-native';
import { useEffect } from 'react';

import { UNSPLASH_ACCESS_KEY } from '@env';
import { useAuth } from '@src/contexts/auth';
import { AuthService } from '@src/services';
import { Container, Button } from '@src/components';

import styles from './styles';

export default function LoginScreen() {
  const { checkLogin } = useAuth();

  const handleLogin = async () => {
    const params = new URLSearchParams();
    params.append('client_id', UNSPLASH_ACCESS_KEY);
    params.append('redirect_uri', 'com.seaofphotos://oauth');
    params.append('scope', 'public read_user read_collections write_collections');
    params.append('response_type', 'code');
    console.log('params', params.toString());
    const authUrl = `https://unsplash.com/oauth/authorize?${params.toString()}`;
    Linking.openURL(authUrl);
  }

  useEffect(() => {
    const handleUrl = async (event: { url: string }) => {
      const { url } = event;
      if (!url.startsWith('com.seaofphotos://oauth')) {
        return;
      }
      const code = url.split('code=')[1];
      await AuthService.requestAccessToken(code ?? '');
      checkLogin();
    }
    const subscription = Linking.addEventListener('url', handleUrl);

    return () => {
      subscription.remove();
    }
  }, []);

  return (
    <Container edges={['top', 'bottom', 'left', 'right']}>
      <Container.Main style={styles.centerContent}>
        <Text style={styles.title}>Sea of Photos</Text>
        <Text style={styles.subtitle}>Explore photos from Unsplash</Text>
      </Container.Main>
      <Container.Bottom>
        <Button text='Login with Unsplash' onPress={handleLogin} />
      </Container.Bottom>
    </Container>
  );
}
