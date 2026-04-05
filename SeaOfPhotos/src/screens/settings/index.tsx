import { Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQueryClient } from '@tanstack/react-query';

import { RootStackParamList } from '@src/App';
import { Container } from '@src/components';
import { useAuth } from '@src/contexts/auth';
import { AuthService } from '@src/services';
import SettingMenuItem from './components/settingMenuItem';
import styles from './styles';

export default function SettingsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const queryClient = useQueryClient();
  const { setIsLoggedIn } = useAuth();

  const handleLogout = () => {
    Alert.alert('로그아웃', '정말 로그아웃할까요?', [
      { text: '취소', style: 'cancel' },
      {
        text: '로그아웃',
        style: 'destructive',
        onPress: async () => {
          await AuthService.logout();
          queryClient.clear();
          setIsLoggedIn(false);
        },
      },
    ]);
  };

  return (
    <Container useHeader={true} headerTitle='Settings' edges={['top', 'right', 'left']}>
      <Container.Main style={styles.container}>
        <View style={styles.menuGroup}>
          <SettingMenuItem
            iconName="person-outline"
            label="프로필 수정"
            onPress={() => navigation.navigate('ProfileEditor')}
          />
          <SettingMenuItem
            iconName="log-out-outline"
            label="로그아웃"
            onPress={handleLogout}
            danger={true}
          />
        </View>
      </Container.Main>
    </Container>
  );
}
