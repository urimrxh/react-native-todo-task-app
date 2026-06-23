import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, Text } from "react-native";

import AddTaskScreen from "../screens/AddTaskScreen";
import SettingsScreen from "../screens/SettingsScreen";
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
          options={({ navigation }) => ({
            title: "Todo Tasks App",
            headerRight: () => (
              <Pressable onPress={() => navigation.navigate("Settings")}>
                <Text
                  style={{ color: "#FFFFFF", fontSize: 22, paddingRight: 16 }}
                >
                  ⚙️
                </Text>
              </Pressable>
            ),
          })}
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

        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "Settings" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
