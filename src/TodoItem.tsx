import { deleteTodo, toggleComplete } from "./api/todoApi";
import type { ITodo } from "./types/ITodo";

export const TodoItem = ({
  todo,
  setTodos,
}: {
  todo: ITodo;
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}) => {
  const { id, task, completed } = todo;

  const handleToggleClick = async () => {
    const toggled = await toggleComplete(id);
    if (toggled) {
      setTodos((prev) => {
        const next = prev.map((todo) => {
          if (todo.id === id) {
            return toggled;
          } else {
            return todo;
          }
        });
        return next;
      });
    }
  };

  const handleDeleteClick = async () => {
    const deleted = await deleteTodo(id);

    if (!deleted) {
      console.log("Something went wrong when deleting the task");
      return;
    }

    setTodos((prev) => {
      const next = prev.filter((todo) => todo.id !== deleted.id);
      return next;
    });
  };

  return (
    <li>
      <div onClick={handleToggleClick}>
        {task} {completed ? "✅" : "❌"}
      </div>
      <button onClick={handleDeleteClick}>Delete</button>
    </li>
  );
};
