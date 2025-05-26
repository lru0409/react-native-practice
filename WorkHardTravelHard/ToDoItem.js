import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import CheckBox from "react-native-check-box";
import { Fontisto } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { theme } from "./colors";

const ToDoItem = ({ checked, onChangeChecked, text, onDelete, onEdit }) => {
  return (
    <View style={styles.toDo}>
      <View style={styles.toDoContent}>
        <CheckBox
          style={{ backgroundColor: theme.grey }}
          isChecked={checked}
          onClick={onChangeChecked}
        />
        <Text style={[styles.toDoText, checked && styles.toDoTextChecked]}>
          {text}
        </Text>
      </View>
      <View style={styles.toDoControl}>
        <TouchableOpacity onPress={onEdit}>
          <AntDesign name="edit" size={20} color={theme.grey} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Fontisto name="trash" size={18} color={theme.grey} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  toDoControl: {
    flexDirection: "row",
    gap: 15,
  },
});

export default ToDoItem;
