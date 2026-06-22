import { createContext, ReactNode, useContext } from "react";
import { useTasks } from "../hooks/useTasks";

type TasksContextValue = ReturnType<typeof useTasks>;

const TasksContext = createContext<TasksContextValue | undefined>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const tasksValue = useTasks();

  return (
    <TasksContext.Provider value={tasksValue}>{children}</TasksContext.Provider>
  );
};

export const useTasksContext = () => {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useTasksContext must be used inside TasksProvider");
  }

  return context;
};
