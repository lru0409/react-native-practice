import { View, Text, Image } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

import { RootStackParamList } from '@src/App';
import { Container, Button } from '@src/components';
import { AuthService } from '@src/services';
import { useAuth } from '@src/contexts/auth';
import styles from './styles';

export default function ProfileScreen() {
  const { params } = useRoute<RouteProp<RootStackParamList, 'Profile'>>();
  const { user } = params;

  const { checkLogin } = useAuth();

  return (
    <Container
      useHeader={true}
      headerTitle='Profile'
      edges={['top', 'right', 'bottom', 'left']}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.profileContainer}>
            <Image style={styles.profileImage} source={{ uri: user.profileImage.medium}} />
            <View>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.username}>{user.username}</Text>
              <Text style={styles.email}>{user.email}</Text>
            </View>
          </View>
        </View>
        {/* TODO: Container.Bottom 만들어서 사용 */}
        <Button
          text='Logout'
          onPress={() => {
            AuthService.logout();
            checkLogin();
          }}
        />
      </View>
    </Container>
  );
}
