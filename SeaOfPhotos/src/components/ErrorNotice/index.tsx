import { Text, View, StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

type ErrorNoticeProps = {
  style?: StyleProp<ViewStyle>;
};

export default function ErrorNotice({ style }: ErrorNoticeProps) {
  return (
    <View style={[styles.container, style]}>
      <Icon name='alert-circle' size={46} />
      <Text style={styles.text}>
        오류가 발생했습니다.
        {'\n'}
        나중에 다시 시도해주세요.
      </Text>
    </View>
  );
}
