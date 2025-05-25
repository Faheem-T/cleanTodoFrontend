import { toggleComplete } from "./api/todoApi";
import type { ITodo } from "./types/ITodo";

export const TodoItem = ({
  todo,
  setTodos,
  todos,
}: {
  todo: ITodo;
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
  todos: ITodo[];
}) => {
  const { id, task, completed } = todo;

  const handleToggleClick = async () => {
    const toggled = await toggleComplete(id);
    if (toggled) {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return toggled;
        } else {
          return todo;
        }
      });
      setTodos(newTodos);
    }
  };

  return (
    <li onClick={handleToggleClick}>
      {task} {completed ? "✅" : "❌"}
    </li>
  );
};
