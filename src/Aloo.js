import React from "react";
import Todo from "./Todo.js";
export default function Aloo({ todos, toggleTodo }) {
  return (
    <>
      {todos.map((todo) => {
        return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />;
      })}
    </>
  );
}
