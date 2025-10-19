import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

import styles from './styles';

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
