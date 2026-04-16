import { useEffect, useRef, useState } from 'react';
import { Animated, Modal, StyleSheet, TouchableWithoutFeedback, View, Text, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FoundationIcon from 'react-native-vector-icons/Foundation';

import { Photo } from '@src/types/photo';
import { Collection } from '@src/types/collection';
import { CollectionService } from '@src/services';
import { useUser } from '@src/hooks/useUser';
import { useUserCollections } from '@src/hooks/useUserCollections';
import { useCollectionPicker } from '@src/contexts/collectionPicker';
import styles from './styles';

type CollectionPickerSheetProps = {
  visible: boolean;
  photo: Photo | null;
  onClose: () => void;
};

export default function CollectionPickerSheet({ visible, photo, onClose }: CollectionPickerSheetProps) {
  const { data: me } = useUser();
  const { data: collections, isFetchingFirst: isCollectionsFetchingFirst } = useUserCollections(me?.username);
  const { getCollectionIds, updateCollectionIds } = useCollectionPicker();

  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());
  const [modalVisible, setModalVisible] = useState(false);

  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const sheetTranslateY = useRef(new Animated.Value(0)).current;
  const sheetHeight = useRef(0);

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      backdropOpacity.setValue(0);
      requestAnimationFrame(() => {
        sheetTranslateY.setValue(sheetHeight.current);
        Animated.parallel([
          Animated.timing(backdropOpacity, { toValue: 1, duration: 250, useNativeDriver: true }),
          Animated.timing(sheetTranslateY, { toValue: 0, duration: 300, useNativeDriver: true }),
        ]).start();
      });
    }
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(backdropOpacity, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(sheetTranslateY, { toValue: sheetHeight.current, duration: 250, useNativeDriver: true }),
    ]).start(() => {
      setModalVisible(false);
      onClose();
    });
  };

  const savedCollectionIds = getCollectionIds(photo?.id) ?? [];

  const handleCollectionPress = async (collection: Collection) => {
    if (!photo || pendingIds.has(collection.id)) return;
    setPendingIds(prev => new Set(prev).add(collection.id));

    const isInCollection = savedCollectionIds.includes(collection.id);
    try {
      if (isInCollection) {
        await CollectionService.removePhotoFromCollection(collection.id, photo.id);
        updateCollectionIds(photo.id, savedCollectionIds.filter(id => id !== collection.id));
      } else {
        await CollectionService.addPhotoToCollection(collection.id, photo.id);
        updateCollectionIds(photo.id, [...savedCollectionIds, collection.id]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setPendingIds(prev => {
        const next = new Set(prev);
        next.delete(collection.id);
        return next;
      });
    }
  };

  const renderItem = ({ item }: { item: Collection }) => {
    const isInCollection = savedCollectionIds.includes(item.id);
    const isPending = pendingIds.has(item.id);

    return (
      <TouchableOpacity style={styles.row} onPress={() => handleCollectionPress(item)} disabled={isPending}>
        {item.coverPhoto ? (
          <Image style={styles.thumbnail} source={{ uri: item.coverPhoto.urls.small }} />
        ) : (
          // TODO: 컴포넌트화
          <View style={styles.thumbnailPlaceholder}>
            <FoundationIcon name="photo" size={20} color="gray" />
          </View>
        )}
        <Text style={styles.collectionTitle} numberOfLines={1}>{item.title}</Text>
        <View style={styles.indicator}>
          {isPending ? (
            <ActivityIndicator size="small" />
          ) : isInCollection ? (
            <IonIcon name="checkmark-circle" size={22} color="black" />
          ) : (
            <IonIcon name="add-circle-outline" size={22} color="#7F8CAA" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  // TODO: collections가 늦게 받아와지는 경우 테스트
  // TODO: bottom inset 제거
  return (
    <Modal visible={modalVisible} transparent animationType="none" onRequestClose={handleClose}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={handleClose}>
          <Animated.View style={[StyleSheet.absoluteFill, styles.backdrop, { opacity: backdropOpacity }]} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[styles.sheet, { transform: [{ translateY: sheetTranslateY }] }]}
          onLayout={e => { sheetHeight.current = e.nativeEvent.layout.height; }}
        >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>컬렉션에 저장 및 제거</Text>
          <TouchableOpacity onPress={handleClose}>
            <IonIcon name="close" size={22} color="black" />
          </TouchableOpacity>
        </View>
        {isCollectionsFetchingFirst ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator />
          </View>
        ) : (
          <FlatList
            data={collections}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
          />
        )}
        </Animated.View>
      </View>
    </Modal>
  );
}
