import { useState, type FormEvent, type ReactNode } from "react";
import { createTodo } from "./api/todoApi";
import type { ITodo } from "./types/ITodo";

interface FormElements extends HTMLFormControlsCollection {
  task: HTMLInputElement;
}

interface TodoFormElements extends HTMLFormElement {
  readonly elements: FormElements;
}

export const CreateTodoForm = ({
  setTodos,
}: {
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}): ReactNode => {
  const [newTask, setNewTask] = useState("");

  const onSubmit = async (e: FormEvent<TodoFormElements>) => {
    e.preventDefault();

    if (!newTask.trim()) return;

    const newTodo = await createTodo(newTask);
    if (!newTodo) {
      console.log("Something went wrong when creating new todo");
    } else {
      setTodos((prev) => {
        const next = [...prev];
        next.push(newTodo);
        return next;
      });
      setNewTask("");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        name="task"
        placeholder="Add new Todo"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
};
