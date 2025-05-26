import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CheckBox from "react-native-check-box";
import { Fontisto } from "@expo/vector-icons";
import { theme } from "./colors";

const TODOS_STORAGE_KEY = "@toDos";
const WORKING_STORAGE_KEY = "@working";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);

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
      console.error("Error loading todos from storage", e);
    }
    setIsLoadingTodos(false);
  };
  const loadWorking = async () => {
    try {
      const data = await AsyncStorage.getItem(WORKING_STORAGE_KEY);
      if (data) setWorking(JSON.parse(data));
    } catch (e) {
      console.error("Error loading working from storage", e);
    }
  };

  const travel = () => {
    setWorking(false);
    saveWorking(false);
  };
  const work = () => {
    setWorking(true);
    saveWorking(true);
  };
  const saveWorking = async (toSave) => {
    try {
      await AsyncStorage.setItem(WORKING_STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.error("Error setting working to storage", e);
    }
  };

  const onChangeText = (payload) => setText(payload);
  const addToDo = async () => {
    if (text === "") return;
    const newToDos = {
      ...toDos,
      [Date.now()]: { text, work: working, checked: false },
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };
  const saveToDos = async (toSave) => {
    try {
      await AsyncStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.error("Error setting todos to storage", e);
    }
  };
  const deleteToDo = async (key) => {
    Alert.alert("Delete To Do", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "I'm Sure",
        style: "destructive",
        onPress: () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          saveToDos(newToDos);
        },
      },
    ]);
  };

  const changeChecked = (key) => {
    const newToDos = { ...toDos };
    newToDos[key].checked = !newToDos[key].checked;
    setToDos(newToDos);
    saveToDos(newToDos);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{ ...styles.btnText, color: working ? "white" : theme.grey }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? "white" : theme.grey,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        value={text}
        placeholder={working ? "Add a To Do" : "Where do you want to go?"}
        onChangeText={onChangeText}
        onSubmitEditing={addToDo}
        returnKeyType="done"
      />
      {isLoadingTodos ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            marginBottom: 100,
          }}
        >
          <ActivityIndicator color="white" size="large" />
        </View>
      ) : (
        <ScrollView>
          {Object.keys(toDos).map((key) =>
            toDos[key].work === working ? (
              <View style={styles.toDo} key={key}>
                <View style={styles.toDoContent}>
                  <CheckBox
                    style={{ backgroundColor: theme.grey }}
                    isChecked={toDos[key].checked}
                    onClick={() => changeChecked(key)}
                  />
                  <Text
                    style={[
                      styles.toDoText,
                      toDos[key].checked && styles.toDoTextChecked,
                    ]}
                  >
                    {toDos[key].text}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => deleteToDo(key)}>
                  <Fontisto name="trash" size={18} color={theme.grey} />
                </TouchableOpacity>
              </View>
            ) : null
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  toDoTextChecked: {
    textDecorationLine: "line-through",
    color: theme.grey,
  },
});
