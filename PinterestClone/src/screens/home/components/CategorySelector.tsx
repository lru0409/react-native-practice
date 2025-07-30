import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

import { SCREEN_HORIZONTAL_PADDING } from '@src/constants/styles';

const ITEM_WIDTH = 70;
const ITEM_COUNT = 4;
const CONTAINER_PADDING = 15;
const CONTAINER_CONTENT_WIDTH = Dimensions.get('window').width - (SCREEN_HORIZONTAL_PADDING * 2) - (CONTAINER_PADDING * 2);
const ITEM_GAP = (CONTAINER_CONTENT_WIDTH - (ITEM_WIDTH * ITEM_COUNT)) / (ITEM_COUNT - 1);

export default function CategorySelector() {
  return (
    <View style={styles.container}>

      <View style={styles.item}>
        <View style={styles.imageFrame} />
        <Text>추천</Text>
      </View>

      <View style={styles.item}>
        <View style={styles.imageFrame} />
        <Text>카테고리 1</Text>
      </View>

      <View style={styles.item}>
        <View style={styles.imageFrame} />
        <Text>카테고리 2</Text>
      </View>

      <View style={styles.item}>
        <View style={styles.imageFrame}>
          <Icon name='plus' size={20} style={styles.plusIcon} />
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 10,
    paddingHorizontal: CONTAINER_PADDING,
    gap: ITEM_GAP,
  },
  item: {
    alignItems: 'center',
    gap: 5,
    width: ITEM_WIDTH,
  },
  imageFrame: {
    width: '100%',
    aspectRatio: '1/1',
    backgroundColor: 'gray',
    borderRadius: 12,
  },
  plusIcon: {
    margin: 'auto',
  }
});
