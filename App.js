import { useState, useMemo } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";
import GoalEditInput from "./components/GoalEditInput";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [toDo, setToDo] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [goalToEdit, setGoalToEdit] = useState(null);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function addGoalHandler(enteredGoalText) {
    setToDo((currentToDo) => [
      ...currentToDo,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function deleteGoalHandler(id) {
    setToDo((currentToDo) => {
      return currentToDo.filter((goal) => goal.id !== id);
    });
  }

  function startEditGoalHandler(id, text) {
    setGoalToEdit({ id, text });
    setEditModalVisible(true);
  }

  function editGoalHandler(newText) {
    setToDo((currentToDo) =>
      currentToDo.map((goal) =>
        goal.id === goalToEdit.id ? { ...goal, text: newText } : goal
      )
    );
    endEditGoalHandler();
  }

  function endEditGoalHandler() {
    setEditModalVisible(false);
    setGoalToEdit(null);
  }

  const memoizedGoalItems = useMemo(() => {
    return (
      <FlatList
        data={toDo}
        renderItem={(itemData) => {
          return (
            <GoalItem
              text={itemData.item.text}
              id={itemData.item.id}
              onDeleteItem={deleteGoalHandler}
              onEditItem={startEditGoalHandler}
            />
          );
        }}
        keyExtractor={(item) => item.id}
        alwaysBounceVertical={false}
      />
    );
  }, [toDo]);

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#a065ec"
          onPress={startAddGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <GoalInput
            visible={modalIsVisible}
            onAddGoal={addGoalHandler}
            onCancel={endAddGoalHandler}
          />

          <GoalEditInput
            visible={editModalVisible}
            initialText={goalToEdit ? goalToEdit.text : ""}
            onSave={editGoalHandler}
            onCancel={endEditGoalHandler}
          />

          {memoizedGoalItems}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#1e085a",
  },
  goalsContainer: {
    flex: 5,
  },
});
