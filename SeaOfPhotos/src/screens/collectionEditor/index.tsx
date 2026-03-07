import { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Switch } from 'react-native-switch';

import { RootStackParamList } from '@src/App';
import { Container, Button } from '@src/components';
import { useCreateCollection } from '@src/hooks/useCreateCollection';
import { useUpdateCollection } from '@src/hooks/useUpdateCollection';
import styles from './styles';

export default function CollectionEditorScreen() {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<RootStackParamList, 'CollectionEditor'>>();
  const { mode, defaultCollection } = params;

  const { createCollection, isPending: isCreatePending } = useCreateCollection({
    onSuccess: () => navigation.goBack(), // NOTE: 바로 반영이 안 됨
    onError: () => {
      Alert.alert('컬렉션 생성 실패', '나중에 다시 시도해 주세요.', [
        { text: '확인', style: 'cancel' },
      ]);
    },
  });

  const { updateCollection, isPending: isUpdatePending } = useUpdateCollection({
    onSuccess: () => navigation.goBack(), // NOTE: 바로 반영이 안 됨
    onError: () => {
      Alert.alert('컬렉션 수정 실패', '나중에 다시 시도해 주세요.', [
        { text: '확인', style: 'cancel' },
      ]);
    },
  });

  const [title, setTitle] = useState(defaultCollection?.title || '');
  const [description, setDescription] = useState(defaultCollection?.description || '');
  const [isPrivate, setIsPrivate] = useState(defaultCollection?.private || false);

  const canSave = title.trim() && description.trim();

  const handleCreate = () => {
    createCollection({ title, description, isPrivate });
  };

  const handleUpdate = () => {
    updateCollection({ collectionId: defaultCollection?.id || '', title, description, isPrivate });
  };

  return (
    <Container
      useHeader={true}
      headerTitle={`${mode === 'create' ? 'Create' : 'Edit'} Collection`}
      edges={['top', 'right', 'bottom', 'left']}
      isLoading={isCreatePending || isUpdatePending}
    >
      <Container.Main style={styles.formContent}>
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
      </Container.Main>
      <Container.Bottom>
        <Button
          text={mode === 'create' ? 'Create Collection' : 'Edit Collection'}
          disabled={!canSave || isCreatePending || isUpdatePending}
          onPress={mode === 'create' ? handleCreate : handleUpdate}
        />
      </Container.Bottom>
    </Container>
  )
}