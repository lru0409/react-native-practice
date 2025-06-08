import { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, ScrollView, ActivityIndicator, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from './colors';
import ToDoItem from './ToDoItem';
import EditDialog from './EditDialog';
import Header from './Header';

const TODOS_STORAGE_KEY = '@toDos';
const WORKING_STORAGE_KEY = '@working';

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState('');
  const [toDos, setToDos] = useState({});
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);
  const [editingKey, setEditingKey] = useState(null);

  const editDialogRef = useRef(null);

  useEffect(() => {
    loadToDos();
    loadWorking();
  }, []);
  const loadToDos = async () => {
    setIsLoadingTodos(true);
    try {
      const data = await AsyncStorage.getItem(TODOS_STORAGE_KEY);
      if (data) setToDos(JSON.parse(data));
    } catch (e) {
      console.error('Error loading todos from storage', e);
    }
    setIsLoadingTodos(false);
  };
  const loadWorking = async () => {
    try {
      const data = await AsyncStorage.getItem(WORKING_STORAGE_KEY);
      if (data) setWorking(JSON.parse(data));
    } catch (e) {
      console.error('Error loading working from storage', e);
    }
  };

  useEffect(() => {
    saveWorking(working);
  }, [working]);
  const saveWorking = async (toSave) => {
    try {
      await AsyncStorage.setItem(WORKING_STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.error('Error setting working to storage', e);
    }
  };

  useEffect(() => {
    saveToDos(toDos);
  }, [toDos]);
  const saveToDos = async (toSave) => {
    try {
      await AsyncStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.error('Error setting todos to storage', e);
    }
  };

  const addToDo = async () => {
    if (text === '') return;
    const newToDos = {
      ...toDos,
      [Date.now()]: { text, work: working, checked: false },
    };
    setToDos(newToDos);
    setText('');
  };
  const deleteToDo = async (key) => {
    const performDelete = () => {
      const newToDos = { ...toDos };
      delete newToDos[key];
      setToDos(newToDos);
    };
    if (Platform.OS === 'web') {
      const ok = confirm('Do you want to delete this To Do?');
      if (ok) performDelete()
    } else {
      Alert.alert('Delete To Do', 'Are you sure?', [
        { text: 'Cancel' },
        {
          text: "I'm Sure",
          style: 'destructive',
          onPress: performDelete,
        },
      ]);
    }
  };
  const updateToDo = async (toUpdate) => {
    if (toUpdate == '') return;
    const newTodos = {
      ...toDos,
      [editingKey]: { ...toDos[editingKey], text: toUpdate },
    };
    setToDos(newTodos);
    setEditingKey(null);
  };
  const changeChecked = (key) => {
    const newToDos = { ...toDos };
    newToDos[key].checked = !newToDos[key].checked;
    setToDos(newToDos);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header onWorkClick={() => setWorking(true)} onTravelClick={() => setWorking(false)} working={working} />
      <TextInput
        style={styles.input}
        value={text}
        placeholder={working ? 'Add a To Do' : 'Where do you want to go?'}
        onChangeText={(payload) => setText(payload)}
        onSubmitEditing={addToDo}
        returnKeyType="done"
      />
      {isLoadingTodos ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="white" size="large" />
        </View>
      ) : (
        <ScrollView>
          {Object.keys(toDos)
            .filter((key) => toDos[key].work === working)
            .map((key) => (
              <ToDoItem
                key={key}
                checked={toDos[key].checked}
                onChangeChecked={() => changeChecked(key)}
                text={toDos[key].text}
                onDelete={() => deleteToDo(key)}
                onEdit={() => {
                  editDialogRef.current?.show();
                  setEditingKey(key);
                }}
              />
            ))}
        </ScrollView>
      )}
      <EditDialog
        ref={editDialogRef}
        initialText={toDos[editingKey]?.text ?? ''}
        onSubmit={(text) => {
          editDialogRef.current?.hide();
          updateToDo(text);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 100,
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
});
