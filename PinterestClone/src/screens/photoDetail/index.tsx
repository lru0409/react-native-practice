import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

import { SCREEN_HORIZONTAL_PADDING } from '@src/constants/styles';
import { RootStackParamList } from '@src/App';
import AutoHeightImage from '@src/components/AutoHeightImage';
import Icon from 'react-native-vector-icons/Ionicons';

export default function PhotoDetailScreen() {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<RootStackParamList, 'PhotoDetail'>>();
  const { photo } = params;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={20} style={styles.backIcon} />
        </TouchableOpacity>
        <ScrollView style={styles.contentContainer}>
          <AutoHeightImage uri={photo.urls.full} />
          <View style={styles.infoContainer}>
            <Text style={styles.description}>{photo.description}</Text>
            <View style={styles.dateContainer}>
              <Icon name="calendar-clear-outline" size={16} color='#393E46' />
              <Text style={styles.date}>{photo.createdAt}</Text>
            </View>
            <View style={styles.userContainer}>
              <Image
                source={{ uri: photo.user.profileImage }}
                style={styles.userProfileImage}
              />
              <Text style={styles.userName}>{photo.user.name}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
  },
  contentContainer: {
    height: '100%',
  },
  backButton: {
    height: 35,
    width: 32,
    opacity: 0.8,
    backgroundColor: 'white',
    borderRadius: 10,
    position: 'absolute',
    zIndex: 1,
    left: 8,
    top: 8,
  },
  backIcon: {
    margin: 'auto',
  },
  infoContainer: {
    padding: 15,
  },
  description: {
    fontSize: 16,
    marginBottom: 7,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 15,
  },
  date: {
    color: '#393E46',
    fontSize: 12,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  userProfileImage: {
    height: 40,
    width: 40,
    borderRadius: '50%',
  },
});
