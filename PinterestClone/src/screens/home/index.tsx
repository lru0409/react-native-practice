import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategorySelector from './components/CategorySelector';
import { SCREEN_HORIZONTAL_PADDING } from '../../constants/styles';
import { UNSPLASH_BASE_URL } from '../../constants/api';
import { UNSPLASH_ACCESS_KEY } from '@env';
import { type Photo, type PhotoResponse } from "../../types/photo";

const COLUMN_COUNT = 2;
const SPACING_BETWEEN_ITEMS = 5; // 아이템 사이 여백
const ITEM_SIZE =
  (Dimensions.get('window').width -
    SCREEN_HORIZONTAL_PADDING * 2 -
    SPACING_BETWEEN_ITEMS * (COLUMN_COUNT - 1)) /
  COLUMN_COUNT;

const DATA = [
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' },
  { id: '5' },
  { id: '6' },
  { id: '7' },
];

export default function HomeScreen() {
  const [photos, setPhotos] = useState<Photo[]>();

  useEffect(() => {
    const fetchRandomPhotos = async () => {
      const response = await fetch(`${UNSPLASH_BASE_URL}/photos?page=1`, {
        method: 'GET',
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = (await response.json()) as PhotoResponse[];
      setPhotos(
        data.map(
          item =>
            ({
              id: item.id,
              description: item.alt_description,
              createdAt: item.created_at,
              urls: item.urls,
              user: {
                name: item.user.name,
                profileImage: item.user.profile_image.medium,
              },
            } as Photo),
        ),
      );
    };

    fetchRandomPhotos();
  }, []);

  useEffect(() => {
    console.log('photos', photos);
  }, [photos])

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <CategorySelector />
      <FlatList
        data={DATA}
        numColumns={COLUMN_COUNT}
        keyExtractor={item => item.id}
        renderItem={({ index }) => <View style={getItemStyle(index)} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
  },
});

const getItemStyle = (index: number): ViewStyle => {
  return {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: (index + 1) % COLUMN_COUNT === 0 ? 0 : SPACING_BETWEEN_ITEMS,
    marginBottom: SPACING_BETWEEN_ITEMS,
  };
};
