import { View, Text } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

import { RootStackParamList } from '@src/App';
import { Container } from '@src/components';

export default function ProfileScreen() {
  const { params } = useRoute<RouteProp<RootStackParamList, 'Profile'>>();
  const { user } = params;

  console.log(user);

  return (
    <Container
      useHeader={true}
      headerTitle='Profile'
    >
      <View>
        <Text>{user.username}</Text>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
        <Text>{user.profileImage.medium}</Text>
      </View>
    </Container>
  );
}
