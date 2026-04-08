import { Image, TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';

import { Collection } from '@src/types/collection';
import styles, { getItemStyle } from './styles';
import formatDate from '@src/utils/formatDate';

type CollectionCardProps = {
  collection: Collection;
  index: number;
  onPress?: () => void;
};

export default function CollectionCard({ collection, index, onPress }: CollectionCardProps) {
  const { coverPhoto, title, totalPhotos, updatedAt } = collection;

  return (
    <TouchableOpacity
      style={getItemStyle(index)}
      onPress={onPress}
    >
      {coverPhoto ? (
        <Image style={styles.image} source={{ uri: coverPhoto.urls.small }} />
      ): (
        <View style={styles.imagePlaceholder}>
          <Icon name='photo' size={48} color='gray' />
        </View>
      )}
      <View style={styles.textContent}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <Text style={styles.details}>사진 {totalPhotos}개 · {formatDate(updatedAt)}</Text>
      </View>
    </TouchableOpacity>
  );
}
