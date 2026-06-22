import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import EmptyState from "../components/EmptyState";
import FilterTabs from "../components/FilterTabs";
import TaskCard from "../components/TaskCard";
import { useTasksContext } from "../context/TasksContext";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "TaskList">;

const TaskListScreen = ({ navigation }: Props) => {
  const {
    filteredTasks,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    isLoading,
    toggleTaskStatus,
    deleteTask,
  } = useTasksContext();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading tasks...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search tasks by title..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FilterTabs
        selectedFilter={filterStatus}
        onChangeFilter={setFilterStatus}
      />

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={() =>
              navigation.navigate("TaskDetails", { taskId: item.id })
            }
            onToggle={() => toggleTaskStatus(item.id)}
            onDelete={() => deleteTask(item.id)}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            title="No tasks found"
            message="Add a new task or adjust your search and filters."
          />
        }
      />

      <Pressable
        style={styles.addButton}
        onPress={() => navigation.navigate("AddTask")}
      >
        <Text style={styles.addButtonText}>+ Add Task</Text>
      </Pressable>
    </View>
  );
};

export default TaskListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
  },
  searchInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 15,
  },
  listContent: {
    paddingBottom: 90,
  },
  addButton: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 20,
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
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 12,
    color: "#6B7280",
  },
});
