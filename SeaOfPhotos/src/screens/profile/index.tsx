import { View, Text, Image } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { RootStackParamList } from '@src/App';
import { Container, Button } from '@src/components';
import { AuthService } from '@src/services';
import { useAuth } from '@src/contexts/auth';
import { useUser } from '@src/hooks/useUser';
import styles from './styles';

export default function ProfileScreen() {
  const { params } = useRoute<RouteProp<RootStackParamList, 'Profile'>>();
  const { username } = params;

  const { data: user, isLoading: isUserLoading, error: userError } = useUser(username);
  const { checkLogin } = useAuth();

  const isMyProfile = !username;

  return (
    <Container
      useHeader={true}
      headerTitle='Profile'
      edges={['top', 'right', 'bottom', 'left']}
      isLoading={isUserLoading}
      isError={Boolean(userError)}
    >
      <Container.Main style={styles.container}>
        {user && (
          <>
            <View style={styles.profileHeader}>
              <Image style={styles.profileImage} source={{ uri: user.profileImage.medium }} />
              <View>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.username}>@{user.username}</Text>
              </View>
            </View>
            {user.bio && <Text style={styles.bio}>{user.bio}</Text>}
            <View style={styles.subInfoContainer}>
              <View style={styles.subInfoItem}>
                <Icon name='email' size={16} color='gray' />
                <Text style={styles.subInfoText}>{user.email || '-'}</Text>
              </View>
              <View style={styles.subInfoItem}>
                <Icon name='location-on' size={16} color='gray' />
                <Text style={styles.subInfoText}>{user.location || '-'}</Text>
              </View>
            </View>
          </>
        )}
      </Container.Main>
      {/* {isMyProfile && (
        <Container.Bottom>
          <Button
            text='Logout'
            onPress={() => {
              AuthService.logout();
              checkLogin();
            }}
          />
        </Container.Bottom>
      )} */}
    </Container>
  );
}
