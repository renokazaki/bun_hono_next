"use client";

import { client, todosClient } from "@/utils/client";
import { useState } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleClick = async () => {
    const res = await client.api.hello.$get();
    const data = await res.json();
    alert(data.message);
  };

  const handleClick2 = async () => {
    const res2 = await client.api.todos.$get();
    const data2 = await res2.json();
    setTodos(data2 as Todo[]);
  };

  const handleClick3 = async () => {
    try {
      await todosClient.test.todos.$post({
        json: {
          title: "apiから投稿",
          completed: false,
        },
      });

      // 投稿後にリストを更新
      await handleClick2();
    } catch (error) {
      console.error("Error:", error);
      alert("エラーが発生しました");
    }
  };
  return (
    <div>
      <div>
        <button onClick={handleClick}>Click me</button>
      </div>
      <div>
        <button onClick={handleClick2}>Todoの取得</button>
      </div>
      <div>
        <button onClick={handleClick3}>Todoの投稿</button>
      </div>
      {todos &&
        todos.map((todo) => (
          <div key={todo.id}>
            <div>
              <p className="gap-4">
                {todo.title}
                {todo.completed}
                {todo.createdAt}
                {todo.updatedAt}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}
