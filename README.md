# ToDo App Task

A simple React Native task management app.

## Features

- View a list of personal tasks
- Add new tasks with title and description
- Mark tasks as completed or active
- Delete tasks
- View task details
- Basic input validation
- Search tasks by title
- Filter tasks by status
- Local device storage using AsyncStorage
- Public API integration for task title suggestions
- Simple navigation between screens
- Clean and reusable component structure

## Tech Stack

- React Native
- Expo
- TypeScript
- React Navigation
- AsyncStorage

## Public API Used

The app uses JSONPlaceholder Todos API to fetch a task title suggestion.

Endpoint:

```txt
https://jsonplaceholder.typicode.com/todos/1
```

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/urimrxh/react-native-todo-task-app.git
cd pritech-react-native-task
```

2. Install dependencies:

- npm install

3. Start the project:

- npx expo start

4. Run on a device or emulator:

- Scan the QR code using Expo Go
- Or run on Android/iOS emulator

## Project Structure

src/
components/
context/
hooks/
navigation/
screens/
services/
types/
utils/

## Implementation Notes

- The app uses a shared TasksContext to manage task state across screens.
  Tasks are saved locally using AsyncStorage so they remain available after the app is closed.
  Search and filter logic is handled through a custom useTasks hook to keep the screen components clean.

## Screenshots
