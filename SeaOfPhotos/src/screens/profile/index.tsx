import { View, Text, Image, Button, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

import { RootStackParamList } from '@src/App';
import { Container } from '@src/components';
import AuthService from '@src/services/auth';
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
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            AuthService.logout();
            checkLogin();
          }}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}
