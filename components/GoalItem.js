import { StyleSheet, View, Text, Pressable, Alert } from "react-native";

function GoalItem(props) {
  function confirmActionHandler() {
    Alert.alert("Choose Action!", "What would you like to do?", [
      { text: "Cancel", style: "cancel" },
      { text: "Edit", onPress: () => props.onEditItem(props.id, props.text) },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => props.onDeleteItem(props.id),
      },
    ]);
  }

  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "#210644" }}
        onPress={confirmActionHandler}
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <Text style={styles.goalText}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    color: "white",
    padding: 8,
  },
});