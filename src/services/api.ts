type ApiTodo = {
  id: number;
  title: string;
  completed: boolean;
};

export const fetchTaskSuggestion = async (): Promise<string> => {
  const randomId = Math.floor(Math.random() * 20) + 1;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${randomId}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch task suggestion");
  }

  const data: ApiTodo = await response.json();

  return data.title;
};
