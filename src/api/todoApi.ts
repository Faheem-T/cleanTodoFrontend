import axios from "axios";
import type { ITodo } from "../types/ITodo";

const baseURL = "http://localhost:3000/api";

const todoAxios = axios.create({ baseURL });

interface IGetTodoData {
  todos: ITodo[];
}

export const getTodos = async () => {
  try {
    const response = await todoAxios.get<IGetTodoData>("/todos");
    return response.data.todos;
  } catch (err) {
    console.log(err);
    return [];
  }
};

interface IToggleTodoCompleteData {
  success: true;
  toggled: ITodo;
}

export const toggleComplete = async (id: string) => {
  try {
    const response = await todoAxios.patch<IToggleTodoCompleteData>(
      `/todos/${id}/complete`
    );
    return response.data.toggled;
  } catch (err) {
    console.log(err);
    return null;
  }
};

interface ICreateTodoData {
  todo: ITodo;
}

export const createTodo = async (task: string) => {
  try {
    const response = await todoAxios.post<ICreateTodoData>("/todos", { task });
    return response.data.todo;
  } catch (err) {
    console.log(err);
    return null;
  }
};
