import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MeterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { RootStackParamList } from '@src/App';
import { CollectionCard, Container, ErrorNotice, PhotoCard, Tabs } from '@src/components';
import { useUserCollections } from '@src/hooks/useUserCollections';
import { useUserPhotos } from '@src/hooks/useUserPhotos';
import { useUser } from '@src/hooks/useUser';
import commonStyles, { COLLECTION_GRID, PHOTO_GRID } from '@src/styles/common';
import styles from './styles';

const PROFILE_TABS = [
  { label: '사진', value: 'photos' },
  { label: '콜렉션', value: 'collections' },
] as const;

export default function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { params } = useRoute<RouteProp<RootStackParamList, 'Profile'>>();
  const username = params?.username;
  const isMyProfile = !username;

  const { data: user, isLoading: isUserLoading, error: userError } = useUser(username);
  const {
    data: photos,
    isFetchingFirst: isFetchingFirstPhotos,
    isFetchingMore: isFetchingMorePhotos,
    isRefetching: isRefetchingPhotos,
    isError: isPhotosError,
    loadMore: loadMorePhotos,
    refetch: refetchPhotos,
  } = useUserPhotos(user?.username);
  const {
    data: collections,
    isFetchingFirst: isFetchingFirstCollections,
    isFetchingMore: isFetchingMoreCollections,
    isRefetching: isRefetchingCollections,
    isError: isCollectionsError,
    loadMore: loadMoreCollections,
    refetch: refetchCollections,
  } = useUserCollections(user?.username);

  return (
    <Container
      useHeader={true}
      headerTitle='Profile'
      headerRight={
        isMyProfile && (
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Ionicons name="settings-outline" size={20} color="black" />
          </TouchableOpacity>
        )
      }
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
                  <MeterialIcon name='email' size={16} color='gray' />
                  <Text style={styles.subInfoText}>{user.email || '-'}</Text>
                </View>
                <View style={styles.subInfoItem}>
                  <MeterialIcon name='location-on' size={16} color='gray' />
                  <Text style={styles.subInfoText}>{user.location || '-'}</Text>
                </View>
              </View>
            </View>
            <Tabs items={PROFILE_TABS} defaultValue="photos" style={styles.tabs}>
              <Tabs.List style={styles.tabsList} />
              <Tabs.Pager style={styles.tabsPager}>
                <Tabs.Panel value="photos">
                  <FlatList
                    data={photos}
                    keyExtractor={item => item.id}
                    numColumns={PHOTO_GRID.COLUMN_COUNT}
                    renderItem={({ item, index }) => <PhotoCard photo={item} index={index} />}
                    refreshing={isRefetchingPhotos}
                    onRefresh={refetchPhotos}
                    scrollEnabled={photos.length > 0}
                    onEndReached={loadMorePhotos}
                    contentContainerStyle={photos.length === 0 ? styles.emptyContainer : undefined}
                    ListEmptyComponent={
                      isFetchingFirstPhotos ? (
                        <ActivityIndicator />
                      ) : isPhotosError ? (
                        <ErrorNotice style={styles.errorNotice} />
                      ) : (
                        <Text style={styles.emptyText}>No photos found</Text>
                      )
                    }
                    ListFooterComponent={
                      isFetchingMorePhotos ? (
                        <View style={commonStyles.listLoadingContainer}>
                          <ActivityIndicator />
                        </View>
                      ) : undefined
                    }
                  />
                </Tabs.Panel>
                <Tabs.Panel value="collections">
                  <FlatList
                    data={collections}
                    keyExtractor={(item) => item.id}
                    numColumns={COLLECTION_GRID.COLUMN_COUNT}
                    renderItem={({ item, index }) => <CollectionCard collection={item} index={index} />}
                    refreshing={isRefetchingCollections}
                    onRefresh={refetchCollections}
                    scrollEnabled={collections.length > 0}
                    onEndReached={loadMoreCollections}
                    contentContainerStyle={collections.length === 0 ? styles.emptyContainer : undefined}
                    ListHeaderComponent={
                      isMyProfile ? (
                        <TouchableOpacity style={styles.addCollectionButton} onPress={() => navigation.navigate('CollectionEditor', { mode: 'create' })}>
                          <View style={styles.addCollectionButtonIcon}>
                            <Ionicons name="add" size={14} color="white" />
                          </View>
                          <Text style={styles.addCollectionButtonText}>새 콜렉션</Text>
                        </TouchableOpacity>
                      ) : undefined
                    }
                    ListEmptyComponent={
                      isFetchingFirstCollections ? (
                        <ActivityIndicator />
                      ) : isCollectionsError ? (
                        <ErrorNotice style={styles.errorNotice} />
                      ) : (
                        <Text style={styles.emptyText}>No collections found</Text>
                      )
                    }
                    ListFooterComponent={
                      isFetchingMoreCollections ? (
                        <View style={commonStyles.listLoadingContainer}>
                          <ActivityIndicator />
                        </View>
                      ) : undefined
                    }
                  />
                </Tabs.Panel>
              </Tabs.Pager>
            </Tabs>
          </>
        )}
      </Container.Main>
    </Container>
  );
}
