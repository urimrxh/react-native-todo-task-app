import { Pressable, StyleSheet, Text, View } from "react-native";
import { Task } from "../types/task";

type Props = {
  task: Task;
  onPress: () => void;
  onToggle: () => void;
  onDelete: () => void;
};

const TaskCard = ({ task, onPress, onToggle, onDelete }: Props) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text
          style={[styles.title, task.completed && styles.completedTitle]}
          numberOfLines={1}
        >
          {task.title}
        </Text>

        <Text
          style={[
            styles.status,
            task.completed ? styles.completedStatus : styles.activeStatus,
          ]}
        >
          {task.completed ? "Completed" : "Active"}
        </Text>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {task.description}
      </Text>

      <View style={styles.actions}>
        <Pressable style={styles.secondaryButton} onPress={onToggle}>
          <Text style={styles.secondaryButtonText}>
            {task.completed ? "Mark active" : "Mark done"}
          </Text>
        </Pressable>

        <Pressable style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },
  completedTitle: {
    textDecorationLine: "line-through",
    color: "#6B7280",
  },
  status: {
    fontSize: 12,
    fontWeight: "700",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: "hidden",
  },
  completedStatus: {
    backgroundColor: "#DCFCE7",
    color: "#166534",
  },
  activeStatus: {
    backgroundColor: "#DBEAFE",
    color: "#1D4ED8",
  },
  description: {
    color: "#4B5563",
    lineHeight: 20,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "#EFF6FF",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#2563EB",
    fontWeight: "700",
  },
  deleteButton: {
    backgroundColor: "#FEF2F2",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: "#DC2626",
    fontWeight: "700",
  },
});
