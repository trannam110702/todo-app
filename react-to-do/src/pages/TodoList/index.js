import React, { useState, useCallback } from "react";

import fetchTodoApi from "./api/todoApi";
import useFetchTodoes from "./hooks/useFetchTodoes";

import Loading from "./components/Loading";
function Todo({ todo, index, completeTodo, removeTodo }) {
  console.log(todo);
  return (
    <div className="todo" style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
      {todo.name}
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  const { todoes, loading, setLoading, fetchAllTodos } = useFetchTodoes();
  const [addModal, setAddModal] = useState(false);

  const updateTodo = useCallback(async (idList, isCompleted) => {
    try {
      setLoading(true);
      await fetchTodoApi(`todoes`, {
        method: "PUT",
        body: JSON.stringify({
          idList: typeof idList === "number" ? [idList] : idList,
          isCompleted,
        }),
      });
      await fetchAllTodos();
    } catch (error) {}
  }, []);
  const deteleTodo = useCallback(async (idList) => {
    try {
      setLoading(true);
      await fetchTodoApi(`todoes/delete`, {
        method: "POST",
        body: JSON.stringify({ idList: typeof idList === "number" ? [idList] : idList }),
      });
      await fetchAllTodos();
    } catch (error) {}
  }, []);

  return (
    <div className="app">
      <div className="todo-list">
        {loading ? (
          todoes.map((todo, id) => (
            <Todo
              key={id}
              index={id}
              todo={todo}
              completeTodo={updateTodo}
              removeTodo={deteleTodo}
            />
          ))
        ) : (
          <Loading />
        )}
        {/* <TodoForm addTodo={addTodo} /> */}
      </div>
    </div>
  );
}

export default App;
