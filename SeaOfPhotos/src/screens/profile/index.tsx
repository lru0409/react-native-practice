import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { RootStackParamList } from '@src/App';
import { Container, ErrorNotice, PhotoCard, Tabs } from '@src/components';
import { useUserPhotos } from '@src/hooks/useUserPhotos';
import { useUser } from '@src/hooks/useUser';
import commonStyles, { PHOTO_GRID } from '@src/styles/common';
import styles from './styles';

const PROFILE_TABS = [
  { label: '내 사진', value: 'photos' },
  { label: '내 콜렉션', value: 'collections' },
] as const;

export default function ProfileScreen() {
  const { params } = useRoute<RouteProp<RootStackParamList, 'Profile'>>();
  const { username } = params;

  const { data: user, isLoading: isUserLoading, error: userError } = useUser(username);
  const {
    data: photos,
    isFetchingFirst: isPhotosLoading,
    isFetchingMore,
    isRefetching,
    isError: isPhotosError,
    loadMore,
    refetch,
  } = useUserPhotos(username);

  return (
    <Container
      useHeader={true}
      headerTitle='Profile'
      useHorizontalPadding={false}
      edges={['top', 'right', 'left']}
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
                  <FlatList
                    data={photos}
                    keyExtractor={item => item.id}
                    numColumns={PHOTO_GRID.COLUMN_COUNT}
                    renderItem={({ item, index }) => <PhotoCard photo={item} index={index} />}
                    refreshing={isRefetching}
                    onRefresh={refetch}
                    scrollEnabled={photos.length > 0}
                    onEndReached={loadMore}
                    contentContainerStyle={photos.length === 0 ? styles.emptyContainer : undefined}
                    ListEmptyComponent={
                      isPhotosLoading ? (
                        <ActivityIndicator />
                      ) : isPhotosError ? (
                        <ErrorNotice style={{ marginBottom: 80 }} />
                      ) : (
                        <Text style={styles.emptyText}>No photos found</Text>
                      )
                    }
                    ListFooterComponent={
                      isFetchingMore ? (
                        <View style={commonStyles.listLoadingContainer}>
                          <ActivityIndicator />
                        </View>
                      ) : undefined
                    }
                  />
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
