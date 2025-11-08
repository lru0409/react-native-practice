import { useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withTiming, Easing } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

export default function LikeButton({ defaultLiked = false }: { defaultLiked?: boolean }) {
  const [liked, setLiked] = useState(defaultLiked);
  
  const scale = useSharedValue(1);

  const handlePress = () => {
    setLiked((prev) => !prev);

    scale.value = withSequence(
      withTiming(1.3, { duration: 110, easing: Easing.bounce }),
      withTiming(1, { duration: 70, easing: Easing.out(Easing.ease) })
    );
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View style={animatedStyle}>
        <View style={styles.container}>
          <Icon name="heart" size={22} color={liked ? '#E06B80' : '#7F8CAA'} />
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
