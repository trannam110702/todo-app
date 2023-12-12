const fs = require("fs");
const todos = require("./todos.json");

const getAll = () => {
  return todos;
};
const add = (data) => {
  if (todos.find((todo) => todo.name === data.name)) throw new Error("Existed to do");
  fs.writeFileSync(
    "./src/database/todos.json",
    JSON.stringify([...todos, { id: todos.length + 1, ...data, isCompleted: false }])
  );
};
const deleteOne = (id) => {
  const updatedTodos = todos.filter((todo) => todo.id !== parseInt(id));
  fs.writeFileSync("./src/database/todos.json", JSON.stringify(updatedTodos));
};
const update = (data, id) => {
  console.log(data, id);
  const todotoupdate = todos.find((todo) => todo.id === parseInt(id));
  if (!todotoupdate) throw new Error("Id not exist");
  const updatedTodos = todos.map((todo) =>
    todo.id === parseInt(id) ? { ...todo, ...data } : todo
  );
  fs.writeFileSync("./src/database/todos.json", JSON.stringify(updatedTodos));
};
module.exports = { getAll, add, deleteOne, update };
