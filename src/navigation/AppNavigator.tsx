import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AddTaskScreen from "../screens/AddTaskScreen";
import TaskDetailsScreen from "../screens/TaskDetailsScreen";
import TaskListScreen from "../screens/TaskListScreen";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#2563EB",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontWeight: "700",
          },
        }}
      >
        <Stack.Screen
          name="TaskList"
          component={TaskListScreen}
          options={{ title: "Pritech Tasks" }}
        />

        <Stack.Screen
          name="AddTask"
          component={AddTaskScreen}
          options={{ title: "Add Task" }}
        />

        <Stack.Screen
          name="TaskDetails"
          component={TaskDetailsScreen}
          options={{ title: "Task Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
