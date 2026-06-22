import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../types/task";

const TASKS_STORAGE_KEY = "@pritech_tasks";

export const saveTasksToStorage = async (tasks: Task[]) => {
  try {
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks to storage:", error);
  }
};

export const getTasksFromStorage = async (): Promise<Task[]> => {
  try {
    const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error("Error getting tasks from storage:", error);
    return [];
  }
};
