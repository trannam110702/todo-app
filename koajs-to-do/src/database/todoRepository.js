const fs = require("fs");
const path = require("path");

const getAll = () => {
  const todos = JSON.parse(fs.readFileSync("./src/database/todos.json", "utf8"));
  return todos;
};
const add = (data) => {
  const todos = JSON.parse(fs.readFileSync("./src/database/todos.json", "utf8"));
  if (todos.find((todo) => todo.name === data.name)) throw new Error("Existed to do");
  fs.writeFileSync(
    "./src/database/todos.json",
    JSON.stringify([
      ...todos,
      {
        id:
          todos.length === 0
            ? 1
            : Math.max.apply(
                null,
                todos.map((item) => item.id)
              ) + 1,
        ...data,
        isCompleted: false,
      },
    ])
  );
};
const deleteOne = (id) => {
  const todos = JSON.parse(fs.readFileSync("./src/database/todos.json", "utf8"));
  const updatedTodos = todos.filter((todo) => todo.id !== parseInt(id));
  fs.writeFileSync("./src/database/todos.json", JSON.stringify(updatedTodos));
};
const deleteMany = (idList) => {
  const todos = JSON.parse(fs.readFileSync("./src/database/todos.json", "utf8"));
  const updatedTodos = todos.filter((todo) => !idList.includes(todo.id));
  fs.writeFileSync("./src/database/todos.json", JSON.stringify(updatedTodos));
};
const update = (data, id) => {
  const todos = JSON.parse(fs.readFileSync("./src/database/todos.json", "utf8"));
  const todotoupdate = todos.find((todo) => todo.id === parseInt(id));
  if (!todotoupdate) throw new Error("Id not exist");
  const updatedTodos = todos.map((todo) =>
    todo.id === parseInt(id) ? { ...todo, ...data } : todo
  );
  fs.writeFileSync("./src/database/todos.json", JSON.stringify(updatedTodos));
};
const updateAll = ({ idList, isCompleted }) => {
  const todos = JSON.parse(fs.readFileSync("./src/database/todos.json", "utf8"));
  const updatedTodos = todos.map((todo) =>
    idList.includes(todo.id) ? { ...todo, isCompleted } : todo
  );
  fs.writeFileSync("./src/database/todos.json", JSON.stringify(updatedTodos));
};
module.exports = { getAll, add, deleteOne, deleteMany, update, updateAll };
