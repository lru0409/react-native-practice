import { forwardRef, useEffect, useRef, useState } from "react";
import ActionSheet from "react-native-actions-sheet";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { theme } from "./colors";

const EditDialog = forwardRef(({ initialText, onSubmit }, ref) => {
  const inputRef = useRef(null);
  const [text, setText] = useState(initialText);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  return (
    <ActionSheet ref={ref} onOpen={() => inputRef.current?.focus()}>
      <View style={styles.container}>
        <Text style={styles.title}>Update To Do</Text>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={text}
          onChangeText={(payload) => setText(payload)}
          returnKeyType="done"
          onSubmitEditing={() => {
            onSubmit(text);
            setText("");
          }}
        />
      </View>
    </ActionSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 15,
  },
  input: {
    backgroundColor: theme.editInputBg,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    fontSize: 18,
  },
});

export default EditDialog;
