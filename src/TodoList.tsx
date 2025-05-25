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
    <TodoItem todo={todo} todos={todos} setTodos={setTodos} key={todo.id} />
  ));
  return (
    <>
      <ul>{renderedTodos}</ul>
      <CreateTodoForm setTodos={setTodos} />
    </>
  );
};
