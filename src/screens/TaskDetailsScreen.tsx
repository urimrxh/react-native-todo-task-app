import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

import { useTasksContext } from "../context/TasksContext";
import { RootStackParamList } from "../navigation/types";
import { formatDate } from "../utils/formatDate";

type Props = NativeStackScreenProps<RootStackParamList, "TaskDetails">;

const TaskDetailsScreen = ({ route, navigation }: Props) => {
  const { taskId } = route.params;
  const { getTaskById, toggleTaskStatus, deleteTask } = useTasksContext();

  const task = getTaskById(taskId);

  if (!task) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFoundTitle}>Task not found</Text>
        <Pressable
          style={styles.primaryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.primaryButtonText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert("Delete task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteTask(task.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailsCard}>
        <Text style={styles.title}>{task.title}</Text>

        <Text
          style={[
            styles.status,
            task.completed ? styles.completedStatus : styles.activeStatus,
          ]}
        >
          {task.completed ? "Completed" : "Active"}
        </Text>

        <Text style={styles.sectionLabel}>Description</Text>
        <Text style={styles.description}>{task.description}</Text>

        <Text style={styles.sectionLabel}>Created date</Text>
        <Text style={styles.date}>{formatDate(task.createdAt)}</Text>
      </View>

      <Pressable
        style={styles.primaryButton}
        onPress={() => toggleTaskStatus(task.id)}
      >
        <Text style={styles.primaryButtonText}>
          {task.completed ? "Mark as active" : "Mark as completed"}
        </Text>
      </Pressable>

      <Pressable style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Delete Task</Text>
      </Pressable>
    </View>
  );
};

export default TaskDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
  },
  detailsCard: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 12,
  },
  status: {
    alignSelf: "flex-start",
    fontWeight: "700",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 20,
  },
  completedStatus: {
    backgroundColor: "#DCFCE7",
    color: "#166534",
  },
  activeStatus: {
    backgroundColor: "#DBEAFE",
    color: "#1D4ED8",
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
    marginTop: 14,
    marginBottom: 6,
  },
  description: {
    fontSize: 16,
    color: "#4B5563",
    lineHeight: 23,
  },
  date: {
    fontSize: 15,
    color: "#6B7280",
  },
  primaryButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#FEF2F2",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#DC2626",
    fontWeight: "700",
    fontSize: 16,
  },
  center: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  notFoundTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
});
