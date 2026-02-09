import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Switch } from 'react-native-switch';

import { Container } from '@src/components';
import { useCreateCollection } from '@src/hooks/useCreateCollection';
import styles from './styles';

export default function CollectionCreationScreen() {
  const navigation = useNavigation();
  const { createCollection, isPending } = useCreateCollection({
    onSuccess: () => navigation.goBack(), // NOTE: 컬렉션 리스트에 바로 반영이 안 됨
    onError: () => {
      Alert.alert('컬렉션 생성 실패', '나중에 다시 시도해 주세요.', [
        { text: '확인', style: 'cancel' },
      ]);
    },
  });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const canCreate = title.trim() && description.trim();

  const handleCreate = () => {
    createCollection({ title, description, isPrivate });
  };

  return (
    <Container
      useHeader={true}
      headerTitle='Create Collection'
      edges={['top', 'right', 'bottom', 'left']}
      isLoading={isPending}
    >
      <View style={styles.container}>
        <View style={styles.formContent}>
          <View style={styles.inputFieldContainer}>
            <Text style={styles.label}>컬렉션 제목</Text>
            <TextInput style={styles.input} value={title} onChangeText={setTitle} />
          </View>
          <View style={styles.inputFieldContainer}>
            <Text style={styles.label}>컬렉션 설명</Text>
            <TextInput style={styles.input} value={description} onChangeText={setDescription} multiline numberOfLines={4}/>
          </View>
          <View style={styles.switchFieldContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>이 보드를 비밀 보드로 설정하기</Text>
              <Text style={styles.labelDescription}>회원님만 이 보드를 볼 수 있습니다.</Text>
            </View>
            <Switch
              value={isPrivate}
              onValueChange={setIsPrivate}
              backgroundActive="#4ade80"
              backgroundInactive="#d1d5db"
              renderActiveText={false}
              renderInActiveText={false}
            />
          </View>
        </View>
        <TouchableOpacity
          style={[styles.createButton, !canCreate && styles.createButtonDisabled]}
          onPress={handleCreate}
          disabled={!canCreate || isPending}
        >
          <Text style={styles.createButtonText}>Create Collection</Text>
        </TouchableOpacity>
      </View>
    </Container>
  )
}