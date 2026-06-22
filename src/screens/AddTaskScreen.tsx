import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { useTasksContext } from "../context/TasksContext";
import { RootStackParamList } from "../navigation/types";
import { fetchTaskSuggestion } from "../services/api";

type Props = NativeStackScreenProps<RootStackParamList, "AddTask">;

const AddTaskScreen = ({ navigation }: Props) => {
  const { addTask } = useTasksContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [isFetchingSuggestion, setIsFetchingSuggestion] = useState(false);

  const handleAddTask = () => {
    if (!title.trim()) {
      setTitleError("Task title is required.");
      return;
    }

    if (title.trim().length < 3) {
      setTitleError("Task title must be at least 3 characters.");
      return;
    }

    addTask(title, description || "No description added.");
    navigation.goBack();
  };

  const handleFetchSuggestion = async () => {
    try {
      setIsFetchingSuggestion(true);
      const suggestion = await fetchTaskSuggestion();
      setTitle(suggestion);
      setTitleError("");
    } catch {
      Alert.alert(
        "Error",
        "Could not fetch task suggestion. Please try again.",
      );
    } finally {
      setIsFetchingSuggestion(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>

      <TextInput
        style={[styles.input, titleError && styles.inputError]}
        placeholder="Enter task title"
        value={title}
        onChangeText={(value) => {
          setTitle(value);
          setTitleError("");
        }}
      />

      {!!titleError && <Text style={styles.errorText}>{titleError}</Text>}

      <Text style={styles.label}>Description</Text>

      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Enter short description"
        value={description}
        onChangeText={setDescription}
        multiline
        textAlignVertical="top"
      />

      <Pressable
        style={styles.suggestionButton}
        onPress={handleFetchSuggestion}
        disabled={isFetchingSuggestion}
      >
        <Text style={styles.suggestionButtonText}>
          {isFetchingSuggestion
            ? "Fetching suggestion..."
            : "Use API suggestion"}
        </Text>
      </Pressable>

      <Pressable style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>Save Task</Text>
      </Pressable>
    </View>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  inputError: {
    borderColor: "#DC2626",
  },
  descriptionInput: {
    height: 110,
  },
  errorText: {
    color: "#DC2626",
    marginTop: 6,
  },
  suggestionButton: {
    marginTop: 18,
    backgroundColor: "#EFF6FF",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  suggestionButtonText: {
    color: "#2563EB",
    fontWeight: "700",
  },
  addButton: {
    marginTop: 16,
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
