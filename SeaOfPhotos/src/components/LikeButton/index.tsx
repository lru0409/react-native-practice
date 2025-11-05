import { useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

// TODO: 클릭 시 애니메이션 추가

export default function LikeButton({ defaultLiked = false }: { defaultLiked?: boolean }) {
  const [liked, setLiked] = useState(defaultLiked);

  return (
    <TouchableWithoutFeedback onPress={() => setLiked(!liked)}>
      <View style={styles.container}>
        <Icon name="heart" size={22} color={liked ? '#E06B80' : '#7F8CAA'} />
      </View>
    </TouchableWithoutFeedback>
  );
}
