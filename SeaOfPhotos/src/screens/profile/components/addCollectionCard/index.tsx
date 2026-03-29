import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { RootStackParamList } from '@src/App';
import collectionCardStyles, { getItemStyle } from '@src/components/CollectionCard/styles';
import styles from './style';

type AddCollectionCardProps = {
  index: number;
};

export default function AddCollectionCard({ index }: AddCollectionCardProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={getItemStyle(index)}
      onPress={() => navigation.navigate('CollectionEditor', { mode: 'create' })}
    >
      <View style={styles.iconWrap}>
        <Icon name='add' size={34} color='black' />
      </View>
      <View style={collectionCardStyles.textContent}>
        <Text style={collectionCardStyles.title}>새 콜렉션</Text>
        <Text style={collectionCardStyles.details}>만들기</Text>
      </View>
    </TouchableOpacity>
  );
}
