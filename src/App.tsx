import { TodoList } from "./TodoList";

function App() {
  return (
    <div className="flex flex-col gap-5 p-5 h-screen justify-center">
      <h1 className="text-3xl font-bold text-center">Clean Todo!</h1>
      <TodoList />
    </div>
  );
}

export default App;
