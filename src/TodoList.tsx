import { useEffect, useState } from "react";
import type { ITodo } from "./types/ITodo";
import { getTodos, toggleComplete } from "./api/todoApi";

export const TodoList = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  useEffect(() => {
    (async () => {
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos);
    })();
  }, []);
  const renderedTodos = todos.map(({ id, task, completed }) => (
    <li
      key={id}
      onClick={async () => {
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
      }}
    >
      {task} {completed ? "✅" : "❌"}
    </li>
  ));
  return <ul>{renderedTodos}</ul>;
};
