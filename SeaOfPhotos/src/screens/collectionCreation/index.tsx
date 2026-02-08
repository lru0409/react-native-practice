import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Switch } from 'react-native-switch';

import { Container } from '@src/components';
import styles from './styles';

export default function CollectionCreationScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const canCreate = name.trim() && description.trim();

  return (
    <Container
      useHeader={true}
      headerTitle='Create Collection'
      edges={['top', 'right', 'bottom', 'left']}
    >
      <View style={styles.container}>
        <View style={styles.formContent}>
          <View style={styles.inputFieldContainer}>
            <Text style={styles.label}>컬렉션 이름</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />
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
          onPress={() => { console.log('create collection'); }}
          disabled={!canCreate}
        >
          <Text style={styles.createButtonText}>Create Collection</Text>
        </TouchableOpacity>
      </View>
    </Container>
  )
}