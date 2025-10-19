import { View, Button, SafeAreaView } from 'react-native';

import styles from './styles';

export default function LoginScreen() {
  console.log('LoginScreen');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        <Button title="Login with Unsplash" />
      </View>
    </SafeAreaView>
  );
}
