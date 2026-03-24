import { Image, Text, View } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { RootStackParamList } from '@src/App';
import { Container, Tabs } from '@src/components';
import { useUser } from '@src/hooks/useUser';
import styles from './styles';

const PROFILE_TABS = [
  { label: '내 사진', value: 'photos' },
  { label: '내 콜렉션', value: 'collections' },
] as const;

export default function ProfileScreen() {
  const { params } = useRoute<RouteProp<RootStackParamList, 'Profile'>>();
  const { username } = params;

  const { data: user, isLoading: isUserLoading, error: userError } = useUser(username);

  return (
    <Container
      useHeader={true}
      headerTitle='Profile'
      useHorizontalPadding={false}
      edges={['top', 'right', 'bottom', 'left']}
      isLoading={isUserLoading}
      isError={Boolean(userError)}
    >
      <Container.Main style={styles.container}>
        {user && (
          <>
            <View style={styles.profileInfoContainer}>
              <View style={styles.profileHeader}>
                <Image style={styles.profileImage} source={{ uri: user.profileImage.medium }} />
                <View>
                  <Text style={styles.name}>{user.name}</Text>
                  <Text style={styles.username}>@{user.username}</Text>
                </View>
              </View>
              {user.bio && <Text>{user.bio}</Text>}
              <View style={styles.profileSubInfo}>
                <View style={styles.subInfoItem}>
                  <Icon name='email' size={16} color='gray' />
                  <Text style={styles.subInfoText}>{user.email || '-'}</Text>
                </View>
                <View style={styles.subInfoItem}>
                  <Icon name='location-on' size={16} color='gray' />
                  <Text style={styles.subInfoText}>{user.location || '-'}</Text>
                </View>
              </View>
            </View>
            <Tabs items={PROFILE_TABS} defaultValue="photos" style={styles.tabs}>
              <Tabs.List style={styles.tabsList} />
              <Tabs.Pager style={styles.tabsPager}>
                <Tabs.Panel value="photos" style={styles.tabsPanel}>
                  <Text>photos</Text>
                </Tabs.Panel>
                <Tabs.Panel value="collections" style={styles.tabsPanel}>
                  <Text>collections</Text>
                </Tabs.Panel>
              </Tabs.Pager>
            </Tabs>
          </>
        )}
      </Container.Main>
    </Container>
  );
}
