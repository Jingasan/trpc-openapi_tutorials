import { useState } from "react";
import { trpc } from "../trpc";

// TodoAppコンポーネント
export default function TodoApp() {
  const [text, setText] = useState("");
  const todos = trpc.todolist.useQuery();
  const context = trpc.useContext();
  const addTodo = trpc.addtodo.useMutation({
    onSuccess: () => context.invalidate(),
  });
  const deleteTodo = trpc.deletetodo.useMutation({
    onSuccess: () => context.invalidate(),
  });
  // TODOの追加
  const submitTODO = () => {
    addTodo.mutate({ name: text });
    setText("");
  };
  // TODOの削除
  const deleteTODO = (id: number) => {
    deleteTodo.mutate({ id });
  };

  return (
    <>
      <h1>Todoアプリ</h1>
      <div>
        <label id="name">Add Todo:</label>
        <input
          name="name"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={submitTODO}>追加</button>
      </div>
      <ul>
        {todos.data?.map((todo) => (
          <li key={todo.id}>
            {todo.name}
            <button
              style={{ marginLeft: "20px" }}
              onClick={() => deleteTODO(todo.id)}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
