import { useEffect, useState } from "react";
import type { ITodo } from "./types/ITodo";
import { getTodos } from "./api/todoApi";
import { CreateTodoForm } from "./CreateTodoForm";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  useEffect(() => {
    (async () => {
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos);
    })();
  }, []);
  const renderedTodos = todos.map((todo) => (
    <TodoItem todo={todo} setTodos={setTodos} key={todo.id} />
  ));
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <ul className="flex flex-col gap-3">{renderedTodos}</ul>
      <CreateTodoForm setTodos={setTodos} />
    </div>
  );
};
