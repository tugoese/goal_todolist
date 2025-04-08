import { View, TextInput, Button, StyleSheet, Modal, Image } from "react-native";
import { useState, useEffect } from "react";

function GoalEditInput(props) {
  const [enteredEditText, setEnteredEditText] = useState(props.initialText);

  useEffect(() => {
    setEnteredEditText(props.initialText);
  }, [props.initialText]);

  function editTextHandler(text) {
    setEnteredEditText(text);
  }

  function saveEditHandler() {
    if (enteredEditText.trim().length === 0) {
      alert("Goal is empty!");
      return;
    }
    props.onSave(enteredEditText);
    setEnteredEditText("");
  }

  function cancelEditHandler() {
    props.onCancel();
    setEnteredEditText(props.initialText);
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/goal.png")}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={editTextHandler}
          value={enteredEditText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Save" onPress={saveEditHandler} color="#5e0acc" />
          </View>
          <View style={styles.button}>
            <Button
              title="Cancel"
              onPress={cancelEditHandler}
              color="#f31282"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default GoalEditInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#311b6b",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#e4d0ff",
    backgroundColor: "#e4d0ff",
    color: "#120438",
    borderRadius: 6,
    width: "100%",
    padding: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
});