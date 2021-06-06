import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Aloo from "./Aloo.js";
const LOCAL_STORAGE_KEY = "todoApp.todos";

export default function App() {
  const [todos, setTodos] = useState([]);
  const todoref = useRef();
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);
  function AddTodo(e) {
    const name = todoref.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoref.current.value = null;
  }
  function toggleTodo(id) {
    const copyTodos = [...todos];
    const todo = copyTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(copyTodos);
  }
  function Clear() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }
  return (
    <>
      <Aloo todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoref} type="text" />
      <button onClick={AddTodo}>Add todo</button>
      <button onClick={Clear}>Clear Complete</button>
      <div>{todos.filter((todo) => !todo.complete).length} tasks left</div>
    </>
  );
}
