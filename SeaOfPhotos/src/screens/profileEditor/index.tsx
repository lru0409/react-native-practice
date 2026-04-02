import { useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '@src/App';
import { Container, Button } from '@src/components';
import { useUpdateMe } from '@src/hooks/useUpdateMe';
import { useUser } from '@src/hooks/useUser';
import styles from './styles';

export default function ProfileEditorScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { data: me, error: meError } = useUser();
  const { updateMe, isPending } = useUpdateMe({
    onSuccess: () => navigation.goBack(),
    onError: () => {
      Alert.alert('프로필 수정 실패', '나중에 다시 시도해 주세요.', [
        { text: '확인', style: 'cancel' },
      ]);
    },
  });

  const [username, setUsername] = useState(me?.username || '');
  const [firstName, setFirstName] = useState(me?.firstName || '');
  const [lastName, setLastName] = useState(me?.lastName || '');
  const [email, setEmail] = useState(me?.email || '');
  const [location, setLocation] = useState(me?.location || '');
  const [bio, setBio] = useState(me?.bio || '');

  const handleUpdate = () => {
    updateMe({ username, firstName, lastName, email, location, bio });
  };

  return (
    <Container
      useHeader={true}
      headerTitle='Edit Profile'
      edges={['top', 'right', 'bottom', 'left']}
      isLoading={isPending}
      isError={Boolean(meError)}
    >
      <Container.Main style={styles.formContent}>
        <View style={styles.inputFieldContainer}>
          <Text style={styles.label}>사용자 이름</Text>
          <TextInput style={styles.input} value={username} onChangeText={setUsername} />
        </View>
        <View style={styles.rowFieldContainer}>
          <View style={styles.halfField}>
            <Text style={styles.label}>이름</Text>
            <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.label}>성</Text>
            <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />
          </View>
        </View>
        <View style={styles.inputFieldContainer}>
          <Text style={styles.label}>이메일</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
        </View>
        <View style={styles.inputFieldContainer}>
          <Text style={styles.label}>위치</Text>
          <TextInput style={styles.input} value={location} onChangeText={setLocation} />
        </View>
        <View style={styles.inputFieldContainer}>
          <Text style={styles.label}>소개</Text>
          <TextInput style={styles.input} value={bio} onChangeText={setBio} multiline numberOfLines={5} textAlignVertical='top' />
        </View>
      </Container.Main>
      <Container.Bottom>
        <Button text='Save Profile' onPress={handleUpdate} />
      </Container.Bottom>
    </Container>
  );
}
