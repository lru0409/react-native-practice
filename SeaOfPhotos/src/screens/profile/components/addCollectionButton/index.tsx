import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { RootStackParamList } from '@src/App';
import styles from './styles';

export default function AddCollectionButton() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('CollectionEditor', { mode: 'create' })}
    >
      <View style={styles.iconWrap}>
        <Ionicons name="add" size={14} color="white" />
      </View>
      <Text style={styles.text}>새 콜렉션</Text>
    </TouchableOpacity>
  );
}
