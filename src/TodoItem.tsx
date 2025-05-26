import { useState } from "react";
import { deleteTodo, toggleComplete, updateTodo } from "./api/todoApi";
import type { ITodo } from "./types/ITodo";
import { CButton } from "./components/Button";

export const TodoItem = ({
  todo,
  setTodos,
}: {
  todo: ITodo;
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}) => {
  const { id, task: _task, completed } = todo;
  const [editing, setEditing] = useState<boolean>(false);
  const [task, setCurrTask] = useState<string>(_task);

  const handleTodoEditSave = async () => {
    const updated = await updateTodo(id, task);

    if (!updated) {
      console.log("Something went wrong when updating todo task");
    } else {
      setTodos((prev) => {
        const next = prev.map((todo) => {
          if (todo.id === id) {
            return updated;
          } else {
            return todo;
          }
        });
        return next;
      });
    }
    setEditing(false);
  };

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
    <li className="flex gap-2 w-full">
      {!editing ? (
        <div className="flex justify-between w-full">
          <div onClick={handleToggleClick}>
            {task} {completed ? "✅" : "❌"}
          </div>
          <div>
            <CButton onClick={handleDeleteClick}>🗑</CButton>
            <CButton
              onClick={() => {
                setEditing((prev) => !prev);
              }}
            >
              🖊️
            </CButton>
          </div>
        </div>
      ) : (
        <form
          className="flex justify-between w-full"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            value={task}
            onChange={(e) => {
              setCurrTask(e.target.value);
            }}
          />
          <div>
            <CButton onClick={handleTodoEditSave} type="submit">
              💾
            </CButton>
            <CButton
              onClick={() => {
                setEditing(false);
              }}
            >
              🗙
            </CButton>
          </div>
        </form>
      )}
    </li>
  );
};
